// @flow

/* back */
type Unit = {
  label: string,
  divide: number, // Not realy explicit.
};

type ScheduldedGoal = {
  id: string,
  goal: $GOAL_ID,
  owner: $USER_ID,

  dailyGoal: number,
  timestamp: number,
  success: bool,
};

type Goal = {
  id: string,
  owner: $USER_ID,
  icon: string,
  label: string,
  unit: string | Array<Unit>,

  schedule: {
    comming: {
      timestamp: number,
      index: number,
    },
    goals: Array<ScheduldedGoal>;
  }

  duration: number,
  practiseHour: number,
  target: {
    from: number,
    to: number,
  },

  // in case where use want to edit.
  frequenquency: number,
  practiseDays: Array<number>,
};

/* front */
type Goal = {
  id: string,
  icon: string,
  label: string,
  unit: string | Array<Unit>,
  daysLeft: number,
  userScore?: number,
  target: {
    final: number,
    next: number,
    daily: number,
    prev: number,
  },
};

type GoalHistoryValue = {
  timestamp: number,
  userScore: number,
  dailyGoal: number,
  success: bool,
};

type GoalHistory = {
  id: string,
  icon: string,
  label: string,
  unit: string | Array<Unit>,
  progress: number,
  values: Array<GoalHistoryValue>,
};

type GoalState = {
  goals: {[goal_id: string]: Goal},
  history: Array<Goal>,
};

type State = {};