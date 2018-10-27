// @flow

import React from 'react';
import { Animated } from 'react-native';

export type ContextType = {
  progress: Animated.Value,
  status: 'close' | 'open' | 'moving',
  light: bool,
  toggle: () => {},
};

export const defaultContext: ContextType = {
  progress: new Animated.Value(0),
  status: 'close',
  light: true,
  toggle: () => {},
};

export const Context = React.createContext(defaultContext);
