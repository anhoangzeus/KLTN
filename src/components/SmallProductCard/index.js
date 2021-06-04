import React from 'react';
import styles from './styles';
import {Image, Text, View} from 'react-native';
import ReactNativeNumberFormat from 'components/NumberFormat';
import StarRating from 'components/StarRating';

function SmallProductCard({image, name, price, rating, bough, PromotionPrice}) {
  return (
    <View style={styles.itemContainer}>
      <Image source={{uri: image}} style={styles.itemImage} />
      <Text style={styles.itemName} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.itemPrice}>
        <ReactNativeNumberFormat value={price} /> đ̲
        {price === PromotionPrice || !PromotionPrice ? null : (
          <Text style={styles.priceColor}>
            {' '}
            {(((PromotionPrice - price) / PromotionPrice) * 100).toFixed(0)}%
          </Text>
        )}
      </Text>
      <View style={styles.starView}>
        {StarRating(rating)}
        {bough !== 0 ? <Text style={styles.boughColor}>({bough})</Text> : null}
      </View>
    </View>
  );
}

export default React.memo(SmallProductCard);
