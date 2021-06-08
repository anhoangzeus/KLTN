/* eslint-disable react-hooks/exhaustive-deps */
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Platform, Linking } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { chooseImageOptions, MessType } from 'utils/appContants';
import { getParams } from 'utils/navigationServices';
import ChatBoxView from './chatBox.view';

const functionsCounter = new Set();

export default function ChatBoxContainer({ navigation, route }) {
  const { id, Name } = getParams(route);
  const [listchat, setListChat] = useState([]);
  const [textchat, setTextChat] = useState('');
  const [data, setData] = useState({});
  const [onFocus, setonFocus] = useState(false);
  const [visibleViewing, setvisibleViewing] = useState(false);
  const [isVisibleModalCall, setisVisibleModalCall] = useState(false);
  const [isVisiblePopupCancel, setisVisiblePopupCancel] = useState(false);
  const [viewImagesPop, setviewImagesPop] = useState('');
  const [imgHeight, setimgHeight] = useState(170);
  const [imgWidth, setimgWidth] = useState(170);
  const [phone_no, setphone_no] = useState(0);


  const getDataUser = () => {
    var user = {
      avatar: 'https://i.ibb.co/HDzz1rC/avartarnone.png',
      name: 'Name',
    };
    database().ref('Users').child(auth().currentUser.uid).once('value').then((snapshot) => {
      user.avatar = snapshot.val().Avatar;
      user.name = snapshot.val().FullName;
    });
    setData(user);
  };
  const setSeen = () => {
    database().ref('Chats').child(auth().currentUser.uid).child(id).update({
      Status: 0,
    });
    database().ref('Messages').child(id).child(auth().currentUser.uid).once('value').then((snapshot) => {
      snapshot.forEach((child) => {
        child.ref.update({
          Status: false,
        });
      });
    });
  };
  const getSeen = () => {
    var num = 1;
    database().ref('Messages').child(id).child(auth().currentUser.uid).once('value')
      .then((snapshot) => {
        snapshot.forEach((child) => {
          if (child.val().Status) {
            num++;
          }
        });
      });
    return num++;
  };
  const getListChat = () => {
    database().ref('Users').child(id).once('value').then(snapshot => {
      setphone_no(snapshot.val().Phone);
    });
    database().ref('Messages').child(auth().currentUser.uid).child(id).orderByChild('CreatedTime', 'desc')
      .on('value', (snapshot) => {
        var items = [];
        snapshot.forEach((childSnapshot) => {
          items.push({
            id: childSnapshot.key,
            CreatedTime: childSnapshot.val().CreatedTime,
            Text: childSnapshot.val().Text,
            Type: childSnapshot.val().Type,
            imgHeight: childSnapshot.val().imgHeight,
            imgWidth: childSnapshot.val().imgWidth,
            messages_type: childSnapshot.val().messages_type,
          });
        });
        items.reverse();
        setListChat(items);
      });
  };

  const onChangeText = (val) => {
    setTextChat(val);
  };

  const sentMessage = (messType, content) => {
    var lastmessage = '';
    if (messType === MessType.Image) {
      lastmessage = 'Tin nhắn hình ảnh mới';
    } else {
      lastmessage = content;
    }
    if (content !== '') {
      var newPostKey = database().ref().child('Messages').child(auth().currentUser.uid).child(id).push().key;
      database().ref('Messages').child(auth().currentUser.uid).child(id).child(newPostKey).set({
        CreatedTime: moment().unix(),
        Text: content,
        Type: 'USER',
        Status: false,
        imgHeight: imgHeight,
        imgWidth: imgWidth,
        messages_type: messType,
      });
      database().ref('Messages').child(id).child(auth().currentUser.uid).child(newPostKey).set({
        CreatedTime: moment().unix(),
        Text: content,
        Type: 'CUS',
        Status: true,
        imgHeight: imgHeight,
        imgWidth: imgWidth,
        messages_type: messType,
      });
      ////
      var numSeen = getSeen();
      database().ref('Chats').child(id).child(auth().currentUser.uid).update({
        Avatar: data.avatar,
        LastMess: lastmessage,
        LastMessTime: moment().unix(),
        Name: data.name,
        Status: numSeen,
      });
      setTextChat('');
    }
  };

  const pairToSubmitImage = async (response) => {
    if (response.didCancel) {
      console.log('ImagePicker', 'cancel');
    } else if (response.error) {
      console.log('ImagePickerError: ', response.error);
    } else {
      const data1 = new FormData();
      var fileName = '';
      if (Platform.OS === 'android') {
        var fileExt = response.uri.split('.');
        var fileName = id + moment().format('_YYYY_MM_DD_HH_mm_ss.') + fileExt[fileExt.length - 1];
      } else {
        var fileExt = response.uri.split('.');
        var fileName = id + moment().format('_YYYY_MM_DD_HH_mm_ss.') + fileExt[fileExt.length - 1];
      }
      data1.append('files', {
        name: fileName,
        type: response.type,
        uri: Platform.OS === 'android' ? response.uri : response.uri.replace('file://', '/private'),
      });
      data1.append('secret', '123456');
      // Up image to server
      const task = storage().ref('chats/' + fileName).putFile(response.uri);
      try {
        await task;
      } catch (e) {
        console.error(e);
      }
      const url = await storage().ref('chats/' + fileName).getDownloadURL();
      setimgHeight(response.height);
      setimgWidth(response.width);
      sentMessage(MessType.Image, url);
    }
  };
  const onCallPhone = () => {
    setisVisibleModalCall(false);
    Linking.openURL(`tel:${phone_no}`);
  };
  const openGalary = () => {
    launchImageLibrary(chooseImageOptions, (response) => {
      pairToSubmitImage(response);
    });
  };
  functionsCounter.add(onChangeText);
  functionsCounter.add(sentMessage);
  functionsCounter.add(openGalary);
  functionsCounter.add(onCallPhone);

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
      viewImagesPop={viewImagesPop}
      setviewImagesPop={setviewImagesPop}
      visibleViewing={visibleViewing}
      setvisibleViewing={setvisibleViewing}
      onFocus={onFocus}
      setonFocus={setonFocus}
      isVisibleModalCall={isVisibleModalCall}
      setisVisibleModalCall={setisVisibleModalCall}
      onCallPhone={onCallPhone}
      phone_no={phone_no}
      isVisiblePopupCancel={isVisiblePopupCancel}
      setisVisiblePopupCancel={setisVisiblePopupCancel}
    />
  );
}
