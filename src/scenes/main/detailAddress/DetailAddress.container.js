import React, {useState, useLayoutEffect} from 'react';
import DetailAddressView from './DetailAddress.view';
import {View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import vn from '../../../../vn.json';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import {NAMESPACE} from './DetailAddress.constants';
import {getString} from 'utils/i18n';
import {getParams} from 'utils/navigationServices';
const functionsCounter = new Set();
const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);

export default function DetailAddressContainer({navigation, route}) {
  const isLoading = useSelectorShallow(loadingSelector);
  const {content} = getParams(route);
  console.log('content >>>>>>', content);
  const [data, setData] = React.useState({
    ListID: '',
    ShipName: '',
    ShipPhone: '',
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: getString(`${NAMESPACE}.title`),
    });
  }, [navigation]);

  const CheckBoxChange = (val) => {
    if (data.Main == false) {
      setData({
        ...data,
        Main: val,
      });
    }
  };
  const textInputFullName = (val) => {
    if (val.trim().length > 0) {
      setData({
        ...data,
        ShipName: val,
        check_textInputFullName: true,
      });
    } else {
      setData({
        ...data,
        ShipName: val,
        check_textInputFullName: false,
      });
    }
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
  const textInputPhone = (val) => {
    if (val.trim().length == 10) {
      setData({
        ...data,
        ShipPhone: val,
        check_textInputSDT: true,
      });
    } else {
      setData({
        ...data,
        ShipPhone: val,
        check_textInputSDT: false,
      });
    }
  };

  const handleClose = () => {
    setData({
      ...data,
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

  const saveChangesHandle = async () => {
    var location = '';
    //Lấy tọa độ của xã phường
    for (let i = 0; i < vn.length; i++) {
      if (vn[i].name == data.City) {
        for (let j = 0; j < vn[i].huyen.length; j++) {
          if (vn[i].huyen[j].name == data.Huyen) {
            for (let z = 0; z < vn[i].huyen[j].xa.length; z++) {
              if (vn[i].huyen[j].xa[z].name == data.Xa) {
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
      data.ShipName.length == 0 ||
      data.ShipPhone.length == 0 ||
      data.NumberAddress.length == 0 ||
      data.City === 'Chọn tỉnh/thành phố' ||
      data.Huyen === 'Chọn quận/huyện' ||
      data.Xa === 'Chọn xã/phường' ||
      data.City === '' ||
      data.Huyen === '' ||
      data.Xa === ''
    ) {
      setModalVisibleWarning(true, 'Bạn chưa điền đầy đủ thông tin');
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
            .then(
              navigation.navigate('App'),
              navigation.navigate('AddressScreen'),
            )
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
            .then(
              navigation.navigate('App'),
              navigation.navigate('AddressScreen'),
            )
            .catch();
        }
      } else {
        if (data.Main == true) {
          await database()
            .ref('ListAddress')
            .child(auth().currentUser.uid)
            .orderByChild('Main')
            .once('value')
            .then((snapshot) => {
              snapshot.forEach(function (child) {
                if (child != data.ListID) {
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
            .then(
              navigation.navigate('App'),
              navigation.navigate('AddressScreen'),
            )
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
            .then(
              navigation.navigate('App'),
              navigation.navigate('AddressScreen'),
            )
            .catch();
        }
      }
    }
  };
  //Lấy dữ liệu tỉnh/tp từ all.json
  const provinceData = () => {
    var items = [{id: 0, name: 'Chọn tỉnh/thành phố'}, ...vn];
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
    var items = [{id: 0, name: 'Chọn quận/huyện'}];
    if (pname != 'Chọn tỉnh/thành phố') {
      for (let i = 0; i < vn.length; i++) {
        if (vn[i].name == pname) {
          items = [...items, ...vn[i].huyen];
          i = vn.length;
        }
      }
    }
    return items.map((item, i) => {
      return <Picker.Item label={item.name} key={i} value={item.name} />;
    });
  };
  //Lấy dữ liệu phường từ all.json
  const wardData = (pname, dname) => {
    var items = [{id: 0, name: 'Chọn xã/phường'}];
    if (pname != 'Chọn tỉnh/thành phố' && dname != 'Chọn quận/huyện') {
      for (let i = 0; i < vn.length; i++) {
        if (vn[i].name == pname) {
          for (let j = 0; j < vn[i].huyen.length; j++) {
            if (vn[i].huyen[j].name == dname) {
              items = [...items, ...vn[i].huyen[j].xa];
              j = vn[i].huyen.length;
            }
          }
          i = vn.length;
        }
      }
    }
    return items.map((item, i) => {
      return <Picker.Item label={item.name} key={i} value={item.name} />;
    });
  };
  useState(() => {
    if (auth().currentUser.uid !== null && content) {
      database()
        .ref('ListAddress')
        .child(auth().currentUser.uid)
        .child(content)
        .once('value', (snapshot) => {
          setData({
            ...data,
            NumberAddress: snapshot.val().NumberAddress,
            ShipName: snapshot.val().ShipName,
            ShipPhone: snapshot.val().ShipPhone,
            City: snapshot.val().City,
            Huyen: snapshot.val().Huyen,
            Xa: snapshot.val().Xa,
            ListID: snapshot.val().ListID,
            Main: snapshot.val().Main,
          });
        });
      CheckBoxChange(data.Main);
    }
  });

  functionsCounter.add(wardData);
  functionsCounter.add(districtData);
  functionsCounter.add(provinceData);
  functionsCounter.add(saveChangesHandle);
  functionsCounter.add(textInputPhone);
  functionsCounter.add(textInputAddress);
  functionsCounter.add(textInputFullName);
  functionsCounter.add(CheckBoxChange);

  return (
    <DetailAddressView
      isLoading={isLoading}
      data={data}
      setData={setData}
      wardData={wardData}
      provinceData={provinceData}
      districtData={districtData}
      saveChangesHandle={saveChangesHandle}
      textInputAddress={textInputAddress}
      textInputPhone={textInputPhone}
      textInputFullName={textInputFullName}
      CheckBoxChange={CheckBoxChange}
    />
  );
}
