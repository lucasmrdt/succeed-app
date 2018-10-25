// @flow

import React from 'react';
import { TouchableWithoutFeedback, View, Animated } from 'react-native';
import { Touchable } from '@/components/fragments';
import { createStyleSheet } from '@/utils';
import { STYLES, SIZES, COLORS } from '@/constants';

import { RNTypes } from '@/types';
import {
  // $FlowFixMe
  type TabBarBottomProps,
  type NavigationRoute,
} from 'react-navigation';

const ICON_OPACITY = .5;
const SELECTED_ICON_SCALE = 1.2;
const SELECTED_ICON_OPACITY = 1;
const COLORISED_ROUTES_INDEX = [0];

type Props = TabBarBottomProps;

class BottomTabBar extends React.Component<Props> {
  shouldComponentUpdate() {
    // The bottom tab bar should never update, only his childs
    // can update.
    return false;
  }

  renderTabBarButton = (route: NavigationRoute, index: number) => {
    const {
      activeTintColor,
      inactiveTintColor,
      navigation,
      renderIcon,
      position,
    } = this.props;
    const currentIndex = navigation.state.index;
    const routes = navigation.state.routes;
    const focused = (currentIndex === index);
    const inputRange = [-1, ...routes.map((_, i) => i)];
    const outputScaleRange = [...inputRange.map(i =>
      i === index ? SELECTED_ICON_SCALE : 1
    )];
    const outputOpacityRange = [...inputRange.map(i =>
      i === index ? SELECTED_ICON_OPACITY : ICON_OPACITY
    )];
    const outputTintOpacityRange = [...inputRange.map(i =>
      COLORISED_ROUTES_INDEX.includes(i) ? 0 : 1
    )];

    const scale = position.interpolate({
      inputRange,
      outputRange: outputScaleRange,
    });
    const opacity = position.interpolate({
      inputRange,
      outputRange: outputOpacityRange,
    });
    const tintOpacity = position.interpolate({
      inputRange,
      outputRange: outputTintOpacityRange,
    });

    const style: Array<RNTypes.StylesheetType> = [
      styles.icon,
      {
        opacity,
        width: `${100 / routes.length}%`,
      },
    ];

    return (
      <Touchable
        style={style}
        scale={{ x: scale, y: scale }}
        onPress={() => navigation.navigate(route.routeName)}
        key={route.routeName}
      >
        {renderIcon({ route, tintColor: tintOpacity, focused, index })}
      </Touchable>
    );
  }

  render() {
    const { navigation, style } = this.props;
    const tabBarButtons = navigation.state.routes.map(this.renderTabBarButton);

    return (
      <View style={[ style, styles.wrapper ]}>
        {tabBarButtons}
      </View>
    );
  }
}

const styles = createStyleSheet({
  wrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    height: SIZES.BOTTOM_TAB_BAR_HEIGHT,
  },
  icon: {
    ...STYLES.CENTER_CHILDS,
    height: '100%',
    position: 'relative',
  },
});

export default BottomTabBar;
