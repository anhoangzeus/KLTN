import Swiper from 'react-native-swiper';
import React from 'react';
import SIZE from 'constants/size';
import styles from './style';
import {TouchableOpacity, View} from 'react-native';
import NavigationServices from 'utils/navigationServices';
import FastImage from 'react-native-fast-image';
import SCENE_NAMES from 'constants/sceneName';

const SwiperBraner = (listcontents) => {
  return (
    <Swiper
      autoplay={true}
      autoplayTimeout={1000}
      loop={true}
      showsPagination={true}
      showsButtons={true}
      index={0}
      width={SIZE.DEVICE_WIDTH}
      height={SIZE.DEVICE_HEIGHT / 4.2}>
      {listcontents.map((item) => (
        <TouchableOpacity
          style={styles.sectionContainer}
          key={item.id}
          onPress={() =>
            NavigationServices.navigate(SCENE_NAMES.Route_ContentViews, {
              id: item.Url,
            })
          }>
          <View style={styles.sectionContainer}>
            <FastImage source={{uri: item.Image}} style={styles.sectionImage} />
          </View>
        </TouchableOpacity>
      ))}
    </Swiper>
  );
};
export default SwiperBraner;
