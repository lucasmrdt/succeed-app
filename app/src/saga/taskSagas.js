// @flow

import { takeLatest, select, put, call } from 'redux-saga/effects';
import { taskActions } from '@/actions';
import * as Services from '@/services';

import { StateType } from '@/types/reduxTypes';

const getTaskFilter = (state: StateType) => state.goal.selectedFilter.label;

function* loadTasks() {
  try {
    const filter = select(getTaskFilter);
    const tasks = yield call(Services.getTasks, filter);
    yield put(taskActions.successLoadTasks(tasks));
  } catch(e) {
    yield put(taskActions.failLoadTasks(e));
  }
}

function* changeFilter() {
  yield put(taskActions.loadTasks());
}

const goalSagas = [
  takeLatest(taskActions.REFRESH_TASKS, loadTasks),
  takeLatest(taskActions.LOAD_TASKS, loadTasks),
  takeLatest(taskActions.CHANGE_FILTER, changeFilter),
];

export default goalSagas;
