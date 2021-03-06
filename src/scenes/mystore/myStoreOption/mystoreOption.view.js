/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Linking,
} from 'react-native';
import styles from './myStoreOption.styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from 'components/Header';
import I18n from 'utils/i18n';
import Popup1Button from 'components/Popup1Button';
const NAMESPACE = 'common';
const ProfileItem = ({icon, name}) => (
  <View style={styles.itemContainer}>
    <MaterialCommunityIcons name={icon} size={26} color="#585858" />
    <Text style={[styles.itemText, {marginLeft: icon ? 20 : 0}]}>{name}</Text>
    <FontAwesome name="angle-right" size={15} color="#1e1e1e" />
  </View>
);
export default function MyStoreOptionView(props) {
  const {FullName, Avatar} = props;
  const [isVisible, setisVisible] = useState(false);
  return (
    <SafeAreaView style={styles.SafeSreen}>
      <ScrollView style={styles.screenContainer}>
        <StatusBar backgroundColor="#2B4F8C" barStyle="light-content" />
        <Header title={I18n.t(`${NAMESPACE}.manasell`)} />
        <View style={styles.bodyContainer}>
          <TouchableOpacity
            onPress={() => {
              NavigationServices.navigate(SCENE_NAMES.InfoUser);
            }}
            style={styles.avatarContainer}>
            <Image source={{uri: Avatar}} size={80} style={styles.img} />
            <Text>{FullName}</Text>
          </TouchableOpacity>
          <View style={styles.divider} />

          <View style={styles.divider1} />
          <TouchableOpacity
            onPress={() => {
              NavigationServices.navigate(SCENE_NAMES.STORE_PRODUCT, {
                FullName: FullName,
                Avatar: Avatar,
              });
            }}>
            <ProfileItem
              icon="eye-outline"
              name={I18n.t(`${NAMESPACE}.myproduce`)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              NavigationServices.navigate(SCENE_NAMES.AddProductContainer, {
                FullName: FullName,
                Avatar: Avatar,
              });
            }}>
            <ProfileItem
              icon="plus-circle"
              name={I18n.t(`${NAMESPACE}.addproduct`)}
            />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            onPress={() => {
              NavigationServices.navigate(SCENE_NAMES.STATISTIC);
            }}>
            <ProfileItem
              icon="heart-outline"
              name={I18n.t(`${NAMESPACE}.revenue`)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              NavigationServices.navigate(SCENE_NAMES.SELLER_ORDER);
            }}>
            <ProfileItem
              icon="format-list-bulleted"
              name={I18n.t(`${NAMESPACE}.order`)}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => {}}>
            <ProfileItem
              icon="bookmark-outline"
              name={I18n.t(`${NAMESPACE}.review`)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <ProfileItem
              icon="star"
              name={I18n.t(`${NAMESPACE}.productReview`)}
            />
          </TouchableOpacity> */}
          <View style={styles.divider} />
          <TouchableOpacity onPress={() => setisVisible(true)}>
            <ProfileItem
              icon="shield-check"
              name={I18n.t(`${NAMESPACE}.suport`)}
            />
          </TouchableOpacity>
        </View>
        <Popup1Button
          isVisible={isVisible}
          onClosePress={() => setisVisible(false)}
          title={'T???ng ????i tr??? gi??p kh??ch h??ng'}
          onConfirm={() => Linking.openURL('tel:0353830738')}
          content={
            'B???n s??? k???t n???i v???i nh??n vi??n ????? ???????c h??? tr???. Nh???n X??c nh???n ????? ti???p t???c'
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
}
