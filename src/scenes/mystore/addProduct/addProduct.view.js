/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import styles from './addProduct.styles';
import withLoading from 'components/HOC/withLoading';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from 'components/Header';
import {TextInput} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('screen');
const ProfileItem = ({icon, name}) => (
  <View style={styles.itemContainer}>
    <MaterialCommunityIcons name={icon} size={26} color="#1e1e1e" />
    <Text style={[styles.itemText, {marginLeft: icon ? width / 15 : 0}]}>
      {name}
    </Text>
  </View>
);

export default function AddProductView(props) {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer2}>
        <StatusBar backgroundColor="#2B4F8C" barStyle="light-content" />
        <Header title={'Thêm sản phẩm'} />
        <View style={styles.divider} />

        <ScrollView style={styles.bodyContainer}>
          <TouchableOpacity style={styles.userContainer}>
            <View style={styles.imgView}>
              <Image
                source={require('../../../assets/images/noimage.png')}
                style={styles.imgPro}
              />
              <Text style={styles.imgText}>Thêm ảnh sản phẩm</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
          <View style={styles.userContainer}>
            <View style={styles.textContainer}>
              <View style={styles.nameView}>
                <Text style={styles.titletext}>Tên sản phẩm</Text>
                <TextInput
                  keyboardType="default"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  placeholder="nhập tên sản phẩm"
                  style={styles.welcomeText}></TextInput>
                <Text style={styles.titletext}>Mô tả sản phẩm</Text>
                <TextInput
                  keyboardType="default"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  placeholder="mô tả sản phẩm ..."
                  style={styles.welcomeText}></TextInput>
                {/* <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Tên không hợp lệ</Text>
                  </Animatable.View> */}
              </View>
            </View>
          </View>
          <View style={styles.divider} />

          <TouchableOpacity style={styles.cardOption} onPress={() => {}}>
            <ProfileItem icon="heart-outline" name="Danh mục" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardOption} onPress={() => {}}>
            <ProfileItem icon="bookmark-outline" name="Giá" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardOption} onPress={() => {}}>
            <ProfileItem icon="star" name="Vận chuyển" />
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.divider} />

        <View style={styles.divider} />

        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.subBtnText}>Đăng bán</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
