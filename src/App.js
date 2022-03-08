import { QueryClientProvider } from 'react-query';
import Main from './components/Main';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme } from 'react-data-table-component';
import { queryClient } from './utils/setupQueryClient';

createTheme('custom', {
  text: {
    primary: 'white',
    secondary: 'white',
  },
  background: {
    default: '#493360',
  },
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
