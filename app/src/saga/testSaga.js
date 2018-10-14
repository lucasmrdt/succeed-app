// @flow

import { takeLatest } from 'redux-saga/effects';

function* test(action) {
    console.log('test');
}

const testSagas = [
    takeLatest('test', test),
];

export default testSagas;
