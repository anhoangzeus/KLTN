import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './RegiserOtp.styles';
import AppText from 'components/AppText';
import OTPTextInput from 'react-native-otp-textinput';
// import {NAMESPACE} from './RegiserOtp.constants';

function RegiserOtpView(props) {
  // eslint-disable-next-line no-unused-vars
  const { register, onChangeText, textOPT } = this.props;
  return (
    <View style={styles.container}>
      <AppText>RegiserOtp</AppText>
      <OTPTextInput ref={e => onChangeText(e)} />
      <TouchableOpacity onPress={() => { }}>
        <Text>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(RegiserOtpView);
