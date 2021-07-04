import React, {useState, useEffect} from 'react';
import RegisterStoreView from './RegisterStore.view';
import {Picker} from '@react-native-picker/picker';
import {Platform, View} from 'react-native';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
// import {launchCamera} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import vn from '../../../../vn.json';
import I18n from 'utils/i18n';
import moment from 'moment';
const NAMESPACE = 'common';
const functionsCounter = new Set();
const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);

export default function RegisterStoreContainer({navigation}) {
  const isLoading = useSelectorShallow(loadingSelector);
  const [data, setData] = React.useState({
    City: '',
    Huyen: '',
    Xa: '',
    NumberAddress: '',
    Main: false,
    check_textInputFullName: true,
    check_textInputSDT: true,
    check_textInputaddress: true,
    modalVisibleWarning: false,
  });
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [des, setDes] = useState('');
  const [address, setAddress] = useState([]);
  const [frontID, setFrontID] = useState(
    'https://cdn.pixabay.com/photo/2016/10/08/18/34/camera-1724286_1280.png',
  );
  const [backId, setBackID] = useState(
    'https://cdn.pixabay.com/photo/2016/10/08/18/34/camera-1724286_1280.png',
  );
  const [visible, setVisible] = useState(false);
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setData({
      ...data,
      modalVisibleWarning: false,
    });
  };
  const newAdd = () => {
    console.log('data: ', data);
    if (
      data.City !== '' &&
      data.Huyen !== '' &&
      data.Xa &&
      data.NumberAddress !== ''
    ) {
      let arr = address;
      console.log('array" ', arr);
      arr.push(data);
      console.log('array push" ', arr);
      setAddress(arr);
      setVisible(false);
    }
  };
  const setModalVisibleWarning = (visiblea, text) => {
    setData(
      {
        ...data,
        modalVisibleWarning: visiblea,
        textAlert: text,
      },
      setTimeout(handleClose, 2000),
    );
  };
  const textInputAddress = (val) => {
    if (val.trim().length > 5) {
      setData({
        ...data,
        NumberAddress: val,
        check_textInputaddress: true,
      });
    } else {
      setData({
        ...data,
        NumberAddress: val,
        check_textInputaddress: false,
      });
    }
  };
  const saveChangesHandle = async () => {
    //Lấy tọa độ của xã phường
    for (let i = 0; i < vn.length; i++) {
      if (vn[i].name === data.City) {
        for (let j = 0; j < vn[i].huyen.length; j++) {
          if (vn[i].huyen[j].name === data.Huyen) {
            for (let z = 0; z < vn[i].huyen[j].xa.length; z++) {
              if (vn[i].huyen[j].xa[z].name === data.Xa) {
                location = vn[i].huyen[j].xa[z].location;
                z = vn[i].huyen[j].xa.length;
              }
            }
            j = vn[i].huyen.length;
          }
        }
        i = vn.length;
      }
    }
    if (
      data.ShipName.length === 0 ||
      data.ShipPhone.length === 0 ||
      data.NumberAddress.length === 0 ||
      data.City === I18n.t(`${NAMESPACE}.choosecity`) ||
      data.Huyen === I18n.t(`${NAMESPACE}.choosedistrict`) ||
      data.Xa === I18n.t(`${NAMESPACE}.chooseprov`) ||
      data.City === '' ||
      data.Huyen === '' ||
      data.Xa === ''
    ) {
      setModalVisibleWarning(true, I18n.t(`${NAMESPACE}.missinfo`));
      return;
    }
  };
  //Lấy dữ liệu tỉnh/tp từ all.json
  const provinceData = () => {
    var items = [{id: 0, name: I18n.t(`${NAMESPACE}.choosecity`)}, ...vn];
    var itemIOS = [];
    if (Platform.OS === 'ios') {
      items.map((item, i) => {
        itemIOS.push({
          label: item.name,
          value: item.name,
        });
      });
      return itemIOS;
    }
    return items.map((item, i) => {
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{backgroundColor: '#fff', justifyContent: 'center', flex: 1}}
      />;
      return <Picker.Item label={item.name} key={i} value={item.name} />;
    });
  };
  //Lấy dữ liệu quận từ all.json
  const districtData = (pname) => {
    var items = [{id: 0, name: I18n.t(`${NAMESPACE}.choosedistrict`)}];
    if (pname !== I18n.t(`${NAMESPACE}.choosecity`)) {
      for (let i = 0; i < vn.length; i++) {
        if (vn[i].name === pname) {
          items = [...items, ...vn[i].huyen];
          i = vn.length;
        }
      }
    }
    var itemIOS = [];
    if (Platform.OS === 'ios') {
      items.map((item, i) => {
        itemIOS.push({
          label: item.name,
          value: item.name,
        });
      });
      return itemIOS;
    }
    return items.map((item, i) => {
      return <Picker.Item label={item.name} key={i} value={item.name} />;
    });
  };
  //Lấy dữ liệu phường từ all.json
  const wardData = (pname, dname) => {
    var items = [{id: 0, name: I18n.t(`${NAMESPACE}.chooseprov`)}];
    if (
      pname !== I18n.t(`${NAMESPACE}.choosecity`) &&
      dname !== I18n.t(`${NAMESPACE}.choosedistrict`)
    ) {
      for (let i = 0; i < vn.length; i++) {
        if (vn[i].name === pname) {
          for (let j = 0; j < vn[i].huyen.length; j++) {
            if (vn[i].huyen[j].name === dname) {
              items = [...items, ...vn[i].huyen[j].xa];
              j = vn[i].huyen.length;
            }
          }
          i = vn.length;
        }
      }
    }
    var itemIOS = [];
    if (Platform.OS === 'ios') {
      items.map((item, i) => {
        itemIOS.push({
          label: item.name,
          value: item.name,
        });
      });
      return itemIOS;
    }
    return items.map((item, i) => {
      return <Picker.Item label={item.name} key={i} value={item.name} />;
    });
  };

  const takeFrontID = () => {
    // launchCamera(
    //   {
    //     quality: 1.0,
    //     maxWidth: 1024,
    //     maxHeight: 650,
    //     storageOptions: {
    //       skipBackup: true,
    //       path: 'images',
    //     },
    //     mediaType: 'photo',
    //     cameraType: 'back',
    //     includeBase64: false,
    //   },
    //   (response) => {
    //     setFrontID(response.uri);
    //   },
    // );
    ImagePicker.openCamera({
      width: 400,
      height: 300,
      cropping: true,
    }).then((image) => {
      setFrontID(image.path);
    });
  };
  const takeBackID = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 300,
      cropping: true,
    }).then((image) => {
      setBackID(image.path);
    });
  };
  const submit = async () => {
    setLoading(true);
    var fontimg = moment().format('_YYYY_MM_DD_HH_mm_ss') + frontID.split('.');
    await storage()
      .ref('ID/' + fontimg)
      .putFile(frontID);
    const frontURL = await storage()
      .ref('ID/' + fontimg)
      .getDownloadURL();

    var backimg =
      moment().format('_YYYY_MM_DD_HH_mm_ss') + auth().currentUser.uid;
    await storage()
      .ref('ID/' + backimg)
      .putFile(frontID);
    const backURL = await storage()
      .ref('ID/' + fontimg)
      .getDownloadURL();
    await database()
      .ref('Brief/' + auth().currentUser.uid)
      .update({
        BackID: backURL,
        FrontID: frontURL,
        Description: des,
        StoreName: name,
        StoreID: auth().currentUser.uid,
        Status: 1,
        CreateAt: moment().unix(),
        ModifyAt: moment().unix(),
      });

    address.forEach((element) => {
      const key = database()
        .ref('Brief/' + auth().currentUser.uid)
        .child('Address')
        .push().key;
      database()
        .ref('Brief/' + auth().currentUser.uid + '/Address')
        .child(key)
        .update({
          City: element.City,
          Huyen: element.Huyen,
          Main: false,
          NumberAddress: element.NumberAddress,
          Xa: element.Xa,
          Location: element.Location,
        });
    });
    setLoading(false);
  };
  useEffect(() => {
    console.log('address', address);
  }, [address]);
  functionsCounter.add(wardData);
  functionsCounter.add(districtData);
  functionsCounter.add(provinceData);
  functionsCounter.add(textInputAddress);
  functionsCounter.add(newAdd);
  functionsCounter.add(takeFrontID);
  functionsCounter.add(takeBackID);
  functionsCounter.add(submit);
  return (
    <RegisterStoreView
      isLoading={isLoading}
      step={step}
      data={data}
      name={name}
      des={des}
      address={address}
      frontID={frontID}
      backID={backId}
      visible={visible}
      check={check}
      loading={loading}
      setVisible={setVisible}
      setData={setData}
      setName={setName}
      setDes={setDes}
      setCheck={setCheck}
      textInputAddress={textInputAddress}
      wardData={wardData}
      provinceData={provinceData}
      districtData={districtData}
      saveChangesHandle={saveChangesHandle}
      setStep={setStep}
      newAdd={newAdd}
      takeFrontID={takeFrontID}
      takeBackID={takeBackID}
      submit={submit}
    />
  );
}
