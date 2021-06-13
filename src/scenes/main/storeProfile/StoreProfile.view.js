import * as React from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import styles from './StoreProfile.styles';
import StoreProduct from 'components/StoreProduct';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Col from 'components/Col';
import database from '@react-native-firebase/database';
import Loading from 'components/LoadingView';
//import I18n from 'utils/i18n';
import {BackgroundImage} from 'react-native-elements/dist/config';

function StoreProfileView(props) {
  const {
    info,
    listItems,
    loading,
    choose,
    setChoose,
    getlistProduct,
    getListChat,
  } = props;
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
      <View style={styles.screenContainer}>
        {/* <StatusBar backgroundColor="#2B4F8C" barStyle="light-content" />
          <Header title={I18n.t(`${NAMESPACE}.manasell`)} /> */}
        <View style={styles.bodyContainer}>
          <BackgroundImage
            source={require('../../../assets/images/backsell.png')}
            style={styles.imgBackground}>
            <TouchableOpacity
              onPress={() => NavigationServices.goBack()}
              style={styles.back}>
              <FontAwesome
                name="chevron-left"
                size={25}
                color="white"
                style={styles.back}
              />
            </TouchableOpacity>
            <View style={styles.avatarContainer}>
              <Image source={{uri: info.Avatar}} size={80} style={styles.img} />
              <View>
                {/* <Text style={styles.nameText}>{info.Name}</Text> */}
                <Text style={styles.nameText}>TienAnh Shop</Text>
                <View style={styles.flexRow}>
                  <TouchableOpacity
                    style={styles.Tag}
                    onPress={() => getListChat()}>
                    <Image
                      source={require('../../../assets/images/chat.png')}
                      style={styles.tagImg}
                    />
                    <View>
                      <Text style={styles.tagText}>Chat</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.Tag}>
                    <Image
                      source={require('../../../assets/images/tim.png')}
                      style={styles.tagImg}
                    />
                    <View>
                      <Text style={styles.tagText}>Theo dõi</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.Tag}>
                    <Image
                      source={require('../../../assets/images/report.png')}
                      style={styles.tagImg}
                    />
                    <View>
                      <Text style={styles.tagText}>Báo cáo</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.flexRow2}>
              <TouchableOpacity
                onPress={() => setChoose(0)}
                style={styles.lineTab}>
                <Text style={styles.tabText}>sản phẩm</Text>
                {choose === 0 ? (
                  <Image source={require('../../../assets/images/line.png')} />
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setChoose(1)}
                style={styles.lineTab}>
                <Text style={styles.tabText}>Hồ sơ cửa hàng</Text>
                {choose === 1 ? (
                  <Image source={require('../../../assets/images/line.png')} />
                ) : null}
              </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            {choose === 0 ? (
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
            ) : (
              <View style={styles.storeProfile}>
                <Text>hồ sơ cửa hàng</Text>
              </View>
            )}
          </BackgroundImage>
        </View>
      </View>
    );
  }
}

export default React.memo(StoreProfileView);