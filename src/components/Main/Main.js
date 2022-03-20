import React, { useEffect, useState } from 'react';
import { createTheme } from 'react-data-table-component';
import { useQueryClient } from 'react-query';
import { scheduleReset } from '../../utils/reset';
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
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!localStorage.crystal_aura) {
      localStorage.crystal_aura = 'true';
      setHasCrystalAura(true);
    } else {
      setHasCrystalAura(JSON.parse(localStorage.crystal_aura));
    }
  }, [hasCrystalAura]);

  useEffect(() => {
    scheduleReset(queryClient);
  }, [scheduleReset]);

  return (
    <CrystalAuraContext.Provider value={hasCrystalAura}>
      <div className="md:m-8 lg:mx-24 lg:my-16 grid grid-flow-row gap-8">
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
