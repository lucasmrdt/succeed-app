// @flow

import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { createStyleSheet } from '@/utils';
import { WithProps } from '@/helpers';

type Props = {
  fromColor: string,
  toColor: string,
  animatedValue: Animated.Value,
  inputRange: Array,
  wrapInStylesheet: bool,
  colorKeyProp: string,
  children: any,
};

class AnimatedColor extends React.PureComponent<Props> {

  static defaultProps: Props = {
    inputRange: [0, 1],
    colorKeyProp: 'color',
    wrapInStylesheet: false,
  };

  getOutputRange() {
    const { inputRange } = this.props;
    return [ ...Array(inputRange.length) ].map((_, i) => (
      i < inputRange.length / 2 ? 0 : 1
    ));
  }

  getStyle(opacityReverse = false) {
    const {
      animatedValue,
      inputRange,
    } = this.props;
    let outputRange = this.getOutputRange();
    if (opacityReverse) {
      outputRange = outputRange.reverse();
    }

    const opacity = animatedValue.interpolate({
      inputRange,
      outputRange,
    });

    return StyleSheet.flatten([
      styles.child,
      { opacity },
    ]);
  }

  renderFrontComponent() {
    const {
      fromColor,
      children,
      colorKeyProp,
      wrapInStylesheet,
    } = this.props;

    const style = this.getStyle();

    let props = {[colorKeyProp]: fromColor};
    if (wrapInStylesheet) {
      props = { style: props };
    }

    return (
      <Animated.View style={style}>
        <WithProps {...props}>
          {children}
        </WithProps>
      </Animated.View>
    );
  }

  renderBackComponent() {
    const {
      toColor,
      children,
      colorKeyProp,
      wrapInStylesheet,
    } = this.props;

    const style = this.getStyle(true);

    let props = {[colorKeyProp]: toColor};
    if (wrapInStylesheet) {
      props = { style: props };
    }

    return (
      <Animated.View style={style}>
        <WithProps {...props}>
          {children}
        </WithProps>
      </Animated.View>
    );
  }

  render() {
    const {
      animatedValue,
      children,
      fromColor,
      inputRange,
      toColor,
      colorKeyProp,
      ...props
    } = this.props;

    return (
      <Animated.View {...props}>
        {this.renderFrontComponent()}
        {this.renderBackComponent()}
      </Animated.View>
    );
  }

}

const styles = createStyleSheet({
  child: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AnimatedColor;
