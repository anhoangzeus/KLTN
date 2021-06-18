import ReactNativeNumberFormat from 'components/NumberFormat';
import StarRating from 'components/StarRating';
import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';

const NewProductItem = ({item}) => (
  <View style={styles.itemContainer1}>
    <Image source={{uri: item?.Image}} style={styles.itemImage} />
    <Text style={styles.itemName} numberOfLines={2}>
      {item?.Name}
    </Text>
    <Text style={styles.itemPrice}>
      <ReactNativeNumberFormat value={item?.Price} />đ
      {item?.Price === item?.PromotionPrice ? null : (
        <Text style={styles.priceColor}>
          {' '}
          -
          {(
            ((item?.PromotionPrice - item?.Price) / item?.PromotionPrice) *
            100
          ).toFixed(0)}
          %
        </Text>
      )}
    </Text>
    <View style={styles.starView}>
      {StarRating(item?.rating)}
      {item?.bough !== 0 ? (
        <Text style={styles.boughColor}>({item?.bough})</Text>
      ) : null}
    </View>
  </View>
);

export default NewProductItem;
