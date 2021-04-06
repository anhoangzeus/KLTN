import * as React from 'react';
import {
  View,
  Text,
  Alert,
  StatusBar,
  ScrollView,
  TextInput,
  CheckBox,
  Modal,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from './DetailAddress.styles';
import * as Animatable from 'react-native-animatable';
import NavigationServices from 'utils/navigationServices';
import { Picker } from '@react-native-community/picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width } = Dimensions.get('screen');
// import {NAMESPACE} from './DetailAddress.constants';

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
        <StatusBar backgroundColor="#a2459a" barStyle="light-content" />
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.cartContainer}
            onPress={() => {
              NavigationServices.goBack();
            }}>
            <FontAwesome
              name="angle-left"
              size={30}
              color="#fff"
              style={{ marginLeft: width / 40 }}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Cập nhật địa chỉ</Text>
        </View>
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
                    Họ tên
                  </Text>
                  {data.check_textInputFullName ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>Vui lòng kiểm tra lại</Text>
                    </Animatable.View>
                  )}
                </View>
                <TextInput
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  onChangeText={(val) => textInputFullName(val)}
                  style={styles.welcomeText}>
                  {data.ShipName}
                </TextInput>
              </View>
            </View>
            {data.check_textInputFullName ? (
              <View style={styles.divider} />
            ) : (
              // eslint-disable-next-line react-native/no-inline-styles
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
                    Số điện thoại
                  </Text>
                  {data.check_textInputSDT ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>Vui lòng kiểm tra lại</Text>
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
              // eslint-disable-next-line react-native/no-inline-styles
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
                    Địa chỉ
                  </Text>
                  {data.check_textInputaddress ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>Vui lòng kiểm tra lại</Text>
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
              <View style={{ height: 2, backgroundColor: 'red' }} />
            )}
            <View style={styles.divider} />
            <View style={styles.userContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.whiteText}>Tỉnh/Thành phố</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={data.City}
                  mode="dialog"
                  onValueChange={(value) => {
                    setData({ ...data, City: value });
                  }}>
                  {provinceData()}
                </Picker>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.userContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.whiteText}>Quận/Huyện</Text>
                <Picker
                  style={styles.picker1}
                  selectedValue={data.Huyen}
                  mode="dialog"
                  onValueChange={(value) => {
                    setData({ ...data, Huyen: value });
                  }}>
                  {districtData(data.City)}
                </Picker>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.whiteText}>Phường/Xã</Text>
                <Picker
                  style={styles.picker1}
                  selectedValue={data.Xa}
                  mode="dialog"
                  onValueChange={(value) => {
                    setData({ ...data, Xa: value });
                  }}>
                  {wardData(data.City, data.Huyen)}
                </Picker>
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
                  <Text style={styles.greenText}>Địa chỉ mặc định</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => {
              saveChangesHandle();
            }}>
            <Text style={styles.subBtnText}>Lưu địa chỉ</Text>
          </TouchableOpacity>
        </ScrollView>
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
