/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import AddProductView from './addProduct.view';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import ImageCropPicker from 'react-native-image-crop-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {chooseImageOptions} from '../../../utils/options';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import moment from 'moment';
import I18n from 'utils/i18n';
var axios = require('axios');
const NAMESPACE = 'common';
const functionsCounter = new Set();

export default function AddProductContainer({navigation, route}) {
  const {Avatar, FullName} = NavigationServices.getParams(route);
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
  const [image, setImage] = useState([
    'https://pics.freeicons.io/uploads/icons/png/8050029891556279743-512.png',
  ]);
  const [fileName, setFileName] = useState('');
  const [name, setName] = useState('');
  const [des, setDes] = useState('');
  const [keyword, setKeyWord] = useState('');
  const [cate, setCate] = useState('');
  const [cateName, setCateName] = useState(I18n.t(`${NAMESPACE}.chooseCate`));
  const [price, setPrice] = useState('0');
  const [warranty, setWarranty] = useState(0);
  const [count, setCount] = useState(0);
  const [sale, setSale] = useState(0);
  const [dataCate, setDataCate] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [popup, setPopup] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const pairToSubmitImage = (response) => {
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
  };
  const chooseImageTake = () => {
    launchCamera(chooseImageOptions, (response) => {
      pairToSubmitImage(response);
    });
  };

  const chooseImageLibrary = () => {
    // launchImageLibrary(chooseImageOptions, (response) => {
    //   pairToSubmitImage(response);
    // });
    ImageCropPicker.openPicker({
      height: 50,
      width: 50,
      multiple: true,
      mediaType: 'photo',
    }).then((images) => {
      let arr = [];
      Promise.all(
        images.map((response, index) => {
          arr.push(response.path);
        }),
      );
      setPopup(false);
      setImage(arr);
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

  const sendNotification = async (noti) => {
    let arr = [];
    let storeName = '';
    await database()
      .ref('Brief/' + auth().currentUser.uid)
      .once('value')
      .then((snapshot) => {
        storeName = snapshot.val().StoreName;
      });
    await database()
      .ref('Brief/' + auth().currentUser.uid + '/Follow')
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnap) => {
          childSnap.forEach((childSnapshot) => {
            arr.push(childSnapshot.key);
          });
        });
      });
    axios
      .post(
        'https://fcm.googleapis.com/fcm/send',
        {
          registration_ids: arr,
          notification: {
            title: storeName + ' đã thêm một sản phẩm mới',
            text:
              storeName + ' đã thêm một sản phẩm mới. Hãy tới xem ngay nào !',
            sound: 'default',
            badge: 69,
            targetModule: 'PRODUCT',
            item: noti,
          },
          data: {
            title: storeName + ' đã thêm một sản phẩm mới',
            text:
              storeName + ' đã thêm một sản phẩm mới. Hãy tới xem ngay nào !',
            badge: 69,
            targetModule: 'PRODUCT',
            targetId: 2082,
            item: noti,
          },
          priority: 'high',
          android: {
            priority: 'high',
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'key=AAAA2WbinkI:APA91bElJuMpVXvMJaacwBdPh-hNdfrHQ7rUKCOUjS86d4uxaUk8kNN5fsaymjDR7duhoSApGFOyuby-dTO7sTKvXYjrss-W2cYtlC7SEm_6hAHFhkB-H958DbVWJEYAjNZKgBvRr1ja',
          },
        },
      )
      .then((response) => console.log('gửi thông báo thành công'))
      .catch((err) => console.log(err));
  };

  const Submit = async () => {
    if (
      cate === '' ||
      name === '' ||
      des === '' ||
      keyword === '' ||
      price === '0'
    ) {
      setIsUpload(false);
      return;
    }
    setIsUpload(true);
    var formprice = price.replace(/\s/g, '');
    formprice = formprice.replace(',', '');
    let imgTemp = [];
    let moreimage = '';
    await Promise.all(
      image.map(async (response, index) => {
        var fileExt = response.split('.');
        var fileNames =
          moment().format('_YYYY_MM_DD_HH_mm_ss') +
          `_${index}.` +
          fileExt[fileExt.length - 1];
        await storage()
          .ref('product/' + fileNames)
          .putFile(response);
        const url = await storage()
          .ref('product/' + fileNames)
          .getDownloadURL();
        imgTemp.push(url);
        moreimage += url + '|';
      }),
    );

    const x = parseInt(formprice, 10);
    const y = parseInt(sale, 10);
    const PromotionPrice = x - (x * y) / 100;
    var date = moment().subtract(10, 'days').calendar();
    var useID = auth().currentUser.uid;
    var keyDetail = database().ref('ProductUser').child(useID).push().key;
    await database()
      .ref('ProductUser/' + keyDetail)
      .set({
        CategoryID: cate,
        CreatedDate: date,
        Description: des,
        Image: imgTemp[0],
        Images: moreimage,
        MetaDescription: keyword,
        Name: name,
        Price: formprice,
        Count: parseInt(count, 10),
        Status: true,
        UserID: useID,
        ProductID: keyDetail,
        Warranty: warranty,
        PromotionPrice: PromotionPrice.toString(),
      })
      .then(() => {
        setIsSuccess(true);
      });
    setIsUpload(false);
    setTimeout(() => {
      setIsSuccess(false);
      NavigationServices.replace(SCENE_NAMES.STORE_PRODUCT, {
        FullName: FullName,
        Avatar: Avatar,
      });
    }, 1000);
    const noti = {
      CategoryID: cate,
      CreatedDate: date,
      Description: des,
      Image: imgTemp[0],
      Images: moreimage,
      MetaDescription: keyword,
      Name: name,
      Price: formprice,
      Count: parseInt(count, 10),
      Status: true,
      UserID: useID,
      ProductID: keyDetail,
      Warranty: warranty,
      PromotionPrice: PromotionPrice.toString(),
    };
    sendNotification(noti);
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
  functionsCounter.add(sendNotification);
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
      isUpload={isUpload}
      isSuccess={isSuccess}
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
