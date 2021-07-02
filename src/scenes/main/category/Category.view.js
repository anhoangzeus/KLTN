/* eslint-disable react-native/no-inline-styles */
import ProductItem from 'components/ProductItem';
import SwiperBraner from 'components/Swiper/SwiperBanner';
import SCENE_NAMES from 'constants/sceneName';
import * as React from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationServices from 'utils/navigationServices';
import styles from './Category.styles';
import I18n from 'utils/i18n';
const NAMESPACE = 'common';
const {width} = Dimensions.get('screen');
// import {NAMESPACE} from './Category.constants';

function CategoryView(props) {
  const {
    //BrandItem,
    CategoryItem,
    _onRefresh,
    renderNofiCart,
    renderNumChat,
    renderNull,
    refesh,
    listproduct,
    listcate,
    categoryid,
    //listbrand,
    listcontent,
  } = props;

  return (
    <SafeAreaView style={styles.screenContainersafe}>
      <View style={styles.screenContainer}>
        <View style={styles.screenContainer}>
          <StatusBar barStyle="light-content" translucent={false} />
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => {
                NavigationServices.navigate(SCENE_NAMES.SEARCH);
              }}>
              <FontAwesome name="search" size={width * 0.05} color="#969696" />
              <Text style={styles.inputText}>
                {I18n.t(`${NAMESPACE}.search`)}
              </Text>
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
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refesh} onRefresh={_onRefresh} />
              }>
              {SwiperBraner(listcontent)}
              <View style={styles.whiteBackground}>
                <View style={styles.productBackground} />
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={listcate}
                  renderItem={({item}) => <CategoryItem item={item} />}
                  keyExtractor={(item) => item.CateProductID}
                  extraData={categoryid}
                />
                <View style={styles.space} />
                <View style={styles.listItemContainer}>
                  <FlatList
                    initialNumToRende={3}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={listproduct}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => {
                          NavigationServices.navigate(SCENE_NAMES.PRODUCT, {
                            id: item.id,
                            CategoryID: item.CategoryID,
                            BrandID: item.BrandID,
                          });
                        }}>
                        <ProductItem item={item} />
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={renderNull}
                  />
                </View>
              </View>
              <View style={styles.safeArea} />
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default React.memo(CategoryView);
