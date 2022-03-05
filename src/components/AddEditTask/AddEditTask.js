import React, { useState } from 'react';
import { useDeleteTask, useUpsertTask } from '../../utils/queries/tasks';
import Button from '../Button';
import Modal from '../Modal';

const modalFields = [
  {
    type: 'text',
    name: 'name',
    // placeholder: 'Task name',
    label: 'Task name',
  },
  {
    type: 'dropdown',
    name: 'type',
    // placeholder: 'Task type',
    label: 'Task type',
    options: [
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
    ],
  },
];

const AddEditTask = ({ task, onClose }) => {
  const { mutate: upsertTask } = useUpsertTask();
  const { mutate: deleteTask } = useDeleteTask();

  const handleSubmit = form => {
    upsertTask({ ...task, ...form });
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
      defaultValues={task}
      onDelete={handleDelete}
    />
  );
};

export default AddEditTask;
