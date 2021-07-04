
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NavigationServices from 'utils/navigationServices';
import React, { useState, useEffect } from 'react';
import SCENE_NAMES from 'constants/sceneName';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const OrderStatus = () => {
    const [numChoXac, setnumChoXac] = useState(0);
    const [numChoLay, setnumChoLay] = useState(0);
    const [numDangGiao, setnumDangGiao] = useState(0);
    const [numDanhGia, setnumDanhGia] = useState(0);
    const getCount = () => {
        database().ref('Orders').on('value', snapshot => {
            var stateChoXac = 0;
            var stateChoLay = 0;
            var stateDangGiao = 0;
            snapshot.forEach((child) => {
                if (auth().currentUser) {
                    if (auth().currentUser.uid === child.val().CustomerID) {
                        if (child.val().Status === '1') {
                            stateChoXac++;
                        } else if (child.val().Status === '2') {
                            stateChoLay++;
                        } else if (child.val().Status === '3') {
                            stateDangGiao++;
                        }
                    }
                }
            });
            setnumChoXac(stateChoXac);
            setnumChoLay(stateChoLay);
            setnumDangGiao(stateDangGiao);
        });
    };
    const getCountRating = () => {
        database().ref('Orders').on('value', snapshot => {
            var stateDanhGia = 0;
            snapshot.forEach((child) => {
                if (auth().currentUser) {
                    if (auth().currentUser.uid === child.val().CustomerID) {
                        if (child.val().Status === '4') {
                            child.child('OrderDetails').forEach((childDetail) => {
                                if (!childDetail.val().Status) {
                                    stateDanhGia++;
                                }
                            });
                        }
                    }
                }
            });
            setnumDanhGia(stateDanhGia);
        });
    };
    useEffect(() => {
        getCount();
        getCountRating();
    }, []);
    const renderCount = (count) => (
        <View style={styles.redPoint}>
            <Text style={styles.textRedPoint}>{count}</Text>
        </View>
    );
    return (
        <View style={styles.container} >
            <TouchableOpacity style={styles.items} onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.TopStackOrder, { screen: SCENE_NAMES.OrderXuli });
            }}>
                <Icon name="form" size={30} color="#000" />
                <Text style={styles.text}>Chờ xác nhận</Text>
                {numChoXac > 0 && renderCount(numChoXac)}
            </TouchableOpacity>
            <TouchableOpacity style={styles.items} onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.TopStackOrder, { screen: SCENE_NAMES.Order_LayHangScreen });
            }}>
                <FontAwesome5 name="boxes" size={30} color="#000" />
                <Text style={styles.text}>Chờ lấy hàng</Text>
                {numChoLay > 0 && renderCount(numChoLay)}
            </TouchableOpacity>

            <TouchableOpacity style={styles.items} onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.TopStackOrder, { screen: SCENE_NAMES.Order_DangVanChuyen });
            }}>
                <FontAwesome5 name="truck-moving" size={30} color="#000" />
                <Text style={styles.text}>Đang giao</Text>
                {numDangGiao > 0 && renderCount(numDangGiao)}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.TopRatingScreen); }} style={styles.items}>
                <FontAwesome5 name="star" size={30} color="#000" />
                <Text style={styles.text}>Đánh giá</Text>
                {numDanhGia > 0 && renderCount(numDanhGia)}
            </TouchableOpacity>

        </View>
    );
};
export default OrderStatus;
