// @flow

import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';
import { Memoize, Converter } from '@/helpers';
import { createStyleSheet } from '@/utils';
import { SIZES, COLORS, STYLES, ANIMATIONS } from '@/constants';
import { RNTypes } from '@/types';

const ANIMATION_OPTIONS = ANIMATIONS.PROGRESS_ANIMATION_OPTIONS;
const BACKGROUND_OPACITY = .11;
const STYLE_BY_SIZES = {
  m: { wHeight: 64, wWidth: 22, fontSize: 17 },
};

type Props = {
  progress: number,
  color?: string,
  light?: bool,
  size: 'm',
  text?: string | (progress: number) => React$Element<any> | null,
};

class VerticalProgress extends React.Component<Props> {
  static propTypes = {
    progress: PropTypes.number.isRequired,
    color: PropTypes.string,
    light: PropTypes.bool,
    size: PropTypes.oneOf(['m']),
    text: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string,
    ]),
  };

  static defaultProps = {
    color: COLORS.GREEN,
    light: false,
    size: 'm',
    text: null,
  };

  shouldComponentUpdate(nextProps: Props) {
    const { text, color, progress } = this.props;

    return (nextProps.color !== color
    || nextProps.text !== text
    || nextProps.progress !== progress);
  }

  computeStyle(props: Props) {
    const { size, color, light } = props;
    const selectedStyle = STYLE_BY_SIZES[size];

    const wrapperStyle: Array<RNTypes.StylesheetType> = [
      styles.progressWrapper,
      {
        backgroundColor: (!light
          ? Converter.rgbWithOpacity(color, BACKGROUND_OPACITY)
          : COLORS.TRANSPARENT_WHITE
        ),
      },
    ];

    const progressStyle: Array<RNTypes.StylesheetType> = [
      styles.progress,
      {
        backgroundColor: !light ? color : COLORS.WHITE,
      },
    ];

    const textStyle: Array<RNTypes.StylesheetType> = [
      styles.text,
      {
        color: !light ? color : COLORS.WHITE,
        fontSize: selectedStyle.fontSize,
      },
    ];

    return {
      wrapper: wrapperStyle,
      progress: progressStyle,
      text: textStyle,
    };
  }

  renderText(style: RNTypes.StylesheetType) {
    const { text, size, progress } = this.props;

    if (!text) return null;

    if (typeof text === 'function') {
      return text(progress);
    }
    return (
      <Text style={style}>{text}</Text>
    )
  }

  render() {
    const { text, size, progress } = this.props;
    const computedStyle = this.computeStyle(this.props);
    const selectedStyle = STYLE_BY_SIZES[size];

    return (
      <View style={styles.wrapper}>
        {this.renderText(computedStyle.text)}
        <View style={styles.rotate}>
          <ProgressBar
            animationOptions={ANIMATION_OPTIONS}
            animatedProgress={progress}
            style={computedStyle}
            size={{
              // Think that progress will rotate.
              width: selectedStyle.wHeight,
              height: selectedStyle.wWidth,
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = createStyleSheet({
  wrapper: {
    ...STYLES.SPACE_BETWEEN,
    flexDirection: 'row',
    width: 90,
  },
  rotate: {
    transform: [{rotate: '-90deg'}],
  },
  progressWrapper: {
    borderRadius: 5,
    borderWidth: 0,
  },
  progress: {
    borderRadius: 5,
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 11,
  },
});

export default VerticalProgress;
