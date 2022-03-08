import { rapportSchema } from '../schemas/rapport';

const Errors = {
  notFound: 'rapport not found',
};

export const getRapport = async id => {
  const rapports = await getRapports();
  const rapport = rapports.find(c => c.id === id);
  if (!rapport) throw new Error(Errors.notFound);

  return rapport;
};

export const getRapports = async () => {
  const rapports = localStorage.rapports;
  if (!rapports) return [];

  return JSON.parse(rapports);
};

export const createRapport = async data => {
  const { value, error } = rapportSchema.validate(data, {
    stripUnknown: true,
    allowUnknown: true,
  });
  if (error) throw new Error(error);

  const rapports = await getRapports();
  const id = rapports.length ? Math.max(...rapports.map(c => c.id)) + 1 : 1;

  rapports.push({ id, ...value });
  localStorage.setItem('rapports', JSON.stringify(rapports));

  return { id, ...value };
};

export const updateRapport = async (id, data) => {
  const { value, error } = rapportSchema.validate(data, {
    stripUnknown: true,
    allowUnknown: true,
  });
  if (error) throw new Error(error);

  const rapports = await getRapports();
  const index = rapports.findIndex(c => c.id === id);
  if (index === -1) throw new Error(Errors.notFound);

  rapports[index] = { ...rapports[index], ...value };
  localStorage.setItem('rapports', JSON.stringify(rapports));
  return { ...rapports[index], ...value };
};

export const deleteRapport = async id => {
  // delete rapport
  await getRapport(id);
  const rapports = await getRapports();
  const filteredRapports = rapports.filter(c => c.id !== id);
  localStorage.setItem('rapports', JSON.stringify(filteredRapports));
};
