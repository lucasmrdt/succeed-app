// @flow

import * as COLORS from './colors';
import * as SIZES from './sizes';

import { type RNTypes } from '@/types';

export const CENTER_CHILDS: RNTypes.StylesheetType = {
  justifyContent: 'center',
  alignItems: 'center',
};

export const SPACE_BETWEEN: RNTypes.StylesheetType = {
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const SHADOW: RNTypes.StylesheetType = {
  flexDirection: 'row',
  shadowOpacity: 1,
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowColor: COLORS.TRANSPARENT_BLACK,
  shadowRadius: 20,
};

export const FULLY_ROUNDED_BORDER_RADIUS = 100;
export const LITTLE_ROUNDED_BORDER_RADIUS = 6;

export const BUTTON: RNTypes.StylesheetType = {
  ...CENTER_CHILDS,
  ...SHADOW,
  position: 'relative',
  flexDirection: 'row',
  borderWidth: 1,
};

export const HEADER_PADDING = 20;
export const HEADER: RNTypes.StylesheetType = {
  position: 'absolute',
  top: HEADER_PADDING + SIZES.STATUS_BAR_HEIGHT,
};
export const HEADER_LEFT: RNTypes.StylesheetType = {
  ...HEADER,
  left: HEADER_PADDING,
};
export const HEADER_RIGHT: RNTypes.StylesheetType = {
  ...HEADER,
  right: HEADER_PADDING,
};
