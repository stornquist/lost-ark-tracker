import { addDays } from 'date-fns';
import { getRapports } from './rapports';
import { getTaskStatuses } from './taskStatus';

export const resetWeeklyTasks = async () => {
  console.debug('Resetting weeklies');
  const taskStatuses = await getTaskStatuses();
  const rapports = await getRapports();
  // weekly reset includes dailies so set all to false
  localStorage.task_statuses = JSON.stringify(
    taskStatuses.map(ts => {
      const val = { ...ts, completed: false };
      delete val.task;
      return val;
    })
  );

  localStorage.rapports = JSON.stringify(
    rapports.map(r => ({
      ...r,
      emote: 0,
      instrument: 0,
    }))
  );

  // set queue for next weekly reset
  setTimeout(
    resetWeeklyTasks,
    addDays(new Date().setUTCHours(10, 0), 7).getTime() - new Date().getTime()
  );
  return (localStorage.last_weekly_reset = new Date().setUTCHours(10, 0));
};

export const resetDailyTasks = async () => {
  console.debug('Resetting dailies');
  const taskStatuses = await getTaskStatuses();
  const rapports = await getRapports();

  localStorage.task_statuses = JSON.stringify(
    taskStatuses.map(ts => {
      const val = {
        ...ts,
        completed: ts.task.type === 'daily' ? false : ts.completed,
      };
      delete val.task;
      return val;
    })
  );

  localStorage.rapports = JSON.stringify(
    rapports.map(r => ({
      ...r,
      emote: 0,
      instrument: 0,
    }))
  );

  setTimeout(
    resetDailyTasks,
    addDays(new Date().setUTCHours(10, 0), 1).getTime() - new Date().getTime()
  );

  return (localStorage.last_daily_reset = new Date().setUTCHours(10, 0));
};
