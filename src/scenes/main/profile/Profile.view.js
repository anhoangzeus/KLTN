/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, Text, StatusBar, TouchableOpacity } from 'react-native';
import styles from './Profile.styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ProfileView(props) {
  const ProfileItem = ({ icon, name }) => (
    <View style={styles.itemContainer}>
      <MaterialCommunityIcons name={icon} size={26} color="#1e1e1e" />
      <Text style={[styles.itemText, { marginLeft: icon ? 20 : 0 }]}>{name}</Text>
      <FontAwesome name="angle-right" size={15} color="#1e1e1e" />
    </View>
  );
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={styles.backgroundColor} barStyle="light-content" />
      <View style={styles.headerContainer}>
        <View style={styles.cartContainer}>
          <View style={styles.cartIcon} />
        </View>
        <Text style={styles.headerText}>Cá nhân</Text>
        <TouchableOpacity style={styles.cartContainer} onPress={() => { }}>
          <FontAwesome name="shopping-cart" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <TouchableOpacity style={styles.userContainer} onPress={() => { }}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={26} color="#fff" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Chào mừng bạn đến với TiAn</Text>
            <Text style={styles.authText}>Đăng nhập/Đăng ký</Text>
          </View>
          <FontAwesome name="angle-right" size={26} color="#a2459a" />
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity onPress={() => { }}>
          <ProfileItem icon="format-list-bulleted" name="Quản lý đơn hàng" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }}>
          <ProfileItem icon="cart-outline" name="Sản phẩm đã mua" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }}>
          <ProfileItem icon="eye-outline" name="Sản phẩm đã xem" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }}>
          <ProfileItem icon="heart-outline" name="Sản phẩm yêu thích" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }}>
          <ProfileItem icon="bookmark-outline" name="Sản phẩm mua sau" />
        </TouchableOpacity>
        <View style={styles.divider} />
        <ProfileItem name="Ưu đãi cho chủ thẻ ngân hàng" />
        <ProfileItem name="Cài đặt" />
        <View style={styles.divider} />
        <ProfileItem icon="headphones" name="Hỗ trợ" />
      </View>
    </View>
  );
}
