/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Image,
} from 'react-native';
import styles from './myStoreOption.styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from 'components/Header';

const ProfileItem = ({ icon, name }) => (
    <View style={styles.itemContainer}>
        <MaterialCommunityIcons name={icon} size={26} color="#1e1e1e" />
        <Text style={[styles.itemText, { marginLeft: icon ? 20 : 0 }]}>{name}</Text>
        <FontAwesome name="angle-right" size={15} color="#1e1e1e" />
    </View>
);
export default function MyStoreOptionView(props) {
    const { FullName, Avatar } = props;
    return (
        <SafeAreaView style={styles.screenContainer}>
            <ScrollView style={styles.screenContainer}>
                <StatusBar backgroundColor="#a2459a" barStyle="light-content" />
                <Header title={'Quản lí bán hàng'} />
                <View style={styles.bodyContainer}>
                    <TouchableOpacity
                        onPress={() => { NavigationServices.navigate(SCENE_NAMES.InfoUser); }}
                        style={styles.avatarContainer}>
                        <Image source={{ uri: Avatar }} size={80} style={styles.img} />
                        <Text >{FullName}</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => { }}>
                        <ProfileItem icon="format-list-bulleted" name="Đơn hàng" />
                    </TouchableOpacity>
                    <View style={styles.divider1} />
                    <TouchableOpacity onPress={() => { }}>
                        <ProfileItem icon="eye-outline" name="Sản phẩm của tôi" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.AddProductContainer); }}>
                        <ProfileItem icon="plus-circle" name="Thêm sản phẩm" />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity onPress={() => { }}>
                        <ProfileItem icon="heart-outline" name="Doanh thu" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <ProfileItem icon="bookmark-outline" name="Đánh giá Shop" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <ProfileItem icon="star" name="Sản phẩm được đánh giá" />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <ProfileItem name="Xem Shop của tôi" />
                    <View style={styles.divider1} />
                    <ProfileItem icon="headphones" name="Hỗ trợ" />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}
