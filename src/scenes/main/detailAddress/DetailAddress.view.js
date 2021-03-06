/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  Text,
  Alert,
  StatusBar,
  ScrollView,
  TextInput,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import styles from './DetailAddress.styles';
import * as Animatable from 'react-native-animatable';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header from 'components/Header';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';

function DetailAddressView(props) {
  const {
    wardData,
    data,
    setData,
    provinceData,
    districtData,
    textInputAddress,
    textInputPhone,
    textInputFullName,
    saveChangesHandle,
    CheckBoxChange,
  } = props;
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer2}>
        <StatusBar backgroundColor="#2B4F8C" barStyle="light-content" />
        <Header title={I18n.t(`${NAMESPACE}.updateaddress`)} />
        <View style={styles.divider} />
        <ScrollView>
          <View style={styles.bodyContainer}>
            <View style={styles.userContainer}>
              <View style={styles.textContainer}>
                <View style={styles.nameView}>
                  <Text
                    style={
                      data.check_textInputFullName
                        ? styles.titletext
                        : styles.errtext
                    }>
                    {I18n.t(`${NAMESPACE}.fullname`)}
                  </Text>
                  {data.check_textInputFullName ? null : (
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
                  multiline
                  onChangeText={(val) => textInputFullName(val)}
                  style={styles.welcomeText}>
                  {data.ShipName}
                </TextInput>
              </View>
            </View>
            {data.check_textInputFullName ? (
              <View style={styles.divider} />
            ) : (
              <View style={{ height: 2, backgroundColor: 'red' }} />
            )}

            <View style={styles.userContainer}>
              <View style={styles.textContainer}>
                <View style={styles.nameView}>
                  <Text
                    style={
                      data.check_textInputSDT
                        ? styles.titletext
                        : styles.errtext
                    }>
                    {I18n.t(`${NAMESPACE}.phone`)}
                  </Text>
                  {data.check_textInputSDT ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>
                        {I18n.t(`${NAMESPACE}.recheck`)}
                      </Text>
                    </Animatable.View>
                  )}
                </View>
                <TextInput
                  keyboardType="numeric"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  onChangeText={(val) => textInputPhone(val)}
                  style={styles.welcomeText}>
                  {data.ShipPhone}
                </TextInput>
              </View>
            </View>
            {data.check_textInputSDT ? (
              <View style={styles.divider} />
            ) : (
              <View style={{ height: 2, backgroundColor: 'red' }} />
            )}
            <View style={styles.userContainer}>
              <View style={styles.textContainer}>
                <View style={styles.nameView}>
                  <Text
                    style={
                      data.check_textInputaddress
                        ? styles.titletext
                        : styles.errtext
                    }>
                    {I18n.t(`${NAMESPACE}.address`)} <Text style={{ fontSize: 12 }}>(S??? nh??/t??n ???????ng)</Text>
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
                  multiline
                  onChangeText={(val) => textInputAddress(val)}
                  style={styles.welcomeText}>
                  {data.NumberAddress}
                </TextInput>
              </View>
            </View>
            {data.check_textInputaddress ? (
              <View style={styles.divider} />
            ) : (
              <View style={{ height: 2, backgroundColor: 'red' }} />
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
                      setData({ ...data, City: value });
                    }}>
                    {provinceData()}
                  </Picker>
                ) : (
                  <RNPickerSelect
                    style={styles.picker}
                    onValueChange={(value) => {
                      setData({ ...data, City: value });
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
                      setData({ ...data, Huyen: value });
                    }}>
                    {districtData(data.City)}
                  </Picker>
                ) : (
                  <RNPickerSelect
                    onValueChange={(value) => {
                      setData({ ...data, Huyen: value });
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
                      setData({ ...data, Xa: value });
                    }}>
                    {wardData(data.City, data.Huyen)}
                  </Picker>
                ) : (
                  <RNPickerSelect
                    onValueChange={(value) => {
                      setData({ ...data, Xa: value });
                    }}
                    items={wardData(data.City, data.Huyen)}
                  />
                )}
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.userContainer}>
              <View style={styles.totalContainer1}>
                <CheckBox
                  value={data.Main}
                  onValueChange={CheckBoxChange}
                  style={styles.marTen}
                />
                <View style={styles.marHori}>
                  <Text style={styles.greenText}>
                    {I18n.t(`${NAMESPACE}.defaulAdd`)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
        </ScrollView>
        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={() => {
            saveChangesHandle();
          }}>
          <Text style={styles.subBtnText}>
            {I18n.t(`${NAMESPACE}.saveAdd`)}
          </Text>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={data.modalVisibleWarning}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FontAwesome5 name="grin-beam-sweat" size={40} color="red" />
              <Text style={styles.modalText1}>{data.textAlert}</Text>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

export default React.memo(DetailAddressView);
