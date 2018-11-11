// @flow

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
  unit: string,
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
