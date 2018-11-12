// @flow

import * as Icons from '@/assets/icons/Topics';
import { STATUS, COLORS } from '@/constants';

import {
  type TaskType,
  type IconType,
} from '@/types/dataTypes';

const possibleColors = [COLORS.YELLOW_PASTEL, COLORS.BLUE_PASTEL, COLORS.PINK_PASTEL, COLORS.BROWN_PASTEL];
const possibleIcons: Array<IconType> = ['Gamepad', 'CreditCard', 'Beer', 'Coffee', 'Cycler'];
const possibleStatus = Object.keys(STATUS).map(k => STATUS[k]);
const chooseRandom = arr => arr[Math.floor(Math.random() * arr.length)];
const possibleLabels = [
  'make push-ups',
  'make squat',
  'go to drive',
  'share your love',
  'drink some vodka',
  'take care of your',
  'see your friends',
];

let id = 0;
const getRandomTask = (): TaskType => {
  const todo = Math.floor(Math.random() * 100 + 2);
  const diff = Math.floor(Math.random() * 30 + 1);
  const max = todo + diff;
  const min = todo - diff;
  const userScore = Math.random() > .35 ? null : Math.floor(min + Math.random() * max);

  return {
    id: `${id++}`,
    color: chooseRandom(possibleColors),
    icon: chooseRandom(possibleIcons),
    label: chooseRandom(possibleLabels),
    status: userScore === null
      ? STATUS.TODO_STATUS
      : userScore > todo
        ? STATUS.SUCCESS_STATUS
        : STATUS.FAIL_STATUS,
    userScore,
    target: {
      max,
      min,
      todo,
    }
  };
};

export const getRandomTasks = () => (
  [...Array(Math.floor(Math.random() * 20 + 2))].map(getRandomTask)
);
