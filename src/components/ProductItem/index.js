import ReactNativeNumberFormat from 'components/NumberFormat';
import StarRating from 'components/StarRating';
import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';

const Productitem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: item?.image }} style={styles.itemImage} />
    <Text style={styles.itemName} numberOfLines={2}>
      {item?.title}
    </Text>
    <Text style={styles.itemPrice}>
      <ReactNativeNumberFormat value={item?.price} />
      {item?.price === item?.PromotionPrice || !item?.PromotionPrice ? null : (
        <Text style={styles.priceColor}>
          {' '}
          {(((item?.PromotionPrice - item?.price) / item?.PromotionPrice) * 100).toFixed(0)}%
        </Text>
      )}
    </Text>
    <View style={styles.starView}>
      {StarRating(item?.rating)}
      {item?.bough !== 0 ? <Text style={styles.boughColor}>({item?.bough})</Text> : null}
    </View>
  </View>
);

export default Productitem;
