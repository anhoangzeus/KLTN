/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import React from 'react';
import RegisterView from './register.view';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const functionsCounter = new Set();

export default function RegisterContainer({ navigation }) {
    const [data, setData] = React.useState({
        username: '',
        password: '',
        fullname: '',
        Createby: 'User',
        CreateDate: '06/11/2020',
        Status: 'true',
        UserID: '',
        Avatar: 'https://i.ibb.co/HDzz1rC/avartarnone.png',
        check_textInputChange: false,
        check_textInputChange1: false,
        check_textInputChange3: false,
        secureTextEntry: true,
        isValidPassword: true,
        modalVisible: false,
        modalVisibleWarning: false,
        textAlert: '',
    });

    const GetCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        setData({
            ...data,
            CreateDate: date + '/' + month + '/' + year,
        });
    };
    const textInputChange = (val) => {
        if (val.length !== 0) {
            setData({
                ...data,
                fullname: val,
                check_textInputChange: true,
            });
        } else {
            setData({
                ...data,
                fullname: val,
                check_textInputChange: false,
            });
        }
    };
    const textInputChange1 = (val) => {
        if (val.length >= 6) {
            setData({
                ...data,
                username: val,
                check_textInputChange1: true,
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange1: false,
            });
        }
    };

    const handlePasswordChange = (val) => {
        if (val.length >= 6) {
            setData({
                ...data,
                password: val,
                check_textInputChange3: true,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                password: val,
                check_textInputChange3: false,
                isValidPassword: false,
            });
        }
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };
    const handleClose = () => {
        setData({
            ...data,
            modalVisible: false,
            modalVisibleWarning: false,
        });
        const setModalVisible = async (visible, text) => {
            await (setData({
                ...data,
                modalVisible: visible,
                textAlert: text,
            }, setTimeout(handleClose, 2000)));
        };
        const setModalVisibleWarning = (visible, text) => {
            setData({
                ...data,
                modalVisibleWarning: visible,
                textAlert: text,
            }, setTimeout(handleClose, 2000));
        };
    };
    let isEmailAddress = val => {
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val) || /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(val);
    };
    const registerHandle = () => {
        if (!isEmailAddress(data.username)) {
            setModalVisibleWarning(true, 'Email sai định dạng');
            return;
        }
        if (data.fullname.length < 6) {
            setModalVisibleWarning(true, 'Quý khách chưa nhập Họ tên');
            return;
        }
        if (data.password.length < 6) {
            setModalVisibleWarning(true, 'Mật khẩu chưa đủ độ dài');
            return;
        }
        GetCurrentDate();
        auth()
            .createUserWithEmailAndPassword(data.username, data.password)
            .then(() => {
                database().ref('Users').child(auth().currentUser.uid).set({
                    FullName: data.fullname,
                    CreatedDate: data.CreateDate,
                    CreatedBy: data.Createby,
                    Status: data.Status,
                    UserID: auth().currentUser.uid,
                    Passwords: data.password,
                    Email: data.username,
                    Avatar: data.Avatar,
                    UserName: data.username,
                });
                setModalVisible(true, 'Đăng kí thành công');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setModalVisibleWarning(true, 'Email này đã có người sử dụng');
                }
                if (error.code === 'auth/invalid-email') {
                    setModalVisibleWarning(true, 'Email không đúng định dạng!');
                }
                return;
            });
    };
    functionsCounter.add(textInputChange);
    functionsCounter.add(registerHandle);
    functionsCounter.add(textInputChange1);
    functionsCounter.add(handlePasswordChange);
    functionsCounter.add(updateSecureTextEntry);
    return (
        <RegisterView
            navigation={navigation}
            textInputChange={textInputChange}
            registerHandle={registerHandle}
            textInputChange1={textInputChange1}
            handlePasswordChange={handlePasswordChange}
            updateSecureTextEntry={updateSecureTextEntry}
            data={data}
        />
    );
}
