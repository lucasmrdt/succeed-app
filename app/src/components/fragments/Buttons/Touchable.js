// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { ANIMATIONS } from '@/constants';

import { type RNTypes } from '@/types';

const SCALE_ONPRESS = 1.08;

type Props = {
  onPress: (id: string) => void,
  onPressOut?: () => void,
  onPressIn?: () => void,
  disable?: bool,
  id?: string,
  scale?: {
    x?: Animated.Value,
    y?: Animated.Value,
  },
  style?: RNTypes.StylesheetType,
};

class Touchable extends React.Component<Props> {
  scale: Animated.Value

  constructor(props: Props) {
    super(props);
    this.scale = new Animated.Value(1);
  }

  static defaultProps = {
    disable: false,
    id: null,
    style: null,
    scale: {},
    onPressOut: null,
    onPressIn: null,
  };

  static propTypes = {
    id: PropTypes.string,
    style: PropTypes.any,
  };

  shouldComponentUpdate(nextProps: Props) {
    const { children, style } = this.props;

    return (nextProps.children !== children
    || nextProps.style !== style);
  }

  onPressIn = () => {
    const { onPressIn } = this.props;

    if (onPressIn) {
      onPressIn();
    }

    Animated.timing(this.scale, {
      toValue: SCALE_ONPRESS,
      duration: ANIMATIONS.VERY_QUICK_DURATION,
      easing: ANIMATIONS.EASING_BOUNCE,
      useNativeDriver: true,
    }).start();
  }

  onPress = () => {
    const { onPress, id } = this.props;
    onPress(id);
  }

  onPressOut = () => {
    const { onPressOut } = this.props;

    if (onPressOut) {
      onPressOut();
    }

    Animated.timing(this.scale, {
      toValue: 1,
      duration: ANIMATIONS.QUICK_DURATION,
      easing: ANIMATIONS.EASING_BOUNCE,
      useNativeDriver: true,
    }).start();
  }

  computeStyle() {
    const { style, scale } = this.props;

    const computedStyle: Array<RNTypes.StylesheetType> = [
      style,
      {
        transform: [
          {
            scaleX: scale.x
              ? Animated.multiply(scale.x, this.scale)
              : this.scale
          },
          {
            scaleY: scale.y
              ? Animated.multiply(scale.y, this.scale)
              : this.scale
          },
        ],
      },
    ];

    return computedStyle;
  }

  renderChildren() {
    const { children } = this.props;
    const style = this.computeStyle();

    return (
      <Animated.View style={style}>
        {children}
      </Animated.View>
    );
  }

  render() {
    const { disable } = this.props;

    return (
      <TouchableWithoutFeedback
        disabled={disable}
        onPressIn={this.onPressIn}
        onPress={this.onPress}
        onPressOut={this.onPressOut}
      >
        {this.renderChildren()}
      </TouchableWithoutFeedback>
    );
  }
};

export type TouchableProps = Props;
export default Touchable;
