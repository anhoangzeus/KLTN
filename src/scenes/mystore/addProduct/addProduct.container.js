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
import storage from '@react-native-firebase/storage';
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
  const [image, setImage] = useState(
    'https://thailamlandscape.vn/wp-content/uploads/2017/10/no-image.png',
  );
  const [fileName, setFileName] = useState('');
  const [name, setName] = useState('');
  const [des, setDes] = useState('');
  const [keyword, setKeyWord] = useState('');
  const [cate, setCate] = useState('');
  const [cateName, setCateName] = useState('chọn danh mục');
  const [price, setPrice] = useState('0');
  const [warranty, setWarranty] = useState(0);
  const [count, setCount] = useState(0);
  const [sale, setSale] = useState(0);
  const [dataCate, setDataCate] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [popup, setPopup] = useState(false);
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
          'product' +
          moment().format('_YYYY_MM_DD_HH_mm_ss.') +
          fileExt[fileExt.length - 1];
      } else {
        var fileExt = response.uri.split('.');
        var fileName =
          'product' +
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
      setImage(response.uri);
      setFileName(response.filename);
      setData({...data, Avatar: response.uri, filename: fileName});

      setPopup(false);
    }
    console.log('image được chọn:', image);
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
  const Submit = async () => {
    console.log('price: ', price);
    console.log('warranty: ', warranty);
    console.log('count: ', count);
    console.log('sale: ', sale);
    console.log('category', cate);
    const task = storage()
      .ref('product/' + fileName)
      .putFile(image);
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    const url = await storage()
      .ref('products/' + data.filename)
      .getDownloadURL();

    console.log(url);
    var date = moment().subtract(10, 'days').calendar();
    var useID = auth().currentUser.uid;
    database()
      .ref('ProductUser')
      .child(auth().currentUser.uid)
      .push({
        CategoryID: cate,
        CreatedDate: date,
        Description: des,
        Image: url,
        MetaDescription: keyword,
        Name: name,
        Price: price,
        Status: true,
        UserID: useID,
      })
      .then(console.log('thêm sản phẩm thành công'));
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
  functionsCounter.add(Submit);
  return (
    <AddProductView
      //chooseImage={chooseImage}
      // setChooseImage={setChooseImage}
      chooseImageLibrary={chooseImageLibrary}
      chooseImageTake={chooseImageTake}
      onChangeDes={onChangeDes}
      onChangeKeyWord={onChangeKeyWord}
      onChangeName={onChangeName}
      Submit={Submit}
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
      popup={popup}
      image={image}
      setPopup={setPopup}
      setCate={setCate}
      setCateName={setCateName}
      setCount={setCount}
      setPrice={setPrice}
      setSale={setSale}
      setWarranty={setWarranty}
    />
  );
}
