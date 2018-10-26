// @flow

import React from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';
import { createStyleSheet } from '@/utils';
import { COLORS } from '@/constants';

import { type StylesheetType } from '@/types/rnTypes';

const BACKGROUND_OPACITY = .3;

type Props = {
  progress: Animated.Value,
  overlayStatus: 'open' | 'close' | 'moving',
  onPressIn: () => void,
};

class OverlayBackground extends React.Component<Props> {

  shouldComponentUpdate(nextProps: Props) {
    const { overlayStatus } = this.props;
    return (nextProps.overlayStatus !== overlayStatus
    && (nextProps.overlayStatus === 'close' || overlayStatus === 'close'));
  }

  render() {
    const { progress, onPressIn, overlayStatus } = this.props;

    if (overlayStatus === 'close') {
      return null;
    }

    const style: Array<StylesheetType> = [
      styles.wrapper,
      {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, BACKGROUND_OPACITY],
        }),
      },
    ];

    return (
      <TouchableWithoutFeedback onPressIn={onPressIn}>
        <Animated.View style={style}/>
      </TouchableWithoutFeedback>
    );
  }

}

const styles = createStyleSheet({
  wrapper: {
    zIndex: 1,
    backgroundColor: COLORS.BLACK,
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default OverlayBackground;
