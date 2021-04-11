/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Modal, TextInput, RefreshControl, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Rating } from 'react-native-ratings';
import NumberFormat from 'components/NumberFormat';
import styles from './rating.styles';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';

const ProductItem = ({ item }) => (
    <View style={styles.itemContainer1}>
        <Text style={styles.txtCodeName}>Mã đơn hàng:{item.OrderID}</Text>
        <View style={styles.row}>
            <Image source={{ uri: item.Picture }} style={styles.itemImage} />
            <View style={{ marginLeft: 20 }}>
                <Text style={styles.txtPrice}>{item.CreatedDate}</Text>
                <Text style={styles.txtPrice}>{item.Payment === '01' ? 'Thanh toán khi nhận hàng' : 'Thanh toán trực tuyến'}</Text>
                <Text style={styles.itemName} numberOfLines={2}>{item.Name}</Text>
                <Text style={styles.itemPrice}><NumberFormat value={item.Price} /></Text>
            </View>
        </View>
    </View>
);
const RatingView = (props) => {
    const {
        modalVisible,
        ListProduct,
        modalVisibleSuccess,
        getListOrder,
        setModalVisible,
        getRatingPoint,
        _onRefresh,
        handleChange,
        refreshing,
        loading,
        votedProduct } = props;

    if (loading) {
        return (
            <View style={styles.loadContainer}>
                <ActivityIndicator size="large" color="dodgerblue" />
            </View>
        );
    }
    if (ListProduct[0] == null) {
        return (
            <TouchableOpacity style={styles.loadContainer}
                onPress={() => getListOrder()}>
                <Text style={styles.txttitle}>Bạn nhớ quay lại đánh giá sản phẩm khi hoàn thành đơn hàng nhé</Text>
                <TouchableOpacity style={styles.btnBuyNow} onPress={() => NavigationServices.navigate(SCENE_NAMES.MAIN)}>
                    <Text style={styles.txttitle}>Mua Sắm Ngay</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
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
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(true);
                                getRatingPoint(item.ProductId, item.OrderID, item.id);
                            }}>
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
                            <View style={styles.modal}>
                                <FontAwesome name="times-circle" size={30} color="#fff" />
                                <Text style={styles.modalText}>Đánh Giá Sản Phẩm</Text>
                                <TouchableOpacity style={styles.btnRating} onPress={() => { setModalVisible(false); }}>
                                    <FontAwesome name="times-circle" size={30} color="red" />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Rating
                                    ratingCount={5}
                                    imageSize={40}
                                    showRating
                                    onFinishRating={this.ratingCompleted}
                                    style={{ marginBottom: 5 }}
                                />
                                <TextInput
                                    textAlignVertical="top"
                                    multiline={true}
                                    placeholder="Bình luận sản phẩm..."
                                    placeholderTextColor="#a2459a"
                                    autoCapitalize="none"
                                    onChangeText={(val) => handleChange(val)}
                                    style={styles.txtInput}
                                />
                                <TouchableOpacity style={styles.btncomment} onPress={() => { votedProduct(); }}>
                                    <Text style={styles.txtSent}>Gửi đánh giá</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisibleSuccess}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView1}>
                            <Text style={styles.modalText}>Gửi thành công</Text>
                            <Text style={styles.modalText}>Cảm ơn quý khách đã cho chúng tôi biết cảm nhận về sản phẩm! </Text>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};
export default RatingView;
