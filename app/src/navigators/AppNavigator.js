// @flow

import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { ANIMATIONS, SIZES, COLORS } from '@/constants';
import * as Icons from '@/assets/icons';

import BottomTabBar from '@/components/BottomTabBar';
import { Home } from '@/screens';
import Screen1 from '@/components/Test/Screen1';
import Screen2 from '@/components/Test/Screen2';
import Screen3 from '@/components/Test/Screen3';
import IconsScreen from '@/components/Test/IconsScreen';

const ICON_PROPS = {
  size: SIZES.TAB_BAR_ICON_SIZE,
  color: COLORS.PURPLE,
};

const routes = {
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: () => <Icons.Rocket {...ICON_PROPS} />,
    },
  },
  Profile: {
    screen: Screen3,
    navigationOptions: {
      tabBarIcon: () => <Icons.Profile {...ICON_PROPS} />,
    },
  },
  Notification: {
    screen: IconsScreen,
    navigationOptions: {
      tabBarIcon: () => <Icons.Bell {...ICON_PROPS} />,
    },
  },
};

const AppNavigator = createMaterialTopTabNavigator(
  routes,
  {
    useNativeDriver: true,
    initialRouteName: 'Home',
    // animationEnabled: false,
    tabBarComponent: BottomTabBar,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: { backgroundColor: 'rgb(255, 255, 255)' },
      showIcon: true,
      pressOpacity: 0,
      pressColor: 'rgba(0, 0, 0, 0)',
    },
  },
);

export default AppNavigator;
