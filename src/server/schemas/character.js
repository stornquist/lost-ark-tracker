import j from 'joi';

export const characterSchema = j.object({
  name: j.string().required(),
});
