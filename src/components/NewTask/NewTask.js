import React, { useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';

const modalFields = [
  {
    type: 'text',
    name: 'name',
    // placeholder: 'Character name',
    label: 'Task name',
  },
  {
    type: 'dropdown',
    name: 'type',
    // placeholder: 'Character name',
    label: 'Task type',
    options: [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
    ],
  },
];

const NewTask = ({ className }) => {
  const [modal, showModal] = useState(false);

  return (
    <div className={className}>
      {modal && <Modal fields={modalFields} onClose={() => showModal(false)} />}
      <Button
        color="green"
        size="md"
        onClick={() => showModal(true)}
        label="New task"
      />
    </div>
  );
};

export default NewTask;
