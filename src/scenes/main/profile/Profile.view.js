/* eslint-disable react-native/no-inline-styles */
import Header from 'components/Header';
import SCENE_NAMES from 'constants/sceneName';
import * as React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './Profile.styles';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
export default function ProfileView(props) {
  const ProfileItem = ({icon, name}) => (
    <View style={styles.itemContainer}>
      <MaterialCommunityIcons name={icon} size={26} color="#1e1e1e" />
      <Text style={[styles.itemText, {marginLeft: icon ? 20 : 0}]}>{name}</Text>
      <FontAwesome name="angle-right" size={15} color="#1e1e1e" />
    </View>
  );
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <Header title="Cá nhân" isCart={true} />
        <View style={styles.bodyContainer}>
          <TouchableOpacity
            style={styles.userContainer}
            onPress={() => {
              navigation.navigate(SCENE_NAMES.TopStackLogin);
            }}>
            <View style={styles.avatarContainer}>
              <MaterialIcons name="person" size={26} color="#fff" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.welcomeText}>
                {' '}
                {I18n.t(`${NAMESPACE}.welcome`)}
              </Text>
              <Text style={styles.authText}>
                {' '}
                {I18n.t(`${NAMESPACE}.inup`)}
              </Text>
            </View>
            <FontAwesome name="angle-right" size={26} color="#2B4F8C" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={() => {}}>
            <ProfileItem
              icon="format-list-bulleted"
              name={I18n.t(`${NAMESPACE}.orderManager`)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <ProfileItem
              icon="cart-outline"
              name={I18n.t(`${NAMESPACE}.buyedPro`)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <ProfileItem icon="eye-outline" name="Sản phẩm đã xem" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <ProfileItem icon="heart-outline" name="Sản phẩm yêu thích" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <ProfileItem icon="bookmark-outline" name="Sản phẩm mua sau" />
          </TouchableOpacity>
          <View style={styles.divider} />
          <ProfileItem name={I18n.t(`${NAMESPACE}.setting`)} />
          <View style={styles.divider} />
          <ProfileItem icon="headphones" name={I18n.t(`${NAMESPACE}.suport`)} />
        </View>
      </View>
    </SafeAreaView>
  );
}
