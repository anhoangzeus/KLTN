/* eslint-disable react-hooks/exhaustive-deps */
import React, {useLayoutEffect, useEffect, useState} from 'react';
import StatisticView from './Statistic.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import {NAMESPACE} from './Statistic.constants';
import {getString} from 'utils/i18n';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);

export default function StatisticContainer({navigation}) {
  const [listOrder, setListOrder] = useState([]);
  const [thismonth, setThismonth] = useState(1);
  const [timeline, setTimeline] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const isLoading = useSelectorShallow(loadingSelector);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: getString(`${NAMESPACE}.title`),
    });
  }, [navigation]);

  const getStatis = async () => {
    setLoading(true);
    await database()
      .ref('Orders')
      .once('value')
      .then((snapshot) => {
        let List = [];
        let order = {};
        snapshot.forEach((childSnapshot) => {
          let temp = 0;
          let item = [];

          childSnapshot.child('OrderDetails').forEach((element) => {
            if (element.val().UserID === auth().currentUser.uid) {
              console.log('aaa');
              item.push(element.val());
              temp++;
            }
            console.log(temp);
            if (temp !== 0) {
              order = {
                TimeLine: childSnapshot.val().TimeLine,
                CreatedDate: childSnapshot.val().CreatedDate,
                Detail: item,
              };
              List.push(order);
            }
          });
        });
        //List.push(order);
        setListOrder(List);
      });
  };
  const selectMonth = (time) => {
    let m = time.slice(3, 5);
    return m;
  };
  const getTime = () => {
    var date = new Date();
    let m = date.getMonth();
    setThismonth(m + 1);
    let morder = selectMonth('09/07/2021 23:31:36 PM');
    console.log('this month: ', m + 1);
    console.log('order month: ', parseInt(morder, 10));
  };
  const createData = (list) => {
    setLoading(true);
    let m = [];
    let rv = [];
    let od = [];
    for (let i = 1; i <= thismonth; i++) {
      m.push(i);
      let count = 0;
      let temp = 0;
      list.forEach((element) => {
        if (selectMonth(element.CreatedDate) == i) {
          console.log('element mont: ', i, element);
          element.Detail.forEach((item) => {
            count += (parseInt(item.Price, 10) * item.Quantity) / 1000;
            temp += 1;
          });
        }
      });
      rv.push(count);
      od.push(temp);
    }
    setTimeline(m);
    setRevenue(rv);
    setOrder(od);
    console.log('mont line: ', od);
    console.log('reve line: ', rv);
    setLoading(false);
  };

  useEffect(() => {
    getStatis();
    getTime();
  }, []);

  useEffect(() => {
    console.log('list order: ', listOrder);
    createData(listOrder);
  }, [listOrder]);

  return (
    <StatisticView
      isLoading={isLoading}
      timeline={timeline}
      revenue={revenue}
      order={order}
      loading={loading}
    />
  );
}
