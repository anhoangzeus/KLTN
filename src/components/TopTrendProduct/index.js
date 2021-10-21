import ReactNativeNumberFormat from 'components/NumberFormat';
import StarRating from 'components/StarRating';
import React from 'react';
import {Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';

const NewProductItem = ({item}) => (
  <View style={styles.itemContainer1}>
    <FastImage
      source={{uri: item?.Image, priority: FastImage.priority.high}}
      style={styles.itemImage}
      resizeMode={FastImage.resizeMode.contain}
    />
    <Text style={styles.itemName} numberOfLines={2}>
      {item?.Name}
    </Text>
    <Text style={styles.itemPrice}>
      <ReactNativeNumberFormat value={item?.Price} />
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
      <StarRating rating={item?.rating} size={15} />
      {item?.bough !== 0 ? (
        <Text style={styles.boughColor}>({item?.bough})</Text>
      ) : null}
    </View>
  </View>
);

export default NewProductItem;
