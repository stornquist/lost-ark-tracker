import { taskStatusSchema } from '../schemas/taskStatus';

const Errors = {
  notFound: 'task status not found',
};

export const getTaskStatus = async id => {
  const taskStatuses = await getTaskStatuses();
  const taskStatus = taskStatuses.find(c => c.id === id);
  if (!taskStatus) throw new Error(Errors.notFound);

  return taskStatus;
};

export const getTaskStatuses = async () => {
  const taskStatuses = localStorage.task_statuses;
  if (!taskStatuses) return [];

  return JSON.parse(taskStatuses);
};

export const createTaskStatus = async data => {
  const { value, error } = taskStatusSchema.validate(data);
  if (error) throw new Error(error);

  const taskStatuses = await getTaskStatuses();
  const id = taskStatuses.length
    ? Math.max(...taskStatuses.map(c => c.id)) + 1
    : 1;

  taskStatuses.push({ id, ...value });
  localStorage.setItem('task_statuses', JSON.stringify(taskStatuses));
  return { id, ...value };
};

export const updateTaskStatus = async (id, data) => {
  const { value, error } = taskStatusSchema.validate(data);
  if (error) throw new Error(error);

  const taskStatuses = await getTaskStatuses();
  const index = taskStatuses.findIndex(status => status.id === id);
  if (index === -1) throw new Error(Errors.notFound);

  taskStatuses[index] = { ...taskStatuses[index], ...value };
  localStorage.setItem('task_statuses', JSON.stringify(taskStatuses));
  return { ...taskStatuses[index], ...value };
};

export const deleteTaskStatus = async id => {
  await getTaskStatus(id);
  const taskStatuses = await getTaskStatus();
  const filtered = taskStatuses.filter(c => c.id !== id);
  localStorage.setItem('task_statuses', JSON.stringify(filtered));
};

export const resetWeeklyTasks = async () => {
  const taskStatuses = await getTaskStatuses();
  // weekly reset includes dailies so set all to false
  for (const status of taskStatuses) {
    const { id, ...rest } = status;
    await updateTaskStatus(id, { ...rest, completed: false });
  }
};

export const resetDailyTasks = async () => {
  const taskStatuses = await getTaskStatuses();
  for (const status of taskStatuses) {
    if (status.type === 'daily') {
      const { id, ...rest } = status;
      await updateTaskStatus(id, { ...rest, completed: false });
    }
  }
};
