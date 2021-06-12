/* eslint-disable react-native/no-inline-styles */
import withLoading from 'components/HOC/withLoading';
import ProductItem from 'components/ProductItem';
import SwiperBraner from 'components/Swiper/SwiperBanner';
import TopBraner from 'components/Swiper/TopBanner';
import NewProductItem from 'components/TopTrendProduct';
import SCENE_NAMES from 'constants/sceneName';
import * as React from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import ScrollViewPullRefresh from 'components/ScrollViewPullRefresh';
// import { SVG_NAME } from 'assets/path';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationServices from 'utils/navigationServices';
import styles from './Home.styles';

const {width} = Dimensions.get('screen');

function HomeView(props) {
  const {
    renderNofiCart,
    renderNumChat,
    listpro,
    listall,
    listcontents,
    listphone,
    listtablet,
    refreshing,
    _onRefresh,
  } = props;

  return (
    <SafeAreaView style={styles.screenContainersafe}>
      <View style={styles.screenContainer}>
        <StatusBar
          backgroundColor="#2B4F8C"
          barStyle="light-content"
          translucent={false}
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => {
              NavigationServices.navigate(SCENE_NAMES.SEARCH);
            }}>
            <FontAwesome name="search" size={width * 0.05} color="#969696" />
            <Text style={styles.inputText}>Bạn tìm gì hôm nay?</Text>
          </TouchableOpacity>
          <View style={styles.cartContainer}>
            <TouchableOpacity
              style={{width: width * 0.07}}
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.CART_SCREEN);
              }}>
              <FontAwesome
                name="shopping-cart"
                size={width * 0.07}
                color="#fff"
              />
              {renderNofiCart()}
            </TouchableOpacity>
          </View>
          <View style={styles.cartContainer}>
            <TouchableOpacity
              style={{width: width * 0.07, marginLeft: 5}}
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.ChatContainer);
              }}>
              <Icon
                name="chatbubble-ellipses"
                size={width * 0.06}
                color="#fff"
              />
              {renderNumChat()}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
            }>
            {SwiperBraner(listcontents)}
            {TopBraner('Hot nhất hôm nay')}
            <View style={styles.proHotContainer}>
              <Text style={{fontSize: 17, color: 'black', marginVertical: 10}}>
                <Foundation name="burst-new" color="red" size={25} />
                Đóng hộp
              </Text>
              <FlatList
                horizontal={true}
                numberOfLines={2}
                showsHorizontalScrollIndicator={false}
                data={listphone}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      NavigationServices.navigate(SCENE_NAMES.PRODUCT, {
                        item: item,
                      });
                    }}>
                    <NewProductItem item={item} />
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={styles.proHotContainer}>
              <Text style={{fontSize: 18, color: 'black', marginVertical: 10}}>
                <Foundation name="burst-new" color="red" size={25} />{' '}
                Breads-Bakery Hot Sale
              </Text>
              <FlatList
                horizontal={true}
                numberOfLines={2}
                showsHorizontalScrollIndicator={false}
                data={listtablet}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      NavigationServices.navigate(SCENE_NAMES.PRODUCT, {
                        item: item,
                      });
                    }}>
                    <NewProductItem item={item} />
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={styles.proHotContainer}>
              <Text style={{fontSize: 18, color: 'black', marginVertical: 10}}>
                <Foundation name="burst-new" color="red" size={25} /> Snack
                Foods Hot Sale
              </Text>
              <FlatList
                horizontal={true}
                numberOfLines={2}
                showsHorizontalScrollIndicator={false}
                data={listpro}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      NavigationServices.navigate(SCENE_NAMES.PRODUCT, {
                        item: item,
                      });
                    }}>
                    <NewProductItem item={item} />
                  </TouchableOpacity>
                )}
              />
            </View>
            <Text style={{fontSize: 18, color: 'black', marginVertical: 10}}>
              <Foundation name="burst-new" color="red" size={25} /> Sản phẩm nhà
              bán lẻ
            </Text>
            <View style={{marginTop: 10}}>
              <FlatList
                initialNumToRender={20}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={listall}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      NavigationServices.navigate(SCENE_NAMES.SELLERPRODUCT, {
                        item: item,
                      });
                    }}>
                    <ProductItem item={item} />
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={{height: 10, backgroundColor: 'silver'}} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default withLoading(HomeView);
