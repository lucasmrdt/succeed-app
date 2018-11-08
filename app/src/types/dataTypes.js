// @flow

export type IconPropsType = {
  size: number,
  color: string,
};

export type IconType = 'RightArrow'
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
  | 'RedoArrow';
  // | React$Element<any>
  // | Function
  // | any;

export type FilterType = {
  label: string,
  icon: React$Component<IconPropsType>,
};

export type TaskType = {
  id: string,
  color: string,
  status: number,
  icon: IconType,
  label: string,
  userScore: number,
  precision: number,
  todo: {
    current: number,
    next: number,
    prev: number,
  },
};

export type GoalType = {
  id: string,
  timestamp: number,
  status: 'pending' | 'done' | 'canceled',
  color: string,
  icon: string,
  label: string,
  unit: string | Array<string>,
  precision: number,
  duration: number,
  nbDaysDone: number,

  userScore: number | null,

  practiseHour?: number,
  history: Array<GoalHistory> | null,

  target: {
    final: number,
    next: number,
    daily: number,
    prev: number,
  },
};

export type LevelType = {
  progress: number,
  limit: number,
  score: number,
};
