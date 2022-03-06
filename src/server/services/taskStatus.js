import { format } from 'date-fns';
import { taskStatusSchema } from '../schemas/taskStatus';
import { getTasks } from './tasks';

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
  const statuses = JSON.parse(taskStatuses);
  const tasks = await getTasks();

  return statuses.map(status => ({
    ...status,
    task: tasks.find(t => t.id === status.task_id),
  }));
};

export const createTaskStatus = async data => {
  const { value, error } = taskStatusSchema.validate(data, {
    stripUnknown: true,
    allowUnknown: true,
  });
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
  const { value, error } = taskStatusSchema.validate(data, {
    stripUnknown: true,
    allowUnknown: true,
  });
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
  localStorage.task_statuses = JSON.stringify(
    taskStatuses.map(ts => ({ ...ts, completed: false }))
  );
  return (localStorage.last_weekly_reset = format(new Date(), 'yyyy-MM-dd'));
};

export const resetDailyTasks = async () => {
  const taskStatuses = await getTaskStatuses();

  localStorage.task_statuses = JSON.stringify(
    taskStatuses.map(ts => ({
      ...ts,
      completed: ts.task.type === 'daily' ? false : ts.completed,
    }))
  );
  return (localStorage.last_daily_reset = format(new Date(), 'yyyy-MM-dd'));
};
