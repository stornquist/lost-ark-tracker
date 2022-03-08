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

      if (lastDailyReset !== date && time >= 10) {
        resetDailies();
      }

      if (now.getDay() === 4 && lastWeeklyReset !== date && time >= 10) {
        resetWeeklies();
      }
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [resetDailies, resetWeeklies]);

  return (
    <div className="md:m-8 lg:m-24 grid grid-flow-row gap-16">
      <CharacterView />
    </div>
  );
};

export default Main;
