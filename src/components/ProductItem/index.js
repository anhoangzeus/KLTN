/* eslint-disable react-native/no-inline-styles */
import ReactNativeNumberFormat from 'components/NumberFormat';
import StarRating from 'components/StarRating';
import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';

const Productitem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item?.Image }} style={styles.itemImage} />
      <Text style={styles.itemName} numberOfLines={2}>
        {item?.Name}
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.itemPrice}>
          <ReactNativeNumberFormat value={item?.Price} />
        </Text>
        {item?.Price === item?.PromotionPrice ||
          !item?.PromotionPrice ? null : (
          <View style={styles.saleView}>
            <Text style={styles.priceColor}>
              {' '}
              {(
                ((item?.PromotionPrice - item?.Price) / item?.PromotionPrice) *
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
