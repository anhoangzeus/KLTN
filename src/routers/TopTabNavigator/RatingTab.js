import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Rating from 'scenes/userOption/rating/rating.container';
import RatingDone from 'scenes/userOption/ratingDone/ratingdone.container';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Header from 'components/Header';

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
      <Header title={'Đánh giá sản phẩm'} type={true} />
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
