import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import NavigationServices, {getParams} from 'utils/navigationServices';
import DetailOrderView from './detail_order.view';

const functionsCounter = new Set();

const DetailOrderContainer = ({navigation, route}) => {
  const {id} = getParams(route);
  console.log('id truyen qua: ', id);
  const [OrderID, setOrderID] = useState('');
  const [CusID, setCusID] = useState('');
  const [CreatedDate, setCreatedDate] = useState('');
  const [Status, setStatus] = useState('');
  const [ShipName, setShipName] = useState('');
  const [ShipMoblie, setShipMoblie] = useState('');
  const [ShipAddress, setShipAddress] = useState('');
  const [Payment, setPayment] = useState('');
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
    database()
      .ref('Orders')
      .child(id)
      .once('value')
      .then((snapshot) => {
        console.log(snapshot.val());
        if (snapshot.val().Status === '0') {
          setStatus('Chờ xác nhận');
        } else if (snapshot.val().Status === '2') {
          setStatus('Chờ lấy hàng');
        } else if (snapshot.val().Status === '3') {
          setStatus('Đang vận chuyển');
        } else if (snapshot.val().Status === '4') {
          setStatus('Đã giao');
        } else if (snapshot.val().Status === '5') {
          setStatus('Đã huỷ');
        } else if (snapshot.val().Status === '6') {
          setStatus('Trả hàng');
        }
        if (snapshot.val().Payment === '01') {
          setPayment('Thanh toán khi nhận hàng');
        } else if (snapshot.val().Payment === '02') {
          setPayment('Thanh toán bằng thẻ tín dụng');
        }
        var item = [];
        snapshot.child('OrderDetails').forEach((child) => {
          var product = {
            ProductName: '',
            ProductImage: 'https://ibb.co/mbtRJGd',
            Brand_Product: '',
            Quantity: '',
            Price: '',
            id: '',
            cate_Name: '',
          };
          product.Price = child.val().Price;
          product.Quantity = child.val().Quantity;
          product.ProductImage = child.val().Picture;
          product.ProductName = child.val().Name;
          product.Brand_Product = child.val().BrandName;
          product.cate_Name = child.val().CategoryName;
          product.id = child.val().OrderDetailID;
          item.push(product);
        });
        setOrderID(snapshot.val().OrderID);
        setCusID(snapshot.val().CustomerID);
        setCreatedDate(snapshot.val().CreatedDate);
        setShipName(snapshot.val().ShipName);
        setShipMoblie(snapshot.val().ShipMoblie);
        setShipAddress(snapshot.val().ShipAddress);
        setTotal(snapshot.val().Total);
        setShipPayment(snapshot.val().ShipPayment);
        setListProduct(item);
      });
  };
  const huy_Order = () => {
    database()
      .ref('Orders')
      .child(id)
      .child('TimeLine')
      .update({
        DaHuy: moment().format('dd--MM-yyyy hh:mm:ss'),
      });
    database()
      .ref('Orders')
      .child(id)
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

  return (
    <DetailOrderView
      huy_Order={huy_Order}
      setModalVisible={setModalVisible}
      setModal={setModal}
      OrderID={OrderID}
      CusID={CusID}
      CreatedDate={CreatedDate}
      Status={Status}
      ShipName={ShipName}
      ShipMoblie={ShipMoblie}
      ShipAddress={ShipAddress}
      Payment={Payment}
      Total={Total}
      ShipPayment={ShipPayment}
      ListProduct={ListProduct}
      modalVisible={modalVisible}
      modalVisibleWarning={modalVisibleWarning}
    />
  );
};
export default DetailOrderContainer;
