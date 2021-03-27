import React from 'react';
import styles from './styles';
import {View, Text, Image} from 'react-native';
import StarRating from 'components/StarRating';

function CommentItem(item) {
  return (
    <View style={styles.container}>
      <View style={styles.ratingView}>
        <StarRating rating={item.Point} size={20} />
        <Text style={styles.blackText}>{item.Date}</Text>
      </View>
      <View style={styles.marginView}>
        <Text style={styles.blackText}>{item.UserName}</Text>
        <Image source={{uri: item.Avatar}} style={styles.sourceImage} />
        <Text muted style={styles.blackText}>
          {item.Comment}
        </Text>
      </View>
      <View style={styles.commentView} />
    </View>
  );
}

export default React.memo(CommentItem);
