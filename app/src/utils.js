// @flow

import React from 'react';
import { StyleSheet } from 'react-native';
import * as Icons from '@/assets/icons';

import { type IconPropsType } from '@/assets/icons/IconWrapper';
import { type RNTypes } from '@/types';

/**
 * WHY ?
 * Because flow don't show style's types when i'm typing
 * rule with StyleSheet.create.
 */
type CreateStyleSheetParam = {[key: string]: RNTypes.StylesheetType};
export const createStyleSheet = (styles: CreateStyleSheetParam) => (
  StyleSheet.create(styles)
);

export const getIcon = (
  icon: string | React.Component,
) : null | React.ComponentType<IconPropsType> => {
  if (!icon) {
    return null;
  }
  if (typeof icon === 'string') {
    return Icons[icon] || Icons.Rocket;
  }
  return icon;
};
