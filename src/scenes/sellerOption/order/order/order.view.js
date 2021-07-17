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
} from 'react-native';
import styles from './order.styles';
import NavigationServices from 'utils/navigationServices';
import ReactNativeNumberFormat from 'components/NumberFormat';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SCENE_NAMES from 'constants/sceneName';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
const OrderView = (props) => {
  const {loading, _onRefresh, refreshing, listOrder} = props;
  console.log('list order: ', listOrder);
  const RenderList = ({item}) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        // if (item.Status === '1') {
        NavigationServices.navigate(SCENE_NAMES.ConfimOrderContainer, {
          item,
        });
        // }
        // NavigationServices.navigate(SCENE_NAMES.DetailOrderContainer, {
        //   item: item,
        // });
      }}>
      <View style={{flex: 1, margin: 10}}>
        <Text style={{color: '#2B4F8C'}}>
          {' '}
          {I18n.t(`${NAMESPACE}.orderid`)}: {item.OrderID}
        </Text>
        {item.OrderDetails?.map((data) => {
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
          <Text style={{marginLeft: 10, color: '#000'}}>
            {item.CreatedDate}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons name="location-on" size={20} color="#1e88e5" />
          <Text numberOfLines={1} style={styles.address}>
            {item.ShipAddress}
          </Text>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
          {I18n.t(`${NAMESPACE}.total`)}:{' '}
          <ReactNativeNumberFormat value={item.Total} />
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
          source={require('../../../../assets/images/process3.jpg')}
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
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
      }
      pagingEnabled={false}
      data={listOrder}
      initialNumToRender={10}
      keyExtractor={(item) => item.OrderID}
      renderItem={({item}) => <RenderList item={item} />}
      ListEmptyComponent={renderNull}
    />
  );
};
export default OrderView;
