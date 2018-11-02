// @flow

import { all } from 'redux-saga/effects';
import taskSagas from './taskSagas';

function* saga(): Generator<*, *, *> {
  yield all([
    ...taskSagas,
  ]);
}

export default saga;
