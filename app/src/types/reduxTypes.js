// @flow

import { type ActionType as HomeActionType } from '@/actions/homeActions';
import { type ActionType as UserActionType } from '@/actions/userActions';

import { type StateType as HomeStateType } from '@/reducers/homeReducer';
import { type StateType as UserStateType } from '@/reducers/userReducer';

export type ActionType = {
  type: (HomeActionType
    | UserActionType
  ),
  payload: any,
};

export type StateType = {
  home: HomeStateType,
  user: UserStateType,
};
