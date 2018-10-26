// @flow

import { FILTERS } from '@/constants/data';
import { CHANGE_FILTER } from '@/actions/homeActions';

import { type ActionType } from '@/types/reduxTypes';
import { type FilterType } from '@/types/dataTypes';

export type StateType = {
  selectedFilter: FilterType,
};

const initState: StateType = {
  selectedFilter: FILTERS[0],
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

    default:
      return state;
  }
};

export default reducer;
