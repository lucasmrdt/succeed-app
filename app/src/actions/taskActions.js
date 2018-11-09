// @flow

import {
  type FilterType,
  type TaskType,
} from '@/types/dataTypes';

export type ActionType = 'CHANGE_FILTER'
  | 'LOAD_TASKS'
  | 'SUCCESS_LOAD_TASKS'
  | 'FAIL_LOAD_TASKS'
  | 'REFRESH_TASKS'
  | 'SELECT_TASK'
  | 'CHANGE_TASK_USER_SCORE';

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

export const SELECT_TASK = 'SELECT_TASK';
export const selectTask = (taskId: number) => ({
  type: SELECT_TASK,
  payload: taskId,
});

export const COMPLETE_TASK = 'COMPLETE_TASK';
export const completeTask = (taskId: string, userScore: number) => ({
  type: COMPLETE_TASK,
  payload: {
    taskId,
    userScore,
  },
});
