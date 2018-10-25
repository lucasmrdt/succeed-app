// @flow

import React from 'react';
import { onlyUpdateForKeys } from 'recompose';
import { View } from 'react-native';
import { StylisedText } from '@/components/fragments';
import { DATA, STYLES, COLORS, SIZES } from '@/constants';
import { createStyleSheet, getIcon } from '@/utils';

import {
  type DataTypes,
  type RNTypes,
} from '@/types';

type Props = {
  selectedFilter: DataTypes.FilterType,
  index: number,
  filter: DataTypes.FilterType,
};

class FilterOverlayItem extends React.PureComponent<Props> {
  render() {
    const { selectedFilter, index, filter } = this.props;
    const isSelected = (selectedFilter.label === filter.label);
    const nbFilters = DATA.FILTERS.length;
    const Icon = filter.icon;
    const label = filter.label.toUpperCase();

    const wrapperStyle = (isSelected
      ? styles.selectedItem
      : styles.unselectedItem
    );
    const iconStyle = (isSelected
      ? styles.selectedIcon
      : styles.unselectedIcon
    );

    return (
      <View style={wrapperStyle}>
        <View style={iconStyle}>
          <Icon
            color={COLORS.PURPLE}
            size={SIZES.ICON_SIZE_S}
          />
        </View>
        <StylisedText
          color={COLORS.PURPLE}
          size={isSelected ? 'l' : 'm'}
        >
          {label}
        </StylisedText>
      </View>
    );
  }
}

const inheritanceStyle = {
  item: {
    ...STYLES.CENTER_CHILDS,
    width: SIZES.WIDTH,
    position: 'relative',
    padding: 20,
  },
  icon: {
    position: 'absolute',
    left: '20%',
  },
};

const styles = createStyleSheet({
  selectedItem: {
    ...inheritanceStyle.item,
  },
  unselectedItem: {
    ...inheritanceStyle.item,
    opacity: .7,
  },
  selectedIcon: {
    ...inheritanceStyle.icon,
    transform: [{ scale: 1.2 }],
  },
  unselectedIcon: {
    ...inheritanceStyle.icon,
  },
});

export default onlyUpdateForKeys(['selectedFilter'])(FilterOverlayItem);
