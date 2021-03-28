import Swiper from 'react-native-swiper';
import React from 'react';
import SIZE from 'constants/size';
import styles from './style';
import { TouchableOpacity, View, Image } from 'react-native';

const SwiperBraner = (listcontents) => {
    return (
        <Swiper
            autoplay={true}
            autoplayTimeout={2}
            loop={true}
            showsPagination={true}
            showsButtons={true}
            index={0}
            width={SIZE.DEVICE_WIDTH}
            height={SIZE.DEVICE_HEIGHT / 4.2}>
            {listcontents.map((item) =>
                <TouchableOpacity
                    key={item.id}
                    onPress={() => { }}>
                    <View style={styles.sectionContainer}>
                        <Image source={{ uri: item.Image }} style={styles.sectionImage} />
                    </View>
                </TouchableOpacity>
            )}
        </Swiper>
    );
};
export default SwiperBraner;
