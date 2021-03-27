import React from 'react';
import styles from './styles';
import { View, Text } from 'react-native';

const Header = ({ title }) => (
    <View style={styles.headerContainer}>
        <View style={styles.cartContainer}>
            <View style={styles.cartIcon} />
        </View>
        <Text style={styles.headerText}>{title}</Text>
        <View style={styles.cartContainer} />
    </View>
);

export default Header;
