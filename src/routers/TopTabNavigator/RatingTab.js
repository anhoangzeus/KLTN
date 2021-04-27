import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import Rating from 'scenes/userOption/Rating/rating.container';
import RatingDone from 'scenes/userOption/ratingDone/ratingdone.container';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NavigationServices from 'utils/navigationServices';
import SCENE_NAMES from 'constants/sceneName';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {width} = Dimensions.get('screen');
const TopTab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    backgroundColor: '#2B4F8C',
    paddingBottom: 12,
  },
  cartContainer: {
    paddingHorizontal: 20,
    width: 72,
    borderRadius: 15,
  },
  headerText: {
    color: '#fff',
    textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default function TopRatingScreen(props) {
  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor="#2B4F8C" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.cartContainer}
          onPress={() => {
            NavigationServices.navigate(SCENE_NAMES.MAIN);
          }}>
          <FontAwesome
            name="angle-left"
            size={30}
            color="#fff"
            style={{marginLeft: width / 40}}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Đánh giá sản phẩm</Text>
      </View>
      <TopTab.Navigator
        tabBarOptions={{
          activeTintColor: '#2B4F8C',
        }}>
        <TopTab.Screen
          name="Rating"
          component={Rating}
          options={{
            title: 'Chưa đánh giá',
          }}
        />
        <TopTab.Screen
          name="RatingDone"
          component={RatingDone}
          options={{
            title: 'Đã đánh giá',
          }}
        />
      </TopTab.Navigator>
    </View>
  );
}
