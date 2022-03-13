import { connection } from '../database/db';
import { characterSchema } from '../schemas/character';
import { getTasks } from './tasks';
import { deleteTaskStatusesByCharacterId } from './taskStatus';

const Errors = {
  notFound: 'character not found',
};

export const getCharacter = async id => {
  const character = await connection.select({
    from: 'characters',
    where: {
      id,
    },
  });
  if (!character) throw new Error(Errors.notFound);

  return character;
};

export const getCharacters = async () => {
  const characters = await connection.select({
    from: 'characters',
  });
  if (!characters) return [];

  return characters;
};

export const createCharacter = async data => {
  const { value, error } = characterSchema.validate(data, {
    stripUnknown: true,
    allowUnknown: true,
  });
  if (error) throw new Error(error);

  const character = (
    await connection.insert({
      into: 'characters',
      values: [value],
      return: true,
    })
  )[0];

  const tasks = await getTasks();
  await connection.insert({
    into: 'task_statuses',
    values: tasks.map(task => ({
      task_id: task.id,
      character_id: character.id,
      completed: false,
    })),
  });

  return character;
};

export const updateCharacter = async (id, data) => {
  const { value, error } = characterSchema.validate(data, {
    stripUnknown: true,
    allowUnknown: true,
  });
  if (error) throw new Error(error);

  await connection.update({
    in: 'characters',
    where: {
      id,
    },
    set: value,
  });

  return { id, ...data };
};

export const deleteCharacter = async id => {
  // delete character
  await connection.remove({
    from: 'characters',
    where: { id },
  });

  // delete character task_statuses
  await deleteTaskStatusesByCharacterId(id);
};
