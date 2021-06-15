/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  View,
  Text,
  TextInput,
  Modal,
  Platform,
  ScrollView,
} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import * as Animatable from 'react-native-animatable';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import NavigationServices from 'utils/navigationServices';
import Header from 'components/Header';
import styles from './RegisterStore.styles';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';

// import {NAMESPACE} from './RegisterStore.constants';

function RegisterStoreView(props) {
  const {
    step,
    data,
    address,
    name,
    des,
    frontID,
    // backID,
    setVisible,
    setStep,
    setName,
    setDes,
    setData,
    textInputAddress,
    wardData,
    provinceData,
    districtData,
    visible,
    newAdd,
    takeFrontID,
  } = props;
  return (
    <SafeAreaView style={styles.container}>
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
              <Text style={styles.nameText}>Tên SHop</Text>
              <TextInput
                style={styles.nameInput}
                placeholder={'Tên của shop'}
                value={name}
                onChangeText={(value) => setName(value)}
              />
              <Text style={styles.nameText}>Mô tả cửa hàng</Text>
              <TextInput
                placeholder={'Mô tả cửa hàng'}
                style={styles.nameInput}
                value={des}
                onChangeText={(value) => setDes(value)}
              />
              <Text style={styles.nameText}>Địa chỉ</Text>
              <View>
                {address.map((item) => {
                  return (
                    <View style={styles.listItem}>
                      <View style={{flex: 1, margin: 10}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.addresstitle}>
                            {I18n.t(`${NAMESPACE}.address`)}
                          </Text>
                          {/* <TouchableOpacity
                     onPress={() => {
                       NavigationServices.navigate(SCENE_NAMES.DETAIL_ADDRESS, {
                         content: Address.Id,
                       });
                     }}>
                     <Text
                       style={{color: 'green', marginRight: 5, fontSize: 17}}>
                       {I18n.t(`${NAMESPACE}.change`)}
                     </Text>
                   </TouchableOpacity> */}
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
                })}
              </View>
              <TouchableOpacity
                style={styles.btnthem}
                onPress={() => setVisible(true)}>
                <Text style={styles.themAdd}>Thêm địa chỉ</Text>
              </TouchableOpacity>
            </View>
            {name !== '' && des !== '' && address.length > 0 ? (
              <TouchableOpacity style={styles.next} onPress={() => setStep(2)}>
                <Text style={styles.themAdd}>
                  {I18n.t(`${NAMESPACE}.next`)}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
      ) : null}
      {step === 2 ? (
        <View style={styles.resView}>
          <Image
            source={require('../../../assets/images/step2.png')}
            style={styles.stepImg}
          />
          <Text>Chụp CMND/CCCD mặt trước</Text>
          <TouchableOpacity onPress={() => takeFrontID()}>
            <Image source={{uri: frontID}} style={{width: 100, height: 50}} />
          </TouchableOpacity>
          <View style={styles.ChangeStatus}>
            <TouchableOpacity style={styles.pre} onPress={() => setStep(1)} />
            <TouchableOpacity style={styles.next} onPress={() => setStep(3)} />
          </View>
        </View>
      ) : null}
      {step === 3 ? (
        <View style={styles.resView}>
          <Image
            source={require('../../../assets/images/step3.png')}
            style={styles.stepImg}
          />
          <View style={styles.ChangeStatus}>
            <TouchableOpacity style={styles.pre} onPress={() => setStep(2)} />
            <TouchableOpacity style={styles.next} onPress={() => setStep(4)} />
          </View>
        </View>
      ) : null}
      {step === 4 ? (
        <View style={styles.resView}>
          <Image
            source={require('../../../assets/images/step4.png')}
            style={styles.stepImg}
          />
          <View style={styles.ChangeStatus}>
            <TouchableOpacity style={styles.pre} onPress={() => setStep(3)} />
          </View>
        </View>
      ) : null}
      <Modal visible={visible} style={styles.modalView}>
        <View style={styles.ModalContainer}>
          <View style={styles.userContainer}>
            <View style={styles.textContainer}>
              <View style={styles.nameView}>
                <Text
                  style={
                    data.check_textInputaddress
                      ? styles.titletext
                      : styles.errtext
                  }>
                  {I18n.t(`${NAMESPACE}.address`)}
                </Text>
                {data.check_textInputaddress ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>
                      {I18n.t(`${NAMESPACE}.recheck`)}
                    </Text>
                  </Animatable.View>
                )}
              </View>
              <TextInput
                placeholderTextColor="#666666"
                autoCapitalize="none"
                onChangeText={(val) => textInputAddress(val)}
                style={styles.welcomeText}>
                {data.NumberAddress}
              </TextInput>
            </View>
          </View>
          {data.check_textInputaddress ? (
            <View style={styles.divider} />
          ) : (
            // eslint-disable-next-line react-native/no-inline-styles
            <View style={{height: 2, backgroundColor: 'red'}} />
          )}
          <View style={styles.divider} />
          <View style={styles.userContainer}>
            <View style={styles.textContainer}>
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
                <RNPickerSelect
                  style={styles.picker}
                  onValueChange={(value) => {
                    setData({...data, City: value});
                  }}
                  items={provinceData()}
                />
              )}
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.userContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.whiteText}>
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
                <RNPickerSelect
                  onValueChange={(value) => {
                    setData({...data, Huyen: value});
                  }}
                  items={districtData(data.City)}
                  style={styles.picker1}
                />
              )}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.whiteText}>
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
                <RNPickerSelect
                  onValueChange={(value) => {
                    setData({...data, Xa: value});
                  }}
                  items={wardData(data.City, data.Huyen)}
                />
              )}
            </View>
          </View>
          <TouchableOpacity style={styles.btnSubmit} onPress={() => newAdd()}>
            <Text style={styles.themAdd}>
              {' '}
              {I18n.t(`${NAMESPACE}.saveAdd`)}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default React.memo(RegisterStoreView);
