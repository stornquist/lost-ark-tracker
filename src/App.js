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
  onSettled: () => queryClient.invalidateQueries('task_statuses'),
});
queryClient.setMutationDefaults('characters', {
  ...defaultOptions,
  onSettled: () => queryClient.invalidateQueries('characters'),
});
queryClient.setMutationDefaults('tasks', {
  ...defaultOptions,
  onSettled: () => queryClient.invalidateQueries('tasks'),
});
queryClient.setMutationDefaults('task_statuses', {
  ...defaultOptions,
  onSettled: () => queryClient.invalidateQueries('task_statuses'),
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
