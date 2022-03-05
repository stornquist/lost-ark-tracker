import { QueryClient, QueryClientProvider } from 'react-query';
import Main from './components/Main';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions = {
  staleTime: 10000,
  onError: err => {
    toast.error(err.message);
  },
};

export const queryClient = new QueryClient({
  defaultOptions,
});
queryClient.setMutationDefaults('reset', {
  ...defaultOptions,
  onSuccess: () => queryClient.invalidateQueries('reset'),
});
queryClient.setMutationDefaults('characters', {
  ...defaultOptions,
  onSuccess: () => queryClient.invalidateQueries('characters'),
});
queryClient.setMutationDefaults('tasks', {
  ...defaultOptions,
  onSuccess: () => queryClient.invalidateQueries('tasks'),
});
queryClient.setMutationDefaults('task_statuses', {
  ...defaultOptions,
  onSuccess: () => queryClient.invalidateQueries('task_statuses'),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
      <ToastContainer
        theme="colored"
        autoClose={5000}
        position="bottom-right"
      />
    </QueryClientProvider>
  );
}

export default App;
