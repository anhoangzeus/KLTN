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
  Platform,
  Modal,
} from 'react-native';
import styles from './addProduct.styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from 'components/Header';
import {TextInput} from 'react-native-gesture-handler';
import PopupChooseImage from 'components/PopupChooseImage';
import RNPickerSelect from 'react-native-picker-select';
import NumberFormat from 'components/NumberFormat';
import Loading from 'components/LoadingView';
import Col from 'components/Col';
import {KeyboardAvoidingView} from 'react-native';
const {height, width} = Dimensions.get('screen');

export default function AddProductView(props) {
  const {
    chooseImage,
    chooseImageLibrary,
    chooseImageTake,
    onChangeDes,
    onChangeKeyWord,
    onChangeName,
    setCate,
    setCateName,
    cateName,
    name,
    des,
    keyword,
    dataCate,
    isloading,
    price,
    warranty,
    count,
    sale,
    popup,
    image,
    isUpload,
    setPopup,
    setCount,
    setPrice,
    setSale,
    setWarranty,
    Submit,
    isSuccess,
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.screenContainer2}>
          <View style={styles.screenContainer2}>
            <StatusBar backgroundColor="#2B4F8C" barStyle="light-content" />
            <Header title={'Thêm sản phẩm'} />
            <View style={styles.divider} />

            <ScrollView style={styles.bodyContainer}>
              <TouchableOpacity
                style={styles.userContainer}
                onPress={() => setPopup(true)}>
                <View style={styles.imgView}>
                  <Image source={{uri: image}} style={styles.imgPro} />
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
                  <View style={styles.cardOption} onPress={() => {}}>
                    <View style={styles.itemContainer}>
                      <MaterialCommunityIcons
                        name={'bookmark-outline'}
                        size={26}
                        color={'gold'}
                      />
                      <Text style={styles.itemText}>Giá</Text>

                      <TextInput
                        keyboardType="numeric"
                        placeholderTextColor="#666666"
                        autoCapitalize="none"
                        placeholder="nhập giá."
                        onFocus={() => setPrice('')}
                        onChangeText={(val) => {
                          setPrice(val);
                        }}
                        style={styles.cardText}>
                        <NumberFormat value={price} />
                      </TextInput>
                      <Text style={styles.unit}>Vnđ</Text>
                    </View>
                  </View>
                  <View style={styles.cardOption}>
                    <View style={styles.itemContainer}>
                      <MaterialCommunityIcons
                        name={'shield-half-full'}
                        size={26}
                        color={'green'}
                      />
                      <Text style={styles.itemText}>Bảo hành</Text>

                      <TextInput
                        keyboardType="numeric"
                        placeholderTextColor="#666666"
                        autoCapitalize="none"
                        placeholder="thời gian bảo hành."
                        onFocus={() => setWarranty(null)}
                        onChangeText={(val) => {
                          setWarranty(val);
                        }}
                        style={styles.cardText}>
                        {warranty}
                      </TextInput>
                      <Text style={styles.unit}>tháng</Text>
                    </View>
                  </View>
                  <View style={styles.cardOption} onPress={() => {}}>
                    <View style={styles.itemContainer}>
                      <MaterialCommunityIcons
                        name={'information-variant'}
                        size={26}
                        color={'black'}
                      />
                      <Text style={styles.itemText}>Số lượng</Text>

                      <TextInput
                        keyboardType="numeric"
                        placeholderTextColor="#666666"
                        autoCapitalize="none"
                        placeholder="nhập số lượng"
                        onFocus={() => setCount(null)}
                        onChangeText={(val) => {
                          setCount(val);
                        }}
                        style={styles.cardText}>
                        {count}
                      </TextInput>
                      <Text style={styles.unit}> </Text>
                    </View>
                  </View>
                  <View style={styles.cardOption} onPress={() => {}}>
                    <View style={styles.itemContainer}>
                      <MaterialCommunityIcons
                        name={'sale'}
                        size={26}
                        color={'red'}
                      />
                      <Text style={styles.itemText}>Khuyến Mãi</Text>

                      <TextInput
                        keyboardType="numeric"
                        placeholderTextColor="#666666"
                        autoCapitalize="none"
                        placeholder="thông tin khuyến mãi"
                        onFocus={() => setSale(null)}
                        onChangeText={(val) => {
                          setSale(val);
                        }}
                        style={styles.cardText}>
                        {sale}
                      </TextInput>
                      <Text style={styles.unit}>%</Text>
                    </View>
                  </View>
                  <View style={styles.cardOption} onPress={() => {}}>
                    <View style={styles.itemContainer}>
                      <MaterialCommunityIcons
                        name={'facebook'}
                        size={26}
                        color={'blue'}
                      />
                      <Text style={styles.itemText}>Chia sẻ lên facebook</Text>
                    </View>
                  </View>
                </View>
                {/* </View> */}
              </View>
              <View style={{height: height / 7}} />
            </ScrollView>
            <View style={styles.divider} />

            <View style={styles.divider} />

            <TouchableOpacity style={styles.btnSubmit} onPress={() => Submit()}>
              <Text style={styles.subBtnText}>Đăng bán</Text>
            </TouchableOpacity>
            {isUpload && (
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
            )}
          </View>
          <PopupChooseImage
            onChooseTake={chooseImageTake}
            onChooseLibrary={chooseImageLibrary}
            // onClosePress={() => setChooseImage(false)}
            isVisible={popup}
          />
          <Modal
            animationType="fade"
            transparent={true}
            visible={isSuccess}
            onRequestClose={() => {}}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <FontAwesome5 name="check-double" size={40} color="green" />
                <Text style={styles.modalText1}>thêm sản phẩm thành công</Text>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
