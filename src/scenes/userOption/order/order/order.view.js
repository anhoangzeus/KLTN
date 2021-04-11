import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, RefreshControl } from 'react-native';
import styles from './order.styles';

const OrderView = (props) => {
    const { loading, _onRefresh, refreshing, listOrder } = props;
    const renderNull = () => {
        return (
            <TouchableOpacity style={styles.containerNull}
                onPress={() => { _onRefresh(); }}
            >
                <Image source={require('../../../../assets/images/process3.jpg')} style={styles.img} />
                <Text style={styles.txtEmpty}>Chưa có đơn hàng</Text>
            </TouchableOpacity>
        );
    };
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="dodgerblue" />
            </View>
        );
    }
    return (
        <FlatList
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={_onRefresh}
                />
            }
            pagingEnabled={false}
            data={listOrder}
            initialNumToRender={10}
            renderItem={({ item }) =>
                <this.RenderList
                    CreatedDate={item.CreatedDate}
                    ShipAddress={item.ShipAddress}
                    ShipName={item.ShipName}
                    ShipMoblie={item.ShipMoblie}
                    ToTalPrice={item.ToTalPrice}
                    orderDetail={item.orderDetail}
                    id={item.id}
                    key={item.id}
                />
            }
            ListEmptyComponent={renderNull}
        />
    );
};
export default OrderView;
