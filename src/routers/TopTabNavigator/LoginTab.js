import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import LoginScreen from 'scenes/auth/login/login.container';
import RegisterScreen from 'scenes/auth/register/register.container';
import { HeaderBackButton } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';

const TabTop = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
    containner: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '15%',
    },
    headderButton: {
        position: 'absolute',
        color: 'red',
    },
    texthead: {
        position: 'absolute',
    },
});

const TopStackLogin = ({ props }) => {
    return (
        <View style={styles.containner}>
            <Image
                source={require('../../assets/images/shop2.png')}
                style={styles.image}
            />
            <HeaderBackButton style={styles.texthead} onPress={() => NavigationServices.navigate(SCENE_NAMES.MAIN)} />
            <TabTop.Navigator
                tabBarOptions={{
                    activeTintColor: 'blue',
                }}
            >
                <TabTop.Screen name="Đăng nhập" component={LoginScreen}
                />
                <TabTop.Screen name="Đăng kí" component={RegisterScreen} />
            </TabTop.Navigator></View>
    );
};
export default TopStackLogin;

