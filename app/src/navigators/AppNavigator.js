// @flow

import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { ANIMATIONS } from '@/constants';
// import { Rocket, Check } from '@/assets/icons';

import TabBar from '@/components/TabBar';
import Screen1 from '@/components/Test/Screen1';
import Screen2 from '@/components/Test/Screen2';
import IconsScreen from '@/components/Test/IconsScreen';

// 21h15 la fontana à libourne

const routes = {
  Home: {
    screen: Screen1,
    navigationOptions: {
      // tabBarIcon: () => <Check color="blue" />
    },
  },
  Home2: {
    screen: Screen2,
    navigationOptions: {
      tabBarIcon: () => <Ionicons name='ios-american-football' size={25} />
    },
  },
  Home3: {
    screen: Screen1,
    navigationOptions: {
      tabBarIcon: () => <Ionicons name='ios-basketball' size={25} />
    },
  },
  Icons: {
    screen: IconsScreen,
    navigationOptions: {
      tabBarIcon: () => <Ionicons name='ios-archive' size={25} />
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
