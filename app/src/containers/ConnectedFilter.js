// @flow

import { connect } from 'react-redux';
import Filter from '@/components/Filter';
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
