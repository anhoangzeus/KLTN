import CommentItem from 'components/CommentItem';
import NumberFormat from 'components/NumberFormat';
import ProductItem from 'components/ProductItem';
import StarRating from 'components/StarRating';
import SCENE_NAMES from 'constants/sceneName';
import * as React from 'react';
import {
  Alert,
  Animated, Dimensions, FlatList, Image,
  Modal, SafeAreaView, ScrollView,
  StatusBar, Text, TouchableHighlight, TouchableOpacity, View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NavigationServices from 'utils/navigationServices';
import styles from './Product.styles';

// import {NAMESPACE} from './Product.constants';

const { height, width } = Dimensions.get('screen');
function ProductView(props) {
  const {
    addCart,
    handleClose,
    renderNofiCart,
    setID,
    listproductlienquan,
    listmoreimage,
    bough,
    name,
    rating,
    idsanpham,
    metadescription,
    price,
    promotionprice,
    waranty,
    decription,
    sao1,
    sao2,
    sao3,
    sao4,
    sao5,
    listcomment,
    modalvisible,
    brandname,
    image,
  } = props;
  console.log('list moreimage:', image);
  const scrollY = new Animated.Value(0);
  const HEADER_MAX_HEIGHT = height / 10;
  const HEADER_MIN_HEIGHT = height / 30;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT + HEADER_MIN_HEIGHT;
  const headerHeight = scrollY.interpolate({
    inputRange: [HEADER_MAX_HEIGHT / 2.5, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MIN_HEIGHT, HEADER_MAX_HEIGHT],
    extrapolate: 'clamp',
  });
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <Animated.View style={[styles.headerFont1, { height: headerHeight }]}>
          <TouchableOpacity
            style={styles.setTouchableBack}
            onPress={() => NavigationServices.goBack()}>
            <FontAwesome name="chevron-left" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingTouchSearch}
            onPress={() => NavigationServices.navigate('Setting')}>
            <FontAwesome name="search" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingTouch}
            onPress={() =>
              NavigationServices.navigate(SCENE_NAMES.MAIN, {
                name: SCENE_NAMES.HOME,
              })
            }>
            <FontAwesome name="home" size={30} color="white" />
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={styles.settingTouch}
              onPress={() =>
                NavigationServices.navigate(SCENE_NAMES.CART_SCREEN)
              }>
              <FontAwesome name="shopping-cart" size={30} color="white" />
            </TouchableOpacity>
            {renderNofiCart()}
          </View>
        </Animated.View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } },
          ])}>
          <Swiper
            loop={true}
            showsPagination={true}
            index={0}
            width={width}
            height={height / 2}>
            {listmoreimage.map((item) => (
              <View backgroundColor="white" style={styles.profileContainer}>
                <Image source={{ uri: item }} style={styles.profileImage} />
              </View>
            ))}
          </Swiper>
          <View style={styles.headerFont}>
            <TouchableOpacity
              style={styles.setTouchableBack}
              onPress={() => NavigationServices.goBack()}>
              <FontAwesome name="chevron-left" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingTouchSearch}
              onPress={() => NavigationServices.navigate('Setting')}>
              <FontAwesome name="search" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingTouch}
              onPress={() =>
                NavigationServices.navigate(SCENE_NAMES.MAIN, {
                  name: SCENE_NAMES.HOME,
                })
              }>
              <FontAwesome name="home" size={30} color="white" />
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                style={styles.settingTouch}
                onPress={() =>
                  NavigationServices.navigate(SCENE_NAMES.CART_SCREEN)
                }>
                <FontAwesome name="shopping-cart" size={30} color="white" />
              </TouchableOpacity>
              {renderNofiCart()}
            </View>
          </View>
          <View style={styles.options}>
            <View>
              <View>
                <Text style={styles.textName}>{name}</Text>

                {bough !== 0 ? (
                  <View style={styles.starratingView}>
                    <StarRating rating={rating} size={17} />
                    <TouchableOpacity
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{ marginLeft: 10 }}
                      onPress={() => {
                        NavigationServices.navigate('RatingView', {
                          id: idsanpham,
                        });
                      }}>
                      <Text style={styles.textGreen}>
                        (Xem {bough} đánh giá)
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={styles.textGreen2}>Chưa có đánh giá</Text>
                )}

                <Text style={styles.metaView}>{metadescription}</Text>
                <View style={styles.priceView}>
                  <Text style={styles.priceText}>
                    <NumberFormat value={promotionprice} />{' '}
                  </Text>
                  {price === promotionprice ? null : (
                    // eslint-disable-next-line react-native/no-inline-styles
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.promotionText}>
                        <NumberFormat value={price} />
                      </Text>
                      <Text style={styles.valueText}>
                        {(((price - promotionprice) / price) * 100).toFixed(0)}%
                      </Text>
                    </View>
                  )}
                </View>
                <View>
                  <Text style={styles.warantyText}>
                    {waranty} tháng bảo hành
                  </Text>
                </View>
              </View>
            </View>
            <View />
          </View>
          <View />
          {listproductlienquan.length === 0 ? null : (
            <View style={styles.relateView}>
              <Text bold size={12} style={styles.relateText}>
                Sản Phẩm Tương Tự
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.flatstyle}
                data={listproductlienquan}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setID(item.proid);
                    }}>
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
                keyExtractor={(item) => item.proid}
              />
            </View>
          )}
          <View style={styles.fiveView} />
          <View style={styles.divider} />
          <View style={styles.whiteView}>
            <Text bold size={12} style={styles.desText}>
              Mô Tả Sản Phẩm
            </Text>
            <Text muted size={12} style={styles.mainText}>
              {' '}
              {decription}
            </Text>
            <View style={styles.quarView} />
          </View>
          <View style={styles.fiveView} />
          {bough !== 0 ? (
            <View style={styles.relateView}>
              <View style={styles.clientView}>
                <Text bold size={12} style={styles.clientText}>
                  Khách Hàng Nhận Xét{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    NavigationServices.navigate('RatingView', {
                      id: idsanpham,
                    });
                  }}>
                  <Text style={styles.viewAll}>XEM TẤT CẢ</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.rowView}>
                <View style={styles.ratingView}>
                  {/* <Text style={styles.ratingText}>{rating.toFixed(1)}</Text> */}
                  <StarRating rating={rating} size={10} />
                  <Text style={styles.commentText}>{bough} nhận xét</Text>
                </View>
                <View style={styles.startView} />
                <View style={styles.marginView}>
                  <View style={styles.star}>
                    <StarRating rating={5} size={17} />
                    <Text style={styles.starUI}>{sao5}</Text>
                  </View>
                  <View style={styles.star}>
                    <StarRating rating={4} size={17} />
                    <Text style={styles.starUI}>{sao4}</Text>
                  </View>
                  <View style={styles.star}>
                    <StarRating rating={3} size={17} />
                    <Text style={styles.starUI}>{sao3}</Text>
                  </View>
                  <View style={styles.star}>
                    <StarRating rating={2} size={17} />
                    <Text style={styles.starUI}>{sao2}</Text>
                  </View>
                  <View style={styles.star}>
                    <StarRating rating={1} size={17} />
                    <Text style={styles.starUI}>{sao1}</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : null}
          <View style={styles.fiveView} />
          <FlatList
            data={listcomment}
            showsVerticalScrollIndicator={false}
            initialNumToRender={3}
            pagingEnabled={true}
            renderItem={({ item }) => <CommentItem item={item} />}
          />
        </ScrollView>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalvisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.rowView}>
                  <Text style={styles.textGreen2}>
                    <Feather name="check-circle" color="green" size={18} /> Sản
                    phẩm đã được thêm vào giỏ hàng{' '}
                  </Text>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      handleClose();
                    }}>
                    <FontAwesome5 name="times-circle" color="red" size={20} />
                  </TouchableOpacity>
                </View>

                <View style={styles.rowView}>
                  <Image source={{ uri: image }} style={styles.modalImage} />
                  <View style={styles.byView}>
                    <Text numberOfLines={1} style={styles.modalnameText}>
                      {name}
                    </Text>
                    <Text numberOfLines={1} style={styles.byText}>
                      Cung cấp bởi {brandname}
                    </Text>
                    <Text>
                      <NumberFormat value={price} />
                    </Text>
                  </View>
                </View>
                <TouchableHighlight
                  style={styles.cartButton}
                  onPress={() =>
                    NavigationServices.navigate(SCENE_NAMES.CART_SCREEN)
                  }>
                  <Text style={styles.cartView}>Xem giỏ hàng</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
        <View style={styles.devide} />
        <View style={styles.buyView}>
          <TouchableOpacity style={styles.btnmua} onPress={() => addCart()}>
            <Text style={styles.addText}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default React.memo(ProductView);
