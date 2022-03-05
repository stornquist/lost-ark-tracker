import { useMutation, useQuery } from 'react-query';
import {
  createTaskStatus,
  deleteTaskStatus,
  getTaskStatus,
  getTaskStatuses,
  updateTaskStatus,
} from '../../server/services/taskStatus';

export const useTaskStatuses = () => useQuery('task_statuses', getTaskStatuses);
export const useTaskStatus = id =>
  useQuery(['task_statuses', id], async () => getTaskStatus(id));

export const useUpsertTaskStatus = () =>
  useMutation('task_statuses', async data => {
    if (data.id) {
      const { id, ...payload } = data;
      return updateTaskStatus(id, payload);
    }

    return createTaskStatus(data);
  });

export const useDeleteTaskStatus = () =>
  useMutation('task_statuses', async data => {
    if (data.id) await deleteTaskStatus(data.id);
    else await deleteTaskStatus(data);
  });
