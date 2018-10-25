// @flow

/*
--------------
|   FRONT    |
--------------
*/
type GoalHistoryValue = {
  timestamp: number,
  userScore: number,
  dailyGoal: number,
};
type Goal = {
  id: string,
  timestamp: number,
  statut: 'pending' | 'done' | 'canceled',
  icon: string,
  label: string,
  unit: string | Array<Unit>,
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
type GoalState = {
  goals: {[goal_id: string]: Goal},
};

type UserState = {
  id: string,
  username?: string,
  level: {
    value: number,
    progress: number,
    limit: number,
  },
  globalStats: {
    goals: {
      done: number,
      pending: number,
      cancel: number,
    },
    tasks: {
      succeed: number,
      failed: number,
    },
    daysDone: number,
  }
};

type State = {
  goal: GoalState,
  user: UserState,
};
