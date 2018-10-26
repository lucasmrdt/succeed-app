// @flow

import { UPDATE_LEVEL } from '@/actions/userActions';

import { type ActionType } from '@/types/reduxTypes';
import { type LevelType } from '@/types/dataTypes';

export type StateType = {
  level: LevelType,
};

const initState: StateType = {
  level: {
    limit: 1,
    progress: 0,
    score: 0,
  },
};

const reducer = (
  state: StateType = initState,
  action: ActionType
): StateType => {
  switch (action.type) {
    case UPDATE_LEVEL:
      return {
        ...state,
        score: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
