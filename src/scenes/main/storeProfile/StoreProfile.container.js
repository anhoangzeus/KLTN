import React, {useState, useEffect} from 'react';
import StoreProfileView from './StoreProfile.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import moment from 'moment';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import NavigationServices, {getParams} from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import AsyncStorage from '@react-native-community/async-storage';
const functionsCounter = new Set();

const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);

export default function StoreProfileContainer({navigation, route}) {
  const isLoading = useSelectorShallow(loadingSelector);
  const {info} = getParams(route);
  const [choose, setChoose] = useState(0);
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [isFollow, setIsFollow] = useState(false);
  const [des, setDes] = useState('');
  const [address, setAddress] = useState([]);
  const getListChat = async () => {
    database()
      .ref('Chats')
      .child(auth().currentUser.uid)
      .on('value', async (snapshot) => {
        let temp = 0;
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.key === info.UserID) {
            temp += 1;
            NavigationServices.navigate(SCENE_NAMES.ChatBoxContainer, {
              Name: childSnapshot.val().Name,
              id: info.UserID,
            });
          }
        });
        if (temp === 0) {
          await database()
            .ref('Chats/' + auth().currentUser.uid)
            .child(info.UserID)
            .update({
              Avatar: info.Avatar,
              //LastMess: '',
              Name: info.FullName,
              //Status: 1,
              LastMessTime: moment().unix(),
            });
          await database()
            .ref('Chats/' + info.UserID)
            .child(auth().currentUser.uid)
            .update({
              Avatar: info.Avatar,
              //LastMess: '',
              Name: info.FullName,
              //Status: 1,
              LastMessTime: moment().unix(),
            });
          NavigationServices.navigate(SCENE_NAMES.ChatBoxContainer, {
            Name: info.FullName,
            id: info.UserID,
          });
        }
        // var items = [];
        // snapshot.forEach((childSnapshot) => {
        //   items.push({
        //     id: childSnapshot.key,
        //     Avatar: childSnapshot.val().Avatar,
        //     LastMess: childSnapshot.val().LastMess,
        //     LastMessTime: childSnapshot.val().LastMessTime,
        //     Name: childSnapshot.val().Name,
        //     Status: childSnapshot.val().Status,
        //   });
        //   console.log(childSnapshot);
        // });
      });
  };

  const getlistProduct = async () => {
    setLoading(true);
    await database()
      .ref('ProductUser')
      .once('value')
      .then((snapshots) => {
        let items = [];
        snapshots.forEach((childSnapshot) => {
          if (childSnapshot.val().UserID === info.UserID) {
            items.push(childSnapshot.val());
          }
        });
        setListItems(items);
      });
    setLoading(false);
  };
  const onFollow = async () => {
    if (auth().currentUser.uid) {
      await database()
        .ref('Brief/' + info.UserID + '/Follow/' + auth().currentUser.uid)
        .child(token)
        .update({
          UserID: auth().currentUser.uid,
          Token: token,
        });
      await database()
        .ref('Users/' + auth().currentUser.uid + '/Follow/')
        .child(info.UserID)
        .update({
          StoreID: info.UserID,
          Status: true,
        });
    }
    setIsFollow(true);
  };
  const onUnFollow = async () => {
    if (auth().currentUser.uid) {
      await database()
        .ref('Brief/' + info.UserID + '/Follow/' + auth().currentUser.uid)
        .child(token)
        .set({});
      await database()
        .ref('Users/' + auth().currentUser.uid + '/Follow/')
        .child(info.UserID)
        .update({
          StoreID: info.UserID,
          Status: false,
        });
    }
    setIsFollow(false);
  };
  const getFollowStatus = async () => {
    await database()
      .ref('Users/' + auth().currentUser.uid + '/Follow/')
      .child(info.UserID)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val().Status === true) {
          setIsFollow(true);
        }
      });
    await database()
      .ref('Brief/' + info.UserID)
      .once('value')
      .then((snapshot) => {
        setDes(snapshot.val().Description);
        let listAddress = [];
        snapshot.child('Address').forEach((snapshot2) => {
          let item = {
            City: snapshot2.val().City,
            Huyen: snapshot2.val().Huyen,
            NumberAddress: snapshot2.val().NumberAddress,
            Xa: snapshot2.val().Xa,
          };
          listAddress.push(item);
        });
        setAddress(listAddress);
      });
  };
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getlistProduct();
    getToken();
    getFollowStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  functionsCounter.add(getlistProduct);
  functionsCounter.add(getListChat);
  functionsCounter.add(onFollow);
  functionsCounter.add(onUnFollow);
  return (
    <StoreProfileView
      isLoading={isLoading}
      loading={loading}
      listItems={listItems}
      info={info}
      choose={choose}
      isFollow={isFollow}
      des={des}
      address={address}
      setChoose={setChoose}
      getlistProduct={getlistProduct}
      getListChat={getListChat}
      onFollow={onFollow}
      onUnFollow={onUnFollow}
    />
  );
}
