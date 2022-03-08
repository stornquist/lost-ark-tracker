import React from 'react';
import {
  useDeleteRapport,
  useUpsertRapport,
} from '../../utils/queries/rapports';
import Modal from '../Modal';

const modalFields = [
  {
    type: 'text',
    name: 'name',
    label: 'NPC name',
  },
];

const AddEditRapport = ({ rapport, onClose }) => {
  const { mutate: upsertRapport } = useUpsertRapport();
  const { mutate: deleteTask } = useDeleteRapport();

  const handleSubmit = form => {
    upsertRapport({ ...rapport, ...form });
    onClose();
  };

  const handleDelete = form => {
    deleteTask(form);
    onClose();
  };

  return (
    <Modal
      fields={modalFields}
      onClose={onClose}
      onSubmit={handleSubmit}
      defaultValues={rapport}
      onDelete={handleDelete}
    />
  );
};

export default AddEditRapport;
