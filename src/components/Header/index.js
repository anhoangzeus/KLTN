import React from 'react';
import styles from './styles';
import { View, Text, TouchableOpacity } from 'react-native';
import NavigationServices from 'utils/navigationServices';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SCENE_NAMES from 'constants/sceneName';


const Header = ({ title, type }) => (
    <View style={styles.headerContainer}>
        <TouchableOpacity
            onPress={() => { type ? NavigationServices.navigate(SCENE_NAMES.MAIN) : NavigationServices.goBack(); }}
            style={styles.cartContainer}>
            <FontAwesome name="angle-left" size={30} color="#fff" style={styles.maginIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
        <View style={styles.cartContainer} />
    </View>
);

export default Header;
