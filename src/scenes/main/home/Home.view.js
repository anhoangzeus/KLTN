/* eslint-disable react-native/no-inline-styles */
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
} from 'react-native';
import styles from './Home.styles';
import withLoading from 'components/HOC/withLoading';
// import ScrollViewPullRefresh from 'components/ScrollViewPullRefresh';
// import { SVG_NAME } from 'assets/path';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import NewProductItem from 'components/TopTrendProduct';
import ProductItem from 'components/ProductItem';
import SwiperBraner from 'components/Swiper/SwiperBanner';
import TopBraner from 'components/Swiper/TopBanner';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';

console.disableYellowBox = true;

function HomeView(props) {
  const { renderNofiCart, listpro, listall, listcontents, listphone, listtablet, navigation, refreshing, _onRefresh } = props;

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View style={styles.screenContainer}>
        <StatusBar
          backgroundColor="#a2459a"
          barStyle="light-content"
          translucent={false}
        />
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => { navigation.goBack(); }}>
            <View style={styles.inputContainer}>
              <FontAwesome name="search" size={24} color="#969696" />
              <Text style={styles.inputText}>Bạn tìm gì hôm nay?</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.cartContainer}>
            <TouchableOpacity onPress={() => { }}>
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
            {TopBraner('Hot nhất hôm nay')}
            <View style={styles.proHotContainer}>
              <Text style={{ fontSize: 17, color: 'black', marginVertical: 10 }}>
                <Foundation name="burst-new" color="red" size={25} />
            Cooking-Baking Grocery Supplies
        </Text>
              <FlatList
                horizontal={true}
                numberOfLines={2}
                showsHorizontalScrollIndicator={false}
                data={listphone}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.PRODUCT, { id: item.id, CategoryID: item.CategoryID, BrandID: item.BrandID }); }}>
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
              <Text style={{ fontSize: 17, color: 'black', marginVertical: 10 }}>
                <Foundation name="burst-new" color="red" size={25} />
            Breads-Bakery Hot Sale
        </Text>
              <FlatList
                horizontal={true}
                numberOfLines={2}
                showsHorizontalScrollIndicator={false}
                data={listtablet}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.PRODUCT, { id: item.id, CategoryID: item.CategoryID, BrandID: item.BrandID }); }}>
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
              <Text style={{ fontSize: 17, color: 'black', marginVertical: 10 }}>
                <Foundation name="burst-new" color="red" size={25} />
            Snack Foods Hot Sale
        </Text>
              <FlatList
                horizontal={true}
                numberOfLines={2}
                showsHorizontalScrollIndicator={false}
                data={listpro}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.PRODUCT, { id: item.id, CategoryID: item.CategoryID, BrandID: item.BrandID }); }}>
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
            <View style={{ marginTop: 10 }}>
              <FlatList
                initialNumToRender={20}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={listall}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.PRODUCT, { id: item.id, CategoryID: item.CategoryID, BrandID: item.BrandID }); }}>
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
            <View style={{ height: 10, backgroundColor: 'silver' }} />
            <View style={styles.sectionContainer} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default withLoading(HomeView);
