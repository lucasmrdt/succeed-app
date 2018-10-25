// @flow

import { type ComponentType } from 'react';

export type IconPropsType = {
  size: number,
  color: string,
};

export type IconTypes = 'RightArrow'
  | 'EmojiLove'
  | 'EmojiSad'
  | 'Dot'
  | 'Ruler'
  | 'CreditCard'
  | 'Weed'
  | 'Swim'
  | 'Gamepad'
  | 'Dumbbell'
  | 'Beer'
  | 'Cycler'
  | 'Target'
  | 'Smoke'
  | 'Coffee'
  | 'Scales'
  | 'RacingHelmet'
  | 'WeightLifting'
  | 'Runner'
  | 'Avatar'
  | 'IconWrapper'
  | 'Add'
  | 'Setting'
  | 'Clock'
  | 'Rubbish'
  | 'Flag'
  | 'Profile'
  | 'Calendar'
  | 'Rocket'
  | 'DownArrow'
  | 'Chart'
  | 'Clipboard'
  | 'Danger'
  | 'Mark'
  | 'Cross'
  | 'Tick'
  | 'Bell'
  | 'RedoArrow'
  | Component;

export type FilterType = {
  label: string,
  icon: ComponentType<IconPropsType>,
};
