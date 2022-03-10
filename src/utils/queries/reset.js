import { useMutation, useQuery } from 'react-query';
import { resetDailyTasks, resetWeeklyTasks } from '../../server/services/reset';
import { mutationDefaults } from '../setupQueryClient';

const mutationOptions = {
  ...mutationDefaults('task_statuses'),
  ...mutationDefaults('rapports'),
};

export const useLastDailyReset = () =>
  useQuery(['reset', 'daily'], async () => localStorage.last_daily_reset);
export const useLastWeeklyReset = () =>
  useQuery(['reset', 'weekly'], async () => localStorage.last_weekly_reset);
export const useResetDailies = () =>
  useMutation(async () => resetDailyTasks(), mutationOptions);
export const useResetWeeklies = () =>
  useMutation(async () => resetWeeklyTasks(), mutationOptions);
