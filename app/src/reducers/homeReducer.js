// @flow

import { FILTERS } from '@/constants/data';
import {
  CHANGE_FILTER,
  TOGGLE_FILTER,
} from '@/actions/homeActions';

import { type ActionType } from '@/types/reduxTypes';
import { type FilterType } from '@/types/dataTypes';

export type StateType = {
  selectedFilter: FilterType,
  filterIsOpen: bool,
};

const initState: StateType = {
  selectedFilter: FILTERS[0],
  filterIsOpen: false,
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

    case TOGGLE_FILTER:
      return {
        ...state,
        filterIsOpen: !state.filterIsOpen,
      };

    default:
      return state;
  }
};

export default reducer;
