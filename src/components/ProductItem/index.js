/* eslint-disable react-native/no-inline-styles */
import ReactNativeNumberFormat from 'components/NumberFormat';
import StarRating from 'components/StarRating';
import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import FastImage from 'react-native-fast-image';
const Productitem = ({item}) => {
  return (
    <View style={styles.itemContainer}>
      <FastImage source={{uri: item?.Image}} style={styles.itemImage} />
      <Text style={styles.itemName} numberOfLines={2}>
        {item?.Name}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.itemPrice}>
          <ReactNativeNumberFormat value={item?.PromotionPrice} />
        </Text>
        {item?.Price === item?.PromotionPrice ||
        !item?.PromotionPrice ? null : (
          <View style={styles.saleView}>
            <Text style={styles.priceColor}>
              {' '}
              {(
                ((item?.Price - item?.PromotionPrice) / item?.Price) *
                100
              ).toFixed(0)}
              %
            </Text>
          </View>
        )}
      </View>
      <View style={styles.starView}>
        <StarRating rating={item?.rating} size={15} />
        {item?.bough !== 0 ? (
          <Text style={styles.boughColor}>({item?.bough})</Text>
        ) : null}
      </View>
    </View>
  );
};

export default Productitem;
