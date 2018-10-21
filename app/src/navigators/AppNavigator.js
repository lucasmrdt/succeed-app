// @flow

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { ANIMATIONS, SIZES } from '@/constants';
import { Rocket, Profile, Bell } from '@/assets/icons';

import TabBar from '@/components/TabBar';
import Screen1 from '@/components/Test/Screen1';
import Screen2 from '@/components/Test/Screen2';
import IconsScreen from '@/components/Test/IconsScreen';

// 21h15 la fontana à libourne

const routes = {
  Home: {
    screen: Screen2,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Rocket color={tintColor} size={SIZES.TAB_BAR_ICON_SIZE}/>
      ),
    },
  },
  Profile: {
    screen: Screen1,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Profile color={tintColor} size={SIZES.TAB_BAR_ICON_SIZE}/>
      ),
    },
  },
  Notification: {
    screen: IconsScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Bell color={tintColor} size={SIZES.TAB_BAR_ICON_SIZE}/>
      ),
    },
  },
};

const AppNavigator = createMaterialTopTabNavigator(
  routes,
  {
    initialRouteName: 'Home',
    animationEnabled: false,
    tabBarComponent: TabBar,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: { backgroundColor: 'rgba(0, 0, 0, 0)' },
      showIcon: true,
      pressOpacity: 0,
      pressColor: 'rgba(0, 0, 0, 0)',
    },
    transitionConfig: () => ({
      transitionSpec: ANIMATIONS.GENERAL_ANIMATIONS_OPTIONS,
    }),
  },
);

export default AppNavigator;
