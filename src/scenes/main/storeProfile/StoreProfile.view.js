import * as React from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import styles from './StoreProfile.styles';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Col from 'components/Col';
import Loading from 'components/LoadingView';
import ProductItem from 'components/ProductItem';
import auth from '@react-native-firebase/auth';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
import {BackgroundImage} from 'react-native-elements/dist/config';
import {Modal} from 'react-native-paper';

function StoreProfileView(props) {
  const {
    info,
    listItems,
    loading,
    choose,
    isFollow,
    des,
    storeInfo,
    address,
    visible,
    setVisible,
    setChoose,
    getListChat,
    onFollow,
    onUnFollow,
  } = props;
  console.log('thong tin dia chi: ', address);
  return (
    <View style={styles.screenContainer}>
      {/* <StatusBar backgroundColor="#2B4F8C" barStyle="light-content" />
          <Header title={I18n.t(`${NAMESPACE}.manasell`)} /> */}
      <View style={styles.bodyContainer}>
        <BackgroundImage
          source={require('../../../assets/images/back.png')}
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
              <Text style={styles.nameText}>{storeInfo.StoreName}</Text>
              {auth().currentUser?.uid ? (
                <View style={styles.flexRow}>
                  <TouchableOpacity
                    style={styles.Tag}
                    onPress={() => getListChat()}>
                    <Image
                      source={require('../../../assets/images/chat.png')}
                      style={styles.tagImg}
                    />
                    <Text>Chat</Text>
                  </TouchableOpacity>
                  {!isFollow ? (
                    <TouchableOpacity
                      style={styles.Tag}
                      onPress={() => onFollow()}>
                      <Image
                        source={require('../../../assets/images/tim.png')}
                        style={styles.tagImg}
                      />
                      <Text>Follow</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.Tag}
                      onPress={() => onUnFollow()}>
                      <Image
                        source={require('../../../assets/images/untim.png')}
                        style={styles.tagImg}
                      />
                      <Text>Unf</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : null}
            </View>
          </View>
          <View style={styles.flexRow2}>
            <TouchableOpacity
              onPress={() => setChoose(0)}
              style={styles.lineTab}>
              <Text style={styles.tabText}>
                {' '}
                {I18n.t(`${NAMESPACE}.product`)}
              </Text>
              {choose === 0 ? (
                <Image source={require('../../../assets/images/line.png')} />
              ) : null}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setChoose(1)}
              style={styles.lineTab}>
              <Text style={styles.tabText}>
                {' '}
                {I18n.t(`${NAMESPACE}.storProfile`)}
              </Text>
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
              numColumns={2}
              data={listItems}
              renderItem={(item) => {
                return (
                  <TouchableOpacity
                    style={styles.itemTouch}
                    onPress={() => {
                      NavigationServices.navigate(
                        SCENE_NAMES.DETAIL_STORE_PRODUCT,
                        {
                          item: item,
                        },
                      );
                    }}>
                    <ProductItem item={item.item} />
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View style={styles.storeProfile}>
              <View style={styles.boxView}>
                <View style={styles.boxContainer}>
                  <Text style={styles.perText}>{listItems.length}</Text>
                  <View>
                    <Text> {I18n.t(`${NAMESPACE}.product`)} </Text>
                  </View>
                </View>
                <View style={styles.boxContainer}>
                  <Text style={styles.perText}>0%</Text>
                  <View>
                    <Text>{I18n.t(`${NAMESPACE}.returnrate`)}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.div} />
              <View style={styles.whiteView}>
                <Text style={styles.desText}>
                  {' '}
                  {I18n.t(`${NAMESPACE}.storProfile`)}
                </Text>
              </View>
              <View style={styles.grayView}>
                <FontAwesome
                  name="calendar"
                  size={17}
                  color="#969696"
                  style={styles.icon}
                />
                <Text style={styles.desText}>
                  {I18n.t(`${NAMESPACE}.f2021`)}
                </Text>
              </View>
              <View style={styles.whiteView}>
                <FontAwesome5
                  name="store"
                  size={17}
                  color="#969696"
                  style={styles.icon}
                />
                <Text style={styles.desText}>
                  {I18n.t(`${NAMESPACE}.storProfile`)}
                </Text>
              </View>
              <View style={styles.grayView}>
                <Text style={styles.desText}>{des}</Text>
              </View>
              <View style={styles.whiteView}>
                <FontAwesome5
                  name="location-arrow"
                  size={17}
                  color="#969696"
                  style={styles.icon}
                />
                <Text style={styles.desText}>
                  {I18n.t(`${NAMESPACE}.address`)}
                </Text>
              </View>
              {address?.map((addressitem) => {
                return (
                  <View style={styles.whiteView}>
                    <Text style={styles.desText}>
                      {addressitem.NumberAddress}, {addressitem.Xa},
                      {addressitem.Huyen}, {addressitem.City}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
          <Modal visible={visible} style={styles.modalContainer}>
            <View style={styles.modal}>
              <Text style={styles.rpText}>
                {' '}
                {I18n.t(`${NAMESPACE}.loginRequire`)}
              </Text>
              <View style={styles.action}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Text style={styles.btnSelect}>
                    {' '}
                    {I18n.t(`${NAMESPACE}.cancel`)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(false);
                    NavigationServices.navigate(SCENE_NAMES.TopStackLogin);
                  }}>
                  <Text style={styles.btnSelect2}>
                    {' '}
                    {I18n.t(`${NAMESPACE}.signIn`)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </BackgroundImage>
      </View>
      {loading && (
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
        </Col>
      )}
    </View>
  );
}

export default React.memo(StoreProfileView);
