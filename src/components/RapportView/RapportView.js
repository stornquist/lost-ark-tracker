import React, { useState } from 'react';
import AddEditRapport from '../AddEditRapport';
import Button from '../Button';
import RapportList from './RapportList';

const RapportView = () => {
  const [rapportModal, showRapportModal] = useState(false);
  const [rapport, setRapport] = useState(null);

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
      <RapportList />
    </div>
  );
};

export default RapportView;
