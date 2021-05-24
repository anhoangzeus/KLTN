/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import ChatBoxView from './chatBox.view';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import NavigationServices, {getParams} from 'utils/navigationServices';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {onChange} from 'react-native-reanimated';
const functionsCounter = new Set();

export default function ChatBoxContainer({navigation, route}) {
  const {id, Name} = getParams(route);
  const [listchat, setListChat] = useState([]);
  const [textchat, setTextChat] = useState('');
  const [data, setData] = useState({});
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const getDataUser = () => {
    var user = {
      avatar: 'https://i.ibb.co/HDzz1rC/avartarnone.png',
      name: 'Name',
    };
    database()
      .ref('Users')
      .child(auth().currentUser.uid)
      .once('value')
      .then((snapshot) => {
        user.avatar = snapshot.val().Avatar;
        user.name = snapshot.val().FullName;
      });
    setData(user);
  };
  const setSeen = () => {
    database().ref('Chats').child(auth().currentUser.uid).child(id).update({
      Status: 0,
    });
    database()
      .ref('Messages')
      .child(id)
      .child(auth().currentUser.uid)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((child) => {
          child.ref.update({
            Status: false,
          });
        });
      });
  };
  const getSeen = () => {
    var num = 1;
    database()
      .ref('Messages')
      .child(id)
      .child(auth().currentUser.uid)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((child) => {
          if (child.val().Status) {
            num++;
          }
        });
      });
    return num++;
  };
  const getListChat = async () => {
    setLoading(true);
    await database()
      .ref('Messages')
      .child(auth().currentUser.uid)
      .child(id)
      .orderByChild('CreatedTime', 'desc')
      .on('value', (snapshot) => {
        var items = [];
        snapshot.forEach((childSnapshot) => {
          items.push({
            id: childSnapshot.key,
            CreatedTime: childSnapshot.val().CreatedTime,
            Text: childSnapshot.val().Text,
            Type: childSnapshot.val().Type,
            Image: childSnapshot.val().Image,
          });
        });
        setListChat(items);
      });

    setLoading(false);
  };

  const onChangeText = (val) => {
    setTextChat(val);
  };

  const sentMessage = async () => {
    setLoading(true);
    if (textchat === '' && image === '') {
      return;
    } else {
      var newPostKey = database()
        .ref()
        .child('Messages')
        .child(auth().currentUser.uid)
        .child(id)
        .push().key;
      database()
        .ref('Messages')
        .child(auth().currentUser.uid)
        .child(id)
        .child(newPostKey)
        .set({
          CreatedTime: moment().unix(),
          Text: textchat,
          Type: 'USER',
          Status: false,
          Image: image,
        });
      database()
        .ref('Messages')
        .child(id)
        .child(auth().currentUser.uid)
        .child(newPostKey)
        .set({
          CreatedTime: moment().unix(),
          Text: textchat,
          Type: 'CUS',
          Status: true,
          Image: image,
        });
      ////
      var numSeen = getSeen();
      database().ref('Chats').child(id).child(auth().currentUser.uid).update({
        Avatar: data.avatar,
        LastMess: textchat,
        LastMessTime: moment().unix(),
        Name: data.name,
        Status: numSeen,
      });
      await getListChat();
      setTextChat('');
    }
    setLoading(false);
  };

  const openGalary = () => {
    launchImageLibrary('photo', (response) => {
      if (response.didCancel) {
        console.log('ImagePicker', 'cancel');
      } else if (response.error) {
        console.log('ImagePickerError: ', response.error);
      } else {
        RNFS.readFile(response.uri, 'base64').then((res) => {
          let source = 'data:image/png;base64,' + res;
          setImage(source);
        });
        sentMessage();
        getListChat();
      }
    });
  };
  functionsCounter.add(onChangeText);
  functionsCounter.add(sentMessage);
  functionsCounter.add(openGalary);

  useEffect(() => {
    getListChat();
    setSeen();
    getDataUser();
  }, []);
  return (
    <ChatBoxView
      listchat={listchat}
      Name={Name}
      textchat={textchat}
      onChangeText={onChangeText}
      sentMessage={sentMessage}
      openGalary={openGalary}
      loading={loading}
    />
  );
}
