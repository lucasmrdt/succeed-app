// @flow

import * as Icons from '@/assets/icons/Topics';
import { STATUS, COLORS } from '@/constants';

import {
  type TaskType,
  type IconType,
} from '@/types/dataTypes';

const possibleColors = [COLORS.GREEN_PASTEL, COLORS.RED_PASTEL, COLORS.YELLOW_PASTEL];
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
const getRandomTask = (): TaskType => ({
  id: `${id++}`,
  color: chooseRandom(possibleColors),
  icon: chooseRandom(possibleIcons),
  label: chooseRandom(possibleLabels),
  statut: chooseRandom(possibleStatus),
  userScore: Math.floor(Math.random() * 15),
  target: {
    max: 0,
    min: 0,
    todo: Math.floor(Math.random() * 10 + 2),
  }
});

export const getRandomTasks = () => (
  [...Array(Math.floor(Math.random() * 20 + 4))].map(getRandomTask)
);
