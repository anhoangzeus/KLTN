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
  const [chooseImage, setChooseImage] = useState(false);
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
  functionsCounter.add(setChooseImage);
  functionsCounter.add(chooseImageLibrary);
  functionsCounter.add(chooseImageTake);
  return (
    <AddProductView
      chooseImage={chooseImage}
      setChooseImage={setChooseImage}
      chooseImageLibrary={chooseImageLibrary}
      chooseImageTake={chooseImageTake}
    />
  );
}
