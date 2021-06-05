import React, {useLayoutEffect, useState, useEffect} from 'react';
import StoreProductView from './StoreProduct.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import {NAMESPACE} from './StoreProduct.constants';
import {getString} from 'utils/i18n';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {getParams} from 'utils/navigationServices';
const functionsCounter = new Set();
const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);

export default function StoreProductContainer({navigation, route}) {
  const {Avatar, FullName} = getParams(route);
  const isLoading = useSelectorShallow(loadingSelector);
  const [listItems, setListItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: getString(`${NAMESPACE}.title`),
    });
  }, [navigation]);
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
    <StoreProductView
      isLoading={isLoading}
      loading={loading}
      listItems={listItems}
      Avatar={Avatar}
      FullName={FullName}
      getlistProduct={getlistProduct}
    />
  );
}
