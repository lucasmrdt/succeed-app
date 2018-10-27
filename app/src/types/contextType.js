// @flow

import { Animated } from 'react-native';

export type OverlayContextType = {
  status: 'close' | 'open' | 'moving',
  animationProgress: Animated.Value,
  light: bool,
  toggle: () => void,
};
