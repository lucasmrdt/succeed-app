// @flow

import React from 'react';
import Context from './FilterContext';
import { OverlayButton } from '@/components/fragments';
import { COLORS } from '@/constants';

import { type FilterType } from '@/types/dataTypes';

type Props = {
  selectedFilter: FilterType,
};

const OverlayButtonWithContext = Context.withContext(null)(OverlayButton);

class FilterButton extends React.PureComponent<Props> {

  render() {
    const { selectedFilter, ...contextProps } = this.props;

    return (
      <OverlayButtonWithContext
        {...contextProps}
        color={COLORS.DARK_GRAY}
        text={selectedFilter.label}
        icon={selectedFilter.icon}
      />
    );
  }

}

export default FilterButton;
