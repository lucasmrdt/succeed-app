// @flow

import { Easing } from 'react-native';

export const DEFAULT_DURATION = 500;
export const QUICK_DURATION = 300;
export const VERY_QUICK_DURATION = 200;
export const INSTANT_DURATION = 100;

export const EASING_EXP = Easing.out(Easing.exp);
export const EASING_BOUNCE = Easing.out(Easing.back(1.5));
export const EASING_POLY = Easing.out(Easing.poly(4));

export const DEFAULT_ANIMATIONS_OPTIONS = {
  duration: DEFAULT_DURATION,
  easing: EASING_EXP,
  useNativeDriver: true,
};

export const SHARED_BACKRGOUND_ID = 'background-button';
export const SHARED_BACKRGOUND_KEY = 'shared_background_id';
