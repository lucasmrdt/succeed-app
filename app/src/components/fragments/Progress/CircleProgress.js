// @flow

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { converters } from '@/utils';
import { ANIMATIONS, COLORS, SIZES } from '@/constants';

const ANIMATION_OPTIONS = ANIMATIONS.PROGRESS_ANIMATION_OPTIONS;
const BACKGROUND_OPACITY = .11;
const STYLE_BY_SIZES = {
  m: { radius: 32, progressWidth: 6, fontSize: 17 },
};

type Props = {
  progress: number,
  color?: string,
  light?: bool,
  size?: 'm',
  text?: (progress: number) => React.Component,
};

class CircleProgress extends React.Component<Props, State> {
  circularProgress = null;

  static propTypes = {
    progress: PropTypes.number.isRequired,
    color: PropTypes.string,
    light: PropTypes.bool,
    size: PropTypes.oneOf(['m']),
    text: PropTypes.func,
  };

  static defaultProps = {
    size: 's',
    color: COLORS.GREEN,
    renderText: null,
    style: {},
  };

  shouldComponentUpdate(nextProps: Props) {
    const { progress, size } = this.props;

    return (progress !== nextProps.progress);
  };

  _computeStyle() {
    const { size, color, light } = this.props;
    const selectedStyle = STYLE_BY_SIZES[size];
    const computedColor = (!light ? color : COLORS.WHITE);
    const backgroundColor = (!light
      ? converters.rgbWithOpacity(color, BACKGROUND_OPACITY)
      : COLORS.TRANSPARENT_WHITE
    );

    return {
      backgroundColor,
      color: computedColor,
      radius: selectedStyle.radius,
      progressWidth: selectedStyle.progressWidth,
    };
  }

  render() {
    const style = this._computeStyle();
    const { text, progress } = this.props;

    return (
      <AnimatedCircularProgress
        size={style.radius * 2}
        width={style.progressWidth}
        fill={progress * 100}
        tintColor={style.color}
        backgroundColor={style.backgroundColor}
        easing={ANIMATION_OPTIONS.easing}
        duration={ANIMATION_OPTIONS.duration}
        rotation={0}
      >
        {text}
      </AnimatedCircularProgress>
    );
  }
};

export default CircleProgress;
