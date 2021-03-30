import * as React from 'react';
import {
  ScrollView,
  StatusBar,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './Category.styles';
import SwiperBraner from 'components/Swiper/SwiperBanner';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
// import {NAMESPACE} from './Category.constants';

function CategoryView(props) {
  const {
    BrandItem,
    CategoryItem,
    _onRefresh,
    renderNofiCart,
    renderNull,
    refesh,
    listproduct,
    listcate,
    categoryid,
    listbrand,
    listcontent,
    ProductItem,
  } = props;

  return (
    <SafeAreaView style={styles.screenContainer} >
      <View style={styles.screenContainer}>
        <StatusBar barStyle="light-content" translucent={false} />
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <View style={styles.inputContainer}>
              <FontAwesome name="search" size={24} color="#969696" />
              <Text style={styles.inputText}>Bạn tìm gì hôm nay?</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.cartContainer}>
            <TouchableOpacity onPress={() => { NavigationServices.navigate(SCENE_NAMES.CART_SCREEN); }}>
              <FontAwesome name="shopping-cart" size={24} color="#fff" />
              {renderNofiCart()}
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
                renderItem={({ item }) => (
                  <CategoryItem name={item.name} id={item.id} icon={item.icon} />
                )}
                keyExtractor={(item) => item.id}
                extraData={categoryid}
              />
              <FlatList
                // eslint-disable-next-line react-native/no-inline-styles
                style={{ marginVertical: 10 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={listbrand}
                renderItem={({ item }) => (
                  <BrandItem image={item.image} id={item.id} />
                )}
                keyExtractor={(item) => item.id}
              />
              <View style={styles.space} />
              <View style={styles.listItemContainer}>
                <FlatList
                  initialNumToRende={3}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  data={listproduct}
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
                  keyExtractor={(item) => item.id}
                  ListEmptyComponent={renderNull}
                />
              </View>
            </View>
            <View style={styles.safeArea} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default React.memo(CategoryView);
