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
  statut: number,
  icon: IconType,
  label: string,
  userScore: number,
  target: {
    todo: number,
    min: number,
    max: number,
  },
};

export type GoalType = {
  id: string,
  timestamp: number,
  statut: 'pending' | 'done' | 'canceled',
  icon: string,
  label: string,
  unit: string | Array<string>,
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
