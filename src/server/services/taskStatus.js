import { connection } from '../database/db';
import { taskStatusSchema } from '../schemas/taskStatus';
import { getTasks } from './tasks';

const Errors = {
  notFound: 'task status not found',
};

export const getTaskStatus = async id => {
  const taskStatuses = await connection.select({
    from: 'task_statuses',
    where: { id },
  });
  if (!taskStatuses.length) throw new Error(Errors.notFound);

  return taskStatuses[0];
};

export const getTaskStatuses = async () => {
  const taskStatuses = await connection.select({
    from: 'task_statuses',
  });
  if (!taskStatuses.length) throw new Error(Errors.notFound);

  const tasks = await getTasks();
  return taskStatuses.map(ts => ({
    ...ts,
    task: tasks.find(t => t.id === ts.task_id),
  }));
};

export const createTaskStatus = async data => {
  const { value, error } = taskStatusSchema.validate(data, {
    stripUnknown: true,
    allowUnknown: true,
  });
  if (error) throw new Error(error);

  const taskStatus = await connection.insert({
    into: 'task_statuses',
    values: [value],
    return: true,
  });

  return taskStatus[0];
};

export const updateTaskStatus = async (id, data) => {
  const { value, error } = taskStatusSchema.validate(data, {
    stripUnknown: true,
    allowUnknown: true,
  });
  if (error) throw new Error(error);

  connection.update({
    in: 'task_statuses',
    set: value,
    where: { id },
  });

  return { id, ...data };
};

export const deleteTaskStatus = async id => {
  await connection.remove({
    from: 'task_statuses',
    where: { id },
  });
};

export const getTaskStatusesByCharacterId = async id => {
  const taskStatuses = await connection.select({
    from: 'task_statuses',
    where: {
      character_id: id,
    },
  });
  return taskStatuses;
};

export const deleteTaskStatusesByCharacterId = async id => {
  await connection.remove({
    from: 'task_statuses',
    where: {
      character_id: id,
    },
  });
};

export const deleteTaskStatusesByTaskId = async id => {
  await connection.remove({
    from: 'task_statuses',
    where: {
      task_id: id,
    },
  });
};
