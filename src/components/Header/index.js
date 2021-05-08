/* eslint-disable react-native/no-inline-styles */
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import SCENE_NAMES from 'constants/sceneName';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationServices from 'utils/navigationServices';
import styles from './styles';

const Header = ({ title, type, isCart }) => {
    const [numcart, setNumCart] = useState(0);
    const getnumcart = () => {
        if (auth().currentUser) {
            database().ref('Cart/' + auth().currentUser.uid).on('value', (snapshot) => {
                var dem = 0;
                snapshot.forEach(function (childSnapshot) {
                    dem += childSnapshot.val().Quantity;
                });
                setNumCart(dem);
            });
        }
    };
    useEffect(() => {
        getnumcart();
    }, []);
    const renderNofiCart = () => {
        if (numcart === 0) {
            return null;
        } else {
            return (
                <View style={styles.cartView}>
                    <Text style={styles.cartText} numberOfLines={1}>
                        {numcart}
                    </Text>
                </View>
            );
        }
    };
    return (
        <View style={styles.headerContainer}>
            {isCart ?
                <View style={styles.cartContainer} />
                :
                <TouchableOpacity
                    onPress={() => { type ? NavigationServices.navigate(SCENE_NAMES.MAIN) : NavigationServices.goBack(); }}
                    style={styles.cartContainer}>
                    <FontAwesome name="angle-left" size={30} color="#fff" style={styles.maginIcon} />
                </TouchableOpacity>
            }

            <Text style={styles.headerText}>{title}</Text>
            {isCart ?
                <TouchableOpacity
                    onPress={() => { NavigationServices.navigate(SCENE_NAMES.CART_SCREEN); }}
                    style={styles.cartContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <FontAwesome name="shopping-cart" size={24} color="#fff" />
                        {renderNofiCart()}
                    </View>
                </TouchableOpacity>
                :
                <View style={styles.cartContainer} />
            }
        </View>
    );
};

export default Header;
