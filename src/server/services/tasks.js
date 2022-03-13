import { connection } from '../database/db';
import { taskSchema } from '../schemas/tasks';
import { getCharacters } from './characters';
import { deleteTaskStatusesByTaskId } from './taskStatus';

const Errors = {
  notFound: 'task not found',
};

export const getTask = async id => {
  const tasks = await connection.select({
    from: 'tasks',
    where: { id },
  });
  if (!tasks.length) throw new Error(Errors.notFound);

  return tasks[0];
};

export const getTasks = async () => {
  const tasks = await connection.select({
    from: 'tasks',
  });
  if (!tasks.length) return [];

  return tasks;
};

export const createTask = async data => {
  const { value, error } = taskSchema.validate(data, {
    stripUnknown: true,
    allowUnknown: true,
  });
  if (error) throw new Error(error);

  const task = (
    await connection.insert({
      into: 'tasks',
      values: [value],
      return: true,
    })
  )[0];

  // create task status for each character
  const characters = await getCharacters();
  connection.insert({
    into: 'task_statuses',
    values: characters.map(c => ({
      task_id: task.id,
      character_id: c.id,
      completed: false,
    })),
  });

  return task;
};

export const updateTask = async (id, data) => {
  const { value, error } = taskSchema.validate(data, {
    stripUnknown: true,
    allowUnknown: true,
  });
  if (error) throw new Error(error);

  await connection.update({
    in: 'tasks',
    set: value,
    where: { id },
  });

  return { id, ...data };
};

export const deleteTask = async id => {
  await connection.remove({
    from: 'tasks',
    where: { id },
  });

  // remove task statuses
  await deleteTaskStatusesByTaskId(id);
};
