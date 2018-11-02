// @flow

import { getRandomTasks } from './fakeValues';

export const getTasks = () => new Promise((r) =>
  setTimeout(() => {
    r(getRandomTasks());
  }, 1000)
);
