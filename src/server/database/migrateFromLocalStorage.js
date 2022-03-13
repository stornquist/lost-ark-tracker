import { connection } from './db';
const keyMap = {
  last_weekly_reset: 'resets',
  last_daily_reset: 'resets',
};

export const migrateFromLocalStorage = async () => {
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
};
