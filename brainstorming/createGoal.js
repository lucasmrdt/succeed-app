// @type

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = HOUR * 24;
const WEEK = DAY * 7;

const getDayTimestamp = (
  beginWeek: number,
  dayIndex: number,
) => {
  dayIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  const timestamp = beginWeek + dayIndex * DAY;
  return timestamp;
}

const createGoal = (
  duration: number,
  frequency: number,
  practiseDays: Array<number>,
  practiseHour: number,
) => {
  const begin: number = getFirstDayOfWeek(Date.now());
  const end: number = begin.getTime() + duration;

  let scheduledDays = [];

  let cursor = begin;
  while (cursor < end) {
    const days = practiseDays.map(dayIdx => ({
      timestamp: getDayTimestamp(cursor, dayIdx),
      hour: practiseHour,
      // others fings here
    }));

    scheduledDays = [ ...scheduledDays, ...days ];
    cursor += frequency;
  }
};
