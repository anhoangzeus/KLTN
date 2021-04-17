/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from './Profile.styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';

const ProfileItem = ({ icon, name }) => (
    <View style={styles.itemContainer}>
        <MaterialCommunityIcons name={icon} size={26} color="#1e1e1e" />
        <Text style={[styles.itemText, { marginLeft: icon ? 20 : 0 }]}>{name}</Text>
        <FontAwesome name="angle-right" size={15} color="#1e1e1e" />
    </View>
);
const ProfileMainView = (props) => {
    const { Avatar, FullName, Email, CreatedDate } = props;
    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={styles.screenContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Cá nhân</Text>
                </View>
                <ScrollView>
                    <View style={styles.bodyContainer}>
                        <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.InfoUser); }}>
                            <View style={styles.userContainer}>
                                <View style={styles.avatarContainer}>
                                    <Image source={{ uri: Avatar }} size={80} style={styles.avatarContainer} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.welcomeText}>{FullName}</Text>
                                    <Text style={styles.authText}>{Email}</Text>
                                    <Text style={styles.authText}>Thành viên từ {CreatedDate}</Text>
                                </View>
                                <FontAwesome name="angle-right" size={26} color="#a2459a" />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity>
                            <ProfileItem icon="facebook" name="Kết nối mạng xã hội" />
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.TopRatingScreen); }}>
                            <ProfileItem icon="star-outline" name="Đánh giá sản phẩm" />
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.TopStackOrder); }}>
                            <ProfileItem icon="format-list-bulleted" name="Quản lí đơn hàng" />
                        </TouchableOpacity>
                        <View style={styles.divider1} />
                        <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.TopStackOrder, { screen: SCENE_NAMES.OrderXuli }); }}>
                            <ProfileItem name="Đơn hàng đang chờ xác nhận" />
                        </TouchableOpacity>
                        <View style={styles.divider1} />
                        <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.TopStackOrder, { screen: SCENE_NAMES.Order_LayHangScreen }); }}>
                            <ProfileItem name="Đơn hàng đang chờ lấy hàng" />
                        </TouchableOpacity>
                        <View style={styles.divider1} />
                        <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.TopStackOrder, { screen: SCENE_NAMES.Order_DangVanChuyen }); }}>
                            <ProfileItem name="Đơn hàng đang vận chuyển" />
                        </TouchableOpacity>
                        <View style={styles.divider1} />
                        <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.TopStackOrder, { screen: SCENE_NAMES.Order_DaGiao }); }}>
                            <ProfileItem name="Đơn hàng thành công" />
                        </TouchableOpacity>
                        <View style={styles.divider1} />
                        <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.TopStackOrder, { screen: SCENE_NAMES.Order_DaHuy }); }}>
                            <ProfileItem name="Đơn hàng đã huỷ" />
                        </TouchableOpacity>
                        <View style={styles.divider1} />
                        <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.TopStackOrder, { screen: SCENE_NAMES.Order_TraHang }); }}>
                            <ProfileItem name="Đơn hàng trả lại" />
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.AddRessScreen); }}>
                            <ProfileItem icon="map-marker-outline" name="Số địa chỉ" />
                        </TouchableOpacity>
                        <View style={styles.divider1} />
                        <TouchableOpacity>
                            <ProfileItem icon="credit-card-settings-outline" name="Thông tin thanh toán" />
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity>
                            <ProfileItem icon="cart-outline" name="Sản phẩm đã mua" />
                        </TouchableOpacity>
                        <View style={styles.divider1} />
                        <TouchableOpacity>
                            <ProfileItem icon="eye-outline" name="Sản phẩm đã xem" />
                        </TouchableOpacity>
                        <View style={styles.divider1} />
                        <TouchableOpacity>
                            <ProfileItem icon="heart-outline" name="Sản phẩm yêu thích" />
                        </TouchableOpacity>
                        <View style={styles.divider1} />
                        <TouchableOpacity>
                            <ProfileItem icon="clock-outline" name="Sản phẩm mua sau" />
                        </TouchableOpacity>
                        <View style={styles.divider1} />
                        <TouchableOpacity>
                            <ProfileItem name="Cài đặt" />
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <TouchableOpacity>
                            <ProfileItem icon="headphones" name="Hỗ trợ" />
                        </TouchableOpacity>
                        <View style={styles.divider} />
                        <View style={styles.divider} />

                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { auth().signOut(); NavigationServices.replace(SCENE_NAMES.MAIN, { name: SCENE_NAMES.HOME }); }}
                        >
                            <Text style={styles.textSign}>Đăng xuất</Text>
                        </TouchableOpacity>
                        <View style={styles.divider} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView >
    );
};
export default ProfileMainView;