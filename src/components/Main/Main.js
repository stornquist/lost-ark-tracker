import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { createTheme } from 'react-data-table-component';
import { useResetDailies, useResetWeeklies } from '../../utils/queries/reset';
import CharacterView from '../CharacterView';
import Checkbox from '../Checkbox/Checkbox';
import RapportView from '../RapportView/RapportView';

createTheme('custom', {
  text: {
    primary: 'white',
    secondary: 'white',
  },
  background: {
    default: '#493360',
  },
});

export const CrystalAuraContext = React.createContext();

const Main = () => {
  const { mutate: resetDailies } = useResetDailies();
  const { mutate: resetWeeklies } = useResetWeeklies();
  const [hasCrystalAura, setHasCrystalAura] = useState(false);

  useEffect(() => {
    if (!localStorage.crystal_aura) {
      localStorage.crystal_aura = 'true';
      setHasCrystalAura(true);
    } else {
      setHasCrystalAura(JSON.parse(localStorage.crystal_aura));
    }
  }, [hasCrystalAura]);

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
    <CrystalAuraContext.Provider value={hasCrystalAura}>
      <div className="md:m-8 lg:m-24 grid grid-flow-row gap-8">
        <Checkbox
          label="Crystalline Aura"
          checked={hasCrystalAura}
          onChange={() => {
            localStorage.crystal_aura = JSON.stringify(!hasCrystalAura);
            setHasCrystalAura(!hasCrystalAura);
          }}
          className="checked:bg-cyan-400"
        />
        <CharacterView />
        <RapportView />
      </div>
    </CrystalAuraContext.Provider>
  );
};

export default Main;
