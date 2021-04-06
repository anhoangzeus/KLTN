/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  View,
  Alert,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import styles from './cart.styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ReactNativeNumberFormat from 'components/NumberFormat/index';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
const { width } = Dimensions.get('screen');

export default function CartView(props) {
  const {
    navigation,
    modalPayment,
    amount,
    CartItem,
    loading,
    refesh,
    modalVisible,
    _giamSoLuong,
    _tangSoLuong,
    _checkGioHang,
    set_idCanXoa,
    setModalVisible,
    hasAddress,
    Address,
    _xoaGioHang,
  } = props;

  const CartItemContainer = ({ item }) => {
    return (
      <View style={styles.itemcard}>
        <View style={styles.cartItem}>
          <TouchableOpacity
            onPress={() => {
              NavigationServices.navigate(SCENE_NAMES.PRODUCT, {
                id: item.id,
                CategoryID: item.CategoryID,
                BrandID: item.BrandID,
              });
            }}>
            <Text style={styles.itemName}>{item.Name} </Text>
          </TouchableOpacity>
          <View>
            <FontAwesome name="angle-right" size={30} />
          </View>
        </View>
        <View style={styles.flexRow}>
          <FontAwesome
            name="gift"
            color="green"
            size={24}
            style={styles.itemGift}
          />
          <Text style={styles.txtReceice}>Nhận một phần quà may mắn</Text>
        </View>
        <View style={styles.itemInfo}>
          <Image style={styles.itemImage} source={{ uri: item.Picture }} />
          <View style={styles.itemDec}>
            <Text style={styles.txtPrice}>
              <ReactNativeNumberFormat value={item.Price} />
            </Text>
            <View style={styles.flexRow}>
              <TouchableOpacity
                style={styles.buttonUpDown}
                onPress={() => {
                  _giamSoLuong(item);
                }}>
                <Text style={styles.btnGiamTang}>-</Text>
              </TouchableOpacity>
              <View style={styles.margin10}>
                <Text style={styles.txtCount}>{item.Quantity}</Text>
              </View>
              <TouchableOpacity
                title="+"
                style={styles.buttonUpDown}
                onPress={() => {
                  _tangSoLuong(item);
                }}>
                <Text style={styles.btnGiamTang}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View style={{ ...styles.modalView, padding: width / 15 }}>
                <Text style={styles.modalText}>
                  Bạn có chắc bỏ sản phẩm này khỏi giỏ hàng?
                </Text>
                <View style={styles.flexRow}>
                  <TouchableOpacity
                    style={styles.openButtonKeep}
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    <Text style={styles.textStyle}>Giữ lại</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.openButtonDelete}
                    onPress={() => {
                      _xoaGioHang();
                    }}>
                    <Text style={styles.textStyle}>Xác nhận</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={styles.btnRemoveItem}
            onPress={() => {
              setModalVisible(true);
              set_idCanXoa(item.Id);
            }}>
            <FontAwesome name="remove" size={30} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="dodgerblue" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#a2459a"
        translucent={false}
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{ width: 75 }}
          onPress={() => NavigationServices.goBack()}>
          <FontAwesome
            name="angle-left"
            size={35}
            color="#fff"
            style={{ marginLeft: width / 40 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Giỏ hàng</Text>
      </View>
      <ScrollView>
        {hasAddress ? (
          <View style={styles.listItem}>
            <View style={{ flex: 1, margin: 10 }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.addresstitle}>Địa chỉ nhận hàng</Text>
                <TouchableOpacity
                  onPress={() => {
                    NavigationServices.navigate(SCENE_NAMES.DETAIL_ADDRESS, { content: Address.Id });
                  }}>
                  <Text style={{ color: 'green', marginRight: 5, fontSize: 17 }}>
                    Thay đổi
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.address}>
                {Address.NumberAddress}, {Address.Xa}, {Address.Huyen},{' '}
                {Address.City}
              </Text>
              <Text style={styles.address}>
                {Address.ShipName} - {Address.ShipPhone}
              </Text>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginTop: 10,
                }}
              />
            </View>
          </View>
        ) : (
          <View style={styles.listItem}>
            <TouchableOpacity
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.DETAIL_ADDRESS, {
                  id: '',
                });
              }}
              style={{ flex: 1, margin: 10, flexDirection: 'row' }}>
              <FontAwesome name="plus" color="green" size={25} />
              <Text style={{ color: 'green', fontSize: 20, marginLeft: 10 }}>
                Thêm địa chỉ nhận hàng
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalPayment}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View
                style={{
                  ...styles.modalView,
                  padding: 35,
                  alignItems: 'center',
                }}>
                <Entypo name="emoji-flirt" size={40} color="#a2459a" />
                <Text style={styles.modalText1}>Mua sắm ngay nào!!!</Text>
              </View>
            </View>
          </Modal>
        </View>
        {amount === 0 ? (
          <View style={styles.imageView}>
            <Image
              source={require('assets/images/logoAn-03.png')}
              style={styles.img}
            />
            <Text style={styles.txtEmpty}>Chưa có sản phẩm nào trong giỏ</Text>
            <TouchableOpacity
              style={styles.btnBackHome}
              onPress={() => navigation.navigate(SCENE_NAMES.MAIN)}>
              <Text style={styles.txtBuy}>Tiếp tục mua sắm</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <FlatList
          data={CartItem}
          renderItem={({ item }) => <CartItemContainer item={item} />}
          extraData={refesh}
          keyExtractor={(item) => item.Id}
        />
      </ScrollView>
      <View style={styles.TotalContainer}>
        <View flexDirection="row" justifyContent="space-between">
          <Text style={styles.txtMoneyTotal}>Thành tiền: </Text>
          <Text color="red" style={styles.txtPromotion}>
            <ReactNativeNumberFormat value={amount} />
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={() => {
            _checkGioHang();
          }}>
          <Text style={styles.txtCreatOrder}>Tiến hành đặt hàng</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer} />
    </SafeAreaView>
  );
}
