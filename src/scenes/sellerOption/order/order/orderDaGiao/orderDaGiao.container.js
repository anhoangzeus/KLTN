import React, {useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import OrderView from '../order.view';
const functionsCounter = new Set();

const OrderDaGiaoContainer = () => {
  const [listOrder, setListOrder] = useState([]);
  const [loading, setloading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const ListenForOrder = async () => {
    //setLoading(true);
    await database()
      .ref('Orders')
      .once('value')
      .then((snapshot) => {
        let List = [];
        let order = {};
        snapshot.forEach((childSnapshot) => {
          let temp = 0;
          let count = 0;
          let item = [];
          if (childSnapshot.val().Status === '5') {
            childSnapshot.child('OrderDetails').forEach((element) => {
              if (element.val().UserID === auth().currentUser.uid) {
                item.push(element.val());
                temp++;
                count +=
                  parseInt(element.val().Price, 10) * element.val().Quantity;
              }
            });
            if (temp !== 0) {
              order = {
                OrderID: childSnapshot.val().OrderID,
                Payment: childSnapshot.val().Payment,
                WarehouseId: childSnapshot.val().WarehouseId,
                ShipAddress: childSnapshot.val().ShipAddress,
                ShipLocation: childSnapshot.val().ShipLocation,
                ShipMoblie: childSnapshot.val().ShipMoblie,
                ShipName: childSnapshot.val().ShipName,
                ShipPayment: childSnapshot.val().ShipPayment,
                Total: count,
                TimeLine: childSnapshot.val().TimeLine,
                CreatedDate: childSnapshot.val().CreatedDate,
                OrderDetails: item,
                Status: childSnapshot.val().Status,
              };
              List.push(order);
            }
          }
        });
        //List.push(order);
        console.log('list: ', List);
        setListOrder(List);
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
export default OrderDaGiaoContainer;
