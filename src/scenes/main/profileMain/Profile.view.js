/* eslint-disable react-native/no-inline-styles */
import auth from '@react-native-firebase/auth';
import Header from 'components/Header';
import OrderStatus from 'components/Order';
import SCENE_NAMES from 'constants/sceneName';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationServices from 'utils/navigationServices';
import styles from './Profile.styles';
import I18n from 'utils/i18n';
import Popup1Button from 'components/Popup1Button';
import {Linking} from 'react-native';
const NAMESPACE = 'common';
const ProfileItem = ({icon, name}) => (
  <View style={styles.itemContainer}>
    <MaterialCommunityIcons name={icon} size={26} color="#1e1e1e" />
    <Text style={[styles.itemText, {marginLeft: icon ? 20 : 0}]}>{name}</Text>
    <FontAwesome name="angle-right" size={15} color="#1e1e1e" />
  </View>
);
const Storetab = ({merchant, fullname, Avatar}) => {
  if (merchant === 1) {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationServices.navigate(SCENE_NAMES.REGISTER_STORE, {
            FullName: fullname,
            Avatar: Avatar,
          });
        }}>
        <ProfileItem
          icon="storefront"
          name={I18n.t(`${NAMESPACE}.registerStore`)}
        />
      </TouchableOpacity>
    );
  } else if (merchant === 2) {
    return (
      <TouchableOpacity
        onPress={() => {
          NavigationServices.navigate(SCENE_NAMES.MyStoreOptionContainer, {
            FullName: fullname,
            Avatar: Avatar,
          });
        }}>
        <ProfileItem icon="storefront" name={I18n.t(`${NAMESPACE}.mystore`)} />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity>
        <ProfileItem
          icon="storefront"
          name={I18n.t(`${NAMESPACE}.blockstore`)}
        />
      </TouchableOpacity>
    );
  }
};
const ProfileMainView = (props) => {
  const {Avatar, FullName, Email, CreatedDate, Merchant} = props;
  const [isVisible, setisVisible] = useState(false);
  console.log('merchant: ', Merchant);
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <Header title={I18n.t(`${NAMESPACE}.profile`)} isCart={true} />
        <ScrollView>
          <View style={styles.bodyContainer}>
            <TouchableOpacity
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.InfoUser);
              }}>
              <View style={styles.userContainer}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={{uri: Avatar}}
                    size={80}
                    style={styles.imgAvatar}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.welcomeText}>{FullName}</Text>
                  <Text style={styles.authText}>{Email}</Text>
                  <Text style={styles.authText}>
                    {I18n.t(`${NAMESPACE}.menberfrom`)} {CreatedDate}
                  </Text>
                </View>
                <FontAwesome name="angle-right" size={26} color="#2B4F8C" />
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
            <Storetab merchant={Merchant} fullname={FullName} Avatar={Avatar} />

            <View style={styles.divider} />
            <View style={styles.divider} />
            <TouchableOpacity
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.TopRatingScreen);
              }}>
              <ProfileItem
                icon="star-outline"
                name={I18n.t(`${NAMESPACE}.productReview`)}
              />
            </TouchableOpacity>
            <OrderStatus />
            <View style={styles.divider} />
            <TouchableOpacity
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.TopStackOrder);
              }}>
              <ProfileItem
                icon="format-list-bulleted"
                name={I18n.t(`${NAMESPACE}.orderManager`)}
              />
            </TouchableOpacity>
            <View style={styles.divider1} />
            <TouchableOpacity
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.TopStackOrder, {
                  screen: SCENE_NAMES.OrderXuli,
                });
              }}>
              <ProfileItem name={I18n.t(`${NAMESPACE}.orderwait`)} />
            </TouchableOpacity>
            <View style={styles.divider1} />
            <TouchableOpacity
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.TopStackOrder, {
                  screen: SCENE_NAMES.Order_LayHangScreen,
                });
              }}>
              <ProfileItem name={I18n.t(`${NAMESPACE}.orderwaitpickup`)} />
            </TouchableOpacity>
            <View style={styles.divider1} />
            <TouchableOpacity
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.TopStackOrder, {
                  screen: SCENE_NAMES.Order_DangVanChuyen,
                });
              }}>
              <ProfileItem name={I18n.t(`${NAMESPACE}.orderdelivery`)} />
            </TouchableOpacity>
            <View style={styles.divider1} />
            <TouchableOpacity
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.TopStackOrder, {
                  screen: SCENE_NAMES.Order_DaGiao,
                });
              }}>
              <ProfileItem name={I18n.t(`${NAMESPACE}.ordersuccess`)} />
            </TouchableOpacity>
            <View style={styles.divider1} />
            <TouchableOpacity
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.TopStackOrder, {
                  screen: SCENE_NAMES.Order_DaHuy,
                });
              }}>
              <ProfileItem name={I18n.t(`${NAMESPACE}.ordercancel`)} />
            </TouchableOpacity>
            <View style={styles.divider1} />
            <TouchableOpacity
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.TopStackOrder, {
                  screen: SCENE_NAMES.Order_TraHang,
                });
              }}>
              <ProfileItem name={I18n.t(`${NAMESPACE}.orderreturn`)} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.AddRessScreen);
              }}>
              <ProfileItem
                icon="map-marker-outline"
                name={I18n.t(`${NAMESPACE}.address`)}
              />
            </TouchableOpacity>
            <View style={styles.divider1} />
            <View style={styles.divider1} />
            <TouchableOpacity>
              <ProfileItem name={I18n.t(`${NAMESPACE}.setting`)} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={() => setisVisible(true)}>
              <ProfileItem
                icon="shield-check"
                name={I18n.t(`${NAMESPACE}.suport`)}
              />
            </TouchableOpacity>
            <View style={styles.divider} />
            <View style={styles.divider} />
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                auth().signOut();
                NavigationServices.replace(SCENE_NAMES.MAIN, {
                  name: SCENE_NAMES.HOME,
                });
              }}>
              <Text style={styles.textSign}>
                {I18n.t(`${NAMESPACE}.logout`)}
              </Text>
            </TouchableOpacity>
            <View style={styles.divider} />
          </View>
        </ScrollView>
        <Popup1Button
          isVisible={isVisible}
          onClosePress={() => setisVisible(false)}
          title={'T???ng ????i tr??? gi??p kh??ch h??ng'}
          onConfirm={() => Linking.openURL('tel:0353830738')}
          content={
            'B???n s??? k???t n???i v???i nh??n vi??n ????? ???????c h??? tr???. Nh???n X??c nh???n ????? ti???p t???c'
          }
        />
      </View>
    </SafeAreaView>
  );
};
export default ProfileMainView;
