import React, {useState, useEffect} from 'react';
import DetailStoreProduct from './DetailStoreProduct.view';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import ImageCropPicker from 'react-native-image-crop-picker';
import {launchCamera} from 'react-native-image-picker';
import {getParams} from 'utils/navigationServices';
import {chooseImageOptions} from '../../../utils/options';
import moment from 'moment';
// import I18n from 'utils/i18n';
// const NAMESPACE = 'common';
const functionsCounter = new Set();

export default function DetailStoreProductContainer({navigation, route}) {
  const {item} = getParams(route);
  const [image, setImage] = useState(
    item.item.MoreImage ? item.item.MoreImage.split('|') : item.item.Image,
  );
  const [name, setName] = useState(item.item.Name);
  const [des, setDes] = useState(item.item.Description);
  const [keyword, setKeyWord] = useState(item.item.MetaDescription);
  const [cate, setCate] = useState('');
  const [cateName, setCateName] = useState(item.item.CategoryID);
  const [price, setPrice] = useState(item.item.Price);
  const [warranty, setWarranty] = useState(item.item.Warranty);
  const [count, setCount] = useState(item.item.Count);
  const [sale, setSale] = useState(0);
  const [dataCate, setDataCate] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // const pairToSubmitImage = (response) => {
  //   if (response.didCancel) {
  //     console.log('ImagePicker', 'cancel');
  //   } else if (response.error) {
  //     console.log('ImagePickerError: ', response.error);
  //   } else {
  //     const data1 = new FormData();
  //     var fileName = '';
  //     if (Platform.OS === 'android') {
  //       var fileExt = response.uri.split('.');
  //       var fileName =
  //         'product' +
  //         moment().format('_YYYY_MM_DD_HH_mm_ss.') +
  //         fileExt[fileExt.length - 1];
  //     } else {
  //       var fileExt = response.uri.split('.');
  //       var fileName =
  //         'product' +
  //         moment().format('_YYYY_MM_DD_HH_mm_ss.') +
  //         fileExt[fileExt.length - 1];
  //     }
  //     data1.append('files', {
  //       name: fileName,
  //       type: response.type,
  //       uri:
  //         Platform.OS === 'android'
  //           ? response.uri
  //           : response.uri.replace('file://', '/private'),
  //     });
  //     data1.append('secret', '123456');
  //     setImage(response.uri);
  //     setFileName(response.filename);
  //     setData({...data, Avatar: response.uri, filename: fileName});

  //     setPopup(false);
  //   }
  // };
  const chooseImageTake = () => {
    launchCamera(chooseImageOptions, (response) => {
      //pairToSubmitImage(response);
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
    let arr = [];
    await database()
      .ref('Catogorys')
      .once('value')
      .then((snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          const items = {
            label: childSnapshot.val().Name,
            value: childSnapshot.val().CateProductID,
          };
          arr.push(items);
          if (childSnapshot.val().CateProductID === item.item.CategoryID) {
            console.log('name', childSnapshot.val().Name);
            setCateName(childSnapshot.val().Name);
          }
        });
      });
    setDataCate(arr);
    setIsLoading(false);
  };
  const Submit = async () => {
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
    console.log('list image push database', imgTemp);

    const x = parseInt(formprice);
    const y = parseInt(sale);
    const PromotionPrice = x - (x * y) / 100;
    var date = moment().subtract(10, 'days').calendar();
    var useID = auth().currentUser.uid;
    await database()
      .ref('ProductUser/' + item.item.ProductID)
      .set({
        CategoryID: cate,
        CreatedDate: date,
        Description: des,
        Image: imgTemp[0],
        MoreImage: moreimage,
        MetaDescription: keyword,
        Name: name,
        Price: formprice,
        Count: count,
        Status: true,
        UserID: useID,
        ProductID: item.item.ProductID,
        Warranty: warranty,
        PromotionPrice: PromotionPrice.toString(),
      })
      .then(() => {
        setIsSuccess(true);
      });
    setIsUpload(false);
    setTimeout(() => {
      setIsSuccess(false);
    }, 1000);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <DetailStoreProduct
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
