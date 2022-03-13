import { addDays } from 'date-fns/esm';
import {
  getDailyReset,
  getWeeklyReset,
  resetDailyTasks,
  resetWeeklyTasks,
} from '../server/services/reset';

export const scheduleReset = async queryClient => {
  const lastDailyReset = await getDailyReset();
  const lastWeeklyReset = await getWeeklyReset();

  const lastDailyResetPlusOneDay = addDays(lastDailyReset, 1);
  const lastWeeklyResetPlusSevenDays = addDays(lastWeeklyReset, 7);

  // if last reset was more than a day ago
  if (lastDailyResetPlusOneDay.getTime() < new Date().setUTCHours(10, 0)) {
    resetDailyTasks();
    queryClient.invalidateQueries('task_statuses');
  }
  // if last weekly reset was more than 7 days ago
  if (lastWeeklyResetPlusSevenDays.getTime() < new Date().getTime()) {
    resetWeeklyTasks();
    queryClient.invalidateQueries('task_statuses');
  }

  const dailyTimer =
    addDays(new Date(Number(localStorage.last_daily_reset)), 1).getTime() -
    new Date().getTime();
  const weeklyTimer =
    addDays(new Date(Number(localStorage.last_weekly_reset)), 7).getTime() -
    new Date().getTime();

  setTimeout(resetDailyTasks, dailyTimer);

  setTimeout(resetWeeklyTasks, weeklyTimer);
};
