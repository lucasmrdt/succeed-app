// @flow

import React from 'react';
import { connect } from 'react-redux';
import FilterOverlay from '@/components/FilterOverlay';
import { changeFilter } from '@/actions/homeActions';

import {
  type ReduxTypes,
  type DataTypes,
} from '@/types';

const mapStateToProps = (state: StateType) => ({
  selectedFilter: state.home.selectedFilter,
});

const mapDispatchToProps = {
  onSelectFilter: (filter: DataTypes.FilterType) => (
    changeFilter(filter)
  ),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterOverlay);
