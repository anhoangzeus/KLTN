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
const functionsCounter = new Set();

const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);

export default function StoreProfileContainer({navigation, route}) {
  const isLoading = useSelectorShallow(loadingSelector);
  const {info} = getParams(route);
  console.log('info user: ', info);
  const [choose, setChoose] = useState(0);
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const getListChat = async () => {
    database()
      .ref('Chats')
      .child(auth().currentUser.uid)
      .on('value', async (snapshot) => {
        console.log('date list chat user: ', snapshot);
        let temp = 0;
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.key === info.ID) {
            temp += 1;
            NavigationServices.navigate(SCENE_NAMES.ChatBoxContainer, {
              Name: childSnapshot.val().Name,
              id: info.ID,
            });
          }
        });
        if (temp === 0) {
          await database()
            .ref('Chats/' + auth().currentUser.uid)
            .child(info.ID)
            .update({
              Avatar: info.Avatar,
              //LastMess: '',
              Name: info.Name,
              //Status: 1,
              LastMessTime: moment().unix(),
            });
          await database()
            .ref('Chats/' + info.ID)
            .child(auth().currentUser.uid)
            .update({
              Avatar: info.Avatar,
              //LastMess: '',
              Name: info.Name,
              //Status: 1,
              LastMessTime: moment().unix(),
            });
          NavigationServices.navigate(SCENE_NAMES.ChatBoxContainer, {
            Name: info.Name,
            id: info.ID,
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
          if (childSnapshot.val().UserID === info.ID) {
            items.push(childSnapshot.val());
          }
        });
        console.log('item teim: ', items);
        setListItems(items);
      });
    setLoading(false);
  };

  useEffect(() => {
    getlistProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  functionsCounter.add(getlistProduct);
  functionsCounter.add(getListChat);
  return (
    <StoreProfileView
      isLoading={isLoading}
      loading={loading}
      listItems={listItems}
      info={info}
      choose={choose}
      setChoose={setChoose}
      getlistProduct={getlistProduct}
      getListChat={getListChat}
    />
  );
}
