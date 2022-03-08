import j from 'joi';

export const rapportSchema = j.object({
  name: j.string().required(),
  instrument: j.number().default(0),
  emote: j.number().default(0),
});
