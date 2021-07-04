/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import styles from './styles';
import ReactNativeNumberFormat from 'components/NumberFormat';
import StarRating from 'components/StarRating';
import {
  Image,
  Text,
  View,
  ImageBackground,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from 'utils/i18n';
//import {TouchableOpacity} from 'react-native-gesture-handler';
//import database from '@react-native-firebase/database';
const NAMESPACE = 'common';
function StoreProduct({item, del}) {
  console.log('item>>>>>>>>', item.item);
  const [modalVisible, setModalVisible] = useState(false);
  // const del = () => {
  //   database()
  //     .ref('ProductUser/' + item.item.ProductID)
  //     .remove()
  //     .then(console.log('xoá thành công'));
  // };
  return (
    <View style={styles.itemContainer}>
      <ImageBackground
        source={require('../../assets/images/Frame1.png')}
        style={styles.imgBackground}>
        <Image source={{uri: item.item?.Image}} style={styles.itemImage} />
        <View>
          <TouchableOpacity
            style={styles.del}
            onPress={() => setModalVisible(true)}>
            <Icon name="close-outline" size={30} color="red" />
          </TouchableOpacity>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.item?.Name}
          </Text>

          <Text style={styles.itemPrice}>
            <ReactNativeNumberFormat value={item.item?.PromotionPrice} />đ
          </Text>
          <View style={styles.starView}>
            {StarRating(item.item?.rating)}
            {item.item?.bough !== 0 ? (
              <Text style={styles.boughColor}>
                ({item.item?.bough}) {I18n.t(`${NAMESPACE}.review`)}
              </Text>
            ) : (
              <Text style={styles.boughColor}>
                ({I18n.t(`${NAMESPACE}.notreview`)})
              </Text>
            )}
          </View>
          <Text style={styles.desColor} numberOfLines={2}>
            {item.item?.Description}
          </Text>
          <Text style={styles.priceColor}>
            {I18n.t(`${NAMESPACE}.count`)} {item.item?.Count}
          </Text>
        </View>
      </ImageBackground>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={{...styles.modalView, padding: 10}}>
            <Text style={styles.modalText}>
              {I18n.t(`${NAMESPACE}.delpro`)}
            </Text>
            <View style={styles.flexRow}>
              <TouchableOpacity
                style={styles.openButtonKeep}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={styles.textStyle}>
                  {I18n.t(`${NAMESPACE}.keep`)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.openButtonDelete}
                onPress={() => {
                  del(item.item);
                }}>
                <Text style={styles.textStyle}>
                  {I18n.t(`${NAMESPACE}.confirm`)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default React.memo(StoreProduct);
