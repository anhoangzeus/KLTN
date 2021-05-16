/* eslint-disable no-unused-vars */
import React, {useCallback, useState, useEffect} from 'react';
import {Platform} from 'react-native';
import AddProductView from './addProduct.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import NavigationServices, {getParams} from 'utils/navigationServices';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {chooseImageOptions} from '../../../utils/options';
import moment from 'moment';
import {func} from 'prop-types';
import {constant} from 'lodash-es';
const functionsCounter = new Set();

export default function AddProductContainer({navigation}) {
  const [data, setData] = useState({
    image: '',
    name: '',
    des: '',
    cate: '',
    price: '',
    ship: '',
    info: '',
    sale: '',
  });
  const [name, setName] = useState('');
  const [des, setDes] = useState('');
  const [keyword, setKeyWord] = useState('');
  const [cate, setCate] = useState('');
  const [cateName, setCateName] = useState('chọn danh mục');
  const [price, setPrice] = useState(0);
  const [warranty, setWarranty] = useState(0);
  const [count, setCount] = useState(0);
  const [sale, setSale] = useState(0);
  const [dataCate, setDataCate] = useState([]);
  const [isloading, setIsLoading] = useState(true);
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

  const getDataCate = async () => {
    let arr = new Array();
    await database()
      .ref('Catogorys')
      .once('value')
      .then((snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          const item = {
            label: childSnapshot.val().Name,
            value: childSnapshot.val().CateProductID,
          };
          arr.push(item);
        });
      });
    setDataCate(arr);
    setIsLoading(false);
  };

  const onChangeName = (text) => {
    setName(text);
  };
  const onChangeDes = (text) => {
    setDes(text);
  };
  const onChangeKeyWord = (text) => {
    setKeyWord(text);
  };
  useEffect(() => {
    getDataCate();
  }, []);
  //functionsCounter.add(setChooseImage);
  functionsCounter.add(chooseImageLibrary);
  functionsCounter.add(chooseImageTake);
  functionsCounter.add(onChangeName);
  functionsCounter.add(onChangeDes);
  functionsCounter.add(onChangeKeyWord);
  functionsCounter.add(setCate);
  functionsCounter.add(setCateName);
  return (
    <AddProductView
      //chooseImage={chooseImage}
      // setChooseImage={setChooseImage}
      chooseImageLibrary={chooseImageLibrary}
      chooseImageTake={chooseImageTake}
      onChangeDes={onChangeDes}
      onChangeKeyWord={onChangeKeyWord}
      onChangeName={onChangeName}
      name={name}
      des={des}
      keyword={keyword}
      cate={cate}
      price={price}
      warranty={warranty}
      count={count}
      sale={sale}
      dataCate={dataCate}
      cateName={cateName}
      isloading={isloading}
      setCate={setCate}
      setCateName={setCateName}
    />
  );
}
