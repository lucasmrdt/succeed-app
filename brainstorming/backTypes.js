// @flow

/*
--------------
|    BACK    |
--------------
*/
type Unit = {
  label: string,
  divide: number, // Not realy explicit.
};

type ScheduldedGoal = {
  id: string,
  goal: $GOAL_ID,
  owner: $USER_ID,

  userScore: number | null,
  dailyGoal: number,
  timestamp: number,
};

type Goal = {
  id: string,
  owner: $USER_ID,
  icon: string,
  label: string,
  unit: string | Array<Unit>,
  duration: number,

  scheduled: {
    comming: {
      timestamp: number,
      index: number,
    },
    goals: Array<ScheduldedGoal>;
  }

  practiseHour: number,
  target: {
    from: number,
    to: number,
  },

  // in case where use want to edit.
  frequenquency: number,
  practiseDays: Array<number>,
};
