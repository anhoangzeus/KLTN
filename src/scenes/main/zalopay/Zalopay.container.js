/* eslint-disable react-hooks/exhaustive-deps */
import React, {useLayoutEffect, useEffect} from 'react';
import ZalopayView from './Zalopay.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import {NativeModules, NativeEventEmitter} from 'react-native';
import {NAMESPACE} from './Zalopay.constants';
import {getString} from 'utils/i18n';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import CryptoJS from 'crypto-js';
import NavigationServices, {getParams} from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyDNzy29FhjgnLXCCa9f8vqgcq_B-32uXLs');

const {PayZaloBridge} = NativeModules;
const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);
let apptransid;
const functionsCounter = new Set();

function GetCurrentDate() {
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
}
const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);

export default function ZalopayContainer({navigation, route}) {
  const isLoading = useSelectorShallow(loadingSelector);
  const routes = getParams(route);
  console.log(routes);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: getString(`${NAMESPACE}.title`),
    });
  }, [navigation]);

  const [token, setToken] = React.useState('');
  // eslint-disable-next-line no-unused-vars
  const [returncode, setReturnCode] = React.useState('');
  const [modalVisible, setmodal] = React.useState(false);
  const [amountprice, setamount] = React.useState(0);
  const [check, setCheck] = React.useState(0);
  const address = routes.Address;
  // eslint-disable-next-line no-unused-vars
  const subscription = payZaloBridgeEmitter.addListener(
    'EventPayZalo',
    (data) => {
      if (data.returnCode == 1 && check == 0) {
        // eslint-disable-next-line no-use-before-define
        thanhToan();
        setCheck(1);
        //data.returnCode = 0;
      } else if (data.returnCode === 4) {
        NavigationServices.navigate(SCENE_NAMES.HOME);
      }
    },
  );

  const diachi =
    address.NumberAddress +
    ', ' +
    address.Xa +
    ', ' +
    address.Huyen +
    ', ' +
    address.City;
  function getCurrentDateYYMMDD() {
    var todayDate = new Date().toISOString().slice(2, 10);
    return todayDate.split('-').join('');
  }
  function payOrder() {
    var payZP = NativeModules.PayZaloBridge;
    payZP.payOrder(token);
  }
  async function createOrder() {
    apptransid = getCurrentDateYYMMDD() + '_' + new Date().getTime();

    let appid = 553;
    let amount = routes.amount + routes.shipMoney;
    setamount(amount);
    let appuser = 'TiAn';
    let apptime = new Date().getTime();
    let embeddata = '{}';
    let item = '[id : 12]';
    let description = 'Mua s???n ph???m tr??n TiAn' + apptransid;
    let hmacInput =
      appid +
      '|' +
      apptransid +
      '|' +
      appuser +
      '|' +
      amount +
      '|' +
      apptime +
      '|' +
      embeddata +
      '|' +
      item;
    let mac = CryptoJS.HmacSHA256(
      hmacInput,
      '9phuAOYhan4urywHTh0ndEXiV3pKHr5Q',
    );
    var order = {
      appid: appid,
      appuser: appuser,
      apptime: apptime,
      amount: amount,
      apptransid: apptransid,
      embeddata: embeddata,
      item: item,
      description: description,
      mac: mac,
    };
    let formBody = [];
    for (let i in order) {
      var encodedKey = encodeURIComponent(i);
      var encodedValue = encodeURIComponent(order[i]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    await fetch('https://sandbox.zalopay.com.vn/v001/tpe/createorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then((response) => response.json())
      .then((resJson) => {
        setToken(resJson.zptranstoken);
        setReturnCode(resJson.returncode);
      })
      .catch((error) => {
        console.log('error ', error);
      });
  }

  function getStatus() {
    NavigationServices.navigate(SCENE_NAMES.HOME);
    setmodal(false);
  }
  function thanhToan() {
    var location = address.Location;
    Geocoder.from(diachi)
      .then((json) => {
        var locationSearch = json.results[0].geometry.location;
        location = locationSearch.lat + '-' + locationSearch.lng;
      })
      .catch((error) => console.warn(error));
    console.log('vao ham thanh toan');
    var key = database().ref().child('Orders/').push().key;
    database()
      .ref('Orders/' + key)
      .set({
        Status: '1',
        CreatedDate: GetCurrentDate(),
        ShipAddress: diachi,
        ShipName: address.ShipName,
        ShipMoblie: address.ShipPhone,
        OrderID: key,
        Payment: '02',
        ShipPayment: routes.shipMonney,
        Total: amountprice,
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
    database()
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
              Status: false,
            });
          database()
            .ref('Cart/' + auth().currentUser.uid)
            .child(childSnapshot.key)
            .set({});
        });
      });

    setmodal(true);
  }
  useEffect(() => {
    createOrder();
  }, []);

  useEffect(() => {
    if (check === 1) {
      thanhToan();
      setCheck(2);
    }
  }, [check]);
  functionsCounter.add(getStatus);
  functionsCounter.add(createOrder);
  functionsCounter.add(payOrder);
  return (
    <ZalopayView
      isLoading={isLoading}
      modalVisible={modalVisible}
      getStatus={getStatus}
      payOrder={payOrder}
      amount={amountprice}
    />
  );
}
