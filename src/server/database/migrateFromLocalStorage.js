import { queryClient } from '../../utils/setupQueryClient';
import { connection } from './db';
const keyMap = {
  last_weekly_reset: 'resets',
  last_daily_reset: 'resets',
};

export const migrateFromLocalStorage = async () => {
  let oldCharacters = JSON.parse(localStorage.characters);
  let oldTasks = JSON.parse(localStorage.tasks);
  let oldTaskStatuses = JSON.parse(localStorage.task_statuses);
  let newCharacters = [];
  let newTasks = [];
  let newTaskStatuses = [];

  for (let i = 0; i < oldCharacters.length; i++) {
    newTaskStatuses = [
      ...newTaskStatuses,
      ...oldTaskStatuses
        .filter(ts => ts.character_id === oldCharacters.id)
        .map(ts => ({ ...ts, character_id: i })),
    ];
    newCharacters.push({ ...oldCharacters[i], id: i });
  }

  for (let i = 0; i < oldTasks.length; i++) {
    newTaskStatuses = [
      ...newTaskStatuses,
      ...oldTaskStatuses
        .filter(ts => ts.task_id === oldTasks.id)
        .map(ts => ({ ...ts, task_id: i })),
    ];
    newTasks.push({ ...oldTasks[i], id: i });
  }

  localStorage.tasks = JSON.stringify(newTasks);
  localStorage.characters = JSON.stringify(newCharacters);
  localStorage.task_statuses = JSON.stringify(newTaskStatuses);

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    try {
      const values = JSON.parse(localStorage[key]);
      const newVals = values
        .sort((a, b) => a.id - b.id)
        .map(obj => {
          const { id, ...rest } = obj; // eslint-disable-line
          return rest;
        });
      await connection.insert({
        into: key,
        values: newVals,
      });
    } catch (e) {
      const value = localStorage[key];

      if (keyMap[key]) {
        const date = new Date(Number(value));
        const type = key.match(/_(daily|weekly)_/)[1];
        await connection.insert({
          into: keyMap[key],
          values: [{ date, type }],
        });
      } else if (key === 'crystal_aura') {
        await connection.insert({
          into: key,
          values: [{ is_active: Boolean(value) }],
        });
      }
    }
  }

  queryClient.invalidateQueries();
};
