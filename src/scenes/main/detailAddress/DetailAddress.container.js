import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Picker } from '@react-native-picker/picker';
import { getIsFetchingByActionsTypeSelector } from 'appRedux/selectors/loadingSelector';
import SCENE_NAMES from 'constants/sceneName';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import I18n from 'utils/i18n';
import NavigationServices, { getParams } from 'utils/navigationServices';
import vn from '../../../../vn.json';
import DetailAddressView from './DetailAddress.view';
const NAMESPACE = 'common';
const functionsCounter = new Set();
const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);

export default function DetailAddressContainer({ navigation, route }) {
  const isLoading = useSelectorShallow(loadingSelector);
  const { content } = getParams(route);
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

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: getString(`${NAMESPACE}.title`),
  //   });
  // }, [navigation]);

  const CheckBoxChange = (val) => {
    if (data.Main === false) {
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
    if (val.trim().length === 10 || val.trim().length === 11 || val.trim().length === 12) {
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
    //L???y t???a ????? c???a x?? ph?????ng
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
                  child.ref.update({ Main: false });
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
              NavigationServices.navigate(SCENE_NAMES.MAIN),
              NavigationServices.navigate(SCENE_NAMES.AddRessScreen),
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
              NavigationServices.navigate(SCENE_NAMES.MAIN),
              NavigationServices.navigate(SCENE_NAMES.AddRessScreen),
            )
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
                  child.ref.update({ Main: false });
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
              NavigationServices.navigate(SCENE_NAMES.MAIN),
              NavigationServices.navigate(SCENE_NAMES.AddRessScreen),
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
              NavigationServices.navigate(SCENE_NAMES.MAIN),
              NavigationServices.navigate(SCENE_NAMES.AddRessScreen),
            )
            .catch();
        }
      }
    }
  };
  //L???y d??? li???u t???nh/tp t??? all.json
  const provinceData = () => {
    var items = [{ id: 0, name: I18n.t(`${NAMESPACE}.choosecity`) }, ...vn];
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
  //L???y d??? li???u qu???n t??? all.json
  const districtData = (pname) => {
    var items = [{ id: 0, name: I18n.t(`${NAMESPACE}.choosedistrict`) }];
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
  //L???y d??? li???u ph?????ng t??? all.json
  const wardData = (pname, dname) => {
    var items = [{ id: 0, name: I18n.t(`${NAMESPACE}.chooseprov`) }];
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
