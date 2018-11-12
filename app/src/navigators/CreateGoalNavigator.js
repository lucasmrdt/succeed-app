// @flow

import { createFluidNavigator } from 'react-navigation-fluid-transitions';

import { StepperForm } from '@/components';

const routes = {
  CreateGoalTest: { screen: StepperForm },
};

const CreateGoalNavigator = createFluidNavigator(
  routes,
  {
    initialRouteName: 'CreateGoalTest',
    navigationOptions: { gesturesEnabled: true },
    mode: 'card',
    initialRouteParams: {
      stepLenght: 7,
      routeName: 'CreateGoal',
    },
  }
);

export default CreateGoalNavigator;
