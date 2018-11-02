// @flow

import React from 'react';
import { View } from 'react-native';
import { StylisedText } from '@/components/fragments';
import { COLORS, SIZES, STYLES } from '@/constants';
import { createStyleSheet } from '@/utils';

import { type FilterType } from '@/types/dataTypes';

const COLOR = COLORS.PURPLE;

type Props = {
  selectedFilter: FilterType,
  index: number,
  filter: FilterType,
};

class FilterItem extends React.PureComponent<Props> {

  render() {
    const { selectedFilter, filter } = this.props;
    const isSelected = (selectedFilter.label === filter.label);
    const {
      label,
      icon: Icon,
    } = filter;

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
            color={COLOR}
            size={SIZES.ICON_SIZE_S}
          />
        </View>
        <StylisedText
          color={COLOR}
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
    opacity: .8,
  },
  selectedIcon: {
    ...inheritanceStyle.icon,
    transform: [{ scale: 1.3 }],
  },
  unselectedIcon: {
    ...inheritanceStyle.icon,
  },
});

export default FilterItem;
