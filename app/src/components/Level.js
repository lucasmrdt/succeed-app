// @flow

import React from 'react';
import { View, Animated } from 'react-native';
import { HorizontalProgress, StylisedText } from './fragments';
import { COLORS, STYLES, ANIMATIONS } from '@/constants';
import { createStyleSheet } from '@/utils';

import { type RNTypes } from '@/types';

const ANIMATION_OPTION = {
  ...ANIMATIONS.DEFAULT_ANIMATIONS_OPTIONS,
};

type Props = {
  score: number,
  progress: number,
  limit: number,
  size?: 's' | 'l',
  style?: RNTypes.StylesheetType,
};

class Level extends React.PureComponent<Props> {

  static defaultProps = {
    size: 's',
  }

  renderText = () => {
    const { progress, limit } = this.props;
    const text = `${progress}/${limit}`;

    return (
      <StylisedText
        color={COLORS.WHITE}
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

    return (
      <View style={[ styles.wrapper, style ]}>
        {size === 's'
        && (
          <StylisedText
            size='l'
            color={COLORS.WHITE}
            style={styles.score}
          >
            {score}
          </StylisedText>
        )}
        <HorizontalProgress
          {...props}
          light={size === 's'}
          progress={percent}
          size={size}
          color={COLORS.GREEN}
          text={size === 'l' ? this.renderText : null}
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
