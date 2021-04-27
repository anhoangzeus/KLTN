/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import {
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    FlatList,
    ScrollView,
    RefreshControl,
    SafeAreaView,
    Image,
} from 'react-native';
import styles from './addProduct.styles';
import withLoading from 'components/HOC/withLoading';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from 'components/Header';

export default function AddProductView(props) {
    return (
        <SafeAreaView>
            <ScrollView>
                <StatusBar backgroundColor="#a2459a" barStyle="light-content" />
                <Header title={'Thêm sản phẩm'} />
            </ScrollView>
        </SafeAreaView>
    );
}