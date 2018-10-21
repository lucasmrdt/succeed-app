// @flow
// TODO: Render test.
/**
 * This component is exactly the same as StaticButton
 * but this one can be animated at mount, onPress, ...
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  Easing,
} from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import { staticButtonStyles } from './StaticButton';
import AnimatedComponent from '../AnimatedComponent';
import { ANIMATIONS, STYLES, COLORS } from '@/constants';
import { createStyleSheet } from '@/utils';
import { RNTypes } from '@/types';

const SCALE_ONPRESS = 1.08;

type Props = {
  animatedWidth: number,
  animatedHeight: number,
  onPress: (id: string) => void,
  children: React.Component,
  rounded?: 'fully' | 'little',
  light?: bool,
  color?: string,
  id?: string,
  style?: RNTypes.StylesheetType,
};

type State = {
  animatedHeight?: Animated.Value,
  animatedWidth?: Animated.Value,
};

class AnimatedButton extends AnimatedComponent<Props, State> {
  animatedOffset = new Animated.Value(1);

  static defaultProps = {
    color: COLORS.GREEN,
    rounded: 'little',
    light: false,
    animateAtMount: true,
    id: null,
    style: null,
  };

  static propTypes = {
    animatedWidth: PropTypes.number.isRequired,
    animatedHeight: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    id: PropTypes.string,
    style: PropTypes.any,
  };

  shouldComponentUpdate(prevProps: Props) {
    const { animatedHeight, animatedWidth, children } = this.props;

    return (animatedHeight !== prevProps.animatedHeight
    || animatedWidth !== prevProps.animatedWidth
    || children !== prevProps.children);
  }

  onPressIn = () => {
    Animated.timing(this.animatedOffset, {
      toValue: SCALE_ONPRESS,
      duration: ANIMATIONS.INSTANT_DURATION,
      easing: ANIMATIONS.EASING_BOUNCE,
      useNativeDriver: true,
    }).start();
  }

  onPressOut = () => {
    const { onPress, id } = this.props;
    onPress(id);
    Animated.timing(this.animatedOffset, {
      toValue: 1,
      duration: ANIMATIONS.VERY_QUICK_DURATION,
      easing: ANIMATIONS.EASING_BOUNCE,
      useNativeDriver: true,
    }).start();
  }

  computeStyle() {
    const {
      animatedHeight: finalHeight,
      animatedWidth: finalWidth,
      rounded,
      light,
      color,
      style,
    } = this.props;
    const { animatedHeight, animatedWidth } = this.state;

    const borderRadius = (rounded === 'fully'
      ? STYLES.FULLY_ROUNDED_BORDER_RADIUS
      : STYLES.LITTLE_ROUNDED_BORDER_RADIUS
    );
    const scaleX = animatedWidth.interpolate({
      inputRange: [0, finalWidth],
      outputRange: [0, 1],
    });
    const scaleY = animatedHeight.interpolate({
      inputRange: [0, finalHeight],
      outputRange: [0, 1],
    });

    const wrapperStyle: Array<RNTypes.StylesheetType> = [
      styles.wrapper,
      style,
      {
        borderRadius,
        width: finalWidth,
        height: finalHeight,
        borderColor: !light ? 'transparent' : color,
        backgroundColor: !light ? color : 'transparent',
        transform: [
          { scaleX: Animated.multiply(scaleX, this.animatedOffset) },
          { scaleY: Animated.multiply(scaleY, this.animatedOffset) },
        ],
      },
    ];

    const buttonStyle: Array<RNTypes.StylesheetType> = [
      styles.button,
      {
        backgroundColor: !light ? color : 'transparent',
        borderRadius,
      },
    ];

    return {
      wrapper: wrapperStyle,
      button: buttonStyle,
    };
  }

  renderChildren() {
    const { children, id: buttonId } = this.props;
    const style = this.computeStyle();

    return (

      <Animated.View style={style.wrapper}>
        <Transition shared={buttonId}>
          <View style={style.button}/>
        </Transition>
        {children}
      </Animated.View>
    );
  }

  render() {
    console.log(`Render ${this.constructor.name}.`);

    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        {this.renderChildren()}
      </TouchableWithoutFeedback>
    );
  }
};

const styles = staticButtonStyles;

export default AnimatedButton;
