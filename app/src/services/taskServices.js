// @flow

import * as Api from './api';

import {
  type FilterType,
  type TaskType,
} from '@/types/dataTypes';

export const getTasks = async (filter: FilterType) => {
  const tasks: Array<TaskType> = await Api.getTasks(filter);
  return tasks;
};
