import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { useMainColumns } from './hooks/columns';

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
  const handleTaskComplete = (id, task, status) => {
    const index = data.findIndex(r => r.id === id);
    data[index].tasks[task].completed = status;
    setData([...data]);
  };

  const columns = useMainColumns({ data, handleTaskComplete });
  return (
    <div className="m-32">
      <DataTable data={data} columns={columns} theme="custom" />
    </div>
  );
};

export default Main;
