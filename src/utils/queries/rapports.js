import { useMutation, useQuery } from 'react-query';
import {
  createRapport,
  deleteRapport,
  getRapport,
  getRapports,
  updateRapport,
} from '../../server/services/rapports';
import { mutationDefaults } from '../setupQueryClient';

const mutationOptions = mutationDefaults('rapports');

export const useRapports = () => useQuery('rapports', getRapports);
export const useRapport = id =>
  useQuery(['rapports', id], async () => getRapport(id));

export const useUpsertRapport = () =>
  useMutation(
    'rapports',
    async data => {
      if (data.id) {
        const { id, ...payload } = data;
        return updateRapport(id, payload);
      }

      return createRapport(data);
    },
    mutationOptions
  );

export const useDeleteRapport = () =>
  useMutation(
    'rapports',
    async data => {
      if (data.id) await deleteRapport(data.id);
      else await deleteRapport(data);
    },
    mutationOptions
  );
