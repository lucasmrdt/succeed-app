// @flow

import { type ActionType as HomeActionType } from '@/actions/homeActions';
import { type StateType as HomeStateType } from '@/reducers/homeReducer';

export type ActionType = {
  type: HomeActionType,
  payload: any,
};

export type StateType = {
  home: HomeStateType,
};
