import { differenceInCalendarDays } from 'date-fns';
import { resetDailyTasks, resetWeeklyTasks } from '../server/services/reset';

export const shouldResetDailies = (now, lastReset) => {
  if (
    differenceInCalendarDays(now, lastReset) >= 1 &&
    now.getUTCHours() >= 10
  ) {
    return true;
  }
  return false;
};

export const shouldResetWeeklies = (now, lastReset) => {
  if (
    differenceInCalendarDays(now, lastReset) >= 7 &&
    now.getUTCHours() >= 10 &&
    now.getDay() === 4
  ) {
    return true;
  }
  return false;
};

export const checkResetTaskStatuses = () => {
  const lastDailyReset = new Date(Number(localStorage.last_daily_reset));
  const lastWeeklyReset = new Date(Number(localStorage.last_weekly_reset));
  const now = new Date();

  if (shouldResetDailies(now, lastDailyReset)) {
    resetDailyTasks();
  } else if (shouldResetWeeklies(now, lastWeeklyReset)) {
    resetWeeklyTasks();
  }
};
