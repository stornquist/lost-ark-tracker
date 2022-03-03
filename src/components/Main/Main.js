import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import NewCharacter from '../NewCharacter';
import NewTask from '../NewTask/NewTask';
import { useCharactersColumns } from './hooks/columns';

createTheme('custom', {
  text: {
    primary: 'white',
    secondary: 'white',
  },
  background: {
    default: '#493360',
  },
});

const Main = ({ data, setData }) => {
  const handleTaskStatusChange = (id, task, status) => {
    const index = data.findIndex(r => r.id === id);
    data[index].tasks[task].completed = status;
    setData([...data]);
  };

  const handleDeleteCharacter = character => {
    const index = data.findIndex(c => c.id === character.id);
    data.splice(index, 1);
    setData([...data]);
  };

  const columns = useCharactersColumns({
    data,
    handleTaskStatusChange,
    onDeleteCharacter: handleDeleteCharacter,
  });

  return (
    <div className="m-32">
      <NewCharacter className="inline mr-2" data={data} setData={setData} />
      <NewTask className="inline" data={data} setData={setData} />
      <DataTable data={data} columns={columns} theme="custom" />
    </div>
  );
};

export default Main;
