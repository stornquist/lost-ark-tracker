import j from 'joi';

export const taskStatusSchema = j.object({
  character_id: j.number().required(),
  task_id: j.number().required(),
  completed: j.boolean(),
});
