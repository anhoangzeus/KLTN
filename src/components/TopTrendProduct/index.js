import React from 'react';
import { View, Text, Image } from 'react-native';
import ReactNativeNumberFormat from 'components/NumberFormat';
import styles from './styles';
import StarRating from 'components/StarRating';

const NewProductItem = ({ image, name, price, rating, bough, PromotionPrice }) => (
    <View style={styles.itemContainer1}>
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
    </View >
);

export default NewProductItem;
