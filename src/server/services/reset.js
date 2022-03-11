import { getRapports } from './rapports';
import { getTaskStatuses } from './taskStatus';

export const resetWeeklyTasks = async () => {
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
  return (localStorage.last_weekly_reset = new Date().getTime());
};

export const resetDailyTasks = async () => {
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

  return (localStorage.last_daily_reset = new Date().getTime());
};
