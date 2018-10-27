// @flow

import React from 'react';
import FilterItem from './FilterItem';
import { Overlay, OverlayProvider } from '@/components/fragments';
import { DATA, COLORS } from '@/constants';

import { type FilterType } from '@/types/dataTypes';

const OVERLAY_HEIGHT = 330;

type Props = {
  selectedFilter: FilterType,
  onSelectFilter: (filter: FilterType) => void,
  children: any,
};

class FilterOverlay extends React.PureComponent<Props> {

  onSelectFilter = (index: number) => {
    const { selectedFilter, onSelectFilter } = this.props;
    const requestedFilter = DATA.FILTERS[index];

    if (requestedFilter === selectedFilter) {
      return;
    }
    onSelectFilter(requestedFilter);
  }

  renderOverlay() {
    const { selectedFilter } = this.props;

    return (
      <Overlay
        onSelectItem={this.onSelectFilter}
        height={OVERLAY_HEIGHT}
        backgroundColor={COLORS.WHITE}
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

  render() {
    const { children } = this.props;

    return (
      <OverlayProvider>
        {this.renderOverlay()}
        {children}
      </OverlayProvider>
    );
  }

}

export default FilterOverlay;
