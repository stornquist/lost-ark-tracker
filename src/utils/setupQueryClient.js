import { QueryClient } from 'react-query';
import { toast } from 'react-toastify';

const defaultOptions = {
  staleTime: 10000,
  onError: err => {
    toast.error(err.message);
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: defaultOptions,
  },
});

export const mutationDefaults = key => {
  if (Array.isArray(key)) {
    return {
      onSettled: () => {
        for (const k of key) {
          queryClient.invalidateQueries(k);
        }
      },
    };
  }
  return {
    onSettled: () => {
      queryClient.invalidateQueries(key);
    },
    onMutate: async data => {
      if ('id' in data) {
        await queryClient.cancelQueries(key);
        const oldData = queryClient.getQueryData(key);

        queryClient.setQueryData(key, old => {
          const newVals = old.map(o => {
            if (o.id === data.id) return { ...o, ...data };
            return o;
          });
          return [...newVals];
        });

        return oldData;
      }
    },
    onError: (err, data, old) => {
      if (old) {
        queryClient.setQueryData(key, old);
      }
      toast.error(err);
    },
  };
};
