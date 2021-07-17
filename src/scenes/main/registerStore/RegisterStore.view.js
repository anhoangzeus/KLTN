/* eslint-disable react-native/no-inline-styles */
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';
import Col from 'components/Col';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import NavigationServices from 'utils/navigationServices';
import Header from 'components/Header';
import Loading from 'components/LoadingView';
import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import I18n from 'utils/i18n';
import styles from './RegisterStore.styles';
const {width} = Dimensions.get('screen');
const NAMESPACE = 'common';

// import {NAMESPACE} from './RegisterStore.constants';

function RegisterStoreView(props) {
  const {
    step,
    data,
    address,
    visible,
    setVisible,
    name,
    des,
    check,
    frontID,
    backID,
    loading,
    setStep,
    setName,
    setDes,
    setData,
    setCheck,
    textInputAddress,
    wardData,
    provinceData,
    districtData,
    newAdd,
    takeFrontID,
    takeBackID,
    submit,
  } = props;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <StatusBar backgroundColor="#2B4F8C" barStyle="light-content" />
        <Header title={I18n.t(`${NAMESPACE}.registerStore`)} />

        {step === 1 ? (
          <ScrollView>
            <View style={styles.resView}>
              <Image
                source={require('../../../assets/images/step1.png')}
                style={styles.stepImg}
              />
              <View style={styles.infoView}>
                <Text style={styles.nameText}>Tên cửa hàng</Text>
                <TextInput
                  style={styles.nameInput}
                  placeholder={'Nhập tên...'}
                  value={name}
                  onChangeText={(value) => setName(value)}
                />
                <Text style={styles.nameText}>Mô tả cửa hàng</Text>
                <TextInput
                  placeholder={'Nhập mô tả cửa hàng...'}
                  style={styles.nameInput}
                  value={des}
                  onChangeText={(value) => setDes(value)}
                />
                <TouchableOpacity
                  style={styles.btnthem}
                  onPress={() => setVisible(true)}>
                  <Text style={styles.themAdd}>Thêm địa chỉ</Text>
                </TouchableOpacity>
                {address?.length > 0 && (
                  <Text style={styles.nameText}>Danh sách địa chỉ</Text>
                )}
                <FlatList
                  data={address}
                  ListEmptyComponent={
                    <View>
                      <Text style={styles.nameText}>
                        Chưa có địa chỉ cửa hàng !
                      </Text>
                    </View>
                  }
                  renderItem={({item, index}) => {
                    return (
                      <View style={styles.listItem}>
                        <View style={{flex: 1, marginLeft: 5}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text style={styles.addresstitle}>
                              {I18n.t(`${NAMESPACE}.address`)} {index + 1}:
                            </Text>
                          </View>
                          <Text style={styles.address}>
                            {item.NumberAddress}, {item.Xa}, {item.Huyen},{' '}
                            {item.City}
                          </Text>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              marginTop: 10,
                            }}
                          />
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
              {name !== '' && des !== '' && address.length > 0 && (
                <TouchableOpacity
                  style={styles.next}
                  onPress={() => setStep(2)}>
                  <Text style={styles.themAdd}>
                    {I18n.t(`${NAMESPACE}.next`)}
                  </Text>
                </TouchableOpacity>
              )}
              <Modal
                isVisible={visible}
                onBackdropPress={() => setVisible(false)}>
                <View style={styles.ModalContainer}>
                  <Text style={styles.whiteText}>
                    {I18n.t(`${NAMESPACE}.address`)}
                    <Text style={{fontSize: 10}}> (Số nhà/tên đường)</Text>
                  </Text>
                  <TextInput
                    placeholderTextColor="#666666"
                    autoCapitalize="none"
                    placeholder={'Nhập địa chỉ...'}
                    onChangeText={(val) => textInputAddress(val)}
                    style={styles.welcomeText}>
                    {data.NumberAddress}
                  </TextInput>
                  {data.check_textInputaddress ? (
                    <View style={styles.divider} />
                  ) : (
                    <View style={{height: 2, backgroundColor: 'red'}} />
                  )}
                  <View style={styles.divider} />
                  <Text style={styles.whiteText}>
                    {I18n.t(`${NAMESPACE}.city`)}
                  </Text>
                  {Platform.OS === 'android' ? (
                    <Picker
                      style={styles.picker}
                      selectedValue={data.City}
                      mode="dialog"
                      onValueChange={(value) => {
                        setData({...data, City: value});
                      }}>
                      {provinceData()}
                    </Picker>
                  ) : (
                    <View style={styles.pickerView}>
                      <RNPickerSelect
                        style={styles.picker1}
                        onValueChange={(value) => {
                          setData({...data, City: value});
                        }}
                        items={provinceData()}
                      />
                    </View>
                  )}
                  <View style={styles.divider} />
                  <View style={styles.userContainer}>
                    <View>
                      <Text style={{fontSize: 14, color: '#000'}}>
                        {I18n.t(`${NAMESPACE}.district`)}
                      </Text>
                      {Platform.OS === 'android' ? (
                        <Picker
                          style={styles.picker1}
                          selectedValue={data.Huyen}
                          mode="dialog"
                          onValueChange={(value) => {
                            setData({...data, Huyen: value});
                          }}>
                          {districtData(data.City)}
                        </Picker>
                      ) : (
                        <View style={styles.pickerView}>
                          <RNPickerSelect
                            onValueChange={(value) => {
                              setData({...data, Huyen: value});
                            }}
                            items={districtData(data.City)}
                            style={styles.picker1}
                          />
                        </View>
                      )}
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={{fontSize: 14, color: '#000'}}>
                        {I18n.t(`${NAMESPACE}.prov`)}
                      </Text>
                      {Platform.OS === 'android' ? (
                        <Picker
                          style={styles.picker1}
                          selectedValue={data.Xa}
                          mode="dialog"
                          onValueChange={(value) => {
                            setData({...data, Xa: value});
                          }}>
                          {wardData(data.City, data.Huyen)}
                        </Picker>
                      ) : (
                        <View style={styles.pickerView}>
                          <RNPickerSelect
                            onValueChange={(value) => {
                              setData({...data, Xa: value});
                            }}
                            items={wardData(data.City, data.Huyen)}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.btnSubmit}
                    onPress={() => newAdd()}>
                    <Text style={styles.themAdd}>
                      {' '}
                      {I18n.t(`${NAMESPACE}.saveAdd`)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          </ScrollView>
        ) : null}
        {step === 2 && (
          <View style={styles.resView}>
            <Image
              source={require('../../../assets/images/step2.png')}
              style={styles.stepImg}
            />
            <Text style={styles.nameText}>Chụp CMND/CCCD mặt trước</Text>
            <TouchableOpacity onPress={() => takeFrontID()}>
              <Image
                source={{uri: frontID}}
                style={{
                  width: '100%',
                  height: 300,
                  resizeMode: 'contain',
                  marginTop: 10,
                }}
              />
            </TouchableOpacity>
            <View style={styles.ChangeStatus}>
              <TouchableOpacity style={styles.pre} onPress={() => setStep(1)}>
                <Text style={styles.themAdd}>Quay về</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...styles.next, width: width / 2.5}}
                onPress={() => setStep(3)}>
                <Text style={styles.themAdd}>
                  {I18n.t(`${NAMESPACE}.next`)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {step === 3 && (
          <View style={styles.resView}>
            <Image
              source={require('../../../assets/images/step3.png')}
              style={styles.stepImg}
            />
            <Text style={styles.nameText}>Chụp CMND/CCCD mặt sau</Text>
            <TouchableOpacity onPress={() => takeBackID()}>
              <Image
                source={{uri: backID}}
                style={{
                  width: '100%',
                  height: 300,
                  resizeMode: 'contain',
                  marginTop: 10,
                }}
              />
            </TouchableOpacity>
            <View style={styles.ChangeStatus}>
              <TouchableOpacity style={styles.pre} onPress={() => setStep(2)}>
                <Text style={styles.themAdd}>
                  {' '}
                  {I18n.t(`${NAMESPACE}.back`)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...styles.next, width: width / 2.5}}
                onPress={() => setStep(4)}>
                <Text style={styles.themAdd}>
                  {I18n.t(`${NAMESPACE}.next`)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {step === 4 && (
          <View style={styles.resView}>
            <Image
              source={require('../../../assets/images/step4.png')}
              style={styles.stepImg}
            />
            <Image
              source={require('../../../assets/images/logoAn-02.png')}
              style={styles.logoimg}
            />
            <Text styles={styles.legacy}>
              {I18n.t(`${NAMESPACE}.legacy1`)}{' '}
            </Text>
            <Text styles={styles.legacy}>
              {I18n.t(`${NAMESPACE}.legacy2`)}{' '}
            </Text>
            <View style={styles.ChangeStatus}>
              <CheckBox
                value={check}
                onValueChange={(newValue) => setCheck(newValue)}
              />
              <Text>{I18n.t(`${NAMESPACE}.argree`)}</Text>
            </View>
            <View style={styles.ChangeStatus}>
              <TouchableOpacity style={styles.pre} onPress={() => setStep(3)}>
                <Text style={styles.themAdd}>
                  {' '}
                  {I18n.t(`${NAMESPACE}.back`)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...styles.next, width: width / 2.5}}
                onPress={() => submit()}>
                <Text style={styles.themAdd}>
                  {I18n.t(`${NAMESPACE}.submit`)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {loading && (
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
    </SafeAreaView>
  );
}

export default React.memo(RegisterStoreView);
