import React from 'react';
import styles from './styles';
import {Image, Text, View} from 'react-native';
import ReactNativeNumberFormat from 'components/NumberFormat';
import StarRating from 'components/StarRating';

function SmallProductCard({item}) {
  return (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.Image}} style={styles.itemImage} />
      <Text style={styles.itemName} numberOfLines={2}>
        {item.Name}
      </Text>
      <Text style={styles.itemPrice}>
        <ReactNativeNumberFormat value={item.Price} /> đ̲
        {item.Price === item.PromotionPrice || !item.PromotionPrice ? null : (
          <Text style={styles.priceColor}>
            {' '}
            {(
              ((item.PromotionPrice - item.Price) / item.PromotionPrice) *
              100
            ).toFixed(0)}
            %
          </Text>
        )}
      </Text>
      <View style={styles.starView}>
        {StarRating(item.rating)}
        {item.bough !== 0 ? (
          <Text style={styles.boughColor}>({item.bough})</Text>
        ) : null}
      </View>
    </View>
  );
}

export default React.memo(SmallProductCard);
