// @flow

/**
 * WHY ?
 * Because flow don't show style's types when i'm typing
 * rule with StyleSheet.create.
 */

import { StyleSheet } from 'react-native';
import { RNTypes } from '@/types';

type Param = {[key: string]: RNTypes.StylesheetType};

function createStyleSheet(styles: Param) {
  return StyleSheet.create(styles);
}

export default createStyleSheet;
