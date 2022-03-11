import { startOfDay, subDays } from 'date-fns';
import { shouldResetDailies } from '../utils/reset';

test('shouldResetDailies', () => {
  const now = new Date();
  const lastReset = startOfDay(subDays(now, 1));
  for (let i = 0; i < 24; i++) {
    now.setUTCHours(i);
    expect(now.getUTCHours()).toBe(i);
    if (i >= 10) {
      expect(shouldResetDailies(now, lastReset)).toBe(true);
    } else {
      expect(shouldResetDailies(now, lastReset)).toBe(false);
    }
  }
});
