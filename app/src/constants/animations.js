// @flow

import { Easing } from 'react-native';

export const PROGRESS_ANIMATION_OPTIONS = {
  duration: 500,
  easing: Easing.out(Easing.exp),
  useNativeDriver: true,
};

export const SHARED_BUTTON_ID = 'background-button';
