// @flow

import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { ANIMATIONS } from '@/constants';

import App from './AppNavigator';
import Screen2 from '@/components/Test/Screen2';

// 21h15 la fontana à libourne

const routes = {
  App: { screen: App },
  Screen2: { screen: Screen2 },
};

const RootNavigator = createStackNavigator(
  routes,
  {
    mode: 'modal',
    initialRouteName: 'App',
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: ANIMATIONS.DEFAULT_ANIMATIONS_OPTIONS,
    }),
  }
);

export default RootNavigator;
