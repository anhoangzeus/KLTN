import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import RatingView from './rating.view';
import moment from 'moment';

const functionsCounter = new Set();

export default function Rating({navigation}) {
  const [ListProduct, setListProduct] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [idvoted, setIdvoted] = useState('');
  const [orderid, setOrderid] = useState('');
  const [orderdetailid, setOrderdetailid] = useState('');
  const [UserProduct, setUserProduct] = useState(false);
  const [textCmt, settextCmt] = useState('Chưa có bình luận...');
  const [refreshing, setRefreshing] = useState(false);
  const [points, setpoints] = useState(3);
  const [loading, setloading] = useState(true);
  const [modalVisibleSuccess, setmodalVisibleSuccess] = useState(false);
  const getRatingPoint = (ProductID, OrderId, OrderDetailsId, userProduct) => {
    setIdvoted(ProductID);
    setOrderid(OrderId);
    setOrderdetailid(OrderDetailsId);
    setUserProduct(userProduct);
  };
  const getListOrder = () => {
    database()
      .ref('Orders')
      .once('value', (snapshot) => {
        var items = [];
        snapshot.forEach((childSnapshot) => {
          if (
            childSnapshot.val().CustomerID === auth().currentUser.uid &&
            childSnapshot.val().Status === '4'
          ) {
            childSnapshot.child('OrderDetails').forEach((child) => {
              if (child.val().Status === false) {
                items.push({
                  id: child.val().OrderDetailID,
                  ProductId: child.val().ProductID,
                  Name: child.val().Name,
                  Picture: child.val().Picture,
                  Price: child.val().Price,
                  CategoryID: child.val().CategoryID,
                  BrandID: child.val().BrandID,
                  OrderID: childSnapshot.val().OrderID,
                  Payment: childSnapshot.val().Payment,
                  CreatedDate: childSnapshot.val().CreatedDate,
                  UserProduct: child.val().UserProduct,
                });
              }
            });
          }
        });
        setListProduct(items);
        setRefreshing(false);
        setloading(false);
      });
  };

  const votedProduct = async () => {
    var date = moment().format('dd--MM-yyyy hh:mm:ss');
    var uid = auth().currentUser.uid;
    var username = '';
    var Avatar = '';
    await database()
      .ref('Users')
      .child(uid)
      .once('value')
      .then((snapshot) => {
        username = snapshot.val().FullName;
        Avatar = snapshot.val().Avatar;
      });
    if (UserProduct === false) {
      database()
        .ref('Products/' + idvoted + '/Rating')
        .child(orderdetailid)
        .update({
          Date: date,
          Point: points,
          UserId: uid,
          Comment: textCmt,
          UserName: username,
          Avatar: Avatar,
        });
    } else {
      database()
        .ref('ProductUser/' + idvoted + '/Rating')
        .child(orderdetailid)
        .update({
          Date: date,
          Point: points,
          UserId: uid,
          Comment: textCmt,
          UserName: username,
          Avatar: Avatar,
        });
    }

    database()
      .ref('Orders/' + orderid + '/OrderDetails/' + orderdetailid)
      .update({
        Status: true,
      })
      .then(setmodalVisibleSuccess(true))
      .then(setModalVisible(false));
  };
  const handleChange = (val) => {
    settextCmt(val);
  };
  const ratingCompleted = (rating) => {
    setpoints(rating);
  };
  useEffect(() => {
    getListOrder();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (modalVisibleSuccess === true) {
        setmodalVisibleSuccess(false);
      }
    }, 2000);
  }, [modalVisibleSuccess]);
  const _onRefresh = () => {
    setRefreshing(true);
    getListOrder();
  };
  functionsCounter.add(_onRefresh);
  functionsCounter.add(handleChange);
  functionsCounter.add(votedProduct);
  functionsCounter.add(ratingCompleted);
  functionsCounter.add(getRatingPoint);
  return (
    <RatingView
      setModalVisible={setModalVisible}
      _onRefresh={_onRefresh}
      handleChange={handleChange}
      votedProduct={votedProduct}
      ratingCompleted={ratingCompleted}
      ListProduct={ListProduct}
      modalVisible={modalVisible}
      refreshing={refreshing}
      loading={loading}
      modalVisibleSuccess={modalVisibleSuccess}
      getRatingPoint={getRatingPoint}
      getListOrder={getListOrder}
    />
  );
}
