import { taskSchema } from '../schemas/tasks';
import { getCharacters } from './characters';
import { createTaskStatus, getTaskStatuses } from './taskStatus';

const Errors = {
  notFound: 'task not found',
};

export const getTask = async id => {
  const tasks = await getTasks();
  const task = tasks.find(c => c.id === id);
  if (!task) throw new Error(Errors.notFound);

  return task;
};

export const getTasks = async () => {
  const tasks = localStorage.tasks;
  if (!tasks) return [];

  return JSON.parse(tasks);
};

export const createTask = async data => {
  const { value, error } = taskSchema.validate(data);
  if (error) throw new Error(error);

  const tasks = await getTasks();
  const id = tasks.length ? Math.max(...tasks.map(c => c.id)) + 1 : 1;

  tasks.push({ id, ...value });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // create task status for each character
  const characters = await getCharacters();
  for (const char of characters) {
    await createTaskStatus({
      task_id: id,
      character_id: char.id,
      completed: false,
    });
  }

  return { id, ...value };
};

export const updateTask = async (id, data) => {
  const { value, error } = taskSchema.validate(data);
  if (error) throw new Error(error);

  const tasks = await getTasks();
  const index = tasks.findIndex(c => c.id === id);
  if (index === -1) throw new Error(Errors.notFound);

  tasks[index] = { ...tasks[index], ...value };
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return { ...tasks[index], ...value };
};

export const deleteTask = async id => {
  // delete task
  await getTask(id);
  const tasks = await getTasks();
  const fTasks = tasks.filter(c => c.id !== id);
  localStorage.setItem('tasks', JSON.stringify(fTasks));

  // delete all task statuses for task
  const taskStauses = await getTaskStatuses();
  const fTaskStauses = taskStauses.filter(ts => ts.task_id !== id);
  localStorage.setItem('task_statuses', JSON.stringify(fTaskStauses));
};
