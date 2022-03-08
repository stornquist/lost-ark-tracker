import { useMemo } from 'react';
import Checkbox from '../../Checkbox/Checkbox';

export const useRapportColumns = ({ onCheckboxChange, setRapport }) =>
  useMemo(
    () => [
      {
        name: 'NPC',
        selector: row => <div onClick={() => setRapport(row)}>{row.name}</div>,
      },
      {
        name: 'Instrument',
        selector: row => (
          <div className="grid gap-2 grid-flow-col">
            <Checkbox
              checked={row.instrument >= 1}
              onChange={() => onCheckboxChange(row, 'instrument', 1)}
            />
            <Checkbox
              checked={row.instrument >= 2}
              onChange={() => onCheckboxChange(row, 'instrument', 2)}
            />
          </div>
        ),
      },
      {
        name: 'Emote',
        selector: row => (
          <div className="grid gap-2 grid-flow-col">
            <Checkbox
              checked={row.emote >= 1}
              onChange={() => onCheckboxChange(row, 'emote', 1)}
            />
            <Checkbox
              checked={row.emote >= 2}
              onChange={() => onCheckboxChange(row, 'emote', 2)}
            />
          </div>
        ),
      },
    ],
    [onCheckboxChange]
  );
