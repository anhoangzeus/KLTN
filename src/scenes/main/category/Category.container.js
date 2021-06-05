/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { getIsFetchingByActionsTypeSelector } from 'appRedux/selectors/loadingSelector';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground, Text, TouchableOpacity,
  View,
} from 'react-native';
import styles from './Category.styles';
import CategoryView from './Category.view';
const functionsCounter = new Set();
const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);
// const {width} = Dimensions.get('screen');
export default function CategoryContainer({ navigation }) {
  const isLoading = useSelectorShallow(loadingSelector);
  const itemRef = database();

  const [numcart, setNumCart] = useState(0);
  const [listcate, setListCate] = useState([]);
  const [listbrand, setListBrand] = useState([]);
  const [listcontent, setListContent] = useState([]);
  const [listproduct, setListProduct] = useState([]);
  const [brandid, setBrandID] = useState('');
  const [numChat, setNumChat] = useState(0);
  const [categoryid, setCategoryID] = useState(
    'AIzaSyDSWIekvpvwQbRiGh4WF88H91tqFzL6OWI',
  );
  const [loading, setLoading] = useState(true);
  const [refesh, setRefesh] = useState(false);

  const BrandItem = ({ image, id }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => setBrandID(id)}
          style={styles.branditemContainer}>
          <Image source={{ uri: image }} style={styles.cateImage} />
        </TouchableOpacity>
      </View>
    );
  };
  const CategoryItem = ({ name, id, icon }) => {
    const colorText = id === categoryid ? '#6e3b6e' : '#1ba8ff';
    let iconpath = '../../../assets/icons/orther.png';
    switch (icon) {
      case 'orther':
        iconpath =
          'https://firebasestorage.googleapis.com/v0/b/doan-d2374.appspot.com/o/cateIcon%2Forther.png?alt=media&token=b47f965b-08b6-4988-aca1-51fcd31f0cab';
        break;
      case 'donglanh':
        iconpath =
          'https://firebasestorage.googleapis.com/v0/b/doan-d2374.appspot.com/o/cateIcon%2Fdonglanh.png?alt=media&token=c1edab19-309a-46ce-bc45-45a7b6a4bfff';
        break;
      case 'giavi':
        iconpath =
          'https://firebasestorage.googleapis.com/v0/b/doan-d2374.appspot.com/o/cateIcon%2Fgiavi.png?alt=media&token=52fa7a43-ddba-4713-b7fd-521dc2f9e298';
        break;
      case 'thucuong':
        iconpath =
          'https://firebasestorage.googleapis.com/v0/b/doan-d2374.appspot.com/o/cateIcon%2Fthucuong.png?alt=media&token=0242298d-8406-42b5-9b08-4c16633a7417';
        break;
      case 'anlien':
        iconpath =
          'https://firebasestorage.googleapis.com/v0/b/doan-d2374.appspot.com/o/cateIcon%2Fanlien.png?alt=media&token=c4bb7263-2916-4fbc-a213-d38d01a255f9';
        break;
      case 'saykho':
        iconpath =
          'https://firebasestorage.googleapis.com/v0/b/doan-d2374.appspot.com/o/cateIcon%2Fsaykho.png?alt=media&token=4c9928b5-6890-43a1-8e50-a4eb1dc5ed8f';
        break;
      case 'donghop':
        iconpath =
          'https://firebasestorage.googleapis.com/v0/b/doan-d2374.appspot.com/o/cateIcon%2Fdonghop.png?alt=media&token=bbd92ad8-083d-4e49-8a6e-0ff261e5f4dd';
        break;
      case 'chankhong':
        iconpath =
          'https://firebasestorage.googleapis.com/v0/b/doan-d2374.appspot.com/o/cateIcon%2Fchankhong.png?alt=media&token=766d5fca-e6f5-44ca-807f-ea1de55a061a';
    }
    return (
      <TouchableOpacity onPress={() => setCategoryID(id)}>
        <View style={styles.ViewImage}>
          <ImageBackground
            style={styles.ImageBack}
          // source={require('../../../assets/images/bg.png')}
          >
            {/* <Icons
              name={icon}
              color="#fff"
              size={width / 12}
              style={styles.cateIcon}
            /> */}
            <Image style={styles.ImageBack} source={{ uri: iconpath }} />
          </ImageBackground>
        </View>

        <Text style={styles.textSelect(colorText)}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const getCountChats = () => {
    database().ref('Chats').child(auth().currentUser.uid).on('value', snapshot => {
      var count = 0;
      snapshot.forEach((child) => {
        count += child.val().Status;
      });
      setNumChat(count);
    });
  };
  const getnumcart = () => {
    if (auth().currentUser) {
      itemRef.ref('Cart/' + auth().currentUser.uid).on('value', (snapshot) => {
        var dem = 0;
        snapshot.forEach(function (childSnapshot) {
          dem += childSnapshot.val().Quantity;
        });
        setNumCart(dem);
      });
    }
  };

  const GetAllBrand = () => {
    var items = [];
    itemRef
      .ref('/Brands')
      .once('value')
      .then((snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          items.push({
            image: childSnapshot.val().Image,
            id: childSnapshot.val().BrandID,
          });
        });
        setListBrand(items);
      });
  };

  const getListBanner = () => {
    itemRef
      .ref('Contents')
      .once('value')
      .then((snapshot) => {
        var items = [];
        snapshot.forEach((childSnapshot) => {
          items.push({
            id: childSnapshot.key,
            Detail: childSnapshot.val().Detail,
            Image: childSnapshot.val().Image,
            Name: childSnapshot.val().Name,
            Url: childSnapshot.val().Url,
          });
        });
        setListContent(items);
        setRefesh(false);
      });
  };
  const GetAllCate = () => {
    var items = [];
    itemRef
      .ref('/Catogorys')
      .orderByChild('Displayed')
      .once('value')
      .then((snapshot) => {
        snapshot.forEach(function (childSnapshot) {
          items.push({
            name: childSnapshot.val().Name,
            id: childSnapshot.val().CateProductID,
            icon: childSnapshot.val().Icon,
          });
        });
        setListCate(items);
        setLoading(false);
      });
  };
  const ListenForItemsSamsung = async () => {
    var items = [];
    itemRef
      .ref('/Products')
      .once('value')
      .then((snapshot) => {
        var Brandid = brandid;
        var cateid = categoryid;
        snapshot.forEach(function (childSnapshot) {
          if (Brandid === '') {
            if (cateid === '') {
              var point = 0;
              var count = 0;
              childSnapshot.child('Rating').forEach((child) => {
                point += child.val().Point;
                count++;
              });
              items.push({
                title: childSnapshot.val().Name,
                price: childSnapshot.val().Price,
                image: childSnapshot.val().Image,
                metades: childSnapshot.val().MetaDescription,
                id: childSnapshot.val().ProductID,
                rating: point / count,
                bough: count,
                BrandID: childSnapshot.val().BrandID,
                CategoryID: childSnapshot.val().CategoryID,
                PromotionPrice: childSnapshot.val().PromotionPrice,
              });
            } else {
              if (childSnapshot.val().CategoryID === cateid) {
                var point = 0;
                var count = 0;
                childSnapshot.child('Rating').forEach((child) => {
                  point += child.val().Point;
                  count++;
                });
                items.push({
                  title: childSnapshot.val().Name,
                  price: childSnapshot.val().Price,
                  image: childSnapshot.val().Image,
                  metades: childSnapshot.val().MetaDescription,
                  id: childSnapshot.val().ProductID,
                  rating: point / count,
                  bough: count,
                  BrandID: childSnapshot.val().BrandID,
                  CategoryID: childSnapshot.val().CategoryID,
                  PromotionPrice: childSnapshot.val().PromotionPrice,
                });
              }
            }
          } else {
            if (cateid === '') {
              if (childSnapshot.val().BrandID === brandid) {
                var point = 0;
                var count = 0;
                childSnapshot.child('Rating').forEach((child) => {
                  point += child.val().Point;
                  count++;
                });
                items.push({
                  title: childSnapshot.val().Name,
                  price: childSnapshot.val().Price,
                  image: childSnapshot.val().Image,
                  metades: childSnapshot.val().MetaDescription,
                  id: childSnapshot.val().ProductID,
                  rating: point / count,
                  bough: count,
                  BrandID: childSnapshot.val().BrandID,
                  CategoryID: childSnapshot.val().CategoryID,
                  PromotionPrice: childSnapshot.val().PromotionPrice,
                });
              }
            } else {
              if (
                childSnapshot.val().BrandID === brandid &&
                childSnapshot.val().CategoryID === cateid
              ) {
                var point = 0;
                var count = 0;
                childSnapshot.child('Rating').forEach((child) => {
                  point += child.val().Point;
                  count++;
                });
                items.push({
                  title: childSnapshot.val().Name,
                  price: childSnapshot.val().Price,
                  image: childSnapshot.val().Image,
                  metades: childSnapshot.val().MetaDescription,
                  id: childSnapshot.val().ProductID,
                  rating: point / count,
                  bough: count,
                  BrandID: childSnapshot.val().BrandID,
                  CategoryID: childSnapshot.val().CategoryID,
                  PromotionPrice: childSnapshot.val().PromotionPrice,
                });
              }
            }
          }
        });
        setListProduct(items);
        setLoading(false);
      });
  };
  const renderNofiCart = () => {
    if (numcart !== 0) {
      return (
        <View style={styles.cartView}>
          <Text style={styles.cartText} numberOfLines={1}>
            {numcart}
          </Text>
        </View>
      );
    }
  };
  const renderNumChat = () => {
    if (numChat !== 0) {
      return (
        <View style={{ ...styles.cartView, width: numChat > 99 ? 19 : 12 }}>
          <Text style={styles.cartText} numberOfLines={1}>
            {numChat > 99 ? '99+' : numChat}
          </Text>
        </View>
      );
    }
  };
  const _onRefresh = () => {
    setRefesh(true);
    setLoading(true);
    setBrandID('');
    setCategoryID('AIzaSyDSWIekvpvwQbRiGh4WF88H91tqFzL6OWI');
    getListBanner();
    ListenForItemsSamsung();
    GetAllBrand();
    GetAllCate();
    getnumcart();
    getCountChats();
  };
  const renderNull = () => {
    return (
      <TouchableOpacity
        style={styles.ContainerEmpty}
        onPress={() => {
          _onRefresh();
        }}>
        <Image source={''} style={styles.squareImage} />
        <Text style={styles.productNull}>Không có sản phẩm</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setLoading(true);
    ListenForItemsSamsung();
    GetAllBrand();
    GetAllCate();
    getListBanner();
    getnumcart();
    getCountChats();
  }, []);

  useEffect(() => {
    setLoading(true);
    ListenForItemsSamsung();
  }, [brandid, categoryid]);

  if (loading) {
    return (
      <View style={styles.screenContainer}>
        <LottieView
          source={require('../../../assets/images/loading.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  functionsCounter.add(BrandItem);
  functionsCounter.add(CategoryItem);
  functionsCounter.add(_onRefresh);
  functionsCounter.add(GetAllBrand);
  functionsCounter.add(getListBanner);
  functionsCounter.add(GetAllCate);
  functionsCounter.add(ListenForItemsSamsung);
  functionsCounter.add(renderNofiCart);
  functionsCounter.add(renderNull);
  functionsCounter.add(renderNumChat);

  return (
    <CategoryView
      isLoading={isLoading}
      BrandItem={BrandItem}
      CategoryItem={CategoryItem}
      _onRefresh={_onRefresh}
      GetAllBrand={GetAllBrand}
      getListBanner={getListBanner}
      GetAllCate={GetAllCate}
      ListenForItemsSamsung={ListenForItemsSamsung}
      renderNofiCart={renderNofiCart}
      renderNull={renderNull}
      renderNumChat={renderNumChat}
      listproduct={listproduct}
      refesh={refesh}
      listcate={listcate}
      categoryid={categoryid}
      listbrand={listbrand}
      listcontent={listcontent}
      loading={loading}
    />
  );
}
