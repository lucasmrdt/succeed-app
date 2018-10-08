import React from 'react';
import { Animated, View, StyleSheet, Text } from 'react-native';
import * as Constants from '@/constants';
import * as Utils from '@/utils';
import { RNTypes } from '@/types';

const SIZES = {
  wrapperWidth: { s: 70, m: 70, xl: Constants.SIZES.WIDTH * .85 },
  wrapperHeight: { s: 15, m: 20, xl: 32 },
  minTextWidth: { s: 20, m: 25, xl: 50 },
  fontSize: { s: 8, m: 9, xl: 13 },
};

type Props = {
  direction?: 'vertical' | 'horizontal',
  color?: string,
  text?: string,
  animatedProgress: number,
  size?: 's' | 'm' | 'xl' | {
    height?: number,
    width?: number,
  },
  style?: {
    text?: RNTypes.StylesheetType,
    wrapper?: RNTypes.StylesheetType,
    progress?: RNTypes.StylesheetType,
  },
};

type State = {
  animatedProgress: Animated.Value,
};

class ProgressBar extends Utils.AnimatedComponent<Props, State> {
  static defaultProps = {
    text: null,
    size: 's',
    color: Constants.COLORS.WHITE,
    style: {},
    direction: 'horizontal',
  };

  shouldComponentUpdate(nextProps: Props) {
    const { text, animatedProgress } = this.props;
    return (nextProps.text != text
    || nextProps.animatedProgress != animatedProgress);
  };

  get size() {
    const { size } = this.props;
    if (typeof size === 'object') {
      return {
        wrapperHeight: size.height || SIZES.wrapperHeight.m,
        wrapperWidth: size.width || SIZES.wrapperWidth.m,
        minTextWidth: SIZES.minTextWidth.m,
        fontSize: SIZES.fontSize.m,
      }
    }
    return {
      wrapperHeight: SIZES.wrapperHeight[size],
      wrapperWidth: SIZES.wrapperWidth[size],
      minTextWidth: SIZES.minTextWidth[size],
      fontSize: SIZES.fontSize[size],
    };
  }

  renderText() {
    const {
      text,
      animatedProgress,
      style: propStyle,
    } = this.props;
    const { animatedProgress: progress } = this.state;
    const size = this.size;
    const finalProgressWidth = size.wrapperWidth * animatedProgress;
    const letterSpacing = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 4],
    });

    const textStyle: Array<RNTypes.StylesheetType> = [
      styles.text,
      propStyle.text,
      {
        fontSize: size.fontSize,
        letterSpacing,
      },
    ];

    if (!text || finalProgressWidth < size.minTextWidth) {
      return null;
    }
    return (
      <Animated.Text style={textStyle}>
        {text}
      </Animated.Text>
    );
  }

  render() {
    const { color, style: propStyle, direction } = this.props;
    const { animatedProgress } = this.state;
    const size = this.size;
    const progressWidth = animatedProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, size.wrapperWidth],
    });

    const wrapperStyle: Array<RNTypes.StylesheetType> = [
      styles.wrapper,
      propStyle.wrapper,
      {
        transform: [{
          rotate: direction === 'vertical'
            ? '-90deg'
            : '0deg'
        }],
        borderColor: color,
        height: size.wrapperHeight,
        width: size.wrapperWidth,
      },
    ];
    const progressStyle: Array<RNTypes.StylesheetType> = [
      styles.progress,
      propStyle.progress,
      {
        backgroundColor: color,
        width: progressWidth,
      },
    ];

    return (
      <View style={wrapperStyle}>
        <Animated.View style={progressStyle}>
          {this.renderText()}
        </Animated.View>
      </View>
    );
  }
};

const styles = Utils.createStyleSheet({
  wrapper: {
    position: 'relative',
    justifyContent: 'flex-start',
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 1,
  },
  text: {
    fontFamily: 'poppins',
    color: Constants.COLORS.WHITE,
  },
  progress: {
    ...StyleSheet.absoluteFillObject,
    ...Constants.STYLES.CENTER_CHILDS,
    borderRadius: 100,
    height: '100%',
    left: 0,
  },
});

export default ProgressBar;
