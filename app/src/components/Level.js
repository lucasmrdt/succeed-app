// @flow

import React from 'react';
import { View } from 'react-native';
import { HorizontalProgress, StylisedText } from './fragments';
import { COLORS } from '@/constants';
import { createStyleSheet } from '@/utils';

import { type StylesheetType } from '@/types/rnTypes';
import { type LevelType } from '@/types/dataTypes';

const SMALL_COLOR = COLORS.DARK_GRAY;
const LARGE_COLOR = COLORS.GREEN_PASTEL;

type Props = {
  score: number,
  progress: number,
  limit: number,
  updateLevel: (level: LevelType) => void,
  size?: 's' | 'l',
  style?: StylesheetType,
};

class Level extends React.PureComponent<Props> {

  static defaultProps = {
    size: 's',
    style: null,
  }

  getColor() {
    const { size } = this.props;

    return size === 's' ? SMALL_COLOR : LARGE_COLOR;
  }

  renderText = () => {
    const { progress, limit } = this.props;
    const text = `${progress}/${limit}`;

    return (
      <StylisedText
        color={LARGE_COLOR}
        size='s'
        letterSpacing={5}
      >
        {text}
      </StylisedText>
    );
  }

  render() {
    const {
      progress,
      limit,
      size,
      score,
      style,
      ...props
    } = this.props;
    const percent = progress / limit;
    const color = this.getColor();

    return (
      <View style={[ styles.wrapper, style ]}>
        {size === 's'
        && (
          <StylisedText size='l' color={color} style={styles.score}>
            {score}
          </StylisedText>
        )}
        <HorizontalProgress
          {...props}
          progress={percent}
          size={size}
          color={color}
          text={size === 'l' && this.renderText}
        />
      </View>
    );
  }

}

const styles = createStyleSheet({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  score: {
    marginRight: 10,
  },
});

export default Level;
