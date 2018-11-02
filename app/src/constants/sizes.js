// @flow

import { Dimensions } from 'react-native';

export const {
  height: HEIGHT,
  width: WIDTH,
} = Dimensions.get('screen');

export const DEFAULT_BUTTON_WIDTH = 200;
export const DEFAULT_BUTTON_HEIGHT = 50;

export const ICON_SIZE_S = 15;
export const ICON_SIZE_M = 20;
export const ICON_SIZE_L = 30;
export const DEFAULT_ICON_SIZE = ICON_SIZE_L;

export const TAB_BAR_ICON_SIZE = 23;
export const BOTTOM_TAB_BAR_HEIGHT = 50;

export const STATUS_BAR_PADDING = 20;
export const STATUS_BAR_HEIGHT = 60;

export const TEXT_SIZES = {
  xs: 12,
  s: 14,
  m: 18,
  l: 21,
  xl: 25,
  xxl: 30,
};

export const LINE_TEXT_HEIGHTS = {
  xs: 22,
  s: 23,
  m: 32,
  l: 28,
  xl: 37,
  xxl: 37,
};
