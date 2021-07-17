/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  RefreshControl,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Header from 'components/Header';
import styles from './SellerOrder.styles';
import NavigationServices from 'utils/navigationServices';
import ReactNativeNumberFormat from 'components/NumberFormat';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SCENE_NAMES from 'constants/sceneName';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
const SellerOrderView = (props) => {
  const {loading, _onRefresh, refreshing, listOrder} = props;
  const RenderList = ({
    CreatedDate,
    ShipAddress,
    ToTalPrice,
    orderDetail,
    id,
  }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        NavigationServices.navigate(SCENE_NAMES.DetailOrderContainer, {id: id});
      }}>
      <View style={{flex: 1, margin: 10}}>
        <Text style={{color: '#2B4F8C'}}>
          {' '}
          {I18n.t(`${NAMESPACE}.orderid`)}: {id}
        </Text>
        {orderDetail.map((data) => {
          return (
            <View>
              <Text>{data.Name}</Text>
              <Image
                source={{uri: data.Picture}}
                style={{width: 50, height: 50, resizeMode: 'contain'}}
              />
              <Text>
                <ReactNativeNumberFormat value={data.Price} /> x {data.Quantity}
              </Text>
            </View>
          );
        })}
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons name="event-available" size={20} color="#1e88e5" />
          <Text style={{marginLeft: 10, color: '#000'}}>{CreatedDate}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons name="location-on" size={20} color="#1e88e5" />
          <Text numberOfLines={1} style={styles.address}>
            {ShipAddress}
          </Text>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
          {I18n.t(`${NAMESPACE}.total`)}:{' '}
          <ReactNativeNumberFormat value={ToTalPrice} />
        </Text>
      </View>
      <Text style={{color: 'white', textAlign: 'center'}}>
        {' '}
        {I18n.t(`${NAMESPACE}.view`)}
      </Text>
    </TouchableOpacity>
  );
  const renderNull = () => {
    return (
      <TouchableOpacity
        style={styles.containerNull}
        onPress={() => {
          _onRefresh();
        }}>
        <Image
          source={require('../../../assets/images/process3.jpg')}
          style={styles.img}
        />
        <Text style={styles.txtEmpty}> {I18n.t(`${NAMESPACE}.noorder`)}</Text>
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
    <SafeAreaView style={styles.screenContainers}>
      <View style={styles.screenContainer}>
        <StatusBar backgroundColor="#2B4F8C" barStyle="light-content" />
        <Header title={I18n.t(`${NAMESPACE}.order`)} />
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
          }
          pagingEnabled={false}
          data={listOrder}
          initialNumToRender={10}
          renderItem={({item}) => (
            <RenderList
              CreatedDate={item.CreatedDate}
              ShipAddress={item.ShipAddress}
              ShipName={item.ShipName}
              ShipMoblie={item.ShipMoblie}
              ToTalPrice={item.Total}
              orderDetail={item.Detail}
              id={item.OrderID}
              key={item.id}
            />
          )}
          ListEmptyComponent={renderNull}
        />
      </View>
    </SafeAreaView>
  );
};
export default SellerOrderView;
