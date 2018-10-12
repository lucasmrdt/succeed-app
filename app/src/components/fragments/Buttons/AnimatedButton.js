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

const OFFSET_ONPRESS = 10;
const DURATION_ONPRESSIN = 50;
const DURATION_ONPRESSOUT = 500;
const EASING = Easing.out(Easing.back(1.5));

type Props = {
  animatedWidth: number,
  animatedHeight: number,
  onPress: (id: string) => void,
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
  };

  static propTypes = {
    animatedWidth: PropTypes.number.isRequired,
    animatedHeight: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
    id: PropTypes.string,
  };

  onPressIn = () => {
    Animated.timing(this.animatedOffset, {
      toValue: OFFSET_ONPRESS,
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

  render() {
    const { children, style } = this.props;
    const {
      animatedWidth,
      animatedHeight,
    } = this.state;

    const wrapperStyle: Array<RNTypes.StylesheetType> = [
      style,
      {
        width: Animated.add(animatedWidth, this.animatedOffset),
        height: Animated.add(animatedHeight, this.animatedOffset),
      },
    ];

    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        <Animated.View style={wrapperStyle}>
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
};

export default AnimatedButton;
