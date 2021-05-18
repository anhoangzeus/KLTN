import React from 'react';
//import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeContainer from 'scenes/main/home/Home.container';
import ProfileContainer from 'scenes/main/profile/Profile.container';
import ProfileMain from 'scenes/main/profileMain/Profile.container';
import NotifyContainer from 'scenes/main/notify/notify.container';
import CategoryContainer from 'scenes/main/category/Category.container';
import SCENE_NAMES from 'constants/sceneName';
import {COLOR_APP} from 'constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import ChatContainer from 'scenes/main/chat/chat.container';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={SCENE_NAMES.HOME}
      tabBarOptions={{
        // showLabel: false,
        // style: {
        //   position: 'absolute',
        //   bottom: 15,
        //   left: 20,
        //   right: 20,
        //   borderRadius: 15,
        //   height: 50,
        //   ...styles.shadow,
        // },
        activeTintColor: COLOR_APP,
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size, focused}) => (
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
          tabBarLabel: 'Category',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="apps" color={color} size={size} />
          ),
        }}
        name={SCENE_NAMES.CATEGORY}
        component={CategoryContainer}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, size, focused}) => (
            <Ionicons
              name="chatbox-ellipses"
              color={focused ? COLOR_APP : color}
              size={size}
            />
          ),
        }}
        name={SCENE_NAMES.ChatContainer}
        component={ChatContainer}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Notify',
          tabBarIcon: ({color, size, focused}) => (
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
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size, focused}) => (
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

// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: '#7F5DF0',
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.5,
//     elevation: 5,
//   },
// });

export default MainTabNavigator;
