import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import NavigationServices, {getParams} from 'utils/navigationServices';
import ConfimOrderView from './confim_order.view';
import CryptoJS from 'crypto-js';

const functionsCounter = new Set();

const ConfimOrderContainer = ({navigation, route}) => {
  const {item} = getParams(route);
  const [OrderID, setOrderID] = useState('');
  const [CusID, setCusID] = useState('');
  const [CreatedDate, setCreatedDate] = useState('');
  const [ShipName, setShipName] = useState('');
  const [ShipMoblie, setShipMoblie] = useState('');
  const [ShipAddress, setShipAddress] = useState('');
  const [Total, setTotal] = useState(0);
  const [ShipPayment, setShipPayment] = useState(0);
  const [ListProduct, setListProduct] = useState([]);
  const [modalVisible, setModal] = useState(false);
  const [modalVisibleWarning, setModalWarning] = useState(false);
  const setModalVisible = (visible) => {
    if (auth().currentUser) {
      setModal(visible);
    }
  };
  const handleCloseWar = () => {
    setModalWarning(false);
    setModal(false);
    NavigationServices.goBack();
  };
  const setModalVisibleWarning = (visible) => {
    setModalWarning(visible);
    NavigationServices.goBack();
  };
  const getListOrder = () => {
    setOrderID(item.OrderID);
    setCusID(item.CustomerID);
    setCreatedDate(item.CreatedDate);
    setShipName(item.ShipName);
    setShipMoblie(item.ShipMoblie);
    setShipAddress(item.ShipAddress);
    setTotal(item.Total);
    setShipPayment(item.ShipPayment);
    setListProduct(item.OrderDetails);
  };
  const checkDone = async () => {
    await database()
      .ref('Orders/' + item.OrderID + '/OrderDetails')
      .once('value')
      .then((snapshot) => {
        let temp = 0;
        let total = 0;
        let refund = 0;
        let isOne = 0;
        snapshot.forEach((element) => {
          total += parseInt(element.val().Price, 10) * element.val().Quantity;
          if (element.val().detailStatus === '0') {
            console.log('co cai ko phai: ', element.val().detailStatus);
            temp += 1;
          } else if (element.val().detailStatus === '2') {
            refund +=
              parseInt(element.val().Price, 10) * element.val().Quantity;
          } else {
            isOne += 1;
          }
        });
        console.log('temp: ', temp);
        if (temp === 0 && isOne !== 0) {
          console.log('xong dơn');

          database()
            .ref('Orders/' + item.OrderID)
            .update({Total: total - refund});
        } else if (temp === 0 && isOne === 0) {
          console.log('huy don');
          let apptime = new Date().getTime();
          let hmacInput =
            '553' +
            '|' +
            '2107201626795457314' +
            '|' +
            'huy don hang' +
            '|' +
            apptime;
          const mrefundid = '210720_553_123456';
          let mac = CryptoJS.HmacSHA256(
            hmacInput,
            '9phuAOYhan4urywHTh0ndEXiV3pKHr5Q',
          );
          var order = {
            mrefundid: mrefundid,
            appid: 553,
            zptransid: '2107201626799915320',
            amount: 10000,
            timestamp: apptime,
            mac: mac,
            description: 'huy don hang',
          };
          let formBody = [];
          for (let i in order) {
            var encodedKey = encodeURIComponent(i);
            var encodedValue = encodeURIComponent(order[i]);
            formBody.push(encodedKey + '=' + encodedValue);
          }
          formBody = formBody.join('&');
          fetch('https://sandbox.zalopay.com.vn/v001/tpe/partialrefund', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: formBody,
          })
            .then((response) => response.json())
            .then((res) => {
              if (res) {
                console.log('thong tin hoàn tiền: ', res);
              }
            });
          database()
            .ref('Orders/' + item.OrderID)
            .update({Status: '7', isRefund: true});
        }
      });
  };

  const confirmOrder = async () => {
    await database()
      .ref('Orders/' + item.OrderID + '/OrderDetails')
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((element) => {
          console.log('element: ', element.val().UserID);
          if (element.val().UserID == auth().currentUser.uid) {
            console.log('detail ID', auth().currentUser.uid);
            database()
              .ref(
                'Orders/' +
                  item.OrderID +
                  '/OrderDetails/' +
                  element.val().OrderDetailID,
              )
              .update({
                detailStatus: '1',
              });
          }
        });
      })
      .then(() => checkDone());
    NavigationServices.goBack();
  };
  const huy_Order = async () => {
    await database()
      .ref('Orders/' + item.OrderID + '/OrderDetails')
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((element) => {
          console.log('element: ', element.val().UserID);
          if (element.val().UserID == auth().currentUser.uid) {
            console.log('detail ID', auth().currentUser.uid);
            database()
              .ref(
                'Orders/' +
                  item.OrderID +
                  '/OrderDetails/' +
                  element.val().OrderDetailID,
              )
              .update({
                detailStatus: '2',
              })
              .then(() => checkDone());
          }
        });
      })
      .then(() => checkDone());
    //await checkDone();
    setModalVisibleWarning(true);
    setModalVisible(false);
    setTimeout(() => {
      handleCloseWar();
    }, 2000);
  };
  useEffect(() => {
    getListOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  functionsCounter.add(huy_Order);
  functionsCounter.add(setModalVisible);
  functionsCounter.add(confirmOrder);
  return (
    <ConfimOrderView
      huy_Order={huy_Order}
      setModalVisible={setModalVisible}
      setModal={setModal}
      confirmOrder={confirmOrder}
      OrderID={OrderID}
      CusID={CusID}
      CreatedDate={CreatedDate}
      ShipName={ShipName}
      ShipMoblie={ShipMoblie}
      ShipAddress={ShipAddress}
      Total={Total}
      ShipPayment={ShipPayment}
      ListProduct={ListProduct}
      modalVisible={modalVisible}
      modalVisibleWarning={modalVisibleWarning}
    />
  );
};
export default ConfimOrderContainer;
