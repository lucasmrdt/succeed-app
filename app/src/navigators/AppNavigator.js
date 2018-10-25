// @flow

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Animated } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { ANIMATIONS, SIZES, COLORS } from '@/constants';
import { Rocket, Profile, Bell } from '@/assets/icons';

import { BottomTabBar, TabBarIcon } from '@/components/TabBar';
import Home from '@/components/Home';
import Screen1 from '@/components/Test/Screen1';
import Screen2 from '@/components/Test/Screen2';
import Screen3 from '@/components/Test/Screen3';
import IconsScreen from '@/components/Test/IconsScreen';

const routes = {
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <TabBarIcon colorisedIconOpacity={tintColor} icon={Rocket} />
      ),
    },
  },
  Profile: {
    screen: Screen3,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <TabBarIcon colorisedIconOpacity={tintColor} icon={Profile} />
      ),
    },
  },
  Notification: {
    screen: IconsScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <TabBarIcon colorisedIconOpacity={tintColor} icon={Bell} />
      ),
    },
  },
};

const AppNavigator = createMaterialTopTabNavigator(
  routes,
  {
    initialRouteName: 'Home',
    animationEnabled: false,
    tabBarComponent: BottomTabBar,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: { backgroundColor: 'rgba(0, 0, 0, 0)' },
      showIcon: true,
      pressOpacity: 0,
      pressColor: 'rgba(0, 0, 0, 0)',
    },
  },
);

export default AppNavigator;
