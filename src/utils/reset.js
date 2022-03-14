import { differenceInDays } from 'date-fns';
import { addDays, differenceInHours } from 'date-fns/esm';
import {
  getDailyReset,
  getWeeklyReset,
  resetDailyTasks,
  resetWeeklyTasks,
} from '../server/services/reset';

export const scheduleReset = async queryClient => {
  const lastDailyReset = await getDailyReset();
  const lastWeeklyReset = await getWeeklyReset();
  // if last reset was more than a day ago
  if (
    differenceInHours(new Date(), lastDailyReset, {
      roundingMethod: 'floor',
    }) >= 24
  ) {
    resetDailyTasks();
    queryClient.invalidateQueries();
  }
  // if last weekly reset was more than 7 days ago
  if (
    differenceInDays(new Date(), lastWeeklyReset, {
      roundingMethod: 'floor',
    }) >= 7
  ) {
    resetWeeklyTasks();
    queryClient.invalidateQueries();
  }

  const dailyTimer =
    addDays(new Date(lastDailyReset), 1).getTime() - new Date().getTime();
  const weeklyTimer =
    addDays(new Date(lastWeeklyReset), 7).getTime() - new Date().getTime();

  setTimeout(resetDailyTasks, dailyTimer);
  setTimeout(resetWeeklyTasks, weeklyTimer);
};
