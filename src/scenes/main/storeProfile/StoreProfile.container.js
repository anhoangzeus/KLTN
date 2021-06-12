import React, {useState, useEffect} from 'react';
import StoreProfileView from './StoreProfile.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {getParams} from 'utils/navigationServices';
const functionsCounter = new Set();

const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);

export default function StoreProfileContainer({navigation, route}) {
  const isLoading = useSelectorShallow(loadingSelector);
  const {info} = getParams(route);
  console.log('info user: ', info);
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const getlistProduct = async () => {
    setLoading(true);
    await database()
      .ref('ProductUser')
      .once('value')
      .then((snapshots) => {
        let items = [];
        snapshots.forEach((childSnapshot) => {
          if (childSnapshot.val().UserID === auth().currentUser.uid) {
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
  }, []);
  functionsCounter.add(getlistProduct);
  return (
    <StoreProfileView
      isLoading={isLoading}
      loading={loading}
      listItems={listItems}
      info={info}
      getlistProduct={getlistProduct}
    />
  );
}
