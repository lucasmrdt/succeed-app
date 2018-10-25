// @flow

import { type DataTypes } from '@/types';

export type ActionType = 'CHANGE_FILTER';

export const CHANGE_FILTER = 'CHANGE_FILTER';
export const changeFilter = (filter: DataTypes.FilterType) => ({
  type: CHANGE_FILTER,
  payload: filter,
});
