// @flow

import { connect } from 'react-redux';
import {
  FilterOverlay as Overlay,
  FilterButton as Button,
} from '@/components';
import { changeFilter } from '@/actions/taskActions';

import { type StateType } from '@/types/reduxTypes';
import { type FilterType } from '@/types/dataTypes';

const mapStateToProps = (state: StateType) => ({
  selectedFilter: state.task.selectedFilter,
});
const mapDispatchToProps = {
  onSelectFilter: (filter: FilterType) => (
    changeFilter(filter)
  ),
};

const ConnectedOverlay = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Overlay);

const ConnectedButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Button);

export const FilterOverlay = ConnectedOverlay;
export const FilterButton = ConnectedButton;
