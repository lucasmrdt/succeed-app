// @flow

import _ from 'lodash';
import { StyleSheet } from 'react-native';
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

/**
 * memoize
 */
