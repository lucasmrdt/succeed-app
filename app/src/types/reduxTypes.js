// @flow

import { type ActionType as TaskActionType } from '@/actions/taskActions';
import { type ActionType as UserActionType } from '@/actions/userActions';

import { type StateType as TaskStateType } from '@/reducers/taskReducer';
import { type StateType as UserStateType } from '@/reducers/userReducer';

export type ActionType = {
  type: (TaskActionType
    | UserActionType
  ),
  payload: any,
};

export type StateType = {
  task: TaskStateType,
  user: UserStateType,
};
