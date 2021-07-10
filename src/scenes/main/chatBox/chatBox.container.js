/* eslint-disable react-hooks/exhaustive-deps */
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Platform, Linking} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {chooseImageOptions, MessType} from 'utils/appContants';
import {getParams} from 'utils/navigationServices';
import ChatBoxView from './chatBox.view';
import ImageCropPicker from 'react-native-image-crop-picker';

const functionsCounter = new Set();

export default function ChatBoxContainer({navigation, route}) {
  const {id, Name} = getParams(route);
  const [listchat, setListChat] = useState([]);
  const [textchat, setTextChat] = useState('');
  const [data, setData] = useState({});
  const [visibleViewing, setvisibleViewing] = useState(false);
  const [isVisibleModalCall, setisVisibleModalCall] = useState(false);
  const [isVisiblePopupCancel, setisVisiblePopupCancel] = useState(false);
  const [visibleChooseImage, setvisibleChooseImage] = useState(false);
  const [viewImagesPop, setviewImagesPop] = useState('');
  const [imgHeight, setimgHeight] = useState(170);
  const [imgWidth, setimgWidth] = useState(170);
  const [dataSeller, setdataSeller] = useState(0);

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
  const getListChat = () => {
    database()
      .ref('Users')
      .child(id)
      .once('value')
      .then((snapshot) => {
        setdataSeller(snapshot.val());
      });
    database()
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
          Text: content,
          Type: 'USER',
          Status: false,
          imgHeight: imgHeight,
          imgWidth: imgWidth,
          messages_type: messType,
        });
      database()
        .ref('Messages')
        .child(id)
        .child(auth().currentUser.uid)
        .child(newPostKey)
        .set({
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

  const chooseMultiImageLibrary = () => {
    ImageCropPicker.openPicker({multiple: true, mediaType: 'photo'}).then(
      (images) => {
        var list_photo_string = '';
        var list_photo = [];
        Promise.all(
          images.map(async (response, index) => {
            var fileExt = response.path.split('.');
            var fileName =
              id +
              moment().format('_YYYY_MM_DD_HH_mm_ss') +
              `_${index}.` +
              fileExt[fileExt.length - 1];
            list_photo.push(fileName);
            // Up image to server
            await storage()
              .ref('chats/' + fileName)
              .putFile(response.path);
            const url = await storage()
              .ref('chats/' + fileName)
              .getDownloadURL();
            list_photo_string += url + '$';
          }),
        ).then(() => {
          sentMessage(MessType.MoreImages, list_photo_string);
        });
      },
    );
  };
  const pairToSubmitImage = async (response) => {
    if (response.didCancel) {
      console.log('ImagePicker', 'cancel');
    } else if (response.error) {
      console.log('ImagePickerError: ', response.error);
    } else {
      var fileName = '';
      if (Platform.OS === 'android') {
        var fileExt = response.uri.split('.');
        var fileName =
          id +
          moment().format('_YYYY_MM_DD_HH_mm_ss.') +
          fileExt[fileExt.length - 1];
      } else {
        var fileExt = response.uri.split('.');
        var fileName =
          id +
          moment().format('_YYYY_MM_DD_HH_mm_ss.') +
          fileExt[fileExt.length - 1];
      }
      setimgHeight(response.height);
      setimgWidth(response.width);
      // Up image to server
      const task = storage()
        .ref('chats/' + fileName)
        .putFile(response.uri);
      try {
        await task;
      } catch (e) {
        console.error(e);
      }
      const url = await storage()
        .ref('chats/' + fileName)
        .getDownloadURL();
      sentMessage(MessType.Image, url);
    }
  };
  const onCallPhone = () => {
    setisVisibleModalCall(false);
    Linking.openURL(`tel:${dataSeller?.Phone}`);
  };
  const openGalary = () => {
    launchImageLibrary(chooseImageOptions, (response) => {
      pairToSubmitImage(response);
    });
  };
  const chooseImageTake = () => {
    launchCamera(chooseImageOptions, (response) => {
      pairToSubmitImage(response);
    });
  };
  functionsCounter.add(onChangeText);
  functionsCounter.add(sentMessage);
  functionsCounter.add(openGalary);
  functionsCounter.add(onCallPhone);
  functionsCounter.add(chooseImageTake);
  functionsCounter.add(chooseMultiImageLibrary);

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
      isVisibleModalCall={isVisibleModalCall}
      setisVisibleModalCall={setisVisibleModalCall}
      onCallPhone={onCallPhone}
      dataSeller={dataSeller}
      isVisiblePopupCancel={isVisiblePopupCancel}
      setisVisiblePopupCancel={setisVisiblePopupCancel}
      visibleChooseImage={visibleChooseImage}
      setvisibleChooseImage={setvisibleChooseImage}
      chooseImageTake={chooseImageTake}
      chooseMultiImageLibrary={chooseMultiImageLibrary}
    />
  );
}
