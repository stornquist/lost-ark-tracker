import j from 'joi';

export const rapportSchema = j.object({
  name: j.string().required(),
  instrument: j.number().default(0).min(0).max(2),
  emote: j.number().default(0).min(0).max(2),
});
