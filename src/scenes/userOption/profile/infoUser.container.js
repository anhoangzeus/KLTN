/* eslint-disable react-hooks/rules-of-hooks */
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import moment from 'moment';
import React, {useState} from 'react';
import {Platform} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {chooseImageOptions} from '../../../utils/options';
import UserView from './infoUser.view';

const functionsCounter = new Set();
export default function infoUserContainer({navigation}) {
  const [isSelected, setSelection] = useState(false);
  const [visibleViewing, setvisibleViewing] = useState(false);
  const [visibleChooseImage, setvisibleChooseImage] = useState(false);
  const [isloading, setIsloading] = useState(false);
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
    filename: '',
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
      database()
        .ref('Users')
        .child(auth().currentUser.uid)
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
  const handleClose = () => {
    setData({
      ...data,
      modalVisible: false,
      modalVisibleWarning: false,
    });
  };
  const setModalVisibleWarning = (visible, text) => {
    setData(
      {
        ...data,
        modalVisibleWarning: visible,
        textAlert: text,
      },
      setTimeout(handleClose, 2000),
    );
  };
  const setModalVisible = (visible, text) => {
    setData(
      {
        ...data,
        modalVisible: visible,
        textAlert: text,
      },
      setTimeout(handleClose, 2000),
    );
  };

  const saveChangesHandle = async () => {
    setIsloading(true);
    const task = storage()
      .ref('avatar/' + data.filename)
      .putFile(data.Avatar);
    try {
      await task;
    } catch (e) {
      console.error(e);
    }

    const url = await storage()
      .ref('avatar/' + data.filename)
      .getDownloadURL();

    console.log(url);
    var date = moment().subtract(10, 'days').calendar();
    if (isSelected === false) {
      if (data.FullName.length <= 1 || data.Phone.length <= 1) {
        setModalVisibleWarning(true, 'Bạn chưa điền đầy đủ thông tin');
        return;
      }
      if (auth().currentUser.uid != null) {
        database()
          .ref('Users')
          .child(auth().currentUser.uid)
          .update({
            FullName: data.FullName,
            Phone: data.Phone,
            CMND: data.CMND,
            ModifiedBy: 'User',
            ModifiedDate: date,
            Avatar: url,
          })
          .then(
            setIsloading(false),
            setModalVisible(true, 'Thay đổi thành công'),
          )
          .catch();
      } else {
        setModalVisibleWarning(true, 'Xin quý khách kiểm tra lại Internet');
      }
    } else {
      if (
        data.FullName.length <= 1 ||
        data.Phone.length <= 1 ||
        data.oldpass.length <= 1 ||
        data.password.length <= 1 ||
        data.comfirm_pass.length <= 1
      ) {
        setModalVisibleWarning(true, 'Bạn chưa điền đầy đủ thông tin');
        return;
      }
      if (auth().currentUser.uid != null) {
        if (data.oldpass === data.pass) {
          if (data.password === data.comfirm_pass) {
            auth()
              .currentUser.updatePassword(data.password)
              .then(function () {})
              .catch(function (error) {});
            database()
              .ref('Users')
              .child(auth().currentUser.uid)
              .update({
                FullName: data.FullName,
                Phone: data.Phone,
                CMND: data.CMND,
                ModifiedBy: 'User',
                ModifiedDate: date,
                Password: data.password,
                Avatar: url,
              })
              .then(setModalVisible(true, 'Thay đổi thành công'))
              .catch();
            auth().signOut();
          }
        } else {
          setModalVisibleWarning(true, 'Mật khẩu cũ không chính xác');
          setSelection(false);
        }
      } else {
        setModalVisibleWarning(true, 'Xin quý khách kiểm tra lại Internet');
      }
    }
  };

  const pairToSubmitImage = (response) => {
    console.log('aaa');
    if (response.didCancel) {
      console.log('ImagePicker', 'cancel');
    } else if (response.error) {
      console.log('ImagePickerError: ', response.error);
    } else {
      const data1 = new FormData();
      var fileName = '';
      if (Platform.OS === 'android') {
        var fileExt = response.uri.split('.');
        var fileName =
          'avartar' +
          moment().format('_YYYY_MM_DD_HH_mm_ss.') +
          fileExt[fileExt.length - 1];
      } else {
        var fileExt = response.uri.split('.');
        var fileName =
          'avartar' +
          moment().format('_YYYY_MM_DD_HH_mm_ss.') +
          fileExt[fileExt.length - 1];
      }
      data1.append('files', {
        name: fileName,
        type: response.type,
        uri:
          Platform.OS === 'android'
            ? response.uri
            : response.uri.replace('file://', '/private'),
      });
      data1.append('secret', '123456');
      setData({...data, Avatar: response.uri, filename: fileName});
    }
  };
  const chooseImageTake = () => {
    launchCamera(chooseImageOptions, (response) => {
      pairToSubmitImage(response);
    });
  };

  const chooseImageLibrary = () => {
    launchImageLibrary(chooseImageOptions, (response) => {
      pairToSubmitImage(response);
    });
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
  functionsCounter.add(chooseImageTake);
  functionsCounter.add(chooseImageLibrary);
  //     return (
  //         <Col center style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
  //             <Loading />
  //         </Col>
  //     )
  // }
  return (
    <UserView
      updateSecureTextEntryOld={updateSecureTextEntryOld}
      updateSecureTextEntryNew={updateSecureTextEntryNew}
      updateSecureTextEntryConfirm={updateSecureTextEntryConfirm}
      textInputOldPass={textInputOldPass}
      textInputNewPass={textInputNewPass}
      chooseImageTake={chooseImageTake}
      textInputConfirm={textInputConfirm}
      saveChangesHandle={saveChangesHandle}
      textInputPhone={textInputPhone}
      textInputFullName={textInputFullName}
      chooseImageLibrary={chooseImageLibrary}
      visibleViewing={visibleViewing}
      setvisibleViewing={setvisibleViewing}
      textInputCMND={textInputCMND}
      visibleChooseImage={visibleChooseImage}
      setvisibleChooseImage={setvisibleChooseImage}
      data={data}
      isSelected={isSelected}
      setSelection={setSelection}
      isloading={isloading}
    />
  );
}
