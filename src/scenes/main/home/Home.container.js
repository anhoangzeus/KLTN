import React, { useCallback, useState, useEffect } from 'react';
import HomeView from './Home.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import { getIsFetchingByActionsTypeSelector } from 'appRedux/selectors/loadingSelector';
import { AUTH } from 'appRedux/actionsType';
import { useActions } from 'hooks/useActions';
import { getUserInfoSubmit } from 'appRedux/actions/authActions';
import withForceUpdate from 'components/HOC/withForceUpdate';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
// import { set } from 'lodash';
// import SCENE_NAMES from 'constants/sceneName';
import { View, Text, StatusBar, ActivityIndicator, Image } from 'react-native';
// import {NAMESPACE} from './Home.constants';
import styles from './Home.styles';
const functionsCounter = new Set();

const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  AUTH.GET_USER_INFO.HANDLER,
]);

function HomeContainer({ navigation }) {
  const actions = useActions({ getUserInfoSubmit });
  const isFetchingTest = useSelectorShallow(loadingSelector);
  const onPressTestApi = useCallback(() => {
    actions.getUserInfoSubmit({ showLoading: false });
  }, [actions]);

  // reference.once('value')
  // .then(snapshot => {
    // console.log('User data: ', snapshot.val());
  // });
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: I18n.t(`${NAMESPACE}.title`),
  //   });
  // }, [navigation]);

  const [listpro, setListPro] = useState([]);
  const [listphone, setListphone] = useState([]);
  const [listtablet, setListtablet] = useState([]);
  const [listall, setListall] = useState([]);
  const [listcontents, setListcontents] = useState([]);
  const [numcart, setNumcart] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const getnumcart = () => {
    if (auth().currentUser) {
      database().ref('Cart/' + auth().currentUser.uid).on('value', snapshot => {
        var dem = 0;
        snapshot.forEach(function (childSnapshot) {
          dem += childSnapshot.val().Quantity;
        });
        setNumcart(dem);
      });
    }
  };
  const _getListPhoneNew = () => {
    database().ref('/Products').once('value').then((snapshot) => {
      var itemsphone = [];
      snapshot.forEach(function (childSnapshot) {
        if (childSnapshot.val().CategoryID === 'AIzaSyDSWIekvpvwQbRiGh4WF88H91tqFzL6OWI') {
          var point = 0;
          var count = 0;
          childSnapshot.child('Rating').forEach((child) => {
            point += child.val().Point;
            count++;
          });
          itemsphone.push({
            title: childSnapshot.val().Name,
            price: childSnapshot.val().Price,
            image: childSnapshot.val().Image,
            metades: childSnapshot.val().MetaDescription,
            id: childSnapshot.val().ProductID,
            rating: point / count,
            bough: count,
            BrandID: childSnapshot.val().BrandID,
            CategoryID: childSnapshot.val().CategoryID,
            PromotionPrice: childSnapshot.val().PromotionPrice,
          });
        }
      });
      setListphone(itemsphone);
    });
  };
  const _getListLaptopNew = () => {
    database().ref('/Products').once('value').then((snapshot) => {
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
            title: childSnapshot.val().Name,
            price: childSnapshot.val().Price,
            image: childSnapshot.val().Image,
            metades: childSnapshot.val().MetaDescription,
            id: childSnapshot.val().ProductID,
            rating: point / count,
            bough: count,
            BrandID: childSnapshot.val().BrandID,
            CategoryID: childSnapshot.val().CategoryID,
            PromotionPrice: childSnapshot.val().PromotionPrice,
          });
        }
      });
      setListPro(itemslap);
    });
  };
  const _getListTabletNew = () => {
    database().ref('/Products').once('value').then((snapshot) => {
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
            title: childSnapshot.val().Name,
            price: childSnapshot.val().Price,
            image: childSnapshot.val().Image,
            metades: childSnapshot.val().MetaDescription,
            id: childSnapshot.val().ProductID,
            rating: point / count,
            bough: count,
            BrandID: childSnapshot.val().BrandID,
            CategoryID: childSnapshot.val().CategoryID,
            PromotionPrice: childSnapshot.val().PromotionPrice,
          });
        }
      });
      setListtablet(itemstab);
    });
  };
  const ListenForItems = () => {
    database().ref('/Products').once('value').then((snapshot) => {
      var items = [];
      snapshot.forEach(function (childSnapshot) {
        var point = 0;
        var count = 0;
        childSnapshot.child('Rating').forEach((child) => {
          point += child.val().Point;
          count++;
        });
        items.push({
          title: childSnapshot.val().Name,
          price: childSnapshot.val().Price,
          image: childSnapshot.val().Image,
          metades: childSnapshot.val().MetaDescription,
          id: childSnapshot.val().ProductID,
          rating: point / count,
          bough: count,
          BrandID: childSnapshot.val().BrandID,
          CategoryID: childSnapshot.val().CategoryID,
          PromotionPrice: childSnapshot.val().PromotionPrice,
        });
      });
      setListall(items);
    });
  };
  const getListBanner = () => {
    database().ref('Contents').once('value').then((snapshot) => {
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
  const _onRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    getListBanner();
    ListenForItems();
    _getListPhoneNew();
    _getListLaptopNew();
    _getListTabletNew();
    getnumcart();

  };
  useEffect(() => {
    _getListPhoneNew();
    _getListLaptopNew();
    _getListTabletNew();
    ListenForItems();
    getListBanner();
  }, []);

  const renderNofiCart = () => {
    if (numcart === 0) {
      return null;
    }
    else {
      return (
        <View style={styles.cartView}>
          <Text style={styles.cartText} numberOfLines={1}>{numcart}</Text>
        </View>
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingview}>
        <StatusBar barStyle="light-content" backgroundColor="#a2459a" />
        <Image source={require('assets/images/homeloading.png')} style={styles.loadingImage} />
        <ActivityIndicator size="large" color="'#a2459a" style={styles.activityView} />
      </View>
    );
  }

  functionsCounter.add(renderNofiCart);
  functionsCounter.add(getnumcart);
  functionsCounter.add(_onRefresh);

  return (
    <HomeView
      isLoading={isFetchingTest}
      onPressTestApi={onPressTestApi}
      renderNofiCart={renderNofiCart}
      listpro={listpro}
      listall={listall}
      listcontents={listcontents}
      listphone={listphone}
      listtablet={listtablet}
      numcart={numcart}
      loading={loading}
      refreshing={refreshing}
      _onRefresh={_onRefresh}
      navigation={navigation}
    />
  );
}

export default withForceUpdate(HomeContainer);

