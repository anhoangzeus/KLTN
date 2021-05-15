/* eslint-disable react-native/no-inline-styles */
import CheckBox from '@react-native-community/checkbox';
import auth from '@react-native-firebase/auth';
import Col from 'components/Col';
import Header from 'components/Header';
import Loading from 'components/LoadingView';
import PopupChooseImage from 'components/PopupChooseImage';
import * as React from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import ImageView from 'react-native-image-viewing';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './infoUser.styles';

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
    setvisibleViewing,
    visibleChooseImage,
    setvisibleChooseImage,
    visibleViewing,
    textInputConfirm,
    chooseImageTake,
    chooseImageLibrary,
    saveChangesHandle,
    textInputNewPass,
    isloading,
  } = props;
  // if (isloading) {
  //   return (
  //     // eslint-disable-next-line react-native/no-inline-styles
  //     <Col center style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
  //       <Loading />
  //     </Col>
  //   );
  // }
  return (
    <SafeAreaView style={styles.screenContainersafe}>
      <View style={styles.screenContainer}>
        <StatusBar backgroundColor="#2B4F8C" barStyle="light-content" />
        <Header title={'Thông tin tài khoản'} />
        <ScrollView>
          <KeyboardAvoidingView behavior="padding">
            <TouchableOpacity
              onPress={() => {
                setvisibleViewing(true);
              }}
              style={styles.avatarContainer}>
              <View style={styles.avatarView}>
                <Image
                  source={{uri: data.Avatar}}
                  size={80}
                  style={styles.img}
                />
              </View>
              <TouchableOpacity
                onPress={() => setvisibleChooseImage(true)}
                style={styles.toudhCamera}>
                <Image
                  source={require('../../../assets/images/camera.png')}
                  style={styles.camera}
                />
              </TouchableOpacity>
            </TouchableOpacity>
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
                  {data.check_textInputFullName || (
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
                  {data.check_textInputSDT || (
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
                        ? styles.errtext
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
                        ? styles.errtext
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
                        ? styles.errtext
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
          </KeyboardAvoidingView>
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
        <ImageView
          images={[{uri: data.Avatar}]}
          imageIndex={0}
          visible={visibleViewing}
          onRequestClose={() => setvisibleViewing(false)}
        />
        {/* Popup choose image */}
        <PopupChooseImage
          onChooseTake={chooseImageTake}
          onChooseLibrary={chooseImageLibrary}
          onClosePress={() => setvisibleChooseImage(false)}
          isVisible={visibleChooseImage}
        />
        {isloading && (
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
