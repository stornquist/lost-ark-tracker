import React from 'react';

const ResetHandler = props => {
  const checkReset = () => {
    const now = new Date();
    const time = now.getUTCHours();
    const date = format(now, 'yyyy-MM-dd');
    const aDayAgo = format(subDays(now, 1), 'yyyy-MM-dd');
    const aWeekAgo = format(subDays(now, 7), 'yyyy-MM-dd');
    if (!lastDailyReset) setDailyReset(aDayAgo);
    if (!lastWeeklyReset) setWeeklyReset(aWeekAgo);

    if (time >= 10 && lastDailyReset !== date) {
      resetDailyTasks();
      setDailyReset(date);
    }

    if (time > 10 && lastWeeklyReset !== date && now.getDay() === 4) {
      resetWeeklyTasks();
      setWeeklyReset(date);
    }
  };

  return <div>ResetHandler</div>;
};

export default ResetHandler;
