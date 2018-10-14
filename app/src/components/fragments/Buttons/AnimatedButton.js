// @flow

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  Easing,
  PanResponder,
} from 'react-native';
import * as Utils from '@/utils';
import { RNTypes } from '@/types';

const SCALE_ONPRESS = 1.1;
const DURATION_ONPRESSIN = 100;
const DURATION_ONPRESSOUT = 500;
const EASING = Easing.out(Easing.back(1.5));

type Props = {
  animatedWidth: number,
  animatedHeight: number,
  onPress: (id: string) => void,
  isNavigationTransition?: bool,
  id?: string,
  children?: React.Component,
  style?: RNTypes.StylesheetType,
};

type State = {
  animatedHeight?: Animated.Value,
  animatedWidth?: Animated.Value,
};

class AnimatedButton extends Utils.AnimatedComponent<Props, State> {
  animatedOffset = new Animated.Value(0);

  static defaultProps = {
    id: null,
    style: null,
    isNavigationTransition: false,
  };

  static propTypes = {
    animatedWidth: PropTypes.number.isRequired,
    animatedHeight: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    id: PropTypes.string,
  };

  onPressIn = () => {
    Animated.timing(this.animatedOffset, {
      toValue: 1,
      duration: DURATION_ONPRESSIN,
      easing: EASING,
    }).start();
  }

  onPressOut = () => {
    const { onPress, id } = this.props;
    onPress(id);
    Animated.timing(this.animatedOffset, {
      toValue: 0,
      duration: DURATION_ONPRESSOUT,
      easing: EASING,
    }).start();
  }

  _renderChildren() {
    const { children, style } = this.props;
    const {
      animatedWidth,
      animatedHeight,
    } = this.state;

    const scale = this.animatedOffset.interpolate({
      inputRange: [0, 1],
      outputRange: [1, SCALE_ONPRESS],
    });

    const wrapperStyle: Array<RNTypes.StylesheetType> = [
      style,
      {
        width: Animated.add(animatedWidth, this.animatedOffset),
        height: Animated.add(animatedHeight, this.animatedOffset),
        transform: [{ scale }],
      },
    ];

    return (
      <Animated.View style={wrapperStyle}>
        {children}
      </Animated.View>
    );
  }

  render() {
    const {
      onPress,
      isNavigationTransition,
    } = this.props;

    const touchableProps = (isNavigationTransition
      ? { onPress }
      : { onPressIn: this.onPressIn, onPressOut: this.onPressOut }
    );

    return (
      <TouchableWithoutFeedback {...touchableProps}>
        {this._renderChildren()}
      </TouchableWithoutFeedback>
    );
  }
};

export type AnimatedButtonProps = Props;
export default AnimatedButton;
