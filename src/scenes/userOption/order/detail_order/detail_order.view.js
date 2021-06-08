/* eslint-disable react-native/no-inline-styles */
import Header from 'components/Header';
import ReactNativeNumberFormat from 'components/NumberFormat';
import SCENE_NAMES from 'constants/sceneName';
import SIZE from 'constants/size';
import * as React from 'react';
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NavigationServices from 'utils/navigationServices';
import styles from './detail_order.styles';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
const RenderList = ({
  ProductName,
  BrandName,
  ProductImage,
  Quantity,
  Price,
  cate_Name,
}) => (
  <View style={styles.userContainer}>
    <View>
      <Image source={{uri: ProductImage}} style={styles.sectionImage} />
    </View>
    <View style={{marginHorizontal: 10}}>
      <Text style={{...styles.titletext, marginRight: SIZE.DEVICE_WIDTH / 4}}>
        {ProductName}
      </Text>
      <Text numberOfLines={3} style={styles.welcomeText}>
        {I18n.t(`${NAMESPACE}.product`)}: {cate_Name}
      </Text>
      <Text
        style={{
          color: '#1e88e5',
          fontWeight: 'bold',
          fontSize: 20,
          marginTop: 10,
        }}>
        <ReactNativeNumberFormat value={Price} />
        <Text style={{fontSize: 15, color: 'black'}}> x {Quantity}</Text>
      </Text>
    </View>
  </View>
);

const DetailOrderView = (props) => {
  const {
    huy_Order,
    setModalVisible,
    OrderID,
    CreatedDate,
    Status,
    ShipName,
    ShipMoblie,
    ShipAddress,
    Payment,
    Total,
    ShipPayment,
    ListProduct,
    modalVisible,
    setModal,
    modalVisibleWarning,
  } = props;
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor="#2B4F8C" barStyle="light-content" />
      <Header title={I18n.t(`${NAMESPACE}.orderdetail`)} />
      <ScrollView>
        <View style={styles.bodyContainer}>
          <View style={styles.userContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.titletext}>
                {I18n.t(`${NAMESPACE}.orderid`)}: {OrderID}
              </Text>
              <Text style={styles.welcomeText}>
                Ngày đặt hàng: {CreatedDate}
              </Text>
              <Text style={styles.welcomeText}>
                {I18n.t(`${NAMESPACE}.status`)}: {Status}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.userContainer}>
            <View style={styles.textContainer}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.titletext}>
                  {I18n.t(`${NAMESPACE}.addressdelivery`)}
                </Text>
                {Status === 'Chờ xác nhận' ? (
                  <TouchableOpacity
                    onPress={() => {
                      NavigationServices.navigate(SCENE_NAMES.AddRessScreen);
                    }}>
                    <Text style={{color: 'green', fontSize: 20}}>
                      {I18n.t(`${NAMESPACE}.change`)}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              <Text style={styles.welcomeText}>
                {I18n.t(`${NAMESPACE}.fullname`)}: {ShipName}
              </Text>
              <Text style={styles.welcomeText}>
                {I18n.t(`${NAMESPACE}.phone`)}: {ShipMoblie}
              </Text>
              <Text style={styles.welcomeText}>
                {I18n.t(`${NAMESPACE}.address`)}: {ShipAddress}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.userContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.titletext}>
                {I18n.t(`${NAMESPACE}.paymethod`)}
              </Text>
              <Text style={styles.welcomeText}>{Payment}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View
            style={{
              backgroundColor: '#fff',
              paddingVertical: 5,
              paddingHorizontal: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.textorder}>
              {I18n.t(`${NAMESPACE}.orderinfo`)}
            </Text>
            <Text style={styles.textorder}>
              {ListProduct.length} {I18n.t(`${NAMESPACE}.type`)}
            </Text>
          </View>
          <View
            style={{
              height: 2,
              backgroundColor: '#1e88e5',
              marginHorizontal: 10,
            }}
          />
          {/*  */}
          <FlatList
            pagingEnabled={false}
            data={ListProduct}
            renderItem={({item}) => (
              <RenderList
                ProductName={item.ProductName}
                BrandName={item.Brand_Product}
                ProductImage={item.ProductImage}
                Price={item.Price}
                Quantity={item.Quantity}
                cate_Name={item.cate_Name}
              />
            )}
          />
        </View>
        <View style={styles.divider} />
        <View
          style={{
            backgroundColor: '#fff',
            paddingTop: 5,
            paddingBottom: 10,
            paddingHorizontal: 10,
          }}>
          <Text style={styles.textorder}>Thông tin thanh toán</Text>
          <View style={{height: 2, backgroundColor: '#1e88e5', marginTop: 2}} />
          <Text style={{margin: 10, fontSize: 20, color: '#000'}}>
            {I18n.t(`${NAMESPACE}.deliveryprice`)}:{' '}
            <ReactNativeNumberFormat value={ShipPayment} />
          </Text>
          <Text style={{marginHorizontal: 10, fontSize: 20, color: '#000'}}>
            {I18n.t(`${NAMESPACE}.total`)}:{' '}
            <ReactNativeNumberFormat value={Total} />
          </Text>
        </View>
        {Status === 'Chờ xác nhận' ? (
          <TouchableOpacity
            style={styles.totalContainer}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={styles.titletext2}>
              {I18n.t(`${NAMESPACE}.cancelorder`)}
            </Text>
          </TouchableOpacity>
        ) : Status === 'Chờ lấy hàng' ? (
          <View
            style={styles.totalContainer}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={styles.titletext2}>
              {' '}
              {I18n.t(`${NAMESPACE}.cancelorder`)}
            </Text>
          </View>
        ) : null}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModal(false);
        }}>
        <View style={styles.centeredView}>
          <View style={{...styles.modalView, padding: SIZE.DEVICE_WIDTH / 15}}>
            <Text style={styles.modalText}>
              {' '}
              {I18n.t(`${NAMESPACE}.confirmcancel`)} ?
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  ...styles.openButton,
                  backgroundColor: '#2196F3',
                  width: SIZE.DEVICE_WIDTH / 2.5,
                }}
                onPress={() => {
                  setModal(false);
                }}>
                <Text style={styles.textStyle}>
                  {' '}
                  {I18n.t(`${NAMESPACE}.keep`)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.openButton,
                  backgroundColor: '#2196F3',
                  width: SIZE.DEVICE_WIDTH / 2.5,
                  marginLeft: 5,
                }}
                onPress={() => {
                  huy_Order();
                }}>
                <Text style={styles.textStyle}>
                  {' '}
                  {I18n.t(`${NAMESPACE}.confirm`)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisibleWarning}>
        <View style={styles.centeredView}>
          <View style={styles.modalView1}>
            <FontAwesome5 name="grin-beam-sweat" size={40} color="#2B4F8C" />
            <Text style={styles.modalText1}>
              {' '}
              {I18n.t(`${NAMESPACE}.cancelsuccess`)}
            </Text>
            <Text style={styles.modalText1}>
              {I18n.t(`${NAMESPACE}.recheck`)}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetailOrderView;
