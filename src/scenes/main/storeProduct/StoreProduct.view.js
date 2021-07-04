import * as React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import styles from './StoreProduct.styles';
import StoreProduct from 'components/StoreProduct';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Col from 'components/Col';
import database from '@react-native-firebase/database';
import Loading from 'components/LoadingView';
//import I18n from 'utils/i18n';
import { BackgroundImage } from 'react-native-elements/dist/config';
//const NAMESPACE = 'common';
function StoreProductView(props) {
  const { FullName, Avatar, listItems, loading, getlistProduct } = props;
  const del = async (item) => {
    await database()
      .ref('ProductUser/' + item.item.ProductID)
      .remove()
      .then(console.log('xoá thành công'));
    getlistProduct();
  };

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
      <View style={styles.screenContainer}>
        <View style={styles.bodyContainer}>
          <BackgroundImage
            source={require('../../../assets/images/storeback.png')}
            style={styles.imgBackground}>
            <TouchableOpacity
              onPress={() => NavigationServices.navigate(SCENE_NAMES.MyStoreOptionContainer)}
              style={styles.back}>
              <FontAwesome
                name="chevron-left"
                size={25}
                color="white"
                style={styles.back}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.InfoUser);
              }}>
              <View>
                <Text style={styles.nameText}>{FullName}</Text>
                <Text style={styles.nameText}>TienAnh Shop</Text>
              </View>

              <Image source={{ uri: Avatar }} size={80} style={styles.img} />
            </TouchableOpacity>
            <View style={styles.flexRow}>
              <View style={styles.Tag}>
                <Image
                  source={require('../../../assets/images/sl.png')}
                  style={styles.tagImg}
                />
                <View>
                  <Text>{listItems.length}</Text>
                  <Text>Sản phẩm</Text>
                </View>
              </View>
              <View style={styles.Tag}>
                <Image
                  source={require('../../../assets/images/tim.png')}
                  style={styles.tagImg}
                />
                <View>
                  <Text>{listItems.length}</Text>
                  <Text>Người theo dõi</Text>
                </View>
              </View>
            </View>
            <View style={styles.divider} />
            <FlatList
              initialNumToRender={20}
              showsVerticalScrollIndicator={false}
              //numColumns={2}
              data={listItems}
              renderItem={(item) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      NavigationServices.navigate(
                        SCENE_NAMES.DETAIL_STORE_PRODUCT,
                        {
                          item: item,
                        },
                      );
                    }}>
                    <StoreProduct item={item} del={() => del(item)} />
                  </TouchableOpacity>
                );
              }}
            />
          </BackgroundImage>
        </View>
      </View>
    );
  }
}

export default React.memo(StoreProductView);
