/* eslint-disable no-unused-vars */
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import ChatView from './chat.view';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
const functionsCounter = new Set();

export default function ChatContainer({navigation}) {
  const [listchat, setListChat] = useState([]);

  const getListChat = () => {
    database()
      .ref('Chats')
      .child(auth().currentUser.uid)
      .on('value', (snapshot) => {
        var items = [];
        snapshot.forEach((childSnapshot) => {
          items.push({
            id: childSnapshot.key,
            Avatar: childSnapshot.val().Avatar,
            LastMess: childSnapshot.val().LastMess,
            LastMessTime: childSnapshot.val().LastMessTime,
            Name: childSnapshot.val().Name,
            Status: childSnapshot.val().Status,
          });
        });
        setListChat(items);
      });
  };
  useEffect(() => {
    if (auth().currentUser) {
      getListChat();
    } else {
      NavigationServices.resetActionTo(SCENE_NAMES.TopStackLogin);
    }
  }, []);
  return <ChatView listChat={listchat} />;
}
