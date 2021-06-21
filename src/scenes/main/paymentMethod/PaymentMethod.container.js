/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect, useState, useEffect } from 'react';
import PaymentMethodView from './PaymentMethod.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import { getIsFetchingByActionsTypeSelector } from 'appRedux/selectors/loadingSelector';
import { NAMESPACE } from './PaymentMethod.constants';
import { getString } from 'utils/i18n';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import NavigationServices, { getParams } from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import Geocoder from 'react-native-geocoding';
Geocoder.init("AIzaSyDNzy29FhjgnLXCCa9f8vqgcq_B-32uXLs");
const functionsCounter = new Set();
const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);

export default function PaymentMethodContainer({ navigation, route }) {
  const [checked, setchecked] = useState('first');
  const [loading] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [shopLa] = useState(10.851807522842384);
  const [shopLo] = useState(106.77209920171669);
  const [shipMoney, setshipMoney] = useState(0);
  const [modalVisibleConfirm, setmodalVisibleConfirm] = useState(false);
  const isLoading = useSelectorShallow(loadingSelector);
  const props = getParams(route);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: getString(`${NAMESPACE}.title`),
    });
  }, [navigation]);

  const getShipMoney = () => {
    var a = '';
    a = props.address.Location;
    var b = a.indexOf('-');
    var radlat1 = (Math.PI * shopLa) / 180;
    var radlat2 = (Math.PI * parseFloat(a.substring(0, b))) / 180;
    var theta = shopLo - parseFloat(a.substring(b + 1, a.length));
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    var shipmoney = 0;
    if (dist >= 5 && dist < 10) {
      shipmoney = 50000;
    } else if (dist >= 10 && dist < 25) {
      shipmoney = 100000;
    } else if (dist >= 25 && dist < 50) {
      shipmoney = 200000;
    } else if (dist >= 50) {
      shipmoney = 250000;
    }
    setshipMoney(shipmoney);
  };

  useEffect(() => {
    getShipMoney();
  }, []);

  const GetCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var gio = new Date().getHours();
    var phut = new Date().getMinutes();
    var giay = new Date().getSeconds();
    var UTM = 'PM';
    if (date <= 9) {
      date = '0' + date;
    }
    if (month <= 9) {
      month = '0' + month;
    }
    if (gio >= 0 && gio <= 12) {
      UTM = 'AM';
    }
    return (
      date +
      '/' +
      month +
      '/' +
      year +
      ' ' +
      gio +
      ':' +
      phut +
      ':' +
      giay +
      ' ' +
      UTM
    );
  };
  const setVisibleConfirm = (visible) => {
    if (auth().currentUser) {
      setmodalVisibleConfirm(visible);
    }
  };
  const handleCloseConfirm = () => {
    setVisibleConfirm(false);
  };
  const handleClose = () => {
    // eslint-disable-next-line no-use-before-define
    setModalVisible(false);
    props.navigation.navigate('App');
  };
  const setModalVisible = (visible) => {
    if (auth().currentUser) {
      setmodalVisible(visible, () => {
        setTimeout(handleClose, 10000);
      });
    }
  };
  const thanhToan = async () => {
    if (checked === 'first') {
      var key = database().ref().child('Orders/').push().key;
      var phone = props.address.ShipPhone;
      var name = props.address.ShipName;
      var location = props.address.Location;
      var diachi =
        props.address.NumberAddress +
        ', ' +
        props.address.Xa +
        ', ' +
        props.address.Huyen +
        ', ' +
        props.address.City;
      await Geocoder.from(diachi)
        .then(json => {
          var locationSearch = json.results[0].geometry.location
          location = locationSearch.lat + '-' + locationSearch.lng
        })
        .catch(error => console.warn(error));
      database()
        .ref('Orders/' + key)
        .set({
          Status: '1',
          CreatedDate: GetCurrentDate(),
          ShipAddress: diachi,
          ShipName: name,
          ShipMoblie: phone,
          OrderID: key,
          Payment: '01',
          ShipPayment: shipMoney,
          Total: props.content + shipMoney,
          CustomerID: auth().currentUser.uid,
          ShipLocation: location,
          TimeLine: {
            ChoLayHang: '',
            ChoXacNhan: '',
            DaGiaoHang: '',
            DaHuy: '',
            DangVanChuyen: '',
            TraHang: '',
          },
        });
      await database()
        .ref('Cart/' + auth().currentUser.uid)
        .once('value')
        .then((snapshot) => {
          snapshot.forEach(function (childSnapshot) {
            var keyDetail = database().ref().child('OrderDetails/').push().key;
            database()
              .ref('Orders/' + key + '/OrderDetails/' + keyDetail)
              .set({
                OrderDetailID: keyDetail,
                Price: childSnapshot.val().Price,
                ProductID: childSnapshot.val().Id,
                Quantity: childSnapshot.val().Quantity,
                CategoryID: childSnapshot.val().CategoryID,
                BrandID: childSnapshot.val().BrandID,
                Name: childSnapshot.val().Name,
                Picture: childSnapshot.val().Picture,
                BrandName: childSnapshot.val().BrandName,
                CategoryName: childSnapshot.val().CategoryName,
                UserID: childSnapshot.val().UserID
                  ? childSnapshot.val().UserID
                  : null,
                UserProduct: childSnapshot.val().UserID ? true : false,
                Status: false,
              });
            database()
              .ref('Cart/' + auth().currentUser.uid)
              .child(childSnapshot.key)
              .set({});
          });
        });
      setVisibleConfirm(false);
      setModalVisible(true);
    } else {
      handleCloseConfirm();
      NavigationServices.navigate(SCENE_NAMES.ZALOPAY, {
        amount: props.content,
        shipMoney: shipMoney,
        listItem: props.CartItem,
        Address: props.address,
      });
    }
  };
  const selectMethod = (value) => {
    setchecked(value);
  };

  functionsCounter.add(handleClose);
  functionsCounter.add(setModalVisible);
  functionsCounter.add(thanhToan);
  functionsCounter.add(handleCloseConfirm);
  functionsCounter.add(setVisibleConfirm);
  functionsCounter.add(GetCurrentDate);
  functionsCounter.add(selectMethod);
  return (
    <PaymentMethodView
      isLoading={isLoading}
      handleClose={handleClose}
      thanhToan={thanhToan}
      handleCloseConfirm={handleCloseConfirm}
      setVisibleConfirm={setVisibleConfirm}
      GetCurrentDate={GetCurrentDate}
      selectMethod={selectMethod}
      checked={checked}
      loading={loading}
      modalVisible={modalVisible}
      modalVisibleConfirm={modalVisibleConfirm}
      shipMoney={shipMoney}
      prop={props}
    />
  );
}
