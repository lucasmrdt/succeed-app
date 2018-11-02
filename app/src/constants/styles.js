// @flow

import * as COLORS from './colors';
import * as SIZES from './sizes';

import { type StylesheetType } from '@/types/rnTypes';

export const CENTER_CHILDS: StylesheetType = {
  justifyContent: 'center',
  alignItems: 'center',
};

export const SPACE_BETWEEN: StylesheetType = {
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const SHADOW: StylesheetType = {
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
export const LITTLE_ROUNDED_BORDER_RADIUS = 11;

export const BUTTON: StylesheetType = {
  ...CENTER_CHILDS,
  ...SHADOW,
  overflow: 'hidden',
  position: 'relative',
  flexDirection: 'row',
  borderWidth: 1,
};

export const HEADER_PADDING = 20;
export const HEADER: StylesheetType = {
  position: 'absolute',
  top: HEADER_PADDING + SIZES.STATUS_BAR_HEIGHT,
};
export const HEADER_LEFT: StylesheetType = {
  ...HEADER,
  left: HEADER_PADDING,
};
export const HEADER_RIGHT: StylesheetType = {
  ...HEADER,
  right: HEADER_PADDING,
};
