// @flow

import React from 'react';
import { Animated, View, StyleSheet, Text } from 'react-native';
import AnimatedComponent from '../AnimatedComponent';
import * as Constants from '@/constants';
import { createStyleSheet } from '@/utils';
import { RNTypes } from '@/types';

const TEXT_CHILD_WIDTH = 100;

type Props = {
  animatedProgress: number,
  size: {
    width: number,
    height: number,
  },
  renderText?: (progress: number) => React.Component | null,
  style?: {
    wrapper?: RNTypes.StylesheetType,
    progress?: RNTypes.StylesheetType,
  },
};

type State = {
  animatedProgress: Animated.Value,
};

class ProgressBar extends AnimatedComponent<Props, State> {
  state = {};

  static defaultProps = {
    animationOptions: Constants.ANIMATIONS.DEFAULT_ANIMATIONS_OPTIONS,
    animateAtMount: true,
    text: null,
    style: {},
  };

  shouldComponentUpdate(nextProps: Props) {
    const { text, style } = this.props;

    return (nextProps.text !== text
    || nextProps.style !== style);
  }

  computeStyle() {
    const {
      direction,
      size,
      style: propStyle,
    } = this.props;
    const { animatedProgress: progress } = this.state;

    const wrapperStyle: Array<RNTypes.StylesheetType> = [
      styles.wrapper,
      propStyle.wrapper,
      {
        height: size.height,
        width: size.width,
      },
    ];

    const progressStyle: Array<RNTypes.StylesheetType> = [
      styles.progress,
      propStyle.progress,
      {
        transform: [
          {translateX: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [-size.width / 2, 0],
          })},
          {scaleX: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [.00001, 1], // Fix bu when scaleX is null on android.
          })},
        ],
      },
    ];

    const textWrapperStyle: Array<RNTypes.StylesheetType> = [
      styles.textWrapper,
      {
        transform: [
          {translateX: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, size.width / 2],
          })}
        ],
      },
    ];

    return {
      wrapper: wrapperStyle,
      progress: progressStyle,
      textWrapper: textWrapperStyle,
    };
  }

  renderText(style: RNTypes.StylesheetType) {
    const { renderText } = this.props;
    const { animatedProgress: targetProgress } = this.props;

    return (
      <Animated.View style={style}>
        <View style={styles.textChild}>
          {renderText(targetProgress)}
        </View>
      </Animated.View>
    );
  }

  render() {
    const { renderText } = this.props;
    const style = this.computeStyle();

    return (
      <View style={style.wrapper}>
        <Animated.View style={style.progress} />
        {renderText && this.renderText(style.textWrapper)}
      </View>
    );
  }
};

const styles = createStyleSheet({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  textWrapper: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    left: -TEXT_CHILD_WIDTH / 2,
  },
  textChild: {
    ...Constants.STYLES.CENTER_CHILDS,
    overflow: 'hidden',
    height: '100%',
    width: TEXT_CHILD_WIDTH,
  },
  progress: {
    ...StyleSheet.absoluteFillObject,
    width: '101%', // Fix border issue on android
    borderRadius: 100,
    height: '100%',
    left: '-.5%',
  },
});

export default ProgressBar;
