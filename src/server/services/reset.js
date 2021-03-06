import { addDays, subDays } from 'date-fns';
import { toast } from 'react-toastify';
import { queryClient } from '../../utils/setupQueryClient';
import { connection } from '../database/db';

export const getDailyReset = async () => {
  const resets = await connection.select({
    from: 'resets',
    where: {
      type: 'daily',
    },
  });
  if (!resets.length) {
    const today = new Date(new Date().setUTCHours(10, 0, 0));
    const rs = await connection.insert({
      into: 'resets',
      values: [{ type: 'daily', date: today }],
      return: true,
    });
    return rs[0];
  }

  return resets[0].date;
};

export const getWeeklyReset = async () => {
  const resets = await connection.select({
    from: 'resets',
    where: {
      type: 'weekly',
    },
  });
  if (!resets.length) {
    const now = new Date();
    const currentDay = now.getDay();
    const lastThursday = subDays(
      new Date(addDays(now, (4 - currentDay + 7) % 7).setUTCHours(10, 0, 0)),
      7
    );
    const rs = await connection.insert({
      into: 'resets',
      values: [{ type: 'weekly', date: lastThursday }],
      return: true,
    });
    return rs[0].date;
  }

  return resets[0].date;
};

export const resetWeeklyTasks = async () => {
  console.debug('Resetting weeklies');
  const weeklyTasks = await connection.select({
    from: 'resets',
    where: {
      type: 'weekly',
    },
  });

  const resetTargets = [
    {
      table: 'task_statuses',
      set: { completed: false },
      where: { task_id: { in: weeklyTasks.map(t => t.id) } },
    },
    { table: 'rapports', set: { emote: 0, instrument: 0 } },
  ];

  for (const target of resetTargets) {
    const { table, set, where } = target;
    await connection.update({
      in: table,
      set,
      where,
    });
  }

  // set queue for next weekly reset
  setTimeout(
    resetWeeklyTasks,
    addDays(new Date().setUTCHours(10, 0), 7).getTime() - new Date().getTime()
  );

  connection.update({
    in: 'resets',
    set: {
      date: new Date(new Date().setUTCHours(10, 0, 0)),
    },
    where: {
      type: 'weekly',
    },
  });
  toast.info('Weekly tasks have been reset.');
  queryClient.invalidateQueries();
};

export const resetDailyTasks = async () => {
  console.debug('Resetting dailies');

  const dailyTasks = await connection.select({
    from: 'tasks',
    where: {
      type: 'daily',
    },
  });

  const resetTargets = [
    {
      table: 'task_statuses',
      set: { completed: false },
      where: { task_id: { in: dailyTasks.map(t => t.id) } },
    },
    { table: 'rapports', set: { emote: 0, instrument: 0 } },
  ];

  for (const target of resetTargets) {
    const { table, set, where } = target;
    await connection.update({
      in: table,
      set,
      where,
    });
  }

  setTimeout(
    resetDailyTasks,
    addDays(new Date().setUTCHours(10, 0), 1).getTime() - new Date().getTime()
  );

  connection.update({
    in: 'resets',
    set: {
      date: new Date(new Date().setUTCHours(10, 0, 0)),
    },
    where: {
      type: 'daily',
    },
  });
  toast.info('Daily tasks have been reset.');
  queryClient.invalidateQueries();
};
