import ReactNativeNumberFormat from 'components/NumberFormat';
import StarRating from 'components/StarRating';
import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';

const ProductItem = ({ image, name, price, rating, bough, PromotionPrice }) => (
    <View style={styles.itemContainer}>
        <Image source={{ uri: image }} style={styles.itemImage} />
        <Text style={styles.itemName} numberOfLines={2}>
            {name}
        </Text>
        <Text style={styles.itemPrice}><ReactNativeNumberFormat value={price} />
            {price === PromotionPrice ? null :
                <Text style={styles.priceColor}>  -{((PromotionPrice - price) / PromotionPrice * 100).toFixed(0)}%</Text>
            }
        </Text>
        <View style={styles.starView}>
            {StarRating(rating)}
            {bough !== 0 ? <Text style={styles.boughColor}>({bough})</Text> : null}

        </View>
    </View>
);

export default ProductItem;
