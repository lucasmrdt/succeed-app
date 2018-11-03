// @flow

import { StyleSheet } from 'react-native';
import * as Icons from '@/assets/icons';

import { type StylesheetType } from '@/types/rnTypes';
import {
  type IconPropsType,
  type IconType,
} from '@/types/dataTypes';

/**
 * WHY ?
 * Because flow don't show style's types when i'm typing
 * rule with StyleSheet.create.
 */
type CreateStyleSheetParam = {[key: string]: StylesheetType};
export const createStyleSheet = (styles: CreateStyleSheetParam) => (
  StyleSheet.create(styles)
);

export const getIcon = (
  icon: IconType,
) : null | React$Component<IconPropsType> | any => {
  if (!icon) {
    return null;
  }
  if (typeof icon === 'string') {
    // $FlowFixMe don't understand export * from ...
    return Icons[icon] || Icons.Rocket;
  }
  return icon;
};

export const isReactComponent = (component: any): bool => (
  typeof component === 'function'
  && component.prototype.isReactComponent
);

export const interpolate = (begin, end, curr, max) => (
  begin + (curr / max) * (end - begin)
);
