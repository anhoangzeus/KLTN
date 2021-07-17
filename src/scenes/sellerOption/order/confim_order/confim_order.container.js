import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import NavigationServices, {getParams} from 'utils/navigationServices';
import ConfimOrderView from './confim_order.view';

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
                detailStatus: '2',
              });
          }
        });
      });
    NavigationServices.goBack();
  };
  const huy_Order = () => {
    database()
      .ref('Orders')
      .child(item.OrderID)
      .child('TimeLine')
      .update({
        DaHuy: moment().format('dd--MM-yyyy hh:mm:ss'),
      });
    database()
      .ref('Orders')
      .child(item.OrderID)
      .update({
        Status: 5,
      })
      .then(() => {
        setModalVisibleWarning(true);
        setModalVisible(false);
        setTimeout(() => {
          handleCloseWar();
        }, 2000);
      })
      .catch();
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
