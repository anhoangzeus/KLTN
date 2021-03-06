/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './register.styles';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
const RegisterView = (props) => {
  const {
    textInputChange,
    data,
    handlePasswordChange,
    updateSecureTextEntry,
    textInputChange1,
    registerHandle,
  } = props;
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>
            {I18n.t(`${NAMESPACE}.fullname`)}
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder={I18n.t(`${NAMESPACE}.fullname`)}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 10,
              },
            ]}>
            Email
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder={I18n.t(`${NAMESPACE}.account`)}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange1(val)}
            />
            {data.check_textInputChange1 ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 10,
              },
            ]}>
            {I18n.t(`${NAMESPACE}.password`)}
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder={I18n.t(`${NAMESPACE}.password`)}
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            {data.check_textInputChange3 ? (
              <Animatable.View animation="bounceIn">
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                  style={{marginRight: 5}}
                />
              </Animatable.View>
            ) : null}
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

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                registerHandle();
              }}>
              <Text style={styles.textSign}>
                {' '}
                {I18n.t(`${NAMESPACE}.signUp`)}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
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
  );
};
export default RegisterView;
