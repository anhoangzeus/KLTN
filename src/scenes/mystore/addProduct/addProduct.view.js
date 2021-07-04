/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import Col from 'components/Col';
import Header from 'components/Header';
import Loading from 'components/LoadingView';
import NumberFormat from 'components/NumberFormat';
import PopupChooseImage from 'components/PopupChooseImage';
import * as React from 'react';
import { useRef } from 'react';
import {
  Dimensions, Image, KeyboardAvoidingView, Modal, Platform, SafeAreaView, ScrollView, StatusBar,
  Text,
  TouchableOpacity, View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import RBSheet from 'react-native-raw-bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from 'utils/i18n';
import styles from './addProduct.styles';
const NAMESPACE = 'common';
const { height, width } = Dimensions.get('screen');

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
  const refRBSheet = useRef();
  if (isloading) {
    return (
      <Col
        center
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
            <Header title={I18n.t(`${NAMESPACE}.addproduct`)} />
            <View style={styles.divider} />

            <ScrollView style={styles.bodyContainer}>
              <TouchableOpacity
                style={styles.userContainer}
                onPress={() => refRBSheet.current.open()}>
                <View style={styles.imgView}>
                  {image.map((element) => {
                    return (
                      <Image source={{ uri: element }} style={styles.imgPro} />
                    );
                  })}
                  {/* <Image source={{uri: image}} style={styles.imgPro} /> */}
                  <Text style={styles.imgText}>
                    {I18n.t(`${NAMESPACE}.defaultTitle`)}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={styles.divider} />
              <View style={styles.nameView}>
                <Text style={styles.titletext}>
                  {' '}
                  {I18n.t(`${NAMESPACE}.proname`)}
                </Text>
                <TextInput
                  keyboardType="default"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  multiline
                  onChangeText={(val) => {
                    onChangeName(val);
                  }}
                  placeholder={I18n.t(`${NAMESPACE}.proname`) + '...'}
                  style={styles.welcomeText}>
                  {name}
                </TextInput>
                <Text style={styles.titletext}>
                  {I18n.t(`${NAMESPACE}.prodes`)}
                </Text>
                <TextInput
                  keyboardType="default"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  multiline
                  placeholder={I18n.t(`${NAMESPACE}.prodes`) + '...'}
                  onChangeText={(val) => {
                    onChangeDes(val);
                  }}
                  style={styles.welcomeText}>
                  {des}
                </TextInput>
                <Text style={styles.titletext}>
                  {I18n.t(`${NAMESPACE}.prokey`)}
                </Text>
                <TextInput
                  keyboardType="default"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  multiline
                  placeholder={I18n.t(`${NAMESPACE}.prokey`) + '...'}
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
                      <Text style={styles.itemText}>
                        {' '}
                        {I18n.t(`${NAMESPACE}.category`)}
                      </Text>
                      <RNPickerSelect
                        style={styles.picker}
                        onValueChange={(value, index) => {
                          setCate(value);
                          setCateName(dataCate[index - 1].label);
                        }}
                        items={dataCate}>
                        <Text style={styles.selectText}>{cateName} </Text>
                      </RNPickerSelect>
                      <FontAwesome
                        name="angle-right"
                        size={26}
                        color="#1e1e1e"
                        style={{ marginRight: width / 20 }}
                      />
                    </View>
                  </View>
                  <View style={styles.cardOption} onPress={() => { }}>
                    <View style={styles.itemContainer}>
                      <MaterialCommunityIcons
                        name={'bookmark-outline'}
                        size={26}
                        color={'gold'}
                        style={{ alignSelf: 'flex-end' }}
                      />
                      <Text style={styles.itemText}>
                        {' '}
                        {I18n.t(`${NAMESPACE}.price`)}
                      </Text>
                      <TextInput
                        keyboardType="numeric"
                        placeholderTextColor="#666666"
                        autoCapitalize="none"
                        placeholder={I18n.t(`${NAMESPACE}.price`)}
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
                        color={'green'} style={{ alignSelf: 'flex-end' }}
                      />
                      <Text style={styles.itemText}>
                        {' '}
                        {I18n.t(`${NAMESPACE}.waranty`)}
                      </Text>

                      <TextInput
                        keyboardType="numeric"
                        placeholderTextColor="#666666"
                        autoCapitalize="none"
                        placeholder={I18n.t(`${NAMESPACE}.waranty`)}
                        onFocus={() => setWarranty(null)}
                        onChangeText={(val) => {
                          setWarranty(val);
                        }}
                        style={styles.cardText}>
                        {warranty}
                      </TextInput>
                      <Text style={styles.unit}>
                        {I18n.t(`${NAMESPACE}.month`)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.cardOption} onPress={() => { }}>
                    <View style={styles.itemContainer}>
                      <MaterialCommunityIcons
                        name={'information-variant'}
                        size={26}
                        color={'black'} style={{ alignSelf: 'flex-end' }}
                      />
                      <Text style={styles.itemText}>
                        {I18n.t(`${NAMESPACE}.count`)}
                      </Text>

                      <TextInput
                        keyboardType="numeric"
                        placeholderTextColor="#666666"
                        autoCapitalize="none"
                        placeholder={'Nhập ' + I18n.t(`${NAMESPACE}.count`)}
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
                  <View style={styles.cardOption} onPress={() => { }}>
                    <View style={styles.itemContainer}>
                      <MaterialCommunityIcons
                        name={'sale'}
                        size={26}
                        color={'red'} style={{ alignSelf: 'flex-end' }}
                      />
                      <Text style={styles.itemText}>
                        {I18n.t(`${NAMESPACE}.sale`)}
                      </Text>

                      <TextInput
                        keyboardType="numeric"
                        placeholderTextColor="#666666"
                        autoCapitalize="none"
                        placeholder={I18n.t(`${NAMESPACE}.sale`)}
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
                  {/* <View style={styles.cardOption} onPress={() => {}}>
                    <View style={styles.itemContainer}>
                      <MaterialCommunityIcons
                        name={'facebook'}
                        size={26}
                        color={'blue'}
                      />
                      <Text style={styles.itemText}>Chia sẻ lên facebook</Text>
                    </View>
                  </View> */}
                </View>
                {/* </View> */}
              </View>
              <View style={{ height: height / 7 }} />
            </ScrollView>
            <View style={styles.divider} />

            <View style={styles.divider} />

            <TouchableOpacity style={styles.btnSubmit} onPress={() => Submit()}>
              <Text style={styles.subBtnText}>
                {I18n.t(`${NAMESPACE}.upstore`)}
              </Text>
            </TouchableOpacity>
            {isUpload && (
              <Col
                center
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
          <RBSheet
            ref={refRBSheet}
            height={height / 4}
            openDuration={250}
            customStyles={{
              container: {
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}>
            <PopupChooseImage
              onChooseTake={chooseImageTake}
              onChooseLibrary={chooseImageLibrary}
              onClosePress={() => setPopup(false)}
              isVisible={popup}
            />
          </RBSheet>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isSuccess}
            onRequestClose={() => { }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <FontAwesome5 name="check-double" size={40} color="green" />
                <Text style={styles.modalText1}>
                  {I18n.t(`${NAMESPACE}.addsuccess`)}
                </Text>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
