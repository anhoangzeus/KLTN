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
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import * as Animatable from 'react-native-animatable';
import styles from './infoUser.styles';
import NavigationServices from 'utils/navigationServices';

export default function infoUserView(props) {
  const {
    data,
    textInputCMND,
    textInputPhone,
    textInputFullName,
    isSelected,
    setSelection,
    textInputOldPass,
    updateSecureTextEntryOld,
    updateSecureTextEntryNew,
    updateSecureTextEntryConfirm,
    textInputConfirm,
    saveChangesHandle,
    textInputNewPass,
  } = props;

  return (
    <SafeAreaView style={styles.screenContainersafe}>
      <View style={styles.screenContainer}>
        <StatusBar backgroundColor="#2B4F8C" barStyle="light-content" />
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
              style={styles.maginIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Thông tin tài khoản</Text>
        </View>
        <ScrollView>
          <View style={styles.bodyContainer}>
            <View style={styles.userContainer}>
              <View style={styles.textContainer}>
                <View style={styles.row}>
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
                      <Text style={styles.errorMsg}>Vui lòng nhập Họ tên</Text>
                    </Animatable.View>
                  )}
                </View>
                <TextInput
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  onChangeText={(val) => textInputFullName(val)}
                  style={styles.welcomeText}>
                  {data.FullName}
                </TextInput>
              </View>
            </View>
            {data.check_textInputFullName ? (
              <View style={styles.divider} />
            ) : (
              <View style={styles.decide} />
            )}

            <View style={styles.userContainer}>
              <View style={styles.textContainer}>
                <View style={styles.row}>
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
                      <Text style={styles.errorMsg}>
                        Số điện thoại sai định dạng
                      </Text>
                    </Animatable.View>
                  )}
                </View>
                <View style={styles.totalContainer1}>
                  <TextInput
                    keyboardType="numeric"
                    placeholderTextColor="#666666"
                    autoCapitalize="none"
                    onChangeText={(val) => textInputPhone(val)}
                    style={styles.welcomeText}>
                    {data.Phone}
                  </TextInput>
                  <TouchableOpacity
                    style={styles.btnConfirmPhone}
                    onPress={() => {
                      auth().verifyPhoneNumber(data.Phone);
                    }}>
                    <Text style={styles.txtConfirmPhone}>Gửi mã xác nhận</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {data.check_textInputSDT ? (
              <View style={styles.divider} />
            ) : (
              <View style={styles.decide} />
            )}
            <View style={styles.userContainer}>
              <View style={styles.textContainer}>
                <View style={styles.row}>
                  <Text
                    style={
                      data.check_textInputCMND
                        ? styles.titletext
                        : styles.errtext
                    }>
                    Căn cước công dân{' '}
                  </Text>
                  {data.check_textInputCMND ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>CMND sai định dạng</Text>
                    </Animatable.View>
                  )}
                </View>
                <TextInput
                  keyboardType="numeric"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  onChangeText={(val) => textInputCMND(val)}
                  style={styles.welcomeText}>
                  {data.CMND}
                </TextInput>
              </View>
            </View>
            {data.check_textInputCMND ? (
              <View style={styles.divider} />
            ) : (
              <View style={styles.decide} />
            )}
            <View style={styles.divider} />
            <View style={styles.userContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.titletext}>Email</Text>
                <Text numberOfLines={1} style={styles.emailtext}>
                  {data.Email}
                </Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.userContainer}>
              <View style={styles.totalContainer1}>
                <CheckBox
                  value={isSelected}
                  onValueChange={setSelection}
                  style={styles.checkbox}
                />
                <View style={styles.magin10}>
                  <Text style={styles.titletext}>Đổi mật khẩu</Text>
                </View>
              </View>
            </View>
            <View style={styles.divider} />
            {isSelected ? (
              <View style={styles.userContainer1}>
                <View style={styles.magin10}>
                  <Text
                    style={
                      data.check_textInputOldpass
                        ? styles.welcomeText
                        : styles.errtext1
                    }>
                    Mật khẩu cũ
                  </Text>
                  <View style={styles.row}>
                    <TextInput
                      placeholder={
                        data.check_textInputOldpass ? 'Mật khẩu cũ' : ''
                      }
                      secureTextEntry={data.secureTextOld ? true : false}
                      style={styles.welcomeText}
                      onChangeText={(val) => textInputOldPass(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntryOld}>
                      {data.secureTextOld ? (
                        <Feather name="eye-off" color="grey" size={20} />
                      ) : (
                        <Feather name="eye" color="green" size={20} />
                      )}
                    </TouchableOpacity>
                  </View>
                  {data.check_textInputOldpass ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>
                        Vui lòng nhập mật khẩu
                      </Text>
                    </Animatable.View>
                  )}
                </View>
                <View style={styles.magin10}>
                  <Text
                    style={
                      data.check_textInputNewpass
                        ? styles.welcomeText
                        : styles.errtext1
                    }>
                    Mật khẩu mới
                  </Text>
                  <View style={styles.row}>
                    <TextInput
                      placeholder="Mật khẩu mới"
                      secureTextEntry={data.secureTextNew ? true : false}
                      style={styles.welcomeText}
                      onChangeText={(val) => textInputNewPass(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntryNew}>
                      {data.secureTextNew ? (
                        <Feather name="eye-off" color="grey" size={20} />
                      ) : (
                        <Feather name="eye" color="green" size={20} />
                      )}
                    </TouchableOpacity>
                  </View>
                  {data.check_textInputNewpass ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>
                        Vui lòng nhập mật khẩu ít nhất 6 kí tự
                      </Text>
                    </Animatable.View>
                  )}
                </View>
                <View style={styles.magin10}>
                  <Text
                    style={
                      data.check_textInputComfim
                        ? styles.welcomeText
                        : styles.errtext1
                    }>
                    Xác nhận mật khẩu mới
                  </Text>
                  <View style={styles.row}>
                    <TextInput
                      placeholder="Xác nhận mật khẩu mới"
                      secureTextEntry={data.secureTextConfirm ? true : false}
                      style={styles.welcomeText}
                      onChangeText={(val) => textInputConfirm(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntryConfirm}>
                      {data.secureTextConfirm ? (
                        <Feather name="eye-off" color="grey" size={20} />
                      ) : (
                        <Feather name="eye" color="green" size={20} />
                      )}
                    </TouchableOpacity>
                  </View>
                  {data.check_textInputComfim ? null : (
                    <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={styles.errorMsg}>
                        Mật khẩu xác nhận chưa đúng
                      </Text>
                    </Animatable.View>
                  )}
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>
        <View style={styles.btnSave}>
          <TouchableOpacity
            style={styles.btnTouch}
            onPress={() => {
              saveChangesHandle();
            }}>
            <Text style={styles.txtSave}>Lưu Thay Đổi</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={data.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FontAwesome5 name="grin-beam" size={40} color="#2B4F8C" />
              <Text style={styles.modalText}>{data.textAlert}</Text>
            </View>
          </View>
        </Modal>
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
