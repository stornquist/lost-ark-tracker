import React, { useState } from 'react';
import AddEditRapport from '../AddEditRapport';
import Button from '../Button';
import RapportList from './RapportList';

const RapportView = () => {
  const [rapportModal, showRapportModal] = useState(false);
  const [rapport, setRapport] = useState(null);

  const handleRapportClick = rapport => {
    setRapport(rapport);
    showRapportModal(true);
  };

  return (
    <div>
      {rapportModal && (
        <AddEditRapport
          className="inline"
          rapport={rapport}
          onClose={() => {
            setRapport(null);
            showRapportModal(false);
          }}
        />
      )}
      <Button
        color="green"
        size="md"
        onClick={() => showRapportModal(true)}
        label="Add NPC"
      />
      <RapportList setRapport={handleRapportClick} />
    </div>
  );
};

export default RapportView;
