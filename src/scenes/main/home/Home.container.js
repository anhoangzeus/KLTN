/* eslint-disable react-native/no-inline-styles */
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {getUserInfoSubmit} from 'appRedux/actions/authActions';
import {AUTH} from 'appRedux/actionsType';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import withForceUpdate from 'components/HOC/withForceUpdate';
import {useActions} from 'hooks/useActions';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import LottieView from 'lottie-react-native';
import React, {useCallback, useEffect, useState} from 'react';
// import { set } from 'lodash';
// import SCENE_NAMES from 'constants/sceneName';
import {LogBox, Text, View} from 'react-native';
import {NotificationConstants} from 'utils/appContants';
// import {NAMESPACE} from './Home.constants';
import styles from './Home.styles';
import HomeView from './Home.view';
import DeviceInfo from 'react-native-device-info';
const functionsCounter = new Set();
LogBox.ignoreAllLogs();
const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  AUTH.GET_USER_INFO.HANDLER,
]);

function HomeContainer({navigation}) {
  const actions = useActions({getUserInfoSubmit});
  const isFetchingTest = useSelectorShallow(loadingSelector);
  const onPressTestApi = useCallback(() => {
    actions.getUserInfoSubmit({showLoading: false});
  }, [actions]);

  // reference.once('value')
  // .then(snapshot => {
  // console.log('User data: ', snapshot.val());
  // });
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: I18n.t(${NAMESPACE}.title),
  //   });
  // }, [navigation]);

  const [listpro, setListPro] = useState([]);
  const [listphone, setListphone] = useState([]);
  const [listtablet, setListtablet] = useState([]);
  const [listdongho, setListdongho] = useState([]);
  const [listphukien, setListphukien] = useState([]);
  const [listall, setListall] = useState([]);
  const [listcontents, setListcontents] = useState([]);
  const [numcart, setNumcart] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [numChat, setNumChat] = useState(0);

  const getnumcart = () => {
    if (auth().currentUser) {
      database()
        .ref('Cart/' + auth().currentUser.uid)
        .on('value', (snapshot) => {
          var dem = 0;
          snapshot.forEach(function (childSnapshot) {
            dem += childSnapshot.val().Quantity;
          });
          setNumcart(dem);
        });
    }
  };
  const setToken = () => {
    var keyDecide = DeviceInfo.getDeviceId();
    if (auth().currentUser && NotificationConstants.fcmToken !== '') {
      database()
        .ref('FmcToken')
        .once('value')
        .then((snapshot) => {
          var count = true;
          snapshot.forEach((child) => {
            if (
              child.val().UserId === auth().currentUser.uid &&
              child.val().keyDecide === keyDecide
            ) {
              count = false;
              database().ref('FmcToken').child(child.key).update({
                tokenDecide: NotificationConstants.fcmToken,
              });
            }
          });
          if (count) {
            var key = database().ref('FmcToken').push().key;
            database().ref('FmcToken').child(key).update({
              TokenID: key,
              UserId: auth().currentUser.uid,
              keyDecide: keyDecide,
              tokenDecide: NotificationConstants.fcmToken,
            });
          }
        });
    }
  };
  const getCountChats = () => {
    if (auth().currentUser) {
      database()
        .ref('Chats')
        .child(auth().currentUser.uid)
        .on('value', (snapshot) => {
          var count = 0;
          snapshot.forEach((child) => {
            count += child.val().Status;
          });
          setNumChat(count);
        });
    }
  };
  const _getListPhoneNew = () => {
    database()
      .ref('/Products')
      .once('value')
      .then((snapshot) => {
        var itemsphone = [];
        snapshot.forEach(function (childSnapshot) {
          if (
            childSnapshot.val().CategoryID ===
            'AIzaSyDSWIekvpvwQbRiGh4WF88H91tqFzL6OWI'
          ) {
            var point = 0;
            var count = 0;
            childSnapshot.child('Rating').forEach((child) => {
              point += child.val().Point;
              count++;
            });
            itemsphone.push({
              Name: childSnapshot.val().Name,
              Price: childSnapshot.val().Price,
              Image: childSnapshot.val().Image,
              MetaDescription: childSnapshot.val().MetaDescription,
              ProductID: childSnapshot.val().ProductID,
              rating: point / count,
              bough: count,
              CategoryID: childSnapshot.val().CategoryID,
              PromotionPrice: childSnapshot.val().PromotionPrice,
              Warranty: childSnapshot.val().Warranty,
              Counts: childSnapshot.val().Counts,
            });
          }
        });
        setListphone(itemsphone);
      });
  };
  const _getListLaptopNew = () => {
    database()
      .ref('/Products')
      .once('value')
      .then((snapshot) => {
        var itemslap = [];
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.val().CategoryID === '-MJaC7kTLJOYZjt9G4zs') {
            var point = 0;
            var count = 0;
            childSnapshot.child('Rating').forEach((child) => {
              point += child.val().Point;
              count++;
            });
            itemslap.push({
              Name: childSnapshot.val().Name,
              Price: childSnapshot.val().Price,
              Image: childSnapshot.val().Image,
              MetaDescription: childSnapshot.val().MetaDescription,
              ProductID: childSnapshot.val().ProductID,
              rating: point / count,
              bough: count,
              CategoryID: childSnapshot.val().CategoryID,
              PromotionPrice: childSnapshot.val().PromotionPrice,
              Warranty: childSnapshot.val().Warranty,
              Counts: childSnapshot.val().Counts,
            });
          }
        });
        setListPro(itemslap);
      });
  };
  const _getListTabletNew = () => {
    database()
      .ref('/Products')
      .once('value')
      .then((snapshot) => {
        var itemstab = [];
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.val().CategoryID === '-MJaB1_P1gTPbxmjMXSW') {
            var point = 0;
            var count = 0;
            childSnapshot.child('Rating').forEach((child) => {
              point += child.val().Point;
              count++;
            });
            itemstab.push({
              Name: childSnapshot.val().Name,
              Price: childSnapshot.val().Price,
              Image: childSnapshot.val().Image,
              MetaDescription: childSnapshot.val().MetaDescription,
              ProductID: childSnapshot.val().ProductID,
              rating: point / count,
              bough: count,
              CategoryID: childSnapshot.val().CategoryID,
              PromotionPrice: childSnapshot.val().PromotionPrice,
              Warranty: childSnapshot.val().Warranty,
              Counts: childSnapshot.val().Counts,
            });
          }
        });
        setListtablet(itemstab);
      });
  };
  const _getListDongHoNew = () => {
    database()
      .ref('/Products')
      .once('value')
      .then((snapshot) => {
        var itemsdongho = [];
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.val().CategoryID === '-MJaCJRVtI_o9Hv5XY-N') {
            var point = 0;
            var count = 0;
            childSnapshot.child('Rating').forEach((child) => {
              point += child.val().Point;
              count++;
            });
            itemsdongho.push({
              Name: childSnapshot.val().Name,
              Price: childSnapshot.val().Price,
              Image: childSnapshot.val().Image,
              MetaDescription: childSnapshot.val().MetaDescription,
              ProductID: childSnapshot.val().ProductID,
              rating: point / count,
              bough: count,
              CategoryID: childSnapshot.val().CategoryID,
              PromotionPrice: childSnapshot.val().PromotionPrice,
              Warranty: childSnapshot.val().Warranty,
              Counts: childSnapshot.val().Counts,
            });
          }
        });
        setListdongho(itemsdongho);
      });
  };
  const _getListPhukienNew = () => {
    database()
      .ref('/Products')
      .once('value')
      .then((snapshot) => {
        var itemsphukien = [];
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.val().CategoryID === '-MJaCDw6CYGQenBvOtGO') {
            var point = 0;
            var count = 0;
            childSnapshot.child('Rating').forEach((child) => {
              point += child.val().Point;
              count++;
            });
            itemsphukien.push({
              Name: childSnapshot.val().Name,
              Price: childSnapshot.val().Price,
              Image: childSnapshot.val().Image,
              MetaDescription: childSnapshot.val().MetaDescription,
              ProductID: childSnapshot.val().ProductID,
              rating: point / count,
              bough: count,
              CategoryID: childSnapshot.val().CategoryID,
              PromotionPrice: childSnapshot.val().PromotionPrice,
              Warranty: childSnapshot.val().Warranty,
              Counts: childSnapshot.val().Counts,
            });
          }
        });
        setListphukien(itemsphukien);
      });
  };
  const ListenForItems = () => {
    database()
      .ref('/ProductUser')
      .once('value')
      .then((snapshot) => {
        var items = [];
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.val().Status === true) {
            var point = 0;
            var count = 0;
            childSnapshot.child('Rating').forEach((child) => {
              point += child.val().Point;
              count++;
            });
            items.push({
              Name: childSnapshot.val().Name,
              Price: childSnapshot.val().Price,
              Image: childSnapshot.val().Image,
              MetaDescription: childSnapshot.val().MetaDescription,
              Description: childSnapshot.val().Description,
              Warranty: childSnapshot.val().Warranty,
              ProductID: childSnapshot.val().ProductID,
              Counts: childSnapshot.val().Count,
              rating: point / count,
              count: count,
              BrandID: childSnapshot.val().BrandID,
              CategoryID: childSnapshot.val().CategoryID,
              PromotionPrice: childSnapshot.val().PromotionPrice,
              UserID: childSnapshot.val().UserID
                ? childSnapshot.val().UserID
                : null,
            });
          }
        });
        setListall(items);
      });
  };

  const getListBanner = () => {
    database()
      .ref('Contents')
      .once('value')
      .then((snapshot) => {
        var items = [];
        snapshot.forEach((childSnapshot) => {
          items.push({
            id: childSnapshot.key,
            Detail: childSnapshot.val().Detail,
            Image: childSnapshot.val().Image,
            Name: childSnapshot.val().Name,
            Url: childSnapshot.val().Url,
          });
        });
        setListcontents(items);
        setLoading(false);
        setRefreshing(false);
      });
  };
  // const handleNofify = () => {
  //   PushNotification.configure({
  //     onNotification: function (notification) {},
  //   });
  // };
  const _onRefresh = () => {
    setToken();
    setRefreshing(true);
    setLoading(true);
    getListBanner();
    ListenForItems();
    _getListPhoneNew();
    _getListLaptopNew();
    _getListTabletNew();
    _getListDongHoNew();
    _getListPhukienNew();
    getnumcart();
    getCountChats();
  };
  useEffect(() => {
    setToken();
    _getListPhoneNew();
    _getListLaptopNew();
    _getListTabletNew();
    _getListDongHoNew();
    _getListPhukienNew();
    ListenForItems();
    getListBanner();
    getnumcart();
    getCountChats();
    //handleNofify();
  }, []);

  const renderNofiCart = () => {
    if (numcart !== 0) {
      return (
        <View style={{...styles.cartView, width: numcart > 99 ? 19 : 12}}>
          <Text style={styles.cartText} numberOfLines={1}>
            {numcart > 99 ? '99+' : numcart}
          </Text>
        </View>
      );
    }
  };
  const renderNumChat = () => {
    if (numChat !== 0) {
      return (
        <View style={{...styles.cartView, width: numChat > 99 ? 19 : 12}}>
          <Text style={styles.cartText} numberOfLines={1}>
            {numChat > 99 ? '99+' : numChat}
          </Text>
        </View>
      );
    }
  };
  if (loading) {
    return (
      <View style={styles.screenContainer}>
        <LottieView
          source={require('../../../assets/images/loading.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
  functionsCounter.add(renderNofiCart);
  functionsCounter.add(getnumcart);
  functionsCounter.add(_onRefresh);
  functionsCounter.add(renderNumChat);

  return (
    <HomeView
      isLoading={isFetchingTest}
      onPressTestApi={onPressTestApi}
      renderNofiCart={renderNofiCart}
      renderNumChat={renderNumChat}
      listpro={listpro}
      listall={listall}
      listcontents={listcontents}
      listdongho={listdongho}
      listphone={listphone}
      listphukien={listphukien}
      listtablet={listtablet}
      numcart={numcart}
      loading={loading}
      refreshing={refreshing}
      _onRefresh={_onRefresh}
    />
  );
}

export default withForceUpdate(HomeContainer);
