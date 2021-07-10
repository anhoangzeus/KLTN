/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useLayoutEffect, useEffect, useState} from 'react';
import {View, Text, Animated} from 'react-native';
import SellerproductView from './Sellerproduct.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import {NAMESPACE} from './Sellerproduct.constants';
import {getString} from 'utils/i18n';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import NavigationServices, {getParams} from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import styles from './Sellerproduct.styles';

const functionsCounter = new Set();
const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);

export default function SellerproductContainer({navigation, route}) {
  const isLoading = useSelectorShallow(loadingSelector);
  const {item} = getParams(route);

  console.log('item naviagte: ', item);
  const itemRef = database();

  const [numcart, setnumcart] = useState(0);
  const decription = item.MetaDescription;
  const image = item.Image;
  const name = item.Name;
  const UserID = item.UserID;
  const price = item.Price;
  const count = item.Counts;
  const waranty = item.Warranty;
  const promotionprice = item.PromotionPrice;
  const metadescription = item.MetaDescription;
  const rating = item.rating;
  const [listproductlienquan, setlistproductlienquan] = useState([]);
  const [listmoreimage, setlistmoreimage] = useState(
    item.Images ? item.Images : [],
  );
  const [listcomment, setlistcomment] = useState([]);
  const [idsanpham, setidsanpham] = useState(item.ProductID);
  const [listcart, setlistcart] = useState([]);
  const [modalvisible, setmodalvisible] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));
  const [isloading, setisloading] = useState(false);
  const [categoryname, setcategoryname] = useState('');

  const [bough, setbough] = useState(0);
  const [sao1, setsao1] = useState(0);
  const [sao2, setsao2] = useState(0);
  const [sao3, setsao3] = useState(0);
  const [sao4, setsao4] = useState(0);
  const [sao5, setsao5] = useState(0);
  const [sellerinfo, setSellerInfo] = useState({});
  const [sellerProd, setSellerProd] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: getString(`${NAMESPACE}.title`),
    });
  }, [navigation]);

  const getNameBrandCate = () => {
    itemRef
      .ref('/Catogorys/' + item.CategoryID)
      .once('value')
      .then((snapshot) => {
        setcategoryname(snapshot.val().Name);
      });
  };

  const getnumcart = () => {
    if (auth().currentUser) {
      database()
        .ref('Cart/' + auth().currentUser.uid)
        .on('value', (snapshot) => {
          var dem = 0;
          snapshot.forEach(function (childSnapshot) {
            dem += childSnapshot.val().Quantity;
          });
          setnumcart(dem);
        });
    }
  };
  const getItemRespon = () => {
    var Category_ID = item.CategoryID;
    var ProductID = idsanpham;
    database()
      .ref('/Products')
      .once('value')
      .then((snapshot) => {
        var items = [];
        snapshot.forEach(function (childSnapshot) {
          if (childSnapshot.val().ProductID !== ProductID) {
            if (childSnapshot.val().CategoryID === Category_ID) {
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
                Description: childSnapshot.val().Description,
                Warranty: childSnapshot.val().Warranty,
                ProductID: childSnapshot.val().ProductID,
                Counts: childSnapshot.val().Counts,
                rating: point / count,
                count: count,
                BrandID: childSnapshot.val().BrandID,
                CategoryID: childSnapshot.val().CategoryID,
                PromotionPrice: childSnapshot.val().PromotionPrice,
                UserID: childSnapshot.val().UserID
                  ? childSnapshot.val().UserID
                  : null,
              });
            }
          }
        });
        setlistproductlienquan(items);
      });
  };
  const getData = async () => {
    var ImageItems = [];
    database()
      .ref('/ProductUser/' + idsanpham)
      .once('value')
      .then((snapshot) => {
        var _sao1 = 0;
        var _sao2 = 0;
        var _sao3 = 0;
        var _sao4 = 0;
        var _sao5 = 0;
        var count = 0;
        var items = [];
        snapshot.child('Rating').forEach((child) => {
          if (child.val().Point === '1') {
            _sao1++;
          } else if (child.val().Point === 2) {
            _sao2++;
          } else if (child.val().Point === 3) {
            _sao3++;
          } else if (child.val().Point === 4) {
            _sao4++;
          } else if (child.val().Point === 5) {
            _sao5++;
          }
          count++;
          items.push({
            Avatar: child.val().Avatar,
            Comment: child.val().Comment,
            Date: child.val().Date,
            Point: child.val().Point,
            UserName: child.val().UserName,
          });
        });
        // setdecription(snapshot.val().Description);
        // setimage(snapshot.val().Image);
        // setname(snapshot.val().Name);
        // setprice(snapshot.val().Price);
        // setUserID(snapshot.val().UserID);
        // setwaranty(snapshot.val().Warranty);
        // setmetadescription(snapshot.val().MetaDescription);
        // setpromotionprice(snapshot.val().PromotionPrice);
        // setCount(snapshot.val().Count);
        //setrating(point / count);
        setlistcomment(items);
        setbough(count);
        setsao1(_sao1);
        setsao2(_sao2);
        setsao3(_sao3);
        setsao4(_sao4);
        setsao5(_sao5);
        //ImageItems.push(snapshot.val().Image);
      });
    await database()
      .ref('/ProductUser/' + idsanpham)
      .once('value')
      .then((snapshot) => {
        snapshot.val().MoreImage
          ? (ImageItems = snapshot.val().MoreImage.split('|'))
          : ImageItems.push(snapshot.val().Image);
      });
    setlistmoreimage(ImageItems);
    setisloading(false);
  };

  const GetCartData = () => {
    if (auth().currentUser) {
      database()
        .ref('Cart/' + auth().currentUser.uid)
        .once('value')
        .then((snapshot) => {
          var items = [];
          snapshot.forEach(function (childSnapshot) {
            var product = {
              key: '',
              Id: '',
              Name: '',
              Picture: '',
              Price: '',
              Quantity: 0,
            };
            product.key = childSnapshot.key;
            product.Id = childSnapshot.val().Id;
            product.Name = childSnapshot.val().Name;
            product.Picture = childSnapshot.val().Picture;
            product.Price = childSnapshot.val().Price;
            product.Quantity = childSnapshot.val().Quantity;
            items.push(product);
          });
          setlistcart(items);
        });
    }
  };
  const renderNofiCart = () => {
    if (numcart === 0) {
      return null;
    } else {
      return (
        <View style={styles.cartposition}>
          <Text style={{color: 'white'}}>{numcart}</Text>
        </View>
      );
    }
  };

  const handleClose = () => {
    setmodalvisible(false);
  };
  const setModalVisible = (visible) => {
    if (auth().currentUser) {
      setmodalvisible(visible);
      setTimeout(() => handleClose(), 2500);
    }
  };
  const addCart = () => {
    const Id_Item = idsanpham;
    var key;
    var product = {
      image: 'https://i.ibb.co/dj6fBrX/empty.jpg',
      Name: '',
      Price: '',
      ProductID: '',
      Quantity: 0,
      uid: '',
    };
    var temp = 0;
    listcart.forEach(function (element) {
      if (element.Id === Id_Item) {
        element.Quantity += 1;
        temp += 1;
        product.image = element.Picture;
        product.Name = element.Name;
        key = element.key;
        product.Price = element.Price;
        product.ProductID = element.Id;
        product.Quantity = element.Quantity;
        product.UserID = element.UserID;
      }
    });
    if (auth().currentUser !== null) {
      if (temp === 0) {
        database()
          .ref('/Cart/' + auth().currentUser.uid)
          .child(item.ProductID)
          .set({
            Id: item.ProductID,
            CategoryID: item.CategoryID,
            CategoryName: categoryname,
            Name: name,
            Picture: image,
            Price: price,
            Quantity: 1,
            UserID: item.UserID,
          });
      } else {
        database()
          .ref('/Cart/' + auth().currentUser.uid + '/' + key)
          .set({
            Id: product.ProductID,
            CategoryID: item.CategoryID,
            CategoryName: categoryname,
            Name: product.Name,
            Picture: product.image,
            Price: product.Price,
            Quantity: product.Quantity,
            UserID: item.UserID,
          });
      }
      GetCartData();
    } else {
      NavigationServices.navigate(SCENE_NAMES.TopStackLogin);
    }
    setModalVisible(true);
  };
  const setID = (idpro) => {
    setidsanpham(idpro);
  };

  const getSeller = () => {
    database()
      .ref('/Users/' + UserID)
      .once('value')
      .then((snapshot) => {
        var info = {
          Avatar: snapshot.val().Avatar,
          FullName: snapshot.val().FullName,
          UserID: snapshot.val().UserID,
        };
        setSellerInfo(info);
      });
  };
  const getSellerProduct = () => {
    database()
      .ref('/ProductUser/')
      .once('value')
      .then((snapshot) => {
        const items = [];
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.val().UserID === UserID && items.length < 7) {
            let point = 0;
            let count = 0;
            snapshot.child('Rating').forEach((child) => {
              point += child.val().Point;
              count++;
            });
            items.push({
              Name: childSnapshot.val().Name,
              Price: childSnapshot.val().Price,
              Image: childSnapshot.val().Image,
              MetaDescription: childSnapshot.val().MetaDescription,
              Description: childSnapshot.val().Description,
              Warranty: childSnapshot.val().Warranty,
              Counts: childSnapshot.val().Counts,
              ProductID: childSnapshot.val().ProductID,
              rating: point / count,
              count: count,
              BrandID: childSnapshot.val().BrandID,
              CategoryID: childSnapshot.val().CategoryID,
              PromotionPrice: childSnapshot.val().PromotionPrice,
              UserID: childSnapshot.val().UserID
                ? childSnapshot.val().UserID
                : null,
            });
          }
        });
        setSellerProd(items);
      });
  };

  useEffect(() => {
    async function get() {
      await getData();
      await getNameBrandCate();
      await getItemRespon();
      await GetCartData();
      await getnumcart();
      await getSeller();
      await getSellerProduct();
    }
    get();
  }, []);

  // useEffect(() => {
  //   getData();
  //   getItemRespon();
  // }, [idsanpham]);

  functionsCounter.add(handleClose);
  functionsCounter.add(setModalVisible);
  functionsCounter.add(renderNofiCart);
  functionsCounter.add(GetCartData);
  functionsCounter.add(getData);
  functionsCounter.add(getItemRespon);
  functionsCounter.add(addCart);
  functionsCounter.add(getNameBrandCate);
  functionsCounter.add(getnumcart);
  functionsCounter.add(setID);

  return (
    <SellerproductView
      isloading={isloading}
      handleClose={handleClose}
      setModalVisible={setModalVisible}
      renderNofiCart={renderNofiCart}
      GetCartData={GetCartData}
      getData={getData}
      getItemRespon={getItemRespon}
      addCart={addCart}
      getNameBrandCate={getNameBrandCate}
      getnumcart={getnumcart}
      setID={setID}
      count={count}
      numcart={numcart}
      decription={decription}
      image={image}
      name={name}
      price={price}
      waranty={waranty}
      promotionprice={promotionprice}
      metadescription={metadescription}
      listproductlienquan={listproductlienquan}
      listmoreimage={listmoreimage}
      listcomment={listcomment}
      idsanpham={idsanpham}
      listcart={listcart}
      modalvisible={modalvisible}
      scrollY={scrollY}
      isloaing={isLoading}
      categoryname={categoryname}
      rating={rating}
      bough={bough}
      sao1={sao1}
      sao2={sao2}
      sao3={sao3}
      sao4={sao4}
      sao5={sao5}
      sellerinfo={sellerinfo}
      sellerProd={sellerProd}
    />
  );
}
