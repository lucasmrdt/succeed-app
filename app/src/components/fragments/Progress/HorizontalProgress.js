// @flow

import React from 'react';
import { Text } from 'react-native';
import ProgressBar from './ProgressBar';
import { createStyleSheet } from '@/utils';
import { SIZES, COLORS } from '@/constants';

import { type StylesheetType } from '@/types/rnTypes';

const WIDTH = SIZES.WIDTH;
const RATIO_FONT_SIZE_TO_MIN_TEXT_WIDTH = 3.2;
const STYLE_BY_SIZES = {
  s: { wHeight: 15, wWidth: 70, fontSize: 8 },
  m: { wHeight: 20, wWidth: 70, fontSize: 9 },
  l: { wHeight: 32, wWidth: WIDTH * .85, fontSize: 13 },
};

type Props = {
  progress: number,
  size: 's' | 'm' | 'l',
  color: string,
  light: bool,
  text: string | (progress: number) => React$Element<any> | null,
};

class HorizontalProgress extends React.Component<Props> {

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

    const wrapperStyle: Array<StylesheetType> = [
      styles.wrapper,
      {
        borderColor: !light ? color : COLORS.WHITE,
      },
    ];

    const progressStyle: Array<StylesheetType> = [
      styles.progress,
      {
        backgroundColor: !light ? color : COLORS.WHITE,
      },
    ];

    const textStyle: Array<StylesheetType> = [
      styles.text,
      {
        color: !light ? COLORS.WHITE : color,
        fontSize: selectedStyle.fontSize,
      },
    ];

    return {
      wrapper: wrapperStyle,
      progress: progressStyle,
      text: textStyle,
    };

  }

  renderText(style: Array<StylesheetType>) {
    const { text, size } = this.props;
    const selectedStyle = STYLE_BY_SIZES[size];

    return (progress: number) => {
      const isVisible = (progress * selectedStyle.wWidth >
        RATIO_FONT_SIZE_TO_MIN_TEXT_WIDTH * selectedStyle.fontSize
      );

      if (!text || !isVisible) return null;

      if (typeof text === 'function') {
        return text(progress);
      }
      return (
        <Text style={style}>{text}</Text>
      );
    };
  }

  render() {
    const { size, progress } = this.props;
    const computedStyle = this.computeStyle(this.props);
    const selectedStyle = STYLE_BY_SIZES[size];

    return (
      <ProgressBar
        animatedProgress={progress}
        style={computedStyle}
        size={{
          width: selectedStyle.wWidth,
          height: selectedStyle.wHeight,
        }}
        renderText={this.renderText(computedStyle.text)}
      />
    );
  }
}

const styles = createStyleSheet({
  wrapper: {
    borderWidth: 1,
    borderRadius: 100,
  },
  progress: {
    borderRadius: 100,
  },
  text: {
    fontFamily: 'poppins',
  }
});

export default HorizontalProgress;
