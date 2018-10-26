// @flow

import React from 'react';
import { Animated, View } from 'react-native';
import { createStyleSheet } from '@/utils';
import { COLORS, SIZES } from '@/constants';

import { type StylesheetType } from '@/types/rnTypes';

type Props = {
  colorisedIconOpacity: Animated.Value,
  icon: React$Element<*>,
};

class TabBarIcon extends React.Component<Props> {
  shouldComponentUpdate() {
    // All update are made in natif, should not re-render from JS.
    return false;
  }

  render() {
    const {
      colorisedIconOpacity,
      icon: Icon,
    } = this.props;

    const colorisedIconStyle: Array<StylesheetType> = [
      styles.icon,
      {
        opacity: colorisedIconOpacity,
      },
    ];

    return (
      <React.Fragment>
        <View style={styles.icon}>
          {/* $FlowFixMe don't understand... */}
          <Icon color={COLORS.WHITE} size={SIZES.TAB_BAR_ICON_SIZE}/>
        </View>
        <Animated.View style={colorisedIconStyle}>
          {/* $FlowFixMe don't understand... */}
          <Icon color={COLORS.PURPLE} size={SIZES.TAB_BAR_ICON_SIZE}/>
        </Animated.View>
      </React.Fragment>
    );
  }
}

const styles = createStyleSheet({
  icon: {
    position: 'absolute',
  },
});

export default TabBarIcon;
