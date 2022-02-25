import React, { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';

const modalFields = [
  {
    type: 'text',
    name: 'name',
    // placeholder: 'Character name',
    label: 'Character name',
  },
];

const NewCharacter = ({ className }) => {
  const [modal, showModal] = useState(false);

  return (
    <div className={className}>
      {modal && <Modal fields={modalFields} onClose={() => showModal(false)} />}
      <Button
        color="green"
        size="md"
        onClick={() => showModal(true)}
        label="New character"
      />
    </div>
  );
};

export default NewCharacter;
