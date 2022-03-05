import { format } from 'date-fns';
import {
  useLastDailyReset,
  useLastWeeklyReset,
  useResetDailies,
  useResetWeeklies,
} from './queries/reset';

export const useCheckReset = () => {
  const { data: lastDailyReset } = useLastDailyReset();
  const { data: lastWeeklyReset } = useLastWeeklyReset();
  const { mutate: resetDailies } = useResetDailies();
  const { mutate: resetWeeklies } = useResetWeeklies();

  return () => {
    const now = new Date();
    const time = now.getUTCHours();
    const date = format(now, 'yyyy-MM-dd');

    if (time >= 10 && lastDailyReset !== date) {
      resetDailies();
    }

    if (time > 10 && lastWeeklyReset !== date && now.getDay() === 4) {
      resetWeeklies();
    }
  };
};
