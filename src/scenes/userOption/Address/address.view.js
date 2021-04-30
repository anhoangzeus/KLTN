/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import styles from './address.styles';
import Header from 'components/Header';

export default function AddressView(props) {
  const {
    status,
    listAddress,
    loading,
    modalVisible,
    _deleteAddress,
    setModalVisible,
    set_idCanXoa,
    setIsMain,
  } = props;

  const RenderList = ({
    NumberAddress,
    Xa,
    City,
    Huyen,
    ShipName,
    ShipMoblie,
    id,
    Main,
  }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        NavigationServices.navigate(SCENE_NAMES.DETAIL_ADDRESS, {content: id});
      }}>
      <View style={styles.listContainer}>
        <Text style={styles.address}>
          {NumberAddress}, {Xa}, {Huyen}, {City}
        </Text>
        <Text style={{marginLeft: 10}}>
          {ShipName} - {ShipMoblie}
        </Text>
        <View style={styles.listView}>
          {Main ? (
            <Text style={{marginLeft: 10, color: '#FFCC00'}}>
              Địa chỉ mặc định
            </Text>
          ) : (
            <Text />
          )}
          <View style={{flexDirection: 'row'}}>
            {Main ? null : (
              <TouchableOpacity
                style={styles.btnAdd}
                onPress={() => {
                  setModalVisible(true);
                  set_idCanXoa(id);
                  setIsMain(Main);
                }}>
                <Text style={styles.btnDel}>Xoá địa chỉ</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  const RenderNull = () => {
    return (
      <View style={styles.nullContainer}>
        <Text style={styles.txtAddnew1}>Thêm địa chỉ nhận hàng ngay nào!</Text>
        <TouchableOpacity
          onPress={() => {
            NavigationServices.navigate(SCENE_NAMES.DETAIL_ADDRESS, {
              content: '',
            });
          }}
          style={styles.userContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.txtAddnew}>Thêm địa chỉ mới</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  if (loading) {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="large" color="dodgerblue" />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <StatusBar backgroundColor="#2B4F8C" barStyle="light-content" />
        <Header title={'Thông tin địa chỉ'} />
        {status === false ? (
          <RenderNull />
        ) : (
          <View style={styles.bodyContainer}>
            <ScrollView>
              <FlatList
                pagingEnabled={false}
                data={listAddress}
                renderItem={({item}) => (
                  <RenderList
                    NumberAddress={item.NumberAddress}
                    Xa={item.Xa}
                    City={item.City}
                    Huyen={item.Huyen}
                    ShipName={item.ShipName}
                    ShipMoblie={item.ShipPhone}
                    id={item.ListID}
                    Main={item.Main}
                    key={item.ListID}
                  />
                )}
              />
            </ScrollView>

            <TouchableOpacity
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.DETAIL_ADDRESS, {
                  content: '',
                });
              }}
              style={styles.userContainer}>
              <View>
                <View style={styles.row}>
                  <MaterialIcons
                    name="map-marker-plus"
                    color="green"
                    size={28}
                  />
                  <Text style={styles.titletext}>Thêm địa chỉ mới</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Bạn có chắc xoá địa chỉ này ?
              </Text>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.openButton}
                  onPress={() => {
                    _deleteAddress();
                  }}>
                  <Text style={styles.textStyle}>Xác nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.openButtonLeft}
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <Text style={styles.textStyle}>Giữ lại</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
