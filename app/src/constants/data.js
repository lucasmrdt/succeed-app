// @flow

import { getIcon } from '@/utils';
import { DataTypes } from '@/types';

export const FILTERS: Array<DataTypes.FilterType> = [
  { label: 'Today', icon: getIcon('Mark') },
  { label: 'Tomorrow', icon: getIcon('RightArrow') },
  { label: 'This Week', icon: getIcon('Calendar') },
];
