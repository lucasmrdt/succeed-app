// @flow

import { Animated, Easing } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Home from './HomeNavigator';

const routes = {
  Home: { screen: Home },
};

const RootNavigator = createStackNavigator(
  routes,
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    gesturesEnabled: true,
    mode: 'card',
    // TODO: use BottomMaterialTab
    // transitionConfig: {
    //   duration: 500,
    //   timing: Animated.timing,
    //   easing: Easing.out(Easing.exp),
    // }
  },
);

export default RootNavigator
