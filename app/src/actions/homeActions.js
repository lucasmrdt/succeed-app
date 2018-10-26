// @flow

import { type FilterType } from '@/types/dataTypes';

export type ActionType = 'CHANGE_FILTER';

export const CHANGE_FILTER = 'CHANGE_FILTER';
export const changeFilter = (filter: FilterType) => ({
  type: CHANGE_FILTER,
  payload: filter,
});
