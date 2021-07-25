import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import OrderView from '../order.view';
const functionsCounter = new Set();

const OrderXacNhanContainer = () => {
  const [listOrder, setListOrder] = useState([]);
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const ListenForOrder = () => {
    database()
      .ref('Orders')
      .on('value', (snapshot) => {
        var items = [];
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.val().CustomerID === auth().currentUser.uid) {
            if (childSnapshot.val().Status === '0') {
              var orderDetail = [];
              childSnapshot.child('OrderDetails').forEach((child) => {
                orderDetail.push({
                  Name: child.val().Name,
                  Picture: child.val().Picture,
                  Quantity: child.val().Quantity,
                  Price: child.val().Price,
                });
              });
              items.push({
                CreatedDate: childSnapshot.val().CreatedDate,
                ShipAddress: childSnapshot.val().ShipAddress,
                ShipName: childSnapshot.val().ShipName,
                ShipMoblie: childSnapshot.val().ShipMoblie,
                id: childSnapshot.val().OrderID,
                ToTalPrice: childSnapshot.val().Total,
                orderDetail: orderDetail,
              });
            }
          }
        });
        setListOrder(items);
        setloading(false);
        setRefreshing(false);
      });
  };
  const _onRefresh = () => {
    setRefreshing(true);
    ListenForOrder();
  };
  useEffect(() => {
    ListenForOrder();
  }, []);

  functionsCounter.add(_onRefresh);
  return (
    <OrderView
      _onRefresh={_onRefresh}
      listOrder={listOrder}
      loading={loading}
      refreshing={refreshing}
    />
  );
};
export default OrderXacNhanContainer;
