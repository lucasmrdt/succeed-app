// @flow

import { Animated } from 'react-native';
import Context from '@/helpers/context';

import { type OverlayContextType } from '@/types/contextType';

const DEFAULT_PROPS: OverlayContextType = {
  animationProgress: new Animated.Value(0),
  status: 'close',
  toggle: () => {},
};

export default new Context(DEFAULT_PROPS);
