import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import * as Constants from '@/constants';
import * as Utils from '@/utils';
import { RNTypes } from '@/types';

const WIDTH = {
  s: 70,
  m: 70,
  xl: 320,
};
const HEIGHT = {
  s: 15,
  m: 20,
  xl: 32,
};

type Props = {
  color?: string,
  textContent?: string,
  animatedProgress: number,
  size?: 's' | 'm' | 'xl',
  style?: RNTypes.StylesheetType | Array,
};

type State = {
  animatedProgress: Animated.Value,
};

class ProgressBar extends Utils.AnimatedComponent<Props, State> {
  static defaultProps = {
    textContent: null,
    size: 's',
    color: Constants.COLORS.WHITE,
  };

  getSize() {
    const { size } = this.props;
    return {
      height: HEIGHT[size],
      width: WIDTH[size],
    };
  }

  renderText() {
    const { textContent } = this.props;

    if (!textContent) return null;
    return (
      <Text style={styles.text}>
        {textContent}
      </Text>
    );
  }

  render() {
    const { color } = this.props;
    const { animatedProgress } = this.state;
    const width = animatedProgress.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    console.log(animatedProgress);

    const wrapperStyle: Array<RNTypes.StylesheetType> = [
      styles.wrapper,
      this.getSize(),
      {
        borderColor: color,
      },
    ];
    const progressStyle: Array<RNTypes.StylesheetType> = [
      styles.progress,
      {
        backgroundColor: color,
        width,
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
  },
  text: {
    fontFamily: 'poppins',
    color: Constants.COLORS.WHITE,
  },
  progress: {
    ...StyleSheet.absoluteFillObject,
    ...Constants.STYLES.CENTER_CHILDS,
    height: '100%',
  },
});

export default ProgressBar;
