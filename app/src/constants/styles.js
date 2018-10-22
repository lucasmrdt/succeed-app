// @flow

import * as Colors from './colors';
import * as Sizes from './sizes';


import { type RNTypes } from '@/types';
import * as COLORS from './colors';

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
