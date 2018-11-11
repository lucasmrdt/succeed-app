// @flow

import { createStackNavigator } from 'react-navigation';
import { ANIMATIONS } from '@/constants';

import App from './AppNavigator';
import { CompleteTask } from '@/containers/screens';
import Screen3 from '@/components/Test/Screen3';

const routes = {
  App: { screen: App },
  CompleteTask: { screen: CompleteTask },
  Screen3: { screen: Screen3 },
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
