/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useTheme} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './login.styles';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';

const LoginView = (props) => {
  const {
    textInputChange,
    handleValidUser,
    data,
    updateSecureTextEntry,
    handlePasswordChange,
    setModalResetPass,
    loginHandle,
    handleTextChangpass,
    sentPass,
    loginGoogle,
    loginFacebook,
    handleResetPass,
    loading,
  } = props;
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
            },
          ]}>
          {I18n.t(`${NAMESPACE}.account`)}
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder={I18n.t(`${NAMESPACE}.account`)}
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{I18n.t(`${NAMESPACE}.min`)}</Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: colors.text,
              marginTop: 35,
            },
          ]}>
          {I18n.t(`${NAMESPACE}.password`)}
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder={I18n.t(`${NAMESPACE}.password`)}
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}> {I18n.t(`${NAMESPACE}.min`)}</Text>
          </Animatable.View>
        )}
        <TouchableOpacity onPress={() => setModalResetPass(true)}>
          <Text style={{color: '#009387', marginTop: 15}}>
            {' '}
            {I18n.t(`${NAMESPACE}.forgotPassword`)}
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.username, data.password);
            }}>
            <Text style={styles.textSign}>{I18n.t(`${NAMESPACE}.signIn`)}</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10, flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              ...styles.signIn1,
              backgroundColor: '#3b5998',
              flexDirection: 'row',
            }}
            onPress={() => {
              loginFacebook();
            }}>
            <Ionicons name="logo-facebook" size={30} color="#fff" />
            <Text style={[styles.textSign, {color: '#fff', marginLeft: 5}]}>
              Facebook
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.signIn1,
              backgroundColor: '#ffffff',
              flexDirection: 'row',
              marginLeft: 5,
              borderWidth: 1,
              borderColor: '#000',
            }}
            onPress={() => {
              loginGoogle();
            }}>
            <Image
              source={require('../../../assets/images/google.png')}
              style={{width: 30, height: 30, resizeMode: 'center'}}
            />
            <Text style={[styles.textSign, {color: '#000000', marginLeft: 5}]}>
              Google
            </Text>
          </TouchableOpacity>
        </View>
        <ActivityIndicator animating={loading} size="small" color="#0000ff" />
      </Animatable.View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={data.modalReset}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={styles.modalView1}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <FontAwesome5
                name="times-circle"
                color="#fff"
                size={20}
                style={{marginLeft: 10}}
              />
              <Text style={{color: '#000', textAlign: 'center', fontSize: 17}}>
                {I18n.t(`${NAMESPACE}.signIn`)}
              </Text>
              <TouchableOpacity
                style={styles.btnEmail}
                onPress={() => {
                  handleResetPass();
                }}>
                <FontAwesome5 name="times-circle" color="red" size={20} />
              </TouchableOpacity>
            </View>
            <TextInput
              autoFocus
              placeholder="..."
              style={styles.textPass}
              textAlignVertical="top"
              autoCapitalize="none"
              onChangeText={(val) => handleTextChangpass(val)}
            />
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={() => sentPass()}>
              <Text style={styles.textSubmitPasss}>
                {I18n.t(`${NAMESPACE}.confirm`)}
              </Text>
            </TouchableOpacity>
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
  );
};
export default LoginView;
