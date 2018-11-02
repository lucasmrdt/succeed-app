// @flow

import { TaskType } from '@/types/dataTypes';

export const sortTasks = (tasks: Array<TaskType>) => {
  tasks.sort((a, b) => b.statut - a.statut);
  return tasks;
};