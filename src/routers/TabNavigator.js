import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeContainer from 'scenes/main/home/Home.container';
import ProfileContainer from 'scenes/main/profile/Profile.container';
import NotifyScreen from 'scenes/main/notify/notify.container';
import SCENE_NAMES from 'constants/sceneName';
import { COLOR_APP } from 'constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={SCENE_NAMES.HOME}
      tabBarOptions={{
        activeTintColor: COLOR_APP,
      }}>

      <Tab.Screen
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="home" color={focused ? COLOR_APP : color} size={size} />
          ),
        }}
        name={SCENE_NAMES.HOME}
        component={HomeContainer}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="bell" color={focused ? COLOR_APP : color} size={size} />
          ),
        }}
        name={SCENE_NAMES.NOTIFY}
        component={NotifyScreen}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="account" color={focused ? COLOR_APP : color} size={size} />
          ),
        }}
        name={SCENE_NAMES.PROFILE}
        component={ProfileContainer}
      />
    </Tab.Navigator >
  );
}

export default MainTabNavigator;
