import { useMutation, useQuery } from 'react-query';
import {
  createCharacter,
  deleteCharacter,
  getCharacter,
  getCharacters,
  updateCharacter,
} from '../../server/services/characters';

export const useCharacters = () => useQuery('characters', getCharacters);
export const useCharacter = id =>
  useQuery(['characters', id], async () => getCharacter(id));

export const useUpsertCharacter = () =>
  useMutation('characters', async data => {
    if (data.id) {
      const { id, ...payload } = data;
      return updateCharacter(id, payload);
    }

    return createCharacter(data);
  });

export const useDeleteCharacter = () =>
  useMutation('characters', async data => {
    if (data.id) await deleteCharacter(data.id);
    else await deleteCharacter(data);
  });
