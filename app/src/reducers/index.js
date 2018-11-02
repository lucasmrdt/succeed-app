// @flow

import { combineReducers } from 'redux';
import testReducer from './testReducer';
import taskReducer from './taskReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
  testReducer,
  task: taskReducer,
  user: userReducer,
});

export default reducer;
