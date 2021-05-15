import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { getParams } from 'utils/navigationServices';
import RegiserOtpView from './RegiserOtp.view';
import React, { useState } from 'react';
import moment from 'moment';
const functionsCounter = new Set();

export default function RegiserOtpContainer({ navigation, route }) {
  const [textOPT, setOPT] = useState('');
  const { codeOTP, data } = getParams(route);

  const onChangeText = (val) => {
    setOPT(val);
  };
  const register = () => {
    if (codeOTP === textOPT) {
      auth().createUserWithEmailAndPassword(data.username, data.password)
        .then(() => {
          database().ref('Users').child(auth().currentUser.uid).set({
            FullName: data.fullname,
            CreatedDate: moment().format('dd--MM-yyyy'),
            CreatedBy: data.Createby,
            Status: data.Status,
            UserID: auth().currentUser.uid,
            Passwords: data.password,
            Email: data.username,
            Avatar: data.Avatar,
            UserName: data.username,
          });
          // setModalVisible(true, 'Đăng kí thành công');
        })
        .catch(error => {
          console.log(error);
        });
    }

  };
  functionsCounter.add(register);
  functionsCounter.add(onChangeText);
  return (
    <RegiserOtpView
      register={register}
      onChangeText={onChangeText}
      textOPT={textOPT}
    />
  );
}
