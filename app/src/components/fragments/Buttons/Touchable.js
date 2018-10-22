// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { ANIMATIONS } from '@/constants';

import { type RNTypes } from '@/types';

const SCALE_ONPRESS = 1.08;

type Props = {
  onPress: (id: string) => void,
  disable?: bool,
  id?: string,
  scale?: {
    x?: Animated.Value,
    y?: Animated.Value,
  },
  style?: RNTypes.StylesheetType,
};

class Touchable extends React.Component<Props> {
  scale = new Animated.Value(1);

  static defaultProps = {
    disable: false,
    id: null,
    style: null,
    scale: {},
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
    Animated.timing(this.scale, {
      toValue: SCALE_ONPRESS,
      duration: ANIMATIONS.INSTANT_DURATION,
      easing: ANIMATIONS.EASING_BOUNCE,
      useNativeDriver: true,
    }).start();
  }

  onPressOut = () => {
    const { onPress, id } = this.props;
    onPress(id);
    Animated.timing(this.scale, {
      toValue: 1,
      duration: ANIMATIONS.VERY_QUICK_DURATION,
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

    if (style === null) console.log(computedStyle)

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
        onPressIn={!disable ? this.onPressIn : null}
        onPressOut={!disable ? this.onPressOut : null}
      >
        {this.renderChildren()}
      </TouchableWithoutFeedback>
    );
  }
};

export type TouchableProps = Props;
export default Touchable;
