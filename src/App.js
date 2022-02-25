import Main from './components/Main';
import { useLocalStorage } from './utils/localStorage';

function App() {
  const [data, setData] = useLocalStorage('data', [
    {
      id: 1,
      name: 'Test',
      tasks: {
        'guild donate': { type: 'daily', completed: false },
        chaos: { type: 'daily', completed: false },
        guardian: { type: 'daily', completed: false },
        abyss: { type: 'weekly', completed: false },
      },
    },
  ]);

  return <Main data={data} setData={setData} />;
}

export default App;
