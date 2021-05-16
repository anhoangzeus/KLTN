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
import PopupChooseImage from 'components/PopupChooseImage';
import RNPickerSelect from 'react-native-picker-select';

import Loading from 'components/LoadingView';
import Col from 'components/Col';
const {height, width} = Dimensions.get('screen');
const ProfileItem = ({icon, name, color, data, isSlect, onChange}) => (
  <View style={styles.itemContainer}>
    <MaterialCommunityIcons name={icon} size={26} color={color} />
    <Text style={styles.itemText}>{name}</Text>

    {/* <FontAwesome
      name="angle-right"
      size={26}
      color="#1e1e1e"
      style={{marginRight: width / 20}}
    /> */}
  </View>
);

export default function AddProductView(props) {
  const {
    chooseImage,
    setChooseImage,
    chooseImageLibrary,
    chooseImageTake,
    onChangeDes,
    onChangeKeyWord,
    onChangeName,
    setCategory,
    setCate,
    setCateName,
    cateName,
    name,
    des,
    keyword,
    cate,
    dataCate,
    isloading,
  } = props;
  if (isloading) {
    return (
      <Col
        center
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <Loading />
      </Col>
    );
  } else {
    return (
      <SafeAreaView style={styles.screenContainer}>
        <View style={styles.screenContainer2}>
          <StatusBar backgroundColor="#2B4F8C" barStyle="light-content" />
          <Header title={'Thêm sản phẩm'} />
          <View style={styles.divider} />

          <ScrollView style={styles.bodyContainer}>
            <TouchableOpacity
              style={styles.userContainer}
              onPress={() => setChooseImage(true)}>
              <View style={styles.imgView}>
                <Image
                  source={require('../../../assets/images/noimage.png')}
                  style={styles.imgPro}
                />
                <Text style={styles.imgText}>Thêm ảnh sản phẩm</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />

            <View style={styles.nameView}>
              <Text style={styles.titletext}>Tên sản phẩm</Text>
              <TextInput
                keyboardType="default"
                placeholderTextColor="#666666"
                autoCapitalize="none"
                onChangeText={(val) => {
                  onChangeName(val);
                }}
                placeholder="nhập tên sản phẩm"
                style={styles.welcomeText}>
                {name}
              </TextInput>
              <Text style={styles.titletext}>Mô tả sản phẩm</Text>
              <TextInput
                keyboardType="default"
                placeholderTextColor="#666666"
                autoCapitalize="none"
                placeholder="mô tả sản phẩm ..."
                onChangeText={(val) => {
                  onChangeDes(val);
                }}
                style={styles.welcomeText}>
                {des}
              </TextInput>
              <Text style={styles.titletext}>Từ khoá tìm kiếm</Text>
              <TextInput
                keyboardType="default"
                placeholderTextColor="#666666"
                autoCapitalize="none"
                placeholder="Từ khoá tìm kiếm ..."
                onChangeText={(val) => {
                  onChangeKeyWord(val);
                }}
                style={styles.welcomeText}>
                {keyword}
              </TextInput>
              {/* <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>Tên không hợp lệ</Text>
                  </Animatable.View> */}
            </View>

            <View style={styles.divider} />
            <View style={styles.userContainer}>
              {/* <View style={styles.cardOption}> */}
              <View style={styles.nameView}>
                <View style={styles.cardOption}>
                  <View style={styles.itemContainer}>
                    <MaterialCommunityIcons
                      name={'format-list-bulleted'}
                      size={26}
                      color={'#2B4F8C'}
                    />
                    <Text style={styles.itemText}>Danh mục</Text>

                    <RNPickerSelect
                      style={styles.picker}
                      onValueChange={(value, index) => {
                        setCate(value);
                        setCateName(dataCate[index - 1].label);
                      }}
                      items={dataCate}>
                      <Text style={styles.selectText}>{cateName}</Text>
                    </RNPickerSelect>

                    <FontAwesome
                      name="angle-right"
                      size={26}
                      color="#1e1e1e"
                      style={{marginRight: width / 20}}
                    />
                  </View>
                </View>
                <TouchableOpacity style={styles.cardOption} onPress={() => {}}>
                  <View style={styles.itemContainer}>
                    <MaterialCommunityIcons
                      name={'bookmark-outline'}
                      size={26}
                      color={'gold'}
                    />
                    <Text style={styles.itemText}>Giá</Text>

                    <TextInput
                      keyboardType="default"
                      placeholderTextColor="#666666"
                      autoCapitalize="none"
                      placeholder="nhập giá."
                      onChangeText={(val) => {
                        onChangeKeyWord(val);
                      }}
                      style={styles.cardText}>
                      {keyword}
                    </TextInput>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardOption} onPress={() => {}}>
                  <ProfileItem
                    icon="shield-half-full"
                    name="Bảo hành"
                    color="green"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardOption} onPress={() => {}}>
                  <ProfileItem
                    icon="information-variant"
                    name="Số lượng"
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardOption} onPress={() => {}}>
                  <ProfileItem icon="sale" name="Khuyến Mãi" color="red" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardOption} onPress={() => {}}>
                  <ProfileItem
                    icon="facebook"
                    name="Chia sẻ lên facebook"
                    color="blue"
                  />
                </TouchableOpacity>
              </View>
              {/* </View> */}
            </View>
            <View style={{height: height / 7}} />
          </ScrollView>
          <View style={styles.divider} />

          <View style={styles.divider} />

          <TouchableOpacity style={styles.btnSubmit}>
            <Text style={styles.subBtnText}>Đăng bán</Text>
          </TouchableOpacity>
        </View>
        <PopupChooseImage
          onChooseTake={chooseImageTake}
          onChooseLibrary={chooseImageLibrary}
          onClosePress={() => setChooseImage(false)}
          isVisible={chooseImage}
        />
      </SafeAreaView>
    );
  }
}
