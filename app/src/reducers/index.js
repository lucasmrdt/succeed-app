// @flow

import { combineReducers } from 'redux';
import testReducer from './testReducer';
import homeReducer from './homeReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
  testReducer,
  home: homeReducer,
  user: userReducer,
});

export default reducer;
