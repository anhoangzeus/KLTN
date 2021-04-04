/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import ProductView from './Product.view';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import { getIsFetchingByActionsTypeSelector } from 'appRedux/selectors/loadingSelector';
import { NAMESPACE } from './Product.constants';
import { getString } from 'utils/i18n';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import styles from './Product.styles';
import NavigationServices, { getParams } from 'utils/navigationServices';

const functionsCounter = new Set();

const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);

export default function ProductContainer({ navigation, route }) {
  const isLoading = useSelectorShallow(loadingSelector);
  const { id, BrandID, CategoryID } = getParams(route);
  const itemRef = database();

  const [numcart, setnumcart] = useState(0);
  const [decription, setdecription] = useState('');
  const [image, setimage] = useState('');
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [waranty, setwaranty] = useState('');
  const [promotionprice, setpromotionprice] = useState('');
  const [metadescription, setmetadescription] = useState('');
  const [listproductlienquan, setlistproductlienquan] = useState([]);
  const [listmoreimage, setlistmoreimage] = useState([]);
  const [listcomment, setlistcomment] = useState([]);
  const [idsanpham, setidsanpham] = useState(id);
  const [listcart, setlistcart] = useState([]);
  const [modalvisible, setmodalvisible] = useState(false);
  const [scrollY] = useState(new Animated.Value(0));
  const [isloading, setisloading] = useState(false);
  const [brandname, setbrandname] = useState('');
  const [categoryname, setcategoryname] = useState('');
  const [rating, setrating] = useState(0);
  const [bough, setbough] = useState(0);
  const [sao1, setsao1] = useState(0);
  const [sao2, setsao2] = useState(0);
  const [sao3, setsao3] = useState(0);
  const [sao4, setsao4] = useState(0);
  const [sao5, setsao5] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: getString(`${NAMESPACE}.title`),
    });
  }, [navigation]);

  const getNameBrandCate = () => {
    itemRef
      .ref('/Catogorys/' + CategoryID)
      .once('value')
      .then((snapshot) => {
        setcategoryname(snapshot.val().Name);
      });
    database()
      .ref('/Brands/' + BrandID)
      .once('value')
      .then((snapshot) => {
        setbrandname(snapshot.val().Name);
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
    var Category_ID = CategoryID;
    var Brand_ID = BrandID;
    var ProductID = idsanpham;
    database()
      .ref('/Products')
      .once('value')
      .then((snapshot) => {
        var items = [];
        snapshot.forEach(function (child) {
          if (child.val().ProductID !== ProductID) {
            if (child.val().CategoryID === Category_ID) {
              if (child.val().BrandID === Brand_ID) {
                items.push({
                  image: child.val().Image,
                  Name: child.val().Name,
                  Price: child.val().Price,
                  proid: child.val().ProductID,
                });
              }
            }
          }
        });
        setlistproductlienquan(items);
      });
  };
  const getData = () => {
    var ImageItems = [];
    database()
      .ref('/Products/' + id)
      .once('value')
      .then((snapshot) => {
        var _sao1 = 0;
        var _sao2 = 0;
        var _sao3 = 0;
        var _sao4 = 0;
        var _sao5 = 0;
        var point = 0;
        var count = 0;
        var items = [];
        snapshot.child('Rating').forEach((child) => {
          if (child.val().Point === '1') {
            _sao1++;
          } else if (child.val().Point === '2') {
            _sao2++;
          } else if (child.val().Point === '3') {
            _sao3++;
          } else if (child.val().Point === '4') {
            _sao4++;
          } else if (child.val().Point === '5') {
            _sao5++;
          }
          point += child.val().Point;
          count++;
          items.push({
            Avatar: child.val().Avatar,
            Comment: child.val().Comment,
            Date: child.val().Date,
            Point: child.val().Point,
            UserName: child.val().UserName,
          });
        });
        console.log('tên mo ta san pham', snapshot.val().Description);
        setdecription(snapshot.val().Description);
        console.log('state của des', decription);
        setimage(snapshot.val().Image);
        setname(snapshot.val().Name);
        setprice(snapshot.val().Price);
        setwaranty(snapshot.val().Warranty);
        setmetadescription(snapshot.val().MetaDescription);
        setpromotionprice(snapshot.val().PromotionPrice);
        setrating(point / count);
        setlistcomment(items);
        setbough(count);
        setsao1(_sao1);
        setsao2(_sao2);
        setsao3(_sao3);
        setsao4(_sao4);
        setsao5(_sao5);
        ImageItems.push(snapshot.val().Image);
      });
    database()
      .ref('/Products/')
      .child(id)
      .child('Images')
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((child) => {
          ImageItems.push(child.val().Image);
        });
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
          <Text style={{ color: 'white' }}>{numcart}</Text>
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
      }
    });
    if (auth().currentUser !== null) {
      if (temp === 0) {
        database()
          .ref('/Cart/' + auth().currentUser.uid)
          .child(id)
          .set({
            Id: id,
            CategoryID: CategoryID,
            BrandID: BrandID,
            CategoryName: categoryname,
            BrandName: brandname,
            Name: name,
            Picture: image,
            Price: price,
            Quantity: 1,
          });
      } else {
        database()
          .ref('/Cart/' + auth().currentUser.uid + '/' + key)
          .set({
            Id: product.ProductID,
            CategoryID: CategoryID,
            BrandID: BrandID,
            CategoryName: categoryname,
            BrandName: brandname,
            Name: product.Name,
            Picture: product.image,
            Price: product.Price,
            Quantity: product.Quantity,
          });
      }
      GetCartData();
    } else {
      NavigationServices.navigate('Top');
    }
    setModalVisible(true);
  };
  const setID = (idpro) => {
    setidsanpham(idpro);
  };

  useEffect(() => {
    getData();
    getNameBrandCate();
    getItemRespon();
    GetCartData();
    getnumcart();
  }, []);

  useEffect(() => {
    getData();
    getItemRespon();
  }, [idsanpham]);

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
    <ProductView
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
      brandname={brandname}
      categoryname={categoryname}
      rating={rating}
      bough={bough}
      sao1={sao1}
      sao2={sao2}
      sao3={sao3}
      sao4={sao4}
      sao5={sao5}
    />
  );
}
