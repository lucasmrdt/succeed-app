// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Overlay } from '@/components/fragments';
import FilterOverlayItem from './FilterOverlayItem';
import { DATA } from '@/constants';

import { type DataTypes } from '@/types';

const OVERLAY_HEIGHT = 330;

type Props = {
  selectedFilter: DataTypes.FilterType,
  onSelectFilter: (filter: DataTypes.FilterType) => void,
};

class FilterOverlay extends React.PureComponent<Props> {

  static propTypes = {
    selectedFilter: PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.any.isRequired,
    }).isRequired,
    onSelectFilter: PropTypes.func.isRequired,
  }

  onSelectFilter = (index: number) => {
    const { selectedFilter, onSelectFilter } = this.props;
    const requestedFilter = DATA.FILTERS[index];

    if (requestedFilter === selectedFilter) {
      return;
    }
    onSelectFilter(requestedFilter);
  }

  render() {
    const { selectedFilter } = this.props;

    return (
      <Overlay
        buttonIcon={selectedFilter.icon}
        buttonText={selectedFilter.label}
        onSelectItem={this.onSelectFilter}
        height={OVERLAY_HEIGHT}
      >
        {DATA.FILTERS.map((filter, index) => (
          <FilterOverlayItem
            key={`filter_${index}`}
            index={index}
            filter={filter}
            selectedFilter={selectedFilter}
          />)
        )}
      </Overlay>
    );
  }

}

export default FilterOverlay;
