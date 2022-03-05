import j from 'joi';

export const taskSchema = j.object({
  name: j.string().required(),
  type: j.string().valid('daily', 'weekly').required(),
});
