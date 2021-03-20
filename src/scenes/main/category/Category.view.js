import * as React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import NumberFormat from 'react-number-format';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './Category.styles';
import Swiper from 'react-native-swiper';
const { width, height } = Dimensions.get('screen');
// import {NAMESPACE} from './Category.constants';

function RatingUI(rating) {
  // var point = parseInt(rating);
  // switch (point) {
  //   case 1: return (
  //     <View style={{ flexDirection: 'row' }}>
  //       <FontAwesome name="star" size={17} color="#ffd700" style={styles.reviewimg} />
  //       <FontAwesome name="star" size={17} color="#000" style={{ marginLeft: 5 }} />
  //       <FontAwesome name="star" size={17} color="#000" style={{ marginLeft: 5 }} />
  //       <FontAwesome name="star" size={17} color="#000" style={{ marginLeft: 5 }} />
  //       <FontAwesome name="star" size={17} color="#000" style={{ marginLeft: 5 }} />
  //     </View>
  //   );
  //   case 2: return (
  //     <View style={{ flexDirection: 'row' }}>
  //       <FontAwesome name="star" size={17} color="#ffd700" style={styles.reviewimg} />
  //       <FontAwesome name="star" size={17} color="#ffd700" style={{ marginLeft: 5 }} />
  //       <FontAwesome name="star" size={17} color="#000" style={{ marginLeft: 5 }} />
  //       <FontAwesome name="star" size={17} color="#000" style={{ marginLeft: 5 }} />
  //       <FontAwesome name="star" size={17} color="#000" style={{ marginLeft: 5 }} />
  //     </View>
  //   );
  //   case 3: return (
  //     <View style={{ flexDirection: 'row' }}>
  //       <FontAwesome name="star" size={17} color="#ffd700" style={styles.reviewimg} />
  //       <FontAwesome name="star" size={17} color="#ffd700" style={{ marginLeft: 5 }} />
  //       <FontAwesome name="star" size={17} color="#ffd700" style={{ marginLeft: 5 }} />
  //       <FontAwesome name="star" size={17} color="#000" style={{ marginLeft: 5 }} />
  //       <FontAwesome name="star" size={17} color="#000" style={{ marginLeft: 5 }} />
  //     </View>
  //   );
  //   case 4: return (
  //     <View style={{ flexDirection: 'row' }}>
  //       <FontAwesome name="star" size={17} color="#ffd700" style={styles.reviewimg} />
  //       <FontAwesome name="star" size={17} color="#ffd700" style={{ marginLeft: 5 }} />
  //       <FontAwesome name="star" size={17} color="#ffd700" style={{ marginLeft: 5 }} />
  //       <FontAwesome name="star" size={17} color="#ffd700" style={{ marginLeft: 5 }} />
  //       <FontAwesome name="star" size={17} color="#000" style={{ marginLeft: 5 }} />
  //     </View>
  //   );
  //   case 5: return (
  //     <View style={{ flexDirection: 'row' }}>
  //       <FontAwesome name="star" size={17} color="#ffd700" style={styles.reviewimg} />
  //       <FontAwesome name="star" size={17} color="#ffd700" style={{ marginLeft: 5 }} />
  //       <FontAwesome name="star" size={17} color="#ffd700" style={{ marginLeft: 5 }} />
  //       <FontAwesome name="star" size={17} color="#ffd700" style={{ marginLeft: 5 }} />
  //       <FontAwesome name="star" size={17} color="#ffd700" style={{ marginLeft: 5 }} />
  //     </View>
  //   );
  //   default: return null;
  // }
  return null;
}

const ProductItem = ({ image, name, price, rating, bough, PromotionPrice }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: image }} style={styles.itemImage} />
    <Text style={styles.itemName} numberOfLines={2}>
      {name}
    </Text>
    <Text style={styles.itemPrice}><ReactNativeNumberFormat value={price} />
      {price === PromotionPrice ? null :
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={{ color: 'red' }}>  -{((PromotionPrice - price) / PromotionPrice * 100).toFixed(0)}%</Text>
      }
    </Text>
    <View style={styles.view}>
      {RatingUI(rating)}
      {bough !== 0 ? <Text style={styles.greenText}>({bough})</Text> : null}
    </View>
  </View>
);

function ReactNativeNumberFormat({ value }) {
  return (
    <NumberFormat
      value={value}
      displayType={'text'}
      thousandSeparator={true}
      renderText={formattedValue => <Text >{formattedValue} đ</Text>}
    />
  );
}



function CategoryView(props) {
  const {BrandItem, CategoryItem,  _onRefresh,  renderNofiCart, renderNull, refesh, listcate, categoryid, listbrand, listcontent} = props;

  {/* if (loading !== true){
    return (
      <View style={styles.loadingView }>
          <StatusBar barStyle="light-content" backgroundColor="#a2459a" />
          <Image source={require('../../../assets/images/homeloading.png')} style={styles.imageLoading} />
          <ActivityIndicator size="large" color="'#a2459a" style={styles.indicator} />
        </View>
    );
  }
  else { */}
    return (
    <View style={styles.screenContainer}>
    <StatusBar barStyle="light-content" translucent={false}/>
    <View style={styles.headerContainer}>
      <TouchableOpacity >
        <View style={styles.inputContainer}>
          <FontAwesome name="search" size={24} color="#969696" />
          <Text style={styles.inputText}>Bạn tìm gì hôm nay?</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.cartContainer}>
        <TouchableOpacity >
          <FontAwesome name="shopping-cart" size={24} color="#fff" />
          {renderNofiCart}
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.bodyContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refesh}
            onRefresh={_onRefresh}
          />}
      >
        <Swiper
          autoplay={true}
          autoplayTimeout={2}
          loop={true}
          showsPagination={true}
          showsButtons={true}
          index={0}
          width={width}
          height={height / 4.2}>
          {listcontent.map((item) =>
            <TouchableOpacity
              key={item.id}
              // onPress={() => this.props.navigation.navigate('Contents', { id: item.Url })}
              >
              <View style={styles.sectionContainer}>
                <Image source={{ uri: item.Image }} style={styles.sectionImage} />
              </View>
            </TouchableOpacity>)}
        </Swiper>
        <View style={styles.whiteBackground}>
          <View style={styles.productBackground} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={listcate}
            renderItem={({ item }) =>
              <CategoryItem
                name={item.name}
                id={item.id}
                icon={item.icon}
              />}
            keyExtractor={(item) => item.id}
            extraData={categoryid}
          />
          <FlatList
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ marginVertical: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={listbrand}
            renderItem={({ item }) =>
              <BrandItem
                image={item.image}
                id={item.id}
              />}
            keyExtractor={item => item.id}
          />
          <View style={styles.space} />
          <View style={styles.listItemContainer}>
            <FlatList
              initialNumToRende={3}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={listcate}
              renderItem={({ item }) =>
                <TouchableOpacity
                //onPress={() => navigation.navigate('Items', { id: item.id, CategoryID: item.CategoryID, BrandID: item.BrandID })}
                >
                  <ProductItem
                    name={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    bough={item.bough}
                    PromotionPrice={item.PromotionPrice}
                  />
                </TouchableOpacity>}
              keyExtractor={item => item.id}
              ListEmptyComponent={renderNull}
            />
          </View>
        </View>
        <View style={styles.safeArea} />
      </ScrollView>
    </View>
  </View>
  );
}

export default React.memo(CategoryView);
