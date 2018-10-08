import React from 'react';
import { Animated, View, StyleSheet, Text } from 'react-native';
import * as Constants from '@/constants';
import * as Utils from '@/utils';
import { RNTypes } from '@/types';

const SIZES = {
  wrapperWidth: { s: 70, m: 70, xl: 320 },
  wrapperHeight: { s: 15, m: 20, xl: 32 },
  minTextWidth: { s: 20, m: 30, xl: 50 },
  fontSize: { s: 8, m: 9, xl: 11 },
};

type Props = {
  color?: string,
  textContent?: string,
  animatedProgress: number,
  size?: 's' | 'm' | 'xl',
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
    textContent: null,
    size: 's',
    color: Constants.COLORS.WHITE,
    style: {},
  };

  shouldComponentUpdate(nextProps: Props) {
    const { textContent, animatedProgress } = this.props;
    return (nextProps.textContent != textContent
    || nextProps.animatedProgress != animatedProgress);
  };

  get size() {
    const { size } = this.props;
    return {
      wrapperHeight: SIZES.wrapperHeight[size],
      wrapperWidth: SIZES.wrapperWidth[size],
      minTextWidth: SIZES.minTextWidth[size],
      fontSize: SIZES.fontSize[size],
    };
  }

  renderText() {
    const {
      textContent,
      animatedProgress,
      style: propStyle,
    } = this.props;
    const size = this.size;
    const finalProgressWidth = size.wrapperWidth * animatedProgress;

    const textStyle: Array<RNTypes.StylesheetType> = [
      styles.text,
      propStyle.text,
      { fontSize: size.fontSize },
    ];

    if (!textContent
    || finalProgressWidth < size.minTextWidth) {
      return null;
    }
    return (
      <Text style={textStyle}>
        {textContent}
      </Text>
    );
  }

  render() {
    const { color, style: propStyle } = this.props;
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
