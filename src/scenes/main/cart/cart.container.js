import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import CartView from './cart.view';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
const functionsCounter = new Set();

const CartContainer = ({navigation}) => {
  const [CartItem, setCartItem] = useState([]);
  const [Address, setAddress] = useState({});
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasAddress, setHasAddress] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPayment, setmodalPayment] = useState(false);
  // const [refesh, setRefesh] = useState(true);
  const [_idCanXoa, set_idCanXoa] = useState('');

  const handleClosemodalPayment = (visible) => {
    setTimeout(() => setModalVisible(visible), 1000);
    setmodalPayment(false);
  };

  const GetAddress = () => {
    if (auth().currentUser) {
      database()
        .ref('ListAddress')
        .child(auth().currentUser.uid)
        .once('value')
        .then((snapshot) => {
          var item;
          snapshot.forEach(function (childSnapshot) {
            var address = {
              ShipName: '',
              ShipPhone: '',
              NumberAddress: '',
              Xa: '',
              Huyen: '',
              City: '',
              Location: '',
              Id: '',
            };
            if (childSnapshot.val().Main === true) {
              address.ShipName = childSnapshot.val().ShipName;
              address.ShipPhone = childSnapshot.val().ShipPhone;
              address.NumberAddress = childSnapshot.val().NumberAddress;
              address.Xa = childSnapshot.val().Xa;
              address.Huyen = childSnapshot.val().Huyen;
              address.City = childSnapshot.val().City;
              address.Location = childSnapshot.val().Location;
              address.Id = childSnapshot.val().ListID;
              item = address;
            }
          });
          if (item != null) {
            setHasAddress(true);
          }
          setAddress(item);
          setLoading(false);
        });
    } else {
      NavigationServices.navigate(SCENE_NAMES.TopStackLogin);
    }
  };
  const ListenCart = () => {
    if (auth().currentUser) {
      database()
        .ref('Cart/' + auth().currentUser.uid)
        .once('value')
        .then((snapshot) => {
          var items = [];
          var total = 0;
          snapshot.forEach((childSnapshot) => {
            items.push({
              Id: childSnapshot.val().Id,
              Name: childSnapshot.val().Name,
              Picture: childSnapshot.val().Picture,
              Price: childSnapshot.val().Price,
              Quantity: childSnapshot.val().Quantity,
              BrandID: childSnapshot.val().BrandID,
              CategoryID: childSnapshot.val().CategoryID,
            });
            total += Number(
              childSnapshot.val().Price * childSnapshot.val().Quantity,
            );
          });
          setCartItem(items);
          setAmount(total);
        });
    } else {
      setmodalPayment;
    }
  };
  const _checkGioHang = () => {
    if (amount !== 0 && hasAddress === true) {
      NavigationServices.navigate(SCENE_NAMES.PAYMENT_METHOD, {
        content: amount,
        listItem: CartItem,
        address: Address,
      });
    } else {
      handleClosemodalPayment(true);
    }
  };
  const _tangSoLuong = (item) => {
    database()
      .ref('Cart/' + auth().currentUser.uid + '/' + item.Id)
      .update({
        Quantity: item.Quantity + 1,
      });
    CartItem.forEach((element) => {
      if (element.Id === item.Id) {
        element.Quantity = item.Quantity + 1;
      }
    });
    setAmount(Number(amount + Number(item.Price)));
    //setRefesh(!refesh);
  };
  const _giamSoLuong = (item) => {
    if (item.Quantity > 1) {
      database()
        .ref('Cart/' + auth().currentUser.uid + '/' + item.Id)
        .update({
          Quantity: item.Quantity - 1,
        });
      CartItem.forEach((element) => {
        if (element.Id === item.Id) {
          element.Quantity = item.Quantity - 1;
        }
      });
      setAmount(Number(amount - Number(item.Price)));
      //setRefesh(!refesh);
    } else {
      setModalVisible(true);
      set_idCanXoa(item.Id);
    }
  };
  const _xoaGioHang = () => {
    database()
      .ref('Cart/' + auth().currentUser.uid)
      .child(_idCanXoa)
      .remove();
    ListenCart();
    setModalVisible(false);
    //setRefesh(!refesh);
  };
  useEffect(() => {
    ListenCart();
    GetAddress();
  }, []);

  functionsCounter.add(_checkGioHang);
  functionsCounter.add(_tangSoLuong);
  functionsCounter.add(_giamSoLuong);
  functionsCounter.add(_xoaGioHang);
  functionsCounter.add(setAmount);
  functionsCounter.add(set_idCanXoa);
  functionsCounter.add(setModalVisible);
  return (
    <CartView
      navigation={navigation}
      _checkGioHang={_checkGioHang}
      _tangSoLuong={_tangSoLuong}
      _giamSoLuong={_giamSoLuong}
      _xoaGioHang={_xoaGioHang}
      amount={amount}
      modalVisible={modalVisible}
      modalPayment={modalPayment}
      loading={loading}
      //refesh={refesh}
      set_idCanXoa={set_idCanXoa}
      setModalVisible={setModalVisible}
      hasAddress={hasAddress}
      Address={Address}
      CartItem={CartItem}
    />
  );
};
export default CartContainer;
