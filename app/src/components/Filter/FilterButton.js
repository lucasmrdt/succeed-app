// @flow

import React from 'react';
import { OverlayButton } from '@/components/fragments';
import { COLORS } from '@/constants';

import { type FilterType } from '@/types/dataTypes';

type Props = {
  selectedFilter: FilterType,
};

class FilterButton extends React.Component<Props> {
  render() {
    const { selectedFilter } = this.props;

    return (
      <OverlayButton
        color={COLORS.PURPLE}
        text={selectedFilter.label}
        icon={selectedFilter.icon}
      />
    );
  }
}

export default FilterButton;
