import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SCENE_NAMES from 'constants/sceneName';
import OrderXuli from 'scenes/userOption/order/order/orderXacNhan/orderXacNhan.container';
import Order_LayHangScreen from 'scenes/userOption/order/order/orderLayHang/orderLayHang.container';
import Order_DangVanChuyen from 'scenes/userOption/order/order/orderDangGiao/orderDangGiao.container';
import Order_DaGiao from 'scenes/userOption/order/order/orderDaGiao/orderDaGiao.container';
import Order_DaHuy from 'scenes/userOption/order/order/orderDaHuy/orderDaHuy.container';
import Order_TraHang from 'scenes/userOption/order/order/orderTraHang/orderTraHang.container';
import Header from 'components/Header';

const {width} = Dimensions.get('screen');
const TopStackOrder = createMaterialTopTabNavigator();
const styles = StyleSheet.create({
  containner: {
    flex: 1,
    backgroundColor: '#2B4F8C',
  },
  texthead: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: width / 20,
  },
  headconteiner: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingTop: 15,
    paddingBottom: 5,
  },
  btn: {
    width: 60,
    borderRadius: 10,
  },
});
export default function TopOrder(props) {
  return (
    <View style={styles.containner}>
      <Header title={'Đơn hàng của tôi'} type={true} />
      <TopStackOrder.Navigator
        tabBarOptions={{
          activeTintColor: '#2B4F8C',
          scrollEnabled: true,
        }}>
        <TopStackOrder.Screen
          name={SCENE_NAMES.OrderXuli}
          component={OrderXuli}
          options={{
            title: 'Chờ xác nhận',
          }}
        />
        <TopStackOrder.Screen
          name={SCENE_NAMES.Order_LayHangScreen}
          component={Order_LayHangScreen}
          options={{
            title: 'Chờ lấy hàng',
          }}
        />
        <TopStackOrder.Screen
          name={SCENE_NAMES.Order_DangVanChuyen}
          component={Order_DangVanChuyen}
          options={{
            title: 'Đang vận chuyển',
          }}
        />
        <TopStackOrder.Screen
          name={SCENE_NAMES.Order_DaGiao}
          component={Order_DaGiao}
          options={{
            title: 'Đã giao',
          }}
        />
        <TopStackOrder.Screen
          name={SCENE_NAMES.Order_DaHuy}
          component={Order_DaHuy}
          options={{
            title: 'Đã huỷ',
          }}
        />
        <TopStackOrder.Screen
          name={SCENE_NAMES.Order_TraHang}
          component={Order_TraHang}
          options={{
            title: 'Trả hàng',
          }}
        />
      </TopStackOrder.Navigator>
    </View>
  );
}
