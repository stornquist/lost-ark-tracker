import { connection } from '../database/db';
import { rapportSchema } from '../schemas/rapport';

const Errors = {
  notFound: 'rapport not found',
};

export const getRapport = async id => {
  const rapports = await connection.select({
    from: 'rapports',
    where: { id },
  });
  if (!rapports.length) throw new Error(Errors.notFound);

  return rapports[0];
};

export const getRapports = async () => {
  const rapports = await connection.select({
    from: 'rapports',
  });
  if (!rapports.length) throw new Error(Errors.notFound);

  return rapports;
};

export const createRapport = async data => {
  const { value, error } = rapportSchema.validate(data, {
    stripUnknown: true,
    allowUnknown: true,
  });
  if (error) throw new Error(error);

  const rapports = await connection.insert({
    into: 'rapports',
    values: [value],
    return: true,
  });

  return rapports[0];
};

export const updateRapport = async (id, data) => {
  const { value, error } = rapportSchema.validate(data, {
    stripUnknown: true,
    allowUnknown: true,
  });
  if (error) throw new Error(error);

  connection.update({
    in: 'rapports',
    set: value,
    where: { id },
  });

  return { id, ...data };
};

export const deleteRapport = async id => {
  await connection.remove({
    from: 'rapports',
    where: { id },
  });
};
