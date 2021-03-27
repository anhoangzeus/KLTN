
import React from 'react';
import styles from './styles';
import {View, TouchableOpacity, ImageBackground, Text, Dimensions} from 'react-native';
const { width } = Dimensions.get('screen');
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

function CategoryItem(name , id , icon) {
  return (
    <TouchableOpacity onPress={() => this.setState({ CatogoryID: id })} >
        <View style={styles.viewStyle
        }>
          <ImageBackground style={styles.imageStyle}
            source={require('../../../assets/images')}>
            <Icons name={icon} color="#fff" size={width / 12}
              style={styles.cateIcon} />
          </ImageBackground>
        </View>

        <Text style={styles.textStyle}>{name}</Text>
      </TouchableOpacity>
  );
}

export default React.memo(CategoryItem);
