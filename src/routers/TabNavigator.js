import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeContainer from 'scenes/main/home/Home.container';
import ProfileContainer from 'scenes/main/profile/Profile.container';
import ProfileMain from 'scenes/main/profileMain/Profile.container';
import NotifyContainer from 'scenes/main/notify/notify.container';
import CategoryContainer from 'scenes/main/category/Category.container';
import SCENE_NAMES from 'constants/sceneName';
import { COLOR_APP } from 'constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

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
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="home"
              color={focused ? COLOR_APP : color}
              size={size}
            />
          ),
        }}
        name={SCENE_NAMES.HOME}
        component={HomeContainer}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Notify',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="bell"
              color={focused ? COLOR_APP : color}
              size={size}
            />
          ),
        }}
        name={SCENE_NAMES.NOTIFY}
        component={NotifyContainer}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Category',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="apps" color={color} size={size} />
          ),
        }}
        name={SCENE_NAMES.CATEGORY}
        component={CategoryContainer}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name="account"
              color={focused ? COLOR_APP : color}
              size={size}
            />
          ),
        }}
        name={SCENE_NAMES.PROFILE}
        component={auth().currentUser ? ProfileMain : ProfileContainer}
      />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
