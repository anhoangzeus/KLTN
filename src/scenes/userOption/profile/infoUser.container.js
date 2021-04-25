/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import UserView from './infoUser.view';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const functionsCounter = new Set();
export default function infoUserContainer({ navigation }) {
    const [isSelected, setSelection] = useState(false);
    const [data, setData] = useState({
        pass: '',
        oldpass: '',
        password: '',
        comfirm_pass: '',
        FullName: '',
        Avatar: 'https://i.ibb.co/HDzz1rC/avartarnone.png',
        Phone: '',
        CMND: '',
        Email: '',
        check_textInputFullName: true,
        check_textInputSDT: true,
        check_textInputCMND: true,
        check_textInputOldpass: true,
        check_textInputNewpass: true,
        check_textInputComfim: true,
        secureTextOld: true,
        secureTextNew: true,
        secureTextConfirm: true,
        modalVisible: false,
        modalVisibleWarning: false,
        textAlert: '',
    });
    const getData = () => {
        if (auth().currentUser != null) {
            database().ref('Users').child(auth().currentUser.uid)
                .once('value', (snapshot) => {
                    setData({
                        ...data,
                        CMND: snapshot.val().CMND,
                        FullName: snapshot.val().FullName,
                        Phone: snapshot.val().Phone,
                        pass: snapshot.val().Password,
                        Email: snapshot.val().Email,
                        Avatar: snapshot.val().Avatar,
                    });
                });
        }
    };
    useState(() => {
        getData();
    });
    const updateSecureTextEntryOld = () => {
        setData({
            ...data,
            secureTextOld: !data.secureTextOld,
        });
    };
    const updateSecureTextEntryNew = () => {
        setData({
            ...data,
            secureTextNew: !data.secureTextNew,
        });
    };
    const updateSecureTextEntryConfirm = () => {
        setData({
            ...data,
            secureTextConfirm: !data.secureTextConfirm,
        });
    };
    const textInputOldPass = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                oldpass: val,
                check_textInputOldpass: true,
            });
        } else {
            setData({
                ...data,
                oldpass: val,
                check_textInputOldpass: false,
            });
        }
    };
    const textInputNewPass = (val) => {
        if (val.trim().length >= 6) {
            if (val.trim() === data.comfirm_pass) {
                setData({
                    ...data,
                    password: val,
                    check_textInputNewpass: true,
                    check_textInputComfim: true,
                });
            } else {
                setData({
                    ...data,
                    password: val,
                    check_textInputComfim: false,
                    check_textInputNewpass: true,
                });
            }
        } else {
            setData({
                ...data,
                password: val,
                check_textInputNewpass: false,
            });
        }
    };
    const textInputConfirm = (val) => {
        if (val.trim().length > 0) {
            if (val.trim() === data.password) {
                setData({
                    ...data,
                    comfirm_pass: val,
                    check_textInputComfim: true,
                });
            } else {
                setData({
                    ...data,
                    comfirm_pass: val,
                    check_textInputComfim: false,
                });
            }
        } else {
            setData({
                ...data,
                comfirm_pass: val,
                check_textInputComfim: false,
            });
        }
    };

    const textInputFullName = (val) => {
        if (val.trim().length > 0) {
            setData({
                ...data,
                FullName: val,
                check_textInputFullName: true,
            });
        } else {
            setData({
                ...data,
                FullNames: val,
                check_textInputFullName: false,
            });
        }
    };
    const textInputCMND = (val) => {
        if (val.trim().length === 8 || val.trim().length === 12) {
            setData({
                ...data,
                CMND: val,
                check_textInputCMND: true,
            });
        } else {
            setData({
                ...data,
                CMND: val,
                check_textInputCMND: false,
            });
        }
    };
    const textInputPhone = (val) => {

        if (val.trim().length === 10) {
            setData({
                ...data,
                Phone: val,
                check_textInputSDT: true,
            });
        } else {
            setData({
                ...data,
                Phone: val,
                check_textInputSDT: false,
            });
        }
    };

    const GetCurrentDate = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var gio = new Date().getHours();
        var phut = new Date().getMinutes();
        var giay = new Date().getSeconds();
        return date + '/' + month + '/' + year + ' ' + gio + ':' + phut + ':' + giay;

    };
    const handleClose = () => {
        setData({
            ...data,
            modalVisible: false,
            modalVisibleWarning: false,
        });
    };
    const setModalVisibleWarning = (visible, text) => {
        setData({
            ...data,
            modalVisibleWarning: visible,
            textAlert: text,
        }, setTimeout(handleClose, 2000));
    };
    const setModalVisible = (visible, text) => {
        setData({
            ...data,
            modalVisible: visible,
            textAlert: text,
        }, setTimeout(handleClose, 2000));
    };
    const saveChangesHandle = () => {
        var date = GetCurrentDate();
        if (isSelected === false) {
            if (data.FullName.length <= 1 || data.Phone.length <= 1) {
                setModalVisibleWarning(true, 'Bạn chưa điền đầy đủ thông tin');
                return;
            }
            if (auth().currentUser.uid != null) {
                database().ref('Users').child(auth().currentUser.uid).update({
                    FullName: data.FullName,
                    Phone: data.Phone,
                    CMND: data.CMND,
                    ModifiedBy: 'User',
                    ModifiedDate: date,
                }).then(
                    setModalVisible(true, 'Thay đổi thành công')
                ).catch();
            } else {
                setModalVisibleWarning(true, 'Xin quý khách kiểm tra lại Internet');
            }
        }
        else {
            if (data.FullName.length <= 1 || data.Phone.length <= 1
                || data.oldpass.length <= 1 || data.password.length <= 1 || data.comfirm_pass.length <= 1) {
                setModalVisibleWarning(true, 'Bạn chưa điền đầy đủ thông tin');
                return;
            }
            if (auth().currentUser.uid != null) {

                if (data.oldpass === data.pass) {
                    if (data.password === data.comfirm_pass) {
                        auth().currentUser.updatePassword(data.password).then(function () {
                        }).catch(function (error) {
                        });
                        database().ref('Users').child(auth().currentUser.uid).update({
                            FullName: data.FullName,
                            Phone: data.Phone,
                            CMND: data.CMND,
                            ModifiedBy: 'User',
                            ModifiedDate: date,
                            Password: data.password,
                        }).then(
                            setModalVisible(true, 'Thay đổi thành công')
                        ).catch();
                        auth().signOut();
                    }
                }
                else {
                    setModalVisibleWarning(true, 'Mật khẩu cũ không chính xác');
                    setSelection(false);
                }
            } else {
                setModalVisibleWarning(true, 'Xin quý khách kiểm tra lại Internet');
            }
        }
    };
    functionsCounter.add(updateSecureTextEntryOld);
    functionsCounter.add(updateSecureTextEntryNew);
    functionsCounter.add(updateSecureTextEntryConfirm);
    functionsCounter.add(textInputOldPass);
    functionsCounter.add(textInputNewPass);
    functionsCounter.add(textInputConfirm);
    functionsCounter.add(saveChangesHandle);
    functionsCounter.add(textInputPhone);
    functionsCounter.add(textInputCMND);
    functionsCounter.add(textInputFullName);

    return (
        <UserView
            updateSecureTextEntryOld={updateSecureTextEntryOld}
            updateSecureTextEntryNew={updateSecureTextEntryNew}
            updateSecureTextEntryConfirm={updateSecureTextEntryConfirm}
            textInputOldPass={textInputOldPass}
            textInputNewPass={textInputNewPass}
            textInputConfirm={textInputConfirm}
            saveChangesHandle={saveChangesHandle}
            textInputPhone={textInputPhone}
            textInputFullName={textInputFullName}
            textInputCMND={textInputCMND}
            data={data}
            isSelected={isSelected}
            setSelection={setSelection}
        />
    );
}
