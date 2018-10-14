// @flow

import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { AppNavigator } from '../navigator';
import { combineReducers } from 'redux';

const navReducer = createNavigationReducer(AppNavigator);

const reducer = combineReducers({
  nav: navReducer,
});

export default reducer;
