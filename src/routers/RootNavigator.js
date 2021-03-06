import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
//Route Import
import Route_Contents from 'components/WebView/index';
import SCENE_NAMES from 'constants/sceneName';
import * as React from 'react';
import LoginScreen from 'scenes/auth/login/login.container';
import RegiserOtpContainer from 'scenes/auth/regiserOtp/RegiserOtp.container';
import RegisterScreen from 'scenes/auth/register/register.container';
import SignInContainer from 'scenes/auth/signIn/SignIn.container';
import DummyScreen from 'scenes/dummy';
import GetStartContainer from 'scenes/getStart/GetStart.container';
import CartScreen from 'scenes/main/cart/cart.container';
import CategoryContainer from 'scenes/main/category/Category.container';
import ChatContainer from 'scenes/main/chat/chat.container';
import ChatBoxContainer from 'scenes/main/chatBox/chatBox.container';
import DetailAddressContainer from 'scenes/main/detailAddress/DetailAddress.container';
import PaymentMethodContainer from 'scenes/main/paymentMethod/PaymentMethod.container';
import ProductScreen from 'scenes/main/product/Product.container';
import ProfileScreen from 'scenes/main/profile/Profile.container';
import ProfileMainScreen from 'scenes/main/profileMain/Profile.container';
import SearchContainer from 'scenes/main/search/Search.container';
// Screen Import
import EditStoreContainer from 'scenes/main/editStore/EditStore.container';
import SellerOrderContainer from 'scenes/main/sellerOrder/SellerOrder.container';
import ReportContainer from 'scenes/main/report/Report.container';
import StatisticContainer from 'scenes/main/statistic/Statistic.container';
import CommentContainer from 'scenes/main/comment/Comment.container';
import RegisterStoreContainer from 'scenes/main/registerStore/RegisterStore.container';
import StoreProfileContainer from 'scenes/main/storeProfile/StoreProfile.container';
import DetailStoreProductContainer from 'scenes/main/detailStoreProduct/DetailStoreProduct.container';
import StoreProductContainer from 'scenes/main/storeProduct/StoreProduct.container';
import SellerproductContainer from 'scenes/main/sellerproduct/Sellerproduct.container';
import ZalopayContainer from 'scenes/main/zalopay/Zalopay.container';
import AddProductContainer from 'scenes/mystore/addProduct/addProduct.container';
import MyStoreOptionContainer from 'scenes/mystore/myStoreOption/myStoreOption.container';
import AddRessScreen from 'scenes/userOption/Address/address.container';
import DetailOrderContainer from 'scenes/userOption/order/detail_order/detail_order.container';
import InfoUser from 'scenes/userOption/profile/infoUser.container';
import NavigationServices from 'utils/navigationServices';
import RatingScreen from '../scenes/userOption/Rating/rating.container';
//TopTab
import MainTabNavigator from './TabNavigator';
import TopStackLogin from './TopTabNavigator/LoginTab';
import TopStackOrder from './TopTabNavigator/OrderTab';
import TopRatingScreen from './TopTabNavigator/RatingTab';
import Route_ContentViews from 'components/ContentView';
//import ProductNewContainer from 'scenes/userOption/ProductView/ProductNewScreen';

const Stack = createStackNavigator();

function RootNavigator({onNavigationStateChange}) {
  return (
    <NavigationContainer
      onStateChange={onNavigationStateChange}
      ref={(navigatorRef) => {
        NavigationServices.setTopLevelNavigator(navigatorRef);
      }}>
      <Stack.Navigator
        screenOptions={{
          headerBackTitle: null,
          headerTitleAlign: 'center',
          headerTruncatedBackTitle: null,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        initialRouteName={SCENE_NAMES.MAIN}>
        {__DEV__ && (
          <Stack.Screen name={SCENE_NAMES.DUMMY} component={DummyScreen} />
        )}
        {/* Plop screen */}
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.EDIT_STORE}
          component={EditStoreContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.SELLER_ORDER}
          component={SellerOrderContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.REPORT}
          component={ReportContainer}
        />
        <Stack.Screen
          name={SCENE_NAMES.STATISTIC}
          options={{headerShown: false}}
          component={StatisticContainer}
        />
        <Stack.Screen name={SCENE_NAMES.COMMENT} component={CommentContainer} />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.REGISTER_STORE}
          component={RegisterStoreContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.STORE_PROFILE}
          component={StoreProfileContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.DETAIL_STORE_PRODUCT}
          component={DetailStoreProductContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.STORE_PRODUCT}
          component={StoreProductContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.SELLERPRODUCT}
          component={SellerproductContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.SEARCH}
          component={SearchContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.REGISER_OTP}
          component={RegiserOtpContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.ZALOPAY}
          component={ZalopayContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.PAYMENT_METHOD}
          component={PaymentMethodContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.DETAIL_ADDRESS}
          component={DetailAddressContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.ChatContainer}
          component={ChatContainer}
        />
        <Stack.Screen
          name={SCENE_NAMES.CATEGORY}
          component={CategoryContainer}
        />
        <Stack.Screen name={SCENE_NAMES.SIGN_IN} component={SignInContainer} />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.MAIN}
          component={MainTabNavigator}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.ChatBoxContainer}
          component={ChatBoxContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.AddProductContainer}
          component={AddProductContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.TopStackLogin}
          component={TopStackLogin}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.TopRatingScreen}
          component={TopRatingScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.TopStackOrder}
          component={TopStackOrder}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.RatingScreen}
          component={RatingScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.DetailOrderContainer}
          component={DetailOrderContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.GET_START}
          component={GetStartContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.CART_SCREEN}
          component={CartScreen}
        />
        <Stack.Screen name={SCENE_NAMES.LOGIN} component={LoginScreen} />
        <Stack.Screen name={SCENE_NAMES.Register} component={RegisterScreen} />
        <Stack.Screen name={SCENE_NAMES.PROFILE} component={ProfileScreen} />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.MyStoreOptionContainer}
          component={MyStoreOptionContainer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.AddRessScreen}
          component={AddRessScreen}
        />
        <Stack.Screen
          name={SCENE_NAMES.PROFILEMAIN}
          component={ProfileMainScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.InfoUser}
          component={InfoUser}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.Route_Contents}
          component={Route_Contents}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.Route_ContentViews}
          component={Route_ContentViews}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name={SCENE_NAMES.PRODUCT}
          component={ProductScreen}
        />
        {/* <Stack.Screen
          options={{ headerShown: false }}
          name={SCENE_NAMES.ProductNewContainer}
          component={ProductNewContainer}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
