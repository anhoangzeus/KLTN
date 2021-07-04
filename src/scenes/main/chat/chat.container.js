/* eslint-disable no-unused-vars */
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import ChatView from './chat.view';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import _, {isBuffer} from 'lodash';
const functionsCounter = new Set();

export default function ChatContainer({navigation}) {
  const [listchat, setListChat] = useState([]);
  const [filterChat, setFilterChat] = useState([]);

  const bodau = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      ' ',
    );
    return str;
  };
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
        setFilterChat(items);
      });
  };
  const filterListchat = (val) => {
    if (val === '') {
      setFilterChat(listchat);
    } else {
      var filt = _.map(listchat, function (o) {
        let namelist = bodau(o.Name.toLowerCase());
        let search = bodau(val.toLowerCase());
        console.log('value: ', val.toLowerCase());
        if (namelist.indexOf(search) != -1) {
          console.log('vao 1 laanf: ', namelist.indexOf(val.toLowerCase));
          return o;
        }
      });
      var rmunf = _.without(filt, undefined);
      setFilterChat(rmunf);
    }
  };
  useEffect(() => {
    if (auth().currentUser) {
      getListChat();
    } else {
      NavigationServices.resetActionTo(SCENE_NAMES.TopStackLogin);
    }
  }, []);
  functionsCounter.add(filterListchat);
  return (
    <ChatView
      listChat={listchat}
      filterChat={filterChat}
      filterListchat={filterListchat}
    />
  );
}
