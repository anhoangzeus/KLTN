import * as React from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import styles from './StoreProduct.styles';
import StoreProduct from 'components/StoreProduct';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import Header from 'components/Header';
import Col from 'components/Col';
import database from '@react-native-firebase/database';
import Loading from 'components/LoadingView';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
function StoreProductView(props) {
  const {FullName, Avatar, listItems, loading, getlistProduct} = props;
  const del = async (item) => {
    await database()
      .ref('ProductUser/' + item.item.ProductID)
      .remove()
      .then(console.log('xoá thành công'));
    getlistProduct();
  };

  console.log('list item props:', listItems);
  if (loading) {
    <Col
      center
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      <Loading />
    </Col>;
  } else {
    return (
      <SafeAreaView style={styles.SafeSreen}>
        <ScrollView style={styles.screenContainer}>
          <StatusBar backgroundColor="#2B4F8C" barStyle="light-content" />
          <Header title={I18n.t(`${NAMESPACE}.manasell`)} />
          <View style={styles.bodyContainer}>
            <TouchableOpacity
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.InfoUser);
              }}
              style={styles.avatarContainer}>
              <Image source={{uri: Avatar}} size={80} style={styles.img} />
              <Text>{FullName}</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <FlatList
              initialNumToRender={20}
              showsVerticalScrollIndicator={false}
              //numColumns={2}
              data={listItems}
              renderItem={(item) => {
                return (
                  // <TouchableOpacity
                  //   onPress={() => {
                  //     NavigationServices.navigate(SCENE_NAMES.SELLERPRODUCT, {
                  //       id: item.id,
                  //       CategoryID: item.CategoryID,
                  //       BrandID: item.BrandID,
                  //       userid: item.UserID,
                  //     });
                  //   }}>
                  <StoreProduct item={item} del={() => del(item)} />
                  // </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default React.memo(StoreProductView);
