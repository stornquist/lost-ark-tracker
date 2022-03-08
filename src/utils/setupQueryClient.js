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
  return {
    onSuccess: () => {
      console.log('invalidating: ', key);
      queryClient.invalidateQueries(key);
    },
  };
};
