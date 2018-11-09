// @flow

import { Context } from '@/helpers';

export type StateType = {
  precision: number,
  value: number,
};

const defaultState: StateType = {
  value: 0,
  precision: 0,
};

export default new Context(defaultState);
