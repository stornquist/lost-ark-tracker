import { useMutation, useQuery } from 'react-query';
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '../../server/services/tasks';
import { mutationDefaults } from '../setupQueryClient';

const mutationOptions = mutationDefaults(['tasks', 'task_statuses']);

export const useTasks = () => useQuery('tasks', getTasks);
export const useTask = id => useQuery(['tasks', id], async () => getTask(id));

export const useUpsertTask = () =>
  useMutation(async data => {
    if (data.id) {
      const { id, ...payload } = data;
      return updateTask(id, payload);
    }

    return createTask(data);
  }, mutationOptions);

export const useDeleteTask = () =>
  useMutation(async data => {
    if (data.id) await deleteTask(data.id);
    else await deleteTask(data);
  }, mutationOptions);
