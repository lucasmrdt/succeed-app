// @flow

import { FILTERS } from '@/constants/data';
import { CHANGE_FILTER } from '@/actions/homeActions';

import {
  type ReduxTypes,
  type DataTypes,
} from '@/types';

export type StateType = {
  selectedFilter: DataTypes.FilterType,
};

const initState: StateType = {
  selectedFilter: FILTERS[0],
};

const reducer = (
  state = initState,
  action: ReduxTypes.ActionType
): StateType => {
  switch (action.type) {
    case 'CHANGE_FILTER':
      return {
        ...state,
        selectedFilter: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
