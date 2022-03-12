import { subDays } from 'date-fns';
import { addDays } from 'date-fns/esm';
import { resetDailyTasks, resetWeeklyTasks } from '../server/services/reset';

export const scheduleReset = queryClient => {
  if (!localStorage.last_daily_reset) {
    localStorage.lastDailyReset = new Date(
      new Date().setUTCHours(10, 0, 0)
    ).getTime();
  }

  if (
    !localStorage.last_weekly_reset ||
    (Number(localStorage.last_weekly_reset) &&
      new Date(Number(localStorage.last_wekely_reset)).getDay() !== 4 &&
      new Date(Number(localStorage.last_weekly_reset)).getUTCHours() !== 10)
  ) {
    const now = new Date();
    const currentDay = now.getDay();
    const lastThursday = subDays(
      new Date(addDays(now, (4 - currentDay + 7) % 7).setUTCHours(10, 0, 0)),
      7
    );
    localStorage.last_weekly_reset = lastThursday.getTime();
  }

  let lastDailyReset = new Date(Number(localStorage.last_daily_reset));
  let lastWeeklyReset = new Date(Number(localStorage.last_weekly_reset));

  const lastDailyResetPlusOneDay = addDays(lastDailyReset, 1);
  const lastWeeklyResetPlusSevenDays = addDays(lastWeeklyReset, 7);
  console.log(lastWeeklyReset);

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
  console.log('dailyTimer: ', dailyTimer);
  console.log('weeklyTimer: ', weeklyTimer);

  setTimeout(resetDailyTasks, dailyTimer);

  setTimeout(resetWeeklyTasks, weeklyTimer);
};
