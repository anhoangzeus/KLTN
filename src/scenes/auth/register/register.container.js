

import database from '@react-native-firebase/database';
import SCENE_NAMES from 'constants/sceneName';
import React from 'react';
import NavigationServices from 'utils/navigationServices';
import RegisterView from './register.view';

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
    let isEmailAddress = val => {
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(val) || /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(val);
    };
    const textInputChange1 = (val) => {
        if (val.length >= 6 && isEmailAddress(val)) {
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

    };
    // const setModalVisible = async (visible, text) => {
    //     await (setData({
    //         ...data,
    //         modalVisible: visible,
    //         textAlert: text,
    //     }, setTimeout(handleClose, 2000)));
    // };
    const setModalVisibleWarning = (visible, text) => {
        setData({
            ...data,
            modalVisibleWarning: visible,
            textAlert: text,
        }, setTimeout(handleClose, 2000));
    };

    const checkUserExist = (email) => {
        var temp = true;
        database().ref('Users').once('value').then((snapshot) => {
            snapshot.forEach((child) => {
                if (child.val().Email === email) {
                    temp = false;
                    if (!temp) { return temp; }
                }
            });
        });
        return temp;
    };
    const registerHandle = () => {
        if (!isEmailAddress(data.username)) {
            setModalVisibleWarning(true, 'Email sai định dạng');
            return;
        }
        if (data.fullname.length === 0) {
            setModalVisibleWarning(true, 'Quý khách chưa nhập Họ tên');
            return;
        }
        if (data.password.length < 6) {
            setModalVisibleWarning(true, 'Mật khẩu chưa đủ độ dài');
            return;
        }
        if (checkUserExist(data.username)) {
            setModalVisibleWarning(true, 'Email này đã có người sử dụng');
        } else {
            NavigationServices.navigate(SCENE_NAMES.REGISER_OTP, { codeOTP: 123456, data: data });
        }
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
