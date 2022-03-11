import React, { useEffect, useState } from 'react';
import { createTheme } from 'react-data-table-component';
import { checkResetTaskStatuses } from '../../utils/reset';
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
    if (isNaN(Number(localStorage.last_daily_reset)))
      localStorage.last_daily_reset = new Date(
        localStorage.last_daily_reset || 0
      ).getTime();
    if (isNaN(Number(localStorage.last_weekly_reset)))
      localStorage.last_weekly_reset = new Date(
        localStorage.last_weekly_reset || 0
      ).getTime();

    const interval = setInterval(checkResetTaskStatuses, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [checkResetTaskStatuses]);

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
