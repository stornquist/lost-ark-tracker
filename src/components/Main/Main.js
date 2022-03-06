import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { createTheme } from 'react-data-table-component';
import { useResetDailies, useResetWeeklies } from '../../utils/queries/reset';
import CharacterView from '../CharacterView';

createTheme('custom', {
  text: {
    primary: 'white',
    secondary: 'white',
  },
  background: {
    default: '#493360',
  },
});

const Main = () => {
  const { mutate: resetDailies } = useResetDailies();
  const { mutate: resetWeeklies } = useResetWeeklies();

  useEffect(() => {
    const interval = setInterval(() => {
      const lastDailyReset = localStorage.last_daily_reset;
      const lastWeeklyReset = localStorage.last_weekly_reset;
      const now = new Date();
      const time = now.getUTCHours();
      const date = format(now, 'yyyy-MM-dd');

      if (time >= 10 && lastDailyReset !== date) {
        console.log('resetting dailies');
        resetDailies();
      }

      if (time > 10 && lastWeeklyReset !== date && now.getDay() === 4) {
        resetWeeklies();
      }
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [resetDailies, resetWeeklies]);

  return <CharacterView />;
};

export default Main;
