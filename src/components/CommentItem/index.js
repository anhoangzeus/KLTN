import React from 'react';
import styles from './styles';
import { View, Text, Image } from 'react-native';
import StarRating from 'components/StarRating';

function CommentItem(item) {
  return (
    <View style={styles.container}>
      <View style={styles.ratingView}>
        <StarRating rating={item.item.Point} size={15} />
        <Text style={styles.blackText}>{item.item.Date}</Text>
      </View>
      <View style={styles.marginView}>
        <Text style={styles.blackText}>{item.item.UserName}</Text>
        <View style={styles.flexDir}>
          <Image source={{ uri: item.item.Avatar }} style={styles.sourceImage} />
          <Text muted style={styles.blackText}>
            {item.item.Comment}
          </Text>
        </View>
      </View>
      <View style={styles.commentView} />
    </View>
  );
}

export default React.memo(CommentItem);
