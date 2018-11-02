// @flow

import { getRandomTasks } from '../fakeValues';
import { sortTasks } from '../taskServices';

export const getTasks = () => new Promise((r) =>
  setTimeout(() => {
    r(sortTasks(getRandomTasks()));
  }, 5000)
);
