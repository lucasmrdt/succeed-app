// @flow

import React from 'react';
import { TouchableWithoutFeedback, View, Animated } from 'react-native';
import { createStyleSheet } from '@/utils';
import { STYLES, SIZES } from '@/constants';

import { RNTypes } from '@/types';
import {
  type TabBarBottomProps,
  type NavigationRoute,
} from 'react-navigation';

const ICON_OPACITY = .5;
const SELECTED_ICON_SCALE = 1.2;
const SELECTED_ICON_OPACITY = 1;

type Props = TabBarBottomProps;

class TabBar extends React.PureComponent<Props> {
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
    const color = (focused ? activeTintColor : inactiveTintColor);
    const inputRange = [-1, ...routes.map((_, i) => i)];
    const outputScaleRange = [...inputRange.map(i =>
      i === index ? SELECTED_ICON_SCALE : 1
    )];
    const outputOpacityRange = [...inputRange.map(i =>
      i === index ? SELECTED_ICON_OPACITY : ICON_OPACITY
    )];

    const scale = position.interpolate({
      inputRange,
      outputRange: outputScaleRange,
    });
    const opacity = position.interpolate({
      inputRange,
      outputRange: outputOpacityRange,
    });

    const style: RNTypes.StylesheetType = {
      transform: [{ scale }],
      opacity,
      width: `${100 / routes.length}%`,
    };

    return (
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate(route.routeName)}
        key={route.routeName}
      >
        <Animated.View style={[ style, styles.icon ]}>
          {renderIcon({ route, tintColor: color, focused, index })}
        </Animated.View>
      </TouchableWithoutFeedback>
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
    height: SIZES.TAB_BAR_HEIGHT,
  },
  icon: {
    ...STYLES.CENTER_CHILDS,
    height: '100%',
  },
});

export default TabBar;
