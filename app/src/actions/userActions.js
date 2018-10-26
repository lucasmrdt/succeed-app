// @flow

import { type LevelType } from '@/types/dataTypes';

export type ActionType = 'UPDATE_LEVEL';

export const UPDATE_LEVEL = 'UPDATE_LEVEL';
export const updateLevel = (level: LevelType) => ({
  type: UPDATE_LEVEL,
  payload: level,
});
