// @flow

import React from 'react';
import PropTypes from 'prop-types';
import AnimatedComponent from '../AnimatedComponent';
import Touchable from './Touchable';
import { createStyleSheet } from '@/utils';

import { type RNTypes } from '@/types';

type Props = {
  animatedWidth: number,
  animatedHeight: number,
  onPress: (id: string) => void,
  children: React.Component,
  id?: string,
  style?: RNTypes.StylesheetType,
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
  };

  static propTypes = {
    id: PropTypes.string,
    style: PropTypes.any,
  };

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

  computeScale() {
    const {
      animatedHeight: finalHeight,
      animatedWidth: finalWidth,
      style,
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
      x: scaleX,
      y: scaleY,
    };
  }

  render() {
    const { children, ...props } = this.props;
    const scale = this.computeScale();
    // console.log(`Render ${this.constructor.name}.`);

    return (
      <Touchable {...props} scale={scale}>
        {children}
      </Touchable>
    );
  }
};

export default AnimatedButton;