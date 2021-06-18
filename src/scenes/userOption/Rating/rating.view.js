/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Rating} from 'react-native-ratings';
import NumberFormat from 'components/NumberFormat';
import styles from './rating.styles';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
export const ProductItem = ({item}) => (
  <View style={styles.itemContainer1}>
    <Text style={styles.txtCodeName}>
      {' '}
      {I18n.t(`${NAMESPACE}.orderid`)}:{item.OrderID}
    </Text>
    <View style={styles.row}>
      <Image source={{uri: item.Picture}} style={styles.itemImage} />
      <View style={{marginLeft: 20}}>
        <Text style={styles.txtPrice}>{item.CreatedDate}</Text>
        <Text style={styles.txtPrice}>
          {item.Payment === '01'
            ? I18n.t(`${NAMESPACE}.COD`)
            : I18n.t(`${NAMESPACE}.onlpay`)}
        </Text>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.Name}
        </Text>
        <Text style={styles.itemPrice}>
          <NumberFormat value={item.Price} />
        </Text>
      </View>
    </View>
  </View>
);
const RatingView = (props) => {
  const {
    modalVisible,
    ListProduct,
    modalVisibleSuccess,
    getListOrder,
    setModalVisible,
    getRatingPoint,
    _onRefresh,
    handleChange,
    refreshing,
    loading,
    votedProduct,
    ratingCompleted,
  } = props;

  if (loading) {
    return (
      <View style={styles.loadContainer}>
        <ActivityIndicator size="large" color="dodgerblue" />
      </View>
    );
  }
  if (ListProduct[0] == null) {
    return (
      <TouchableOpacity
        style={styles.loadContainer}
        onPress={() => getListOrder()}>
        <Text style={styles.txttitle}>{I18n.t(`${NAMESPACE}.ofreview`)}</Text>
        <TouchableOpacity
          style={styles.btnBuyNow}
          onPress={() => NavigationServices.navigate(SCENE_NAMES.MAIN)}>
          <Text style={{...styles.txttitle, color: '#fff'}}>
            {I18n.t(`${NAMESPACE}.shopping`)}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          }
          numberOfLines={2}
          showsVerticalScrollIndicator={false}
          data={ListProduct}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
                getRatingPoint(
                  item.ProductId,
                  item.OrderID,
                  item.id,
                  item.UserProduct,
                );
              }}>
              <ProductItem item={item} />
            </TouchableOpacity>
          )}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modal}>
                <FontAwesome name="times-circle" size={30} color="#fff" />
                <Text style={styles.modalText}>
                  {' '}
                  {I18n.t(`${NAMESPACE}.productReview`)}
                </Text>
                <TouchableOpacity
                  style={styles.btnRating}
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <FontAwesome name="times-circle" size={30} color="red" />
                </TouchableOpacity>
              </View>
              <View>
                <Rating
                  ratingCount={5}
                  imageSize={40}
                  showRating
                  onFinishRating={(rating) => ratingCompleted(rating)}
                  style={{marginBottom: 5}}
                />
                <TextInput
                  textAlignVertical="top"
                  multiline={true}
                  placeholder={I18n.t(`${NAMESPACE}.productReview`)}
                  placeholderTextColor="#2B4F8C"
                  autoCapitalize="none"
                  onChangeText={(val) => handleChange(val)}
                  style={styles.txtInput}
                />
                <TouchableOpacity
                  style={styles.btncomment}
                  onPress={() => {
                    votedProduct();
                  }}>
                  <Text style={styles.txtSent}>
                    {I18n.t(`${NAMESPACE}.sendreview`)}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleSuccess}>
          <View style={styles.centeredView}>
            <View style={styles.modalView1}>
              <Text style={styles.modalText}>
                {' '}
                {I18n.t(`${NAMESPACE}.senddone`)}
              </Text>
              <Text style={styles.modalText}>
                {I18n.t(`${NAMESPACE}.thanks`)}!{' '}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};
export default RatingView;
