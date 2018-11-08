// @flow

import { createStackNavigator } from 'react-navigation';
import { ANIMATIONS } from '@/constants';

import App from './AppNavigator';
import { CompleteTask } from '@/containers/screens';

const routes = {
  App: { screen: App },
  CompleteTask: { screen: CompleteTask },
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
