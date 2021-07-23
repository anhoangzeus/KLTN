import React, {useLayoutEffect, useEffect, useState} from 'react';
import SellerOrderView from './SellerOrder.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import {NAMESPACE} from './SellerOrder.constants';
import {getString} from 'utils/i18n';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import _ from 'lodash';
const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);

export default function SellerOrderContainer({navigation}) {
  const [listOrder, setListOrder] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const isLoading = useSelectorShallow(loadingSelector);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: getString(`${NAMESPACE}.title`),
    });
  }, [navigation]);

  const getStatis = async () => {
    await database()
      .ref('Orders')
      .once('value')
      .then((snapshot) => {
        let List = [];
        let order = {};
        snapshot.forEach((childSnapshot) => {
          let temp = 0;
          let item = [];
          let count = 0;
          childSnapshot.child('OrderDetails').forEach((element) => {
            if (element.val().UserID === auth().currentUser.uid) {
              item.push(element.val());
              count +=
                parseInt(element.val().Price, 10) *
                parseInt(element.val().Quantity, 10);
              temp++;
            }
          });
          console.log('count : ', count);
          if (temp !== 0) {
            order = {
              TimeLine: childSnapshot.val().TimeLine,
              CreatedDate: childSnapshot.val().CreatedDate,
              OrderID: childSnapshot.val().OrderID,
              Total: count,
              Detail: item,
              ShipAddress: childSnapshot.val().ShipAddress,
            };
            List.push(order);
          }
        });
        //List.push(order);
        let arr = _.orderBy(List, ['CreatedDate'], ['asc']);
        setListOrder(arr);
      });
    setRefreshing(false);
  };
  const selectMonth = (time) => {
    let m = time.slice(3, 5);
    return m;
  };
  const getTime = () => {
    var date = new Date();
    let m = date.getMonth();
    let morder = selectMonth('09/07/2021 23:31:36 PM');
    console.log('this month: ', m + 1);
    console.log('order month: ', parseInt(morder, 10));
  };

  useEffect(() => {
    getStatis();
    getTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const _onRefresh = () => {
    setRefreshing(true);
    getStatis();
  };

  return (
    <SellerOrderView
      isLoading={isLoading}
      listOrder={listOrder}
      refreshing={refreshing}
      onRefresh={_onRefresh}
    />
  );
}
