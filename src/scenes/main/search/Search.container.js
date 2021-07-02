import React, {useState, useEffect} from 'react';
import SearchView from './Search.view';
import {View, Text} from 'react-native';
import useSelectorShallow, {
  selectorWithProps,
} from 'hooks/useSelectorShallowEqual';
import {getIsFetchingByActionsTypeSelector} from 'appRedux/selectors/loadingSelector';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import styles from './Search.styles';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
const functionsCounter = new Set();
const loadingSelector = selectorWithProps(getIsFetchingByActionsTypeSelector, [
  // ACTION.HANDLER,
]);

export default function SearchContainer({navigation}) {
  const isLoading = useSelectorShallow(loadingSelector);

  const [listStore, setListStore] = useState([]);
  const [listSeller, setListSeller] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [numcart, setNumcart] = useState(0);
  const [refreshing, setRefeshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textNoti, settextNoti] = useState('');

  const bodau = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    str = str.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, ' ');
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
      /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
      ' ',
    );
    return str;
  };

  const searchDictionary = () => {
    var st = searchText.toLowerCase();
    st = bodau(st);
    database()
      .ref('/Products')
      .once('value')
      .then((snapshot) => {
        var items = [];
        snapshot.forEach(function (childSnapshot) {
          var rs = childSnapshot.val().Name.toLowerCase();
          var des = childSnapshot.val().MetaDescription.toLowerCase();
          rs = bodau(rs);
          des = bodau(des);
          if (rs.indexOf(st) != -1 || des.indexOf(st) != -1) {
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
              Counts: childSnapshot.val().Counts,
            });
          }
        });
        setListStore(items);
        setRefeshing(false);
        setLoading(false);
        settextNoti(I18n.t(`${NAMESPACE}.noresult`));
      });
    database()
      .ref('/ProductUser')
      .once('value')
      .then((snapshot) => {
        var items = [];
        snapshot.forEach(function (childSnapshot) {
          var rs = childSnapshot.val().Name.toLowerCase();
          var des = childSnapshot.val().MetaDescription.toLowerCase();
          rs = bodau(rs);
          des = bodau(des);
          if (rs.indexOf(st) != -1 || des.indexOf(st) != -1) {
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
              Counts: childSnapshot.val().Count,
            });
          }
        });
        setListSeller(items);
        setRefeshing(false);
        setLoading(false);
        settextNoti(I18n.t(`${NAMESPACE}.noresult`));
      });
  };
  const _onRefresh = () => {
    setRefeshing(true);
    searchDictionary();
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
          setNumcart(dem);
        });
    }
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
  useEffect(() => {
    getnumcart();
  }, []);
  functionsCounter.add(searchDictionary);
  functionsCounter.add(renderNofiCart);
  functionsCounter.add(_onRefresh);

  return (
    <SearchView
      isLoading={isLoading}
      listStore={listStore}
      listSeller={listSeller}
      searchText={searchText}
      numcart={numcart}
      refreshing={refreshing}
      loading={loading}
      textNoti={textNoti}
      setSearchText={setSearchText}
      setLoading={setLoading}
      searchDictionary={searchDictionary}
      renderNofiCart={renderNofiCart}
      _onRefresh={_onRefresh}
    />
  );
}
