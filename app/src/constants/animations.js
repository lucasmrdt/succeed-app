// @flow

import { Easing } from 'react-native';

export const GENERAL_DURATION = 500;
export const QUICK_DURATION = 250;
export const VERY_QUICK_DURATION = 300;
export const INSTANT_DURATION = 200;

export const EASING_EXP = Easing.out(Easing.exp);
export const EASING_BOUNCE = Easing.out(Easing.back(1.5));

export const GENERAL_ANIMATIONS_OPTIONS = {
  duration: GENERAL_DURATION,
  easing: EASING_EXP,
  useNativeDriver: true,
};

export const SHARED_BACKRGOUND_ID = 'background-button';
export const SHARED_BACKRGOUND_KEY = 'shared_background_id';
