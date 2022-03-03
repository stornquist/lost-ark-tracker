import React, { useState } from 'react';
import { useNewCharacter } from '../../utils/newCharacter';
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

const NewCharacter = ({ className, data, setData }) => {
  const newCharacter = useNewCharacter(data);
  const [modal, showModal] = useState(false);

  const handleSubmit = ({ name }) => {
    setData([...data, newCharacter(name)]);
    showModal(false);
  };

  return (
    <div className={className}>
      {modal && (
        <Modal
          fields={modalFields}
          onClose={() => showModal(false)}
          onSubmit={handleSubmit}
        />
      )}
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
