/* eslint-disable radix */
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StarRating = (rating) => {
  // This array will contain our star tags. We will include this
  // array between the view tag.

  let stars = [];

  // Loop 5 times
  if (isNaN(rating) === false) {
    for (var i = 1; i <= 5; i++) {
      // set the path to filled stars
      let name = 'ios-star';
      // If ratings is lower, set the path to unfilled stars
      if (i > parseInt(rating)) {
        name = 'ios-star-outline';
      }
      stars.push(
        <Ionicons
          name={name}
          size={10}
          style={(name = 'ios-star' ? styles.star : styles.staroutline)}
          key={i}
        />,
      );
    }
  }
  return <View style={styles.container}>{stars}</View>;
};

export default StarRating;
