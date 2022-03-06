import React, { useEffect, useState } from 'react';
import ataTable, { createTheme } from 'react-data-table-component';
import { useCheckReset } from '../../utils/checkReset';
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
  const checkReset = useCheckReset();

  useEffect(() => {
    checkReset();
    const interval = setInterval(checkReset, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [checkReset]);

  return <CharacterView />;
};

export default Main;
