import React from 'react';
import styles from './styles';
import ReactNativeNumberFormat from 'components/NumberFormat';
import StarRating from 'components/StarRating';
import {Image, Text, View} from 'react-native';

function StoreProduct({item}) {
  console.log('item>>>>>>>>', item.item);
  return (
    <View style={styles.itemContainer}>
      <Image source={{uri: item.item?.Image}} style={styles.itemImage} />
      <View>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.item?.Name}
        </Text>
        <Text style={styles.itemPrice}>
          <ReactNativeNumberFormat value={item.item?.PromotionPrice} />đ
        </Text>
        <View style={styles.starView}>
          {StarRating(item.item?.rating)}
          {item.item?.bough !== 0 ? (
            <Text style={styles.boughColor}>({item.item?.bough}) đánh giá</Text>
          ) : (
            <Text style={styles.boughColor}>(chưa có đánh giá)</Text>
          )}
        </View>
        <Text style={styles.desColor} numberOfLines={2}>
          {' '}
          {item.item?.Description}
        </Text>
        <Text style={styles.priceColor}>còn lại {item.item?.Count}</Text>
      </View>
    </View>
  );
}

export default React.memo(StoreProduct);
