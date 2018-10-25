// @flow

import { all } from 'redux-saga/effects'
import testSagas from './testSaga'

function* saga(): Generator<*, *, *> {
    yield all([
        ...testSagas,
    ])
}

export default saga