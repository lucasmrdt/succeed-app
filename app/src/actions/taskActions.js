// @flow

import {
  type FilterType,
  type TaskType,
} from '@/types/dataTypes';

export type ActionType = 'CHANGE_FILTER'
  | 'LOAD_TASKS'
  | 'SUCCESS_LOAD_TASKS'
  | 'FAIL_LOAD_TASKS'
  | 'REFRESH_TASKS';

export const CHANGE_FILTER = 'CHANGE_FILTER';
export const changeFilter = (filter: FilterType) => ({
  type: CHANGE_FILTER,
  payload: filter,
});

export const LOAD_TASKS = 'LOAD_TASKS';
export const loadTasks = () => ({
  type: LOAD_TASKS,
});

export const REFRESH_TASKS = 'REFRESH_TASKS';
export const refreshTasks = () => ({
  type: REFRESH_TASKS,
});

export const SUCCESS_LOAD_TASKS = 'SUCCESS_LOAD_TASKS';
export const successLoadTasks = (tasks: Array<TaskType>) => ({
  type: SUCCESS_LOAD_TASKS,
  payload: tasks,
});

export const FAIL_LOAD_TASKS = 'FAIL_LOAD_TASKS';
export const failLoadTasks = (e) => ({
  type: FAIL_LOAD_TASKS,
  payload: e,
});
