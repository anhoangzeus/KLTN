/* eslint-disable react-native/no-inline-styles */

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Header from 'components/Header';
import SCENE_NAMES from 'constants/sceneName';
import moment from 'moment';
import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { normalize } from 'react-native-elements';
import OTPTextInput from 'react-native-otp-textinput';
import { Modal } from 'react-native-paper';
import RNSmtpMailer from 'react-native-smtp-mailer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NavigationServices from 'utils/navigationServices';
import styles from './RegiserOtp.styles';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
class RegiserOtpContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      textOPT: '',
      numOTP: '000000',
      timeOut: 60,
      modalVisible: false,
      modalVisibleWarning: false,
      textAlert: '',
    };
    this.interval;
  }

  handleClose = () => {
    this.setState({ modalVisible: false, modalVisibleWarning: false });
  };
  setModalVisible = (visible, text) => {
    this.setState({ modalVisible: visible, textAlert: text });
    setTimeout(this.handleClose, 1500);
  };
  setModalVisibleWarning = (visible, text) => {
    this.setState({ modalVisibleWarning: visible, textAlert: text });
    setTimeout(this.handleClose, 1500);
  };

  onChangeText = (val) => {
    this.setState({ textOPT: val });
  };

  getRandom = (length) => {
    var num = Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString();
    this.setState({ numOTP: num });
    return num;
  };
  sentOTP = () => {
    const { data } = this.props.route.params;
    RNSmtpMailer.sendMail({
      mailhost: 'smtp.gmail.com',
      port: '465',
      ssl: true,
      username: 'nguyentienanh1631999@gmail.com',
      password: 'tienanh0144',
      fromName: 'TiAn Vegan Food Market',
      recipients: data.username,
      subject: I18n.t(`${NAMESPACE}.otpcode`),
      htmlBody: `<h1>${I18n.t(
        `${NAMESPACE}.otptime`,
      )} 90s</h1><p>${this.getRandom(6)}</p>`,
    })
      .then(() => {
        this.setState({ timeOut: 60 });
        this.interval = setInterval(() => {
          if (this.state.timeOut > 0) {
            this.setState({ timeOut: this.state.timeOut - 1 });
          } else {
            clearInterval(this.interval);
          }
        }, 1000);
      })
      // eslint-disable-next-line handle-callback-err
      .catch((err) => { this.setModalVisibleWarning(true, I18n.t(`${NAMESPACE}.otpexpired`)); });
  };
  register = () => {
    const { numOTP, textOPT, timeOut } = this.state;
    const { data } = this.props.route.params;
    if (numOTP === textOPT) {
      if (timeOut > 0) {
        auth()
          .createUserWithEmailAndPassword(data.username, data.password)
          .then(() => {
            database()
              .ref('Users')
              .child(auth().currentUser.uid)
              .set({
                FullName: data.fullname,
                CreatedDate: moment().format('DD/MM/yyyy'),
                CreatedBy: data.Createby,
                Status: data.Status,
                UserID: auth().currentUser.uid,
                Passwords: data.password,
                Email: data.username,
                Avatar: data.Avatar,
                UserName: data.username,
              });
            this.setModalVisible(true, I18n.t(`${NAMESPACE}.success`));
            setTimeout(NavigationServices.replace(SCENE_NAMES.MAIN), 2000);
          })
          .catch((error) => {
            this.setModalVisibleWarning(
              true,
              I18n.t(`${NAMESPACE}.signupfail`),
            );
          });
      } else {
        this.setModalVisibleWarning(true, I18n.t(`${NAMESPACE}.otpexpired`));
      }
    } else {
      this.setModalVisibleWarning(true, I18n.t(`${NAMESPACE}.otpincorrect`));
    }
  };
  componentDidMount() {
    this.sentOTP();
  }
  render() {
    const { modalVisible, modalVisibleWarning, textAlert, timeOut } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2B4F8C" />
        <Header title={I18n.t(`${NAMESPACE}.otpconfirm`)} />
        <View style={styles.bodyContainer}>
          <Text style={styles.text}>
            {I18n.t(`${NAMESPACE}.otptime`)} {timeOut}
          </Text>
          <OTPTextInput
            handleTextChange={(val) => this.onChangeText(val)}
            inputCount={6}
          />
          <TouchableOpacity
            style={{ ...styles.btnConfirm, marginTop: normalize(50) }}
            onPress={() => {
              this.register();
            }}>
            <Text style={styles.textbtn}>{I18n.t(`${NAMESPACE}.confirm`)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 20 }}
            onPress={() => {
              this.sentOTP();
            }}>
            <Text style={{ ...styles.textbtn, color: '#2B4F8C' }}>
              Chưa nhận được mã? {I18n.t(`${NAMESPACE}.sendcode`)}
            </Text>
          </TouchableOpacity>
        </View>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FontAwesome5 name="grin-beam" size={40} color="#2B4F8C" />
              <Text style={styles.modalText}>{textAlert}</Text>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleWarning}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <FontAwesome5 name="grin-beam-sweat" size={40} color="red" />
              <Text style={styles.modalText1}>{textAlert}</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
export default RegiserOtpContainer;
