// @flow

import { connect } from 'react-redux';
import {
  FilterOverlay as Overlay,
  FilterButton as Button,
} from '@/components';
import { changeFilter } from '@/actions/homeActions';

import { type StateType } from '@/types/reduxTypes';
import { type FilterType } from '@/types/dataTypes';

const mapStateToProps = (state: StateType) => ({
  selectedFilter: state.home.selectedFilter,
});

const mapDispatchToProps = {
  onSelectFilter: (filter: FilterType) => (
    changeFilter(filter)
  ),
};

const FilterOverlay = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Overlay);

const FilterButton = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false },
)(Button);

export {
  FilterOverlay,
  FilterButton,
};
