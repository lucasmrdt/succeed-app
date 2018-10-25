// @flow

import { combineReducers } from 'redux';
import testReducer from './testReducer';
import homeReducer from './homeReducer';

const reducer = combineReducers({
  testReducer,
  home: homeReducer,
});

export default reducer;
