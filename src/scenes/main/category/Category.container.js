/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './Category.styles';
import CategoryView from './Category.view';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
const functionsCounter = new Set();
const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);
// const {width} = Dimensions.get('screen');
export default function CategoryContainer({navigation}) {
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

  const BrandItem = ({image, id}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => setBrandID(id)}
          style={styles.branditemContainer}>
          <Image source={{uri: image}} style={styles.cateImage} />
        </TouchableOpacity>
      </View>
    );
  };
  const CategoryItem = (item) => {
    console.log('data category: ', item);
    const colorText =
      item.item.CateProductID === categoryid ? '#6e3b6e' : '#1ba8ff';

    return (
      <TouchableOpacity onPress={() => setCategoryID(item.item.CateProductID)}>
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
            <Image style={styles.ImageBack} source={{uri: item.item.Icon}} />
          </ImageBackground>
        </View>

        <Text style={styles.textSelect(colorText)}>{item.item.Name}</Text>
      </TouchableOpacity>
    );
  };

  const getCountChats = () => {
    if (auth().currentUser) {
      database()
        .ref('Chats')
        .child(auth().currentUser.uid)
        .on('value', (snapshot) => {
          var count = 0;
          snapshot.forEach((child) => {
            count += child.val().Status;
          });
          setNumChat(count);
        });
    }
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
            Name: childSnapshot.val().Name,
            CateProductID: childSnapshot.val().CateProductID,
            Icon: childSnapshot.val().Icon,
          });
        });
        setListCate(items);
        setLoading(false);
      });
  };
  const ListenForItemsSamsung = async () => {
    let items = [];
    await itemRef
      .ref('/Products')
      .once('value')
      .then((snapshot) => {
        var cateid = categoryid;
        snapshot.forEach(function (childSnapshot) {
          if (cateid === '') {
            var point = 0;
            var count = 0;
            childSnapshot.child('Rating').forEach((child) => {
              point += child.val().Point;
              count++;
            });
            items.push({
              Name: childSnapshot.val().Name,
              Price: childSnapshot.val().Price,
              Image: childSnapshot.val().Image,
              MetaDescription: childSnapshot.val().MetaDescription,
              ProductID: childSnapshot.val().ProductID,
              rating: point / count,
              bough: count,
              CategoryID: childSnapshot.val().CategoryID,
              PromotionPrice: childSnapshot.val().PromotionPrice,
              Warranty: childSnapshot.val().Warranty,
              Counts: childSnapshot.val().Counts,
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
                Name: childSnapshot.val().Name,
                Price: childSnapshot.val().Price,
                Image: childSnapshot.val().Image,
                MetaDescription: childSnapshot.val().MetaDescription,
                ProductID: childSnapshot.val().ProductID,
                rating: point / count,
                bough: count,
                CategoryID: childSnapshot.val().CategoryID,
                PromotionPrice: childSnapshot.val().PromotionPrice,
                Warranty: childSnapshot.val().Warranty,
                Counts: childSnapshot.val().Counts,
              });
            }
          }
        });
      });
    await itemRef
      .ref('/ProductUser')
      .once('value')
      .then((snapshot) => {
        var cateid = categoryid;
        snapshot.forEach(function (childSnapshot) {
          if (cateid === '') {
            var point = 0;
            var count = 0;
            childSnapshot.child('Rating').forEach((child) => {
              point += child.val().Point;
              count++;
            });
            items.push({
              Name: childSnapshot.val().Name,
              Price: childSnapshot.val().Price,
              Image: childSnapshot.val().Image,
              MetaDescription: childSnapshot.val().MetaDescription,
              ProductID: childSnapshot.val().ProductID,
              rating: point / count,
              bough: count,
              CategoryID: childSnapshot.val().CategoryID,
              PromotionPrice: childSnapshot.val().PromotionPrice,
              Warranty: childSnapshot.val().Warranty,
              Counts: childSnapshot.val().Count,
              UserID: true,
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
                Name: childSnapshot.val().Name,
                Price: childSnapshot.val().Price,
                Image: childSnapshot.val().Image,
                MetaDescription: childSnapshot.val().MetaDescription,
                ProductID: childSnapshot.val().ProductID,
                rating: point / count,
                bough: count,
                CategoryID: childSnapshot.val().CategoryID,
                PromotionPrice: childSnapshot.val().PromotionPrice,
                Warranty: childSnapshot.val().Warranty,
                Counts: childSnapshot.val().Count,
                UserID: childSnapshot.val().UserID
                  ? childSnapshot.val().UserID
                  : null,
              });
            }
          }
        });
      });
    setListProduct(items);
    setLoading(false);
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
        <View style={{...styles.cartView, width: numChat > 99 ? 19 : 12}}>
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
        <Text style={styles.productNull}> {I18n.t(`${NAMESPACE}.null`)}</Text>
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
