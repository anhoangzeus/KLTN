import React, {useLayoutEffect, useState, useEffect} from 'react';
import ReportView from './Report.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import {NAMESPACE} from './Report.constants';
import {getString} from 'utils/i18n';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import NavigationServices from 'utils/navigationServices';
const functionsCounter = new Set();
const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);

export default function ReportContainer({navigation, route}) {
  const {proID, userID} = NavigationServices.getParams(route);
  console.log('param report: ', userID);
  const [content, setContent] = useState('');
  const [rule1, setRule1] = useState(false);
  const [rule2, setRule2] = useState(false);
  const [rule3, setRule3] = useState(false);
  const [rule4, setRule4] = useState(false);
  const [rule5, setRule5] = useState(false);
  const [visible, setVisible] = useState(false);
  const [rpname, setRpName] = useState('');
  const [storename, setStoreName] = useState('');
  const isLoading = useSelectorShallow(loadingSelector);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: getString(`${NAMESPACE}.title`),
    });
  }, [navigation]);

  const onPress = async () => {
    const Content = {
      rules_one: rule1 ? 'Sản phẩm kém chất lượng' : '',
      rules_two: rule2 ? 'Hành vi lừa đảo' : '',
      rules_three: rule3 ? 'Ngôn ngữ thô tục' : '',
      rules_four: rule4 ? 'Thái độ tiêu cực' : '',
      rules_orther: rule5 ? content : '',
    };
    const key = database().ref('FeedBacks').push().key;
    await database()
      .ref('FeedBacks')
      .child(key)
      .update({
        Content: Content,
        CreatedDate: moment(new Date()).format('DD/MM/YYYY'),
        FeedBackID: key,
        ReportName: rpname,
        Status: 'True',
        ProductID: proID,
        StoreID: userID,
        UserID: auth().currentUser.uid,
        StoreName: storename,
      });
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
    NavigationServices.goBack();
  };

  const getReportInfo = () => {
    database()
      .ref('Users/' + auth().currentUser.uid)
      .once('value')
      .then((snapshot) => {
        setRpName(snapshot.val().FullName);
      });
    database()
      .ref('Brief/' + userID)
      .once('value')
      .then((snapshot) => {
        setStoreName(snapshot.val().StoreName);
      });
  };
  useEffect(() => {
    getReportInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  functionsCounter.add(onPress);
  return (
    <ReportView
      isLoading={isLoading}
      content={content}
      setContent={setContent}
      onPress={onPress}
      rule1={rule1}
      rule2={rule2}
      rule3={rule3}
      rule4={rule4}
      rule5={rule5}
      visible={visible}
      setRule1={setRule1}
      setRule2={setRule2}
      setRule3={setRule3}
      setRule4={setRule4}
      setRule5={setRule5}
      setVisible={setVisible}
    />
  );
}
