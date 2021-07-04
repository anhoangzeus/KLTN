import React from 'react';
import styles from './styles';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';


const TopBraner = (contents) => {
    return (
        <View style={styles.proHotContainer1}>
            <Text style={styles.txtSize}>
                <Icons name="fire" color="red" size={25} />
                {contents} </Text>
            <View style={styles.proHotContainer2}>
                <TouchableOpacity onPress={() => NavigationServices.navigate(SCENE_NAMES.Route_ContentViews, { id: 'https://www.veganfoodandliving.com/news/' })}>
                    <Image style={styles.tophotimg1}
                        source={require('assets/images/vegan1.jpg')}
                    />
                </TouchableOpacity>

                <View style={styles.decide}>
                    <TouchableOpacity onPress={() => NavigationServices.navigate(SCENE_NAMES.Route_ContentViews, { id: 'https://www.veganfoodandliving.com/news/' })}>
                        <Image style={styles.hotimgtype2} source={require('assets/images/sale1.jpg')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => NavigationServices.navigate(SCENE_NAMES.Route_ContentViews, { id: 'https://www.veganfoodandliving.com/news/' })}>
                        <Image style={styles.hotimgtype1} source={require('assets/images/sale2.jpg')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.decide}>
                    <TouchableOpacity onPress={() => NavigationServices.navigate(SCENE_NAMES.Route_ContentViews, { id: 'https://www.veganfoodandliving.com/news/' })}>
                        <Image style={styles.hotimgtype2} source={require('assets/images/sale3.jpg')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => NavigationServices.navigate(SCENE_NAMES.Route_ContentViews, { id: 'https://www.veganfoodandliving.com/news/' })}>
                        <Image style={styles.hotimgtype1} source={require('assets/images/sale4.jpg')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default TopBraner;

