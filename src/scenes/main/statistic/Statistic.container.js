import React, {useLayoutEffect, useEffect} from 'react';
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
  //const [listOrder, setListOrder] = useState();
  const isLoading = useSelectorShallow(loadingSelector);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: getString(`${NAMESPACE}.title`),
    });
  }, [navigation]);

  const getStatis = () => {
    database()
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
            }
          });
        });
        List.push(order);
        console.log('list order: ', List);
      });
  };

  useEffect(() => {
    getStatis();
  }, []);

  return <StatisticView isLoading={isLoading} />;
}
