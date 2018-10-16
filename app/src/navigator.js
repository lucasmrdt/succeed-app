// @flow

import { Animated, Easing } from 'react-native';
import { createFluidNavigator } from 'react-navigation-fluid-transitions';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import Screen1 from './components/Test/Screen1';
import Screen2 from './components/Test/Screen2';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);

const routes = {
  Screen1: { screen: Screen1 },
  Screen2: { screen: Screen2 },
};

const AppNavigator = createFluidNavigator(
  routes,
  {
    initialRouteName: 'Screen1',
    headerMode: 'none',
    gesturesEnabled: true,
    mode: 'card',
    transitionConfig: {
      duration: 500,
      timing: Animated.timing,
      easing: Easing.out(Easing.exp),
    }
  },
);

const AppNavigatorState = reduxifyNavigator(AppNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav,
});

const AppConnected = connect(mapStateToProps)(AppNavigatorState);

export { AppNavigator, AppConnected, middleware };
