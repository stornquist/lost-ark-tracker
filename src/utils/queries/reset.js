import { useMutation, useQuery } from 'react-query';
import {
  resetDailyTasks,
  resetWeeklyTasks,
} from '../../server/services/taskStatus';

export const useLastDailyReset = () =>
  useQuery(['reset', 'daily'], async () => localStorage.last_daily_reset);
export const useLastWeeklyReset = () =>
  useQuery(['reset', 'weekly'], async () => localStorage.last_weekly_reset);
export const useResetDailies = () =>
  useMutation(['reset', 'daily'], async () => resetDailyTasks());
export const useResetWeeklies = () =>
  useMutation(['reset', 'weekly'], async () => resetWeeklyTasks());
