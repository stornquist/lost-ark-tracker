import { subDays } from 'date-fns';
import { format } from 'date-fns/esm';
import { useEffect } from 'react';
import Main from './components/Main';
import { useLocalStorage } from './utils/localStorage';

function App() {
  const [data, setData] = useLocalStorage('data');
  const [lastDailyReset, setDailyReset] = useLocalStorage('daily_reset', '');
  const [lastWeeklyReset, setWeeklyReset] = useLocalStorage('weekly_reset', '');

  const resetDailyTasks = () => {
    const newData = data.map(character => ({
      ...character,
      tasks: Object.entries(character.tasks).reduce((acc, [key, val]) => {
        acc[key] = {
          ...val,
          completed: val.type === 'daily' ? false : val.completed,
        };
        return acc;
      }, {}),
    }));

    setData(newData);
  };
  const resetWeeklyTasks = () => {
    const newData = data.map(character => ({
      ...character,
      tasks: Object.entries(character.tasks).reduce((acc, [key, val]) => {
        acc[key] = { ...val, completed: false };
        return acc;
      }, {}),
    }));

    setData(newData);
  };

  if (!data) {
    setData([
      {
        id: 1,
        name: 'Test',
        tasks: {
          'guild donate': { type: 'daily', completed: false },
          chaos: { type: 'daily', completed: false },
          guardian: { type: 'daily', completed: false },
          abyss: { type: 'weekly', completed: false },
        },
      },
    ]);
  }

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

  useEffect(() => {
    const interval = setInterval(checkReset, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!data) return null;
  return <Main data={data} setData={setData} />;
}

export default App;
