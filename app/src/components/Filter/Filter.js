// @flow

import React from 'react';
import { Overlay } from '@/components/fragments';
import FilterItem from './FilterItem';
import { DATA } from '@/constants';

import { type FilterType } from '@/types/dataTypes';

const OVERLAY_HEIGHT = 330;

type Props = {
  selectedFilter: FilterType,
  onSelectFilter: (filter: FilterType) => void,
};

class Filter extends React.PureComponent<Props> {

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
        light
      >
        {DATA.FILTERS.map((filter, index) => (
          <FilterItem
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

export default Filter;
