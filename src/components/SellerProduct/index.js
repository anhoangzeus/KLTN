import React from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import ReactNativeNumberFormat from 'components/NumberFormat';
import StarRating from 'components/StarRating';
import FastImage from 'react-native-fast-image';
function SellerProduct({item}) {
  return (
    <View style={styles.itemContainer}>
      <FastImage source={{uri: item.Image}} style={styles.itemImage} />
      <Text style={styles.itemName} numberOfLines={2}>
        {item.Name}
      </Text>
      <Text style={styles.itemPrice}>
        <ReactNativeNumberFormat value={item.PromotionPrice} /> đ̲
        {item.Price === item.PromotionPrice || !item.PromotionPrice ? null : (
          <Text style={styles.priceColor}>
            {' '}
            {(((item.Price - item.PromotionPrice) / item.Price) * 100).toFixed(
              0,
            )}
            %
          </Text>
        )}
      </Text>
      <View style={styles.starView}>{StarRating(item.rating)}</View>
    </View>
  );
}

export default React.memo(SellerProduct);
