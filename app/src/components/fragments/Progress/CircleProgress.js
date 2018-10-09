// @flow

import _ from 'lodash';
import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { ANIMATION_OPTIONS } from '@/utils/AnimatedComponent';
import * as Constants from '@/constants';

const SIZES = {
  radius: { s: 32 },
  progressWidth: { s: 6 },
};

type Props = {
  progress: number,
  color?: string,
  backgroundColor?: string,
  renderText?: React.Component,
  size?: 's' | {
    radius?: number,
    progressWidth?: number,
  },
};

type State = {
  size: {
    radius: number,
    progressWidth: number,
    circumference: number,
  },
};

class CircleProgress extends React.Component<Props, State> {
  state = {};
  circularProgress = null;

  static defaultProps = {
    size: 's',
    color: Constants.COLORS.GREEN,
    backgroundColor: Constants.COLORS.TRANSPARENT_GREEN,
    renderText: null,
    style: {},
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (!_.isEmpty(prevState)) {
      // Compute only one time size, it should doesn't change yet.
      return null;
    }

    const { size } = nextProps;
    const outputSize = {
      radius: size.radius || SIZES.radius.s,
      progressWidth: size.progressWidth || SIZES.progressWidth.s,
    };

    return { size: outputSize };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { progress, size } = this.props;

    return (progress !== nextProps.progress);
  };

  render() {
    const { size } = this.state;
    const {
      color,
      renderText,
      progress,
      backgroundColor
    } = this.props;

    return (
      <AnimatedCircularProgress
        size={size.radius * 2}
        width={size.progressWidth}
        fill={progress * 100}
        tintColor={color}
        backgroundColor={backgroundColor}
        easing={ANIMATION_OPTIONS.easing}
        duration={ANIMATION_OPTIONS.duration}
        rotation={0}
      >
        {renderText}
      </AnimatedCircularProgress>
    );
  }
};

export default CircleProgress;
