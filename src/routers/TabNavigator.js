/* eslint-disable react-native/no-inline-styles */
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLOR_APP } from 'constants/colors';
import SCENE_NAMES from 'constants/sceneName';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CategoryContainer from 'scenes/main/category/Category.container';
import HomeContainer from 'scenes/main/home/Home.container';
import NotifyContainer from 'scenes/main/notify/notify.container';
import ProfileContainer from 'scenes/main/profile/Profile.container';
import ProfileMain from 'scenes/main/profileMain/Profile.container';

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  const [numNotify, setNum] = useState(0);
  useEffect(() => {
    var uid = 'CUS';
    var count = 0;
    if (auth().currentUser) {
      uid = auth().currentUser.uid;
    }
    database().ref('Announces').on('value', snapshot => {
      snapshot.forEach(child => {
        if (child.child('Users').hasChild(uid) === false) {
          count++;
        }
      });
      setNum(count);
    });
  }, []);
  return (
    <Tab.Navigator
      initialRouteName={SCENE_NAMES.HOME}
      tabBarOptions={{ activeTintColor: COLOR_APP }}>
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
          tabBarLabel: 'Notify',
          tabBarIcon: ({ color, size, focused }) => (
            <View>
              <MaterialCommunityIcons
                name="bell"
                color={focused ? COLOR_APP : color}
                size={size}
              />
              {numNotify > 0 && <View style={{ height: 10, width: 10, borderRadius: 20, position: 'absolute', zIndex: 1, backgroundColor: 'red', right: 0, justifyContent: 'center', alignItems: 'center', minHeight: 12, minWidth: 12 }} >
                <Text style={{ fontSize: 8, color: 'white', fontWeight: '700' }}>{numNotify}</Text>
              </View>}
            </View>
          ),
        }}
        name={SCENE_NAMES.NOTIFY}
        component={NotifyContainer}
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
