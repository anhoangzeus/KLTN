/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import CategoryView from './Category.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import styles from './Category.styles';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import NumberFormat from 'react-number-format';
import LottieView from 'lottie-react-native';
const functionsCounter = new Set();
const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);
const {width} = Dimensions.get('screen');
export default function CategoryContainer({navigation}) {
  const isLoading = useSelectorShallow(loadingSelector);
  const itemRef = database();

  const [numcart, setNumCart] = useState(0);
  const [listcate, setListCate] = useState([]);
  const [listbrand, setListBrand] = useState([]);
  const [listcontent, setListContent] = useState([]);
  const [listproduct, setListProduct] = useState([]);
  const [brandid, setBrandID] = useState('');
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
  const CategoryItem = ({name, id, icon}) => {
    const colorText = id === categoryid ? '#6e3b6e' : '#1ba8ff';
    return (
      <TouchableOpacity onPress={() => setCategoryID(id)}>
        <View style={styles.ViewImage}>
          <ImageBackground
            style={styles.ImageBack}
            source={require('../../../assets/images/bg.png')}>
            <Icons
              name={icon}
              color="#fff"
              size={width / 12}
              style={styles.cateIcon}
            />
          </ImageBackground>
        </View>

        <Text style={styles.textSelect(colorText)}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const ReactNativeNumberFormat = ({value}) => {
    return (
      <NumberFormat
        value={value}
        displayType={'text'}
        thousandSeparator={true}
        renderText={(formattedValue) => <Text>{formattedValue} đ</Text>}
      />
    );
  };

  const ProductItem = ({image, name, price, rating, bough, PromotionPrice}) => (
    <View style={styles.itemContainer}>
      <Image source={{uri: image}} style={styles.itemImage} />
      <Text style={styles.itemName} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.itemPrice}>
        <ReactNativeNumberFormat value={price} />
        {price === PromotionPrice ? null : (
          // eslint-disable-next-line react-native/no-inline-styles
          <Text style={{color: 'red'}}>
            {' '}
            -{(((PromotionPrice - price) / PromotionPrice) * 100).toFixed(0)}%
          </Text>
        )}
      </Text>
      <View style={styles.view}>
        {/* {RatingUI(rating)} */}
        {bough !== 0 ? <Text style={styles.greenText}>({bough})</Text> : null}
      </View>
    </View>
  );

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
    if (numcart === 0) {
      return null;
    } else {
      return (
        <View style={styles.cartView}>
          <Text style={styles.cartText} numberOfLines={1}>
            {numcart}
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
  functionsCounter.add(getnumcart);
  functionsCounter.add(_onRefresh);
  functionsCounter.add(GetAllBrand);
  functionsCounter.add(getListBanner);
  functionsCounter.add(GetAllCate);
  functionsCounter.add(ListenForItemsSamsung);
  functionsCounter.add(renderNofiCart);
  functionsCounter.add(renderNull);
  functionsCounter.add(ProductItem);

  return (
    <CategoryView
      isLoading={isLoading}
      BrandItem={BrandItem}
      CategoryItem={CategoryItem}
      getnumcart={getnumcart}
      _onRefresh={_onRefresh}
      GetAllBrand={GetAllBrand}
      getListBanner={getListBanner}
      GetAllCate={GetAllCate}
      ListenForItemsSamsung={ListenForItemsSamsung}
      renderNofiCart={renderNofiCart}
      renderNull={renderNull}
      ProductItem={ProductItem}
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
