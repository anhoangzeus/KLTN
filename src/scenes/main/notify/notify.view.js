import auth from '@react-native-firebase/auth';
import Header from 'components/Header';
import { COLOR_BLACK, COLOR_BLUEAIR } from 'constants/colors';
import SCENE_NAMES from 'constants/sceneName';
import * as React from 'react';
import {
  ActivityIndicator, FlatList,
  RefreshControl,
  SafeAreaView, Text,
  TouchableOpacity, View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationServices from 'utils/navigationServices';
import styles from './notify.styles';
const renderTrangThai = (Status) => {
  if (Status === '1') {
    return (
      <View>
        <Text style={styles.textSuccess}>Đơn hàng đang chờ xác nhận</Text>
      </View>
    );
  } else if (Status === '2') {
    return (
      <View>
        <Text style={styles.textSuccess}>Đơn hàng đang chờ lấy hàng</Text>
      </View>
    );
  } else if (Status === '3') {
    return (
      <View>
        <Text style={styles.textSuccess}>Đơn hàng đang giao hàng</Text>
      </View>
    );
  } else if (Status === '4') {
    return (
      <View>
        <Text style={styles.textSuccess}>
          Đơn hàng đã giao thành công.
          <Text style={styles.textSuccess}>
            {' '}
            Đánh giá để nhận thêm xu.
          </Text>
        </Text>
      </View>
    );
  } else if (Status === '5') {
    return (
      <View>
        <Text style={styles.textSuccess}>Đơn hàng đã bị huỷ</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.textSuccess}>Đơn hàng bị trả</Text>
      </View>
    );
  }
};
const OrderItem = ({ item, props }) => {
  return (
    <View style={styles.jContent}>
      <View style={styles.itemsContainer}>
        <TouchableOpacity
          onPress={() => {
            item.Status === '4'
              ? NavigationServices.navigate(SCENE_NAMES.TopRatingScreen)
              : NavigationServices.navigate(SCENE_NAMES.DetailOrderContainer, {
                id: item.OrderID,
              });
          }}
          style={styles.orderWidth}>
          <Text style={{ color: COLOR_BLUEAIR }}>Mã đơn hàng {item.OrderID}</Text>
          <Text style={{ color: COLOR_BLACK }}>
            {item.payment === '01'
              ? 'Thanh toán khi nhận hàng'
              : 'Đã thanh toán trực tuyến'}
          </Text>
          {renderTrangThai(item.Status)}
          <Text style={{ color: COLOR_BLACK }}>
            <MaterialCommunityIcons name="clock" size={13} /> {item.CreatedDate}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default function NotifyView(props) {
  const NotificationItem = ({ item }) => {
    const { setStateNotigication, navigation } = props;
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setStateNotigication(item.Id);
          navigation.navigate(SCENE_NAMES.Route_Contents, { id: item.Url });
        }}>
        <View style={styles.itemTopContainer}>
          <View
            style={[
              styles.itemTypeContainer,
              {
                backgroundColor:
                  item.Type === '1' ? COLOR_BLUEAIR : COLOR_BLACK,
              },
            ]}>
            <MaterialCommunityIcons
              name={item.Type === '1' ? 'sale' : 'backup-restore'}
              color="#fff"
              size={22}
            />
          </View>
          <View style={styles.itemTopTextContainer}>
            <Text style={styles.itemName}>{item.Title}</Text>
            <View style={styles.flexTitle}>
              <Text style={styles.itemDate}>{item.CreatedDate}</Text>
              {item.isShow === false &&
                <View style={styles.showdone}>
                  <Text style={styles.shownew}>New</Text>
                </View>
              }
            </View>
          </View>
          <View />
        </View>
        <View>
          <Text style={styles.itemDetail}>{item.Details}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const {
    listThongBao,
    loading,
    ischoose,
    listOrder,
    redPoint1,
    redPoint2,
    redPoint3,
    setIschoose,
    getlistOrder,
    _onRefresh,
    refreshing,
  } = props;
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        {/* <StatusBar barStyle="light-content" /> */}
        <Header title="Thông báo" isCart={true} />
        <View style={styles.bodyContainer}>
          <View>
            <TouchableOpacity
              onPress={() => setIschoose(1)}
              style={
                ischoose === 1
                  ? styles.buttonActiveContainer
                  : styles.buttonInactiveContainer
              }>
              {ischoose === 1 ? <View style={styles.activeMark} /> : null}
              {ischoose === 1 ? null : redPoint3 ? (
                <View style={styles.redPoint} />
              ) : null}
              <MaterialCommunityIcons
                name="home"
                color={ischoose === 1 ? '#2B4F8C' : '#949494'}
                size={25}
                style={ischoose === 1 ? styles.activeIcon : null}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIschoose(2)}
              style={
                ischoose === 2
                  ? styles.buttonActiveContainer
                  : styles.buttonInactiveContainer
              }>
              {ischoose === 2 ? <View style={styles.activeMark} /> : null}
              {ischoose === 2 ? null : redPoint2 ? (
                <View style={styles.redPoint} />
              ) : null}
              <MaterialCommunityIcons
                name="backup-restore"
                color={ischoose === 2 ? '#2B4F8C' : '#949494'}
                size={25}
                style={ischoose === 2 ? styles.activeIcon : null}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIschoose(3)}
              style={
                ischoose === 3
                  ? styles.buttonActiveContainer
                  : styles.buttonInactiveContainer
              }>
              {ischoose === 3 ? <View style={styles.activeMark} /> : null}
              {ischoose === 3 ? null : redPoint1 ? (
                <View style={styles.redPoint} />
              ) : null}
              <MaterialCommunityIcons
                name="sale"
                color={ischoose === 3 ? '#2B4F8C' : '#949494'}
                size={25}
                style={ischoose === 3 ? styles.activeIcon : null}
              />
            </TouchableOpacity>
            {auth().currentUser ? (
              <TouchableOpacity
                onPress={() => {
                  getlistOrder(); setIschoose(4);
                }}
                style={
                  ischoose === 4
                    ? styles.buttonActiveContainer
                    : styles.buttonInactiveContainer
                }>
                {ischoose === 4 ? <View style={styles.activeMark} /> : null}
                {ischoose === 4 ? null : <View style={styles.redPoint} />}
                <MaterialCommunityIcons
                  name="clipboard-text-outline"
                  color={ischoose === 4 ? '#2B4F8C' : '#949494'}
                  size={25}
                  style={ischoose === 4 ? styles.activeIcon : null}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          {loading ? (
            <View style={styles.listIndiContainer}>
              <ActivityIndicator
                size="large"
                color="'#2B4F8C"
                style={styles.indicatorView}
              />
            </View>
          ) : ischoose === 4 ? (
            <View style={styles.listContainer}>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={_onRefresh}
                  />
                }
                data={listOrder}
                renderItem={({ item }) => <OrderItem item={item} props={props} />}
                keyExtractor={(item) => item.Id}
              />
            </View>
          ) : (
            <View style={styles.listContainer}>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={_onRefresh}
                  />
                }
                data={listThongBao}
                renderItem={({ item }) => <NotificationItem item={item} />}
                keyExtractor={(item, index) => index}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
