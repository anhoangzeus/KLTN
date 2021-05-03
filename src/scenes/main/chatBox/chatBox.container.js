/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ChatBoxView from './chatBox.view';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import NavigationServices, { getParams } from 'utils/navigationServices';
import { onChange } from 'react-native-reanimated';
const functionsCounter = new Set();

export default function ChatBoxContainer({ navigation, route }) {

    const { id, Name } = getParams(route);
    const [listchat, setListChat] = useState([]);
    const [textchat, setTextChat] = useState('');
    const [data, setData] = useState({});

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
    };
    const getSeen = () => {
        var num = 1;
        database().ref('Chats').child(auth().currentUser.uid).child(id).once('value').then((snapshot) => {
            num = snapshot.val().Status;
        });
        return num++;
    };
    const getListChat = () => {
        database().ref('Messages').child(auth().currentUser.uid).child(id).orderByChild('CreatedTime', 'desc')
            .once('value').then((snapshot) => {
                var items = [];
                snapshot.forEach((childSnapshot) => {
                    items.push({
                        id: childSnapshot.key,
                        CreatedTime: childSnapshot.val().CreatedTime,
                        Text: childSnapshot.val().Text,
                        Type: childSnapshot.val().Type,
                    });
                });
                setListChat(items);
            });
    };

    const onChangeText = (val) => {
        setTextChat(val);
    };

    const sentMessage = () => {
        console.log(moment().unix(), 'aa');
        if (textchat === '') { return; }
        var newPostKey = database().ref().child('Messages').child(auth().currentUser.uid).child(id).push().key;
        database().ref('Messages').child(auth().currentUser.uid).child(id).child(newPostKey)
            .set({
                CreatedTime: moment().unix(),
                Text: textchat,
                Type: 'USER',
            });
        database().ref('Messages').child(id).child(auth().currentUser.uid).child(newPostKey)
            .set({
                CreatedTime: moment().unix(),
                Text: textchat,
                Type: 'CUS',
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
        getListChat();
        setTextChat('');
    };

    functionsCounter.add(onChangeText);
    functionsCounter.add(sentMessage);

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
        />
    );
}
