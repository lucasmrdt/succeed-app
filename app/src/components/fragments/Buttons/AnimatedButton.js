// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';
import AnimatedComponent from '../AnimatedComponent';
import Touchable from './Touchable';
import { ANIMATIONS } from '@/constants';

import { type TouchableProps } from './Touchable';

const ATTRACTIVE_SCALE = 1.1;
const ATTRACTIVE_INTERVAL = 4000;
const ATTRACTIVE_ANIMATION_OPTIONS = {
  ...ANIMATIONS.DEFAULT_ANIMATIONS_OPTIONS,
  easing: ANIMATIONS.EASING_POLY,
  duration: ANIMATIONS.QUICK_DURATION,
};

type Props = TouchableProps & {
  animatedWidth: number,
  animatedHeight: number,
  attractive: bool,
  background: React.ComponentType<any>,
};

type State = {
  animatedHeight?: Animated.Value,
  animatedWidth?: Animated.Value,
};

class AnimatedButton extends AnimatedComponent<Props, State> {
  static defaultProps = {
    ...AnimatedComponent.defaultProps,
    id: null,
    style: null,
    background: null,
    attractive: false,
  };

  static propTypes = {
    id: PropTypes.string,
    style: PropTypes.any,
  };

  scaleAnimation = new Animated.Value(1);
  attractiveInterval = null;

  componentDidMount() {
    const { attractive } = this.props;
    attractive && this.attractiveAnimate();
  }

  shouldComponentUpdate(nextProps: Props) {
    const {
      animatedHeight,
      animatedWidth,
      children,
      style,
    } = this.props;

    return (nextProps.animatedHeight !== animatedHeight
    || nextProps.animatedWidth !== animatedWidth
    || nextProps.children !== children
    || nextProps.style !== style);
  }

  attractiveAnimate = () => {
    Animated.sequence([
      Animated.timing(this.scaleAnimation, {
        ...ATTRACTIVE_ANIMATION_OPTIONS,
        toValue: ATTRACTIVE_SCALE,
      }),
      Animated.spring(this.scaleAnimation, {
        friction: 1,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(this.attractiveAnimate, ATTRACTIVE_INTERVAL);
    });
  }

  computeScale() {
    const {
      animatedHeight: finalHeight,
      animatedWidth: finalWidth,
    } = this.props;
    const { animatedHeight, animatedWidth } = this.state;

    const scaleX = animatedWidth.interpolate({
      inputRange: [0, finalWidth],
      outputRange: [0.0001, 1],
    });
    const scaleY = animatedHeight.interpolate({
      inputRange: [0, finalHeight],
      outputRange: [0.0001, 1],
    });

    return {
      x: Animated.multiply(this.scaleAnimation, scaleX),
      y: Animated.multiply(this.scaleAnimation, scaleY),
    };
  }

  render() {
    const { children, background, ...props } = this.props;
    const scale = this.computeScale();

    return (
      <Touchable {...props} scale={scale}>
        {background}
        {children}
      </Touchable>
    );
  }
};

export default AnimatedButton;
