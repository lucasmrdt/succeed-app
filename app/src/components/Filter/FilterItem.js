// @flow

import React from 'react';
import { View } from 'react-native';
import { StylisedText } from '@/components/fragments';
import { COLORS, SIZES, STYLES } from '@/constants';
import { createStyleSheet } from '@/utils';

import { type FilterType } from '@/types/dataTypes';

type Props = {
  selectedFilter: FilterType,
  index: number,
  filter: FilterType,
};

class FilterItem extends React.PureComponent<Props> {
  render() {
    const { selectedFilter, filter } = this.props;
    const isSelected = (selectedFilter.label === filter.label);
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
          {/* $FlowFixMe */}
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

export default FilterItem;
