import React, {useState} from 'react';
import RegisterStoreView from './RegisterStore.view';
import {Picker} from '@react-native-picker/picker';
import {Platform, View} from 'react-native';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
// import {launchCamera} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import vn from '../../../../vn.json';
import I18n from 'utils/i18n';
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

  const handleClose = () => {
    setData({
      ...data,
      modalVisibleWarning: false,
    });
  };
  const newAdd = () => {
    if (
      data.City !== '' &&
      data.Huyen !== '' &&
      data.Xa &&
      data.NumberAddress !== ''
    ) {
      let arr = address;
      arr.push(data);
      setAddress(arr);
      setVisible(false);
    }
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
    var location = '';
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
    if (auth().currentUser.uid !== null) {
      if (data.ListID === '') {
        if (data.Main === true) {
          await database()
            .ref('ListAddress')
            .child(auth().currentUser.uid)
            .orderByChild('Main')
            .once('value')
            .then((snapshot) => {
              snapshot.forEach(function (child) {
                if (child !== data.ListID) {
                  child.ref.update({Main: false});
                }
              });
            });
          var newPostKey = database()
            .ref()
            .child('ListAddress')
            .child(auth().currentUser.uid)
            .push().key;
          database()
            .ref('ListAddress')
            .child(auth().currentUser.uid)
            .child(newPostKey)
            .set({
              ListID: newPostKey,
              ShipName: data.ShipName,
              ShipPhone: data.ShipPhone,
              City: data.City,
              Huyen: data.Huyen,
              Xa: data.Xa,
              NumberAddress: data.NumberAddress,
              Main: true,
              Location: location,
            })
            .then()
            .catch();
        } else {
          var newPostKey = database()
            .ref()
            .child('ListAddress')
            .child(auth().currentUser.uid)
            .push().key;
          database()
            .ref('ListAddress')
            .child(auth().currentUser.uid)
            .child(newPostKey)
            .set({
              ListID: newPostKey,
              ShipName: data.ShipName,
              ShipPhone: data.ShipPhone,
              City: data.City,
              Huyen: data.Huyen,
              Xa: data.Xa,
              NumberAddress: data.NumberAddress,
              Main: false,
              Location: location,
            })
            .then()
            .catch();
        }
      } else {
        if (data.Main === true) {
          await database()
            .ref('ListAddress')
            .child(auth().currentUser.uid)
            .orderByChild('Main')
            .once('value')
            .then((snapshot) => {
              snapshot.forEach(function (child) {
                if (child !== data.ListID) {
                  child.ref.update({Main: false});
                }
              });
            });
          database()
            .ref('ListAddress')
            .child(auth().currentUser.uid)
            .child(data.ListID)
            .update({
              ShipName: data.ShipName,
              ShipPhone: data.ShipPhone,
              City: data.City,
              Huyen: data.Huyen,
              Xa: data.Xa,
              NumberAddress: data.NumberAddress,
              Main: true,
              Location: location,
            })
            .then()
            .catch();
        } else {
          database()
            .ref('ListAddress')
            .child(auth().currentUser.uid)
            .child(data.ListID)
            .update({
              ShipName: data.ShipName,
              ShipPhone: data.ShipPhone,
              City: data.City,
              Huyen: data.Huyen,
              Xa: data.Xa,
              NumberAddress: data.NumberAddress,
              Main: data.Main,
              Location: location,
            })
            .then()
            .catch();
        }
      }
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
      console.log(image);
      setFrontID(image.path);
    });
  };
  const takeBackID = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 300,
      cropping: true,
    }).then((image) => {
      console.log(image);
      setBackID(image.path);
    });
  };
  functionsCounter.add(wardData);
  functionsCounter.add(districtData);
  functionsCounter.add(provinceData);
  functionsCounter.add(textInputAddress);
  functionsCounter.add(newAdd);
  functionsCounter.add(takeFrontID);
  functionsCounter.add(takeBackID);
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
      setVisible={setVisible}
      setData={setData}
      setName={setName}
      setDes={setDes}
      textInputAddress={textInputAddress}
      wardData={wardData}
      provinceData={provinceData}
      districtData={districtData}
      saveChangesHandle={saveChangesHandle}
      setStep={setStep}
      newAdd={newAdd}
      takeFrontID={takeFrontID}
      takeBackID={takeBackID}
    />
  );
}
