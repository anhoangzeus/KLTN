/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  View,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import styles from './Home.styles';
import withLoading from 'components/HOC/withLoading';
// import ScrollViewPullRefresh from 'components/ScrollViewPullRefresh';
// import { SVG_NAME } from 'assets/path';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewProductItem from 'components/TopTrendProduct';
import ProductItem from 'components/ProductItem';
import SwiperBraner from 'components/Swiper';
import SCENE_NAMES from 'constants/sceneName';
import NavigationServices from 'utils/navigationServices';

function HomeView(props) {
  const {
    renderNofiCart,
    listpro,
    listall,
    listcontents,
    //listdongho,
    listphone,
    //listphukien,
    listtablet,
    navigation,
    refreshing,
    _onRefresh,
  } = props;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.screenContainer}>
        <StatusBar
          backgroundColor="#a2459a"
          barStyle="light-content"
          translucent={false}
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.inputContainer}>
              <FontAwesome name="search" size={24} color="#969696" />
              <Text style={styles.inputText}>Bạn tìm gì hôm nay?</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.cartContainer}>
            <TouchableOpacity onPress={() => {}}>
              <FontAwesome name="shopping-cart" size={24} color="#fff" />
              {renderNofiCart()}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
            }>
            {SwiperBraner(listcontents, navigation)}
            <View style={styles.proHotContainer1}>
              <Text style={{fontSize: 17, color: 'black'}}>
                <Icons name="fire" color="red" size={25} />
                Hot nhất hôm nay{' '}
              </Text>
              <View style={{flexDirection: 'row', marginTop: 5}}>
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    style={styles.tophotimg1}
                    source={require('assets/images/iphonepromax.jpg')}
                  />
                </TouchableOpacity>

                <View style={{marginLeft: 5}}>
                  <TouchableOpacity onPress={() => {}}>
                    <Image
                      style={styles.hotimgtype2}
                      source={require('assets/images/sale1.jpg')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <Image
                      style={styles.hotimgtype1}
                      source={require('assets/images/sale2.jpg')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{marginLeft: 5}}>
                  <TouchableOpacity onPress={() => {}}>
                    <Image
                      style={styles.hotimgtype2}
                      source={require('assets/images/sale3.jpg')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <Image
                      style={styles.hotimgtype1}
                      source={require('assets/images/sale4.jpg')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* <View style={styles.proHotContainer1}>
            <Text style={{ fontSize: 17, color: 'black' }}>
              <Icons name="fire" color="red" size={25} />
          Top sản phẩm bán chạy </Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <TouchableOpacity onPress={() => { }}>
                <Image style={styles.tophotimg1}
                  source={require('assets/images/iphonepromax.jpg')}
                />
              </TouchableOpacity>
              <View style={{ marginLeft: 5 }}>
                <TouchableOpacity onPress={() => { }}>
                  <Image style={styles.hotimgtype2} source={{ uri: 'https://cdn.tgdd.vn/Products/Images/42/213031/TimerThumb/iphone-12-blue-600x600-thumb-hen-gio.jpg' }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                  <Image style={styles.hotimgtype1} source={{ uri: 'https://cdn.tgdd.vn/Products/Images/42/229056/oppo-a93-230520-060532-400x400.jpg' }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ marginLeft: 5 }}>
                <TouchableOpacity onPress={() => { }}>
                  <Image style={styles.hotimgtype2} source={{ uri: 'https://cdn.tgdd.vn/Products/Images/42/225380/iphone-12-mini-blue-600jpg-400x400.jpg' }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                  <Image style={styles.hotimgtype1} source={{ uri: 'https://cdn.tgdd.vn/Products/Images/42/217308/xiaomi-redmi-9-tim-new-600x600-400x400.jpg' }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View> */}
            <View style={styles.proHotContainer}>
              <Text style={{fontSize: 17, color: 'black', marginVertical: 10}}>
                <Foundation name="burst-new" color="red" size={25} />
                Pantry Staples
              </Text>
              <FlatList
                horizontal={true}
                numberOfLines={2}
                showsHorizontalScrollIndicator={false}
                data={listphone}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      NavigationServices.navigate(SCENE_NAMES.PRODUCT, {
                        id: item.id,
                        CategoryID: item.CategoryID,
                        BrandID: item.BrandID,
                      })
                    }>
                    <NewProductItem
                      name={item.title}
                      image={item.image}
                      price={item.price}
                      rating={item.rating}
                      bough={item.bough}
                      PromotionPrice={item.PromotionPrice}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={styles.proHotContainer}>
              <Text style={{fontSize: 17, color: 'black', marginVertical: 10}}>
                <Foundation name="burst-new" color="red" size={25} />
                Breads & Bakery
              </Text>
              <FlatList
                horizontal={true}
                numberOfLines={2}
                showsHorizontalScrollIndicator={false}
                data={listtablet}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      NavigationServices.navigate(SCENE_NAMES.PRODUCT, {
                        id: item.id,
                        CategoryID: item.CategoryID,
                        BrandID: item.BrandID,
                      })
                    }>
                    <NewProductItem
                      name={item.title}
                      image={item.image}
                      price={item.price}
                      rating={item.rating}
                      bough={item.bough}
                      PromotionPrice={item.PromotionPrice}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={styles.proHotContainer}>
              <Text style={{fontSize: 17, color: 'black', marginVertical: 10}}>
                <Foundation name="burst-new" color="red" size={25} />
                Snack Foods
              </Text>
              <FlatList
                horizontal={true}
                numberOfLines={2}
                showsHorizontalScrollIndicator={false}
                data={listpro}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      NavigationServices.navigate(SCENE_NAMES.PRODUCT, {
                        id: item.id,
                        CategoryID: item.CategoryID,
                        BrandID: item.BrandID,
                      })
                    }>
                    <NewProductItem
                      name={item.title}
                      image={item.image}
                      price={item.price}
                      rating={item.rating}
                      bough={item.bough}
                      PromotionPrice={item.PromotionPrice}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
            {/* <View style={styles.proHotContainer}>
            <Text style={{fontSize: 17, color: 'black', marginVertical: 10}}>
              <Foundation name="burst-new" color="red" size={25} />
              Mẫu đồng hồ sang trọng mới
            </Text>
            <FlatList
              horizontal={true}
              numberOfLines={2}
              showsHorizontalScrollIndicator={false}
              data={listdongho}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => {}}>
                  <NewProductItem
                    name={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    bough={item.bough}
                    PromotionPrice={item.PromotionPrice}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.proHotContainer}>
            <Text style={{fontSize: 17, color: 'black', marginVertical: 10}}>
              <Foundation name="burst-new" color="red" size={25} />
              Mẫu phụ kiện mới nhất
            </Text>
            <FlatList
              horizontal={true}
              numberOfLines={2}
              showsHorizontalScrollIndicator={false}
              data={listphukien}
              renderItem={({item}) => (
                <TouchableOpacity onPress={() => {}}>
                  <NewProductItem
                    name={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    bough={item.bough}
                    PromotionPrice={item.PromotionPrice}
                  />
                </TouchableOpacity>
              )}
            />
          </View> */}
            <View style={{marginTop: 10}}>
              <FlatList
                initialNumToRender={20}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={listall}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={() => {}}>
                    <ProductItem
                      name={item.title}
                      image={item.image}
                      price={item.price}
                      rating={item.rating}
                      bough={item.bough}
                      PromotionPrice={item.PromotionPrice}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
            <View style={{height: 10, backgroundColor: 'silver'}} />
            <View style={styles.sectionContainer} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default withLoading(HomeView);
