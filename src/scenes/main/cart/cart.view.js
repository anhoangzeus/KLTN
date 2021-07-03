/* eslint-disable react-native/no-inline-styles */
import Header from 'components/Header';
import ReactNativeNumberFormat from 'components/NumberFormat/index';
import SCENE_NAMES from 'constants/sceneName';
import * as React from 'react';
import {
  ActivityIndicator, Alert, Dimensions, FlatList, Image, Modal, SafeAreaView, ScrollView,
  StatusBar, Text, TouchableOpacity, View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import I18n from 'utils/i18n';
import NavigationServices from 'utils/navigationServices';
import styles from './cart.styles';
const NAMESPACE = 'common';
//import {NAMESPACE} from '../detailAddress/DetailAddress.constants';
const { width } = Dimensions.get('screen');

export default function CartView(props) {
  const {
    navigation,
    modalPayment,
    amount,
    CartItem,
    loading,
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
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={{ ...styles.modalView, padding: width / 15 }}>
                <Text style={styles.modalText}>
                  {I18n.t(`${NAMESPACE}.confirmdeletecart`)}
                </Text>
                <View style={styles.flexRow}>
                  <TouchableOpacity
                    style={styles.openButtonKeep}
                    onPress={() => {
                      setModalVisible(false);
                    }}>
                    <Text style={styles.textStyle}>
                      {I18n.t(`${NAMESPACE}.keep`)}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.openButtonDelete}
                    onPress={() => {
                      _xoaGioHang();
                    }}>
                    <Text style={styles.textStyle}>
                      {I18n.t(`${NAMESPACE}.confirm`)}
                    </Text>
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
            <FontAwesome name="remove" size={30} color="#2B4F8C" />
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
    <SafeAreaView style={styles.screenContainersafe}>
      <View style={styles.screenContainer}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#2B4F8C"
          translucent={false}
        />
        <Header title={I18n.t(`${NAMESPACE}.cart`)} />
        <ScrollView>
          {hasAddress ? (
            <View style={styles.listItem}>
              <View style={{ flex: 1, margin: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.addresstitle}>
                    {I18n.t(`${NAMESPACE}.addressdelivery`)}
                  </Text>
                  <TouchableOpacity
                    style={styles.btnChange}
                    onPress={() => {
                      NavigationServices.navigate(SCENE_NAMES.AddRessScreen);
                    }}>
                    <Text
                      style={{ color: 'white', marginRight: 5, fontSize: 17 }}>
                      {I18n.t(`${NAMESPACE}.change`)}
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
                  NavigationServices.navigate(SCENE_NAMES.AddRessScreen, {
                    id: '',
                  });
                }}
                style={{ flex: 1, margin: 10, flexDirection: 'row' }}>
                <FontAwesome name="plus" color="green" size={25} />
                <Text style={{ color: 'green', fontSize: 20, marginLeft: 10 }}>
                  {I18n.t(`${NAMESPACE}.addAddress`)}
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
                  <Entypo name="emoji-flirt" size={40} color="#2B4F8C" />
                  <Text style={styles.modalText1}>
                    {I18n.t(`${NAMESPACE}.shopping`)}
                  </Text>
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
              <Text style={styles.txtEmpty}>
                {I18n.t(`${NAMESPACE}.cartnull`)}
              </Text>
              <TouchableOpacity
                style={styles.btnBackHome}
                onPress={() => navigation.navigate(SCENE_NAMES.MAIN)}>
                <Text style={styles.txtBuy}>
                  {I18n.t(`${NAMESPACE}.continueshopping`)}
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
          <FlatList
            data={CartItem}
            renderItem={({ item }) => <CartItemContainer item={item} />}
            //extraData={refesh}
            keyExtractor={(item) => item.Id}
          />
        </ScrollView>
        <View style={styles.TotalContainer}>
          <View flexDirection="row" justifyContent="space-between">
            <Text style={styles.txtMoneyTotal}>
              {I18n.t(`${NAMESPACE}.total`)}:{' '}
            </Text>
            <Text color="red" style={styles.txtPromotion}>
              <ReactNativeNumberFormat value={amount} />
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => {
              _checkGioHang();
            }}>
            <Text style={styles.txtCreatOrder}>
              {I18n.t(`${NAMESPACE}.purchase`)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
