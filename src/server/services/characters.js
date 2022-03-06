import { characterSchema } from '../schemas/character';
import { getTasks } from './tasks';
import { createTaskStatus, getTaskStatuses } from './taskStatus';

const Errors = {
  notFound: 'character not found',
};

export const getCharacter = async id => {
  const characters = await getCharacters();
  const character = characters.find(c => c.id === id);
  if (!character) throw new Error(Errors.notFound);

  return character;
};

export const getCharacters = async () => {
  const characters = localStorage.characters;
  if (!characters) return [];

  return JSON.parse(characters);
};

export const createCharacter = async data => {
  const { value, error } = characterSchema.validate(data, {
    stripUnknown: true,
    allowUnknown: true,
  });
  if (error) throw new Error(error);

  const characters = await getCharacters();
  const id = characters.length ? Math.max(...characters.map(c => c.id)) + 1 : 1;

  characters.push({ id, ...value });
  localStorage.setItem('characters', JSON.stringify(characters));

  const tasks = await getTasks();
  for (const task of tasks) {
    await createTaskStatus({
      task_id: task.id,
      character_id: id,
      completed: false,
    });
  }

  return { id, ...value };
};

export const updateCharacter = async (id, data) => {
  const { value, error } = characterSchema.validate(data, {
    stripUnknown: true,
    allowUnknown: true,
  });
  if (error) throw new Error(error);

  const characters = await getCharacters();
  const index = characters.findIndex(c => c.id === id);
  if (index === -1) throw new Error(Errors.notFound);

  characters[index] = { ...characters[index], ...value };
  localStorage.setItem('characters', JSON.stringify(characters));
  return { ...characters[index], ...value };
};

export const deleteCharacter = async id => {
  // delete character
  await getCharacter(id);
  const characters = await getCharacters();
  const filteredCharacters = characters.filter(c => c.id !== id);
  localStorage.setItem('characters', JSON.stringify(filteredCharacters));

  // delete character task_statuses
  const taskStatuses = await getTaskStatuses();
  const filteredTaskStatuses = taskStatuses.filter(
    ts => ts.character_id !== id
  );
  localStorage.setItem('task_statuses', JSON.stringify(filteredTaskStatuses));
};
