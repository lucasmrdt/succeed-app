// @flow

import { FILTERS } from '@/constants/data';
import {
  CHANGE_FILTER,
  FAIL_LOAD_TASKS,
  SUCCESS_LOAD_TASKS,
  LOAD_TASKS,
  REFRESH_TASKS,
} from '@/actions/taskActions';

import { type ActionType } from '@/types/reduxTypes';
import { type StatusType } from '@/types/globalTypes';
import {
  type FilterType,
  type TaskType,
} from '@/types/dataTypes';

export type StateType = {
  tasks: Array<TaskType>,
  selectedFilter: FilterType,
  status: StatusType,
};

const initState: StateType = {
  tasks: [],
  selectedFilter: FILTERS[0],
  status: 'default',
};

const reducer = (
  state: StateType = initState,
  action: ActionType
): StateType => {
  switch (action.type) {
    case CHANGE_FILTER:
      return {
        ...state,
        selectedFilter: action.payload,
      };

    case LOAD_TASKS:
      return {
        ...state,
        status: 'loading',
      };

    case REFRESH_TASKS:
      return {
        ...state,
        status: 'refreshing',
      };

    case SUCCESS_LOAD_TASKS:
      return {
        ...state,
        tasks: action.payload,
        status: 'success',
      };

    case FAIL_LOAD_TASKS:
      return {
        ...state,
        status: 'fail',
      };

    default:
      return state;
  }
};

export default reducer;
