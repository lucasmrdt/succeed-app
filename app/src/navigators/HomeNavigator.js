// @flow

import { Animated, Easing } from 'react-native';
import { createFluidNavigator } from 'react-navigation-fluid-transitions';
import { createStackNavigator } from 'react-navigation';
import { ANIMATIONS } from '@/constants';
import Screen1 from '@/components/Test/Screen1';
import Screen2 from '@/components/Test/Screen2';

const routes = {
  Screen1: { screen: Screen1 },
  Screen2: { screen: Screen2 },
};

const HomeNavigator = createFluidNavigator(
  routes,
  {
    initialRouteName: 'Screen1',
    headerMode: 'none',
    gesturesEnabled: true,
    mode: 'card',
    transitionConfig: {
      duration: ANIMATIONS.QUICK_DURATION,
      easing: Easing.out(Easing.back(1.5)),
    }
  },
);

export default HomeNavigator
