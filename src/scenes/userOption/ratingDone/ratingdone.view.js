/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Modal,
    RefreshControl,
    Alert,
    Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NumberFormat from 'components/NumberFormat';
import styles from './ratingdone.styles';


const ProductItem = ({ item }) => (
    <View style={styles.itemContainer1}>
        <Text style={{ color: '#000', marginHorizontal: 10, textAlign: 'center', fontSize: 15 }}>Mã đơn hàng:{item.OrderID}</Text>
        <View style={{ flexDirection: 'row' }}>
            <Image source={{ uri: item.Picture }} style={styles.itemImage} />
            <View style={{ marginLeft: 20 }}>
                <Text style={{ color: '#000', marginHorizontal: 10 }}>{item.CreatedDate}</Text>
                <Text style={{ color: '#000', marginHorizontal: 10 }}>{item.Payment === '01' ? 'Thanh toán khi nhận hàng' : 'Thanh toán trực tuyến'}</Text>
                <Text style={styles.itemName} numberOfLines={2}>{item.Name}</Text>
                <Text style={styles.itemPrice}><NumberFormat value={item.Price} /></Text>
            </View>

        </View>

    </View>
);
const RatingDoneView = (props) => {
    const { modalVisible, setmodalVisible, getInfor, refreshing, _onRefresh, RatingInfor, ListProduct } = props;
    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={styles.screenContainer}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={_onRefresh}
                        />
                    }
                    numberOfLines={2}
                    showsVerticalScrollIndicator={false}
                    data={ListProduct}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => { setmodalVisible(true); getInfor(item.ProductId, item.id); }}>
                            <ProductItem item={item} />
                        </TouchableOpacity>
                    }
                />
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.ModelContainer}>
                                <FontAwesome name="times-circle" size={25} color="#fff" />
                                <Text style={styles.modalText}>Đánh Giá Của Bạn</Text>
                                <TouchableOpacity style={styles.btnClose} onPress={() => { setmodalVisible(false); }}>
                                    <FontAwesome name="times-circle" size={30} color="red" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.modalText}>{RatingInfor.Point}<FontAwesome name="star" size={30} color="gold" />   </Text>

                            <Text style={{ color: '#000', fontSize: 18 }}>Ngày đánh giá {RatingInfor.Date}</Text>
                            <Text style={{ color: '#000', marginTop: 10 }}>{RatingInfor.Comment === '' ? 'Chưa có bình luận...' : RatingInfor.Comment}</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};
export default RatingDoneView;
