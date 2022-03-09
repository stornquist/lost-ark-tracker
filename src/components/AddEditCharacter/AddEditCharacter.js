import React from 'react';
import {
  useDeleteCharacter,
  useUpsertCharacter,
} from '../../utils/queries/characters';
import Modal from '../Modal';

const modalFields = [
  {
    type: 'text',
    name: 'name',
    // placeholder: 'Character name',
    label: 'Character name',
  },
];

const AddEditCharacter = ({ character, onClose }) => {
  const { mutate: upsertCharacter } = useUpsertCharacter();
  const { mutate: deleteCharacter } = useDeleteCharacter();

  const handleSubmit = form => {
    upsertCharacter({ ...character, ...form });
    onClose();
  };

  const handleDelete = form => {
    deleteCharacter(form);
    onClose();
  };

  return (
    <Modal
      fields={modalFields}
      onClose={onClose}
      onSubmit={handleSubmit}
      defaultValues={character}
      onDelete={handleDelete}
    />
  );
};

export default AddEditCharacter;
