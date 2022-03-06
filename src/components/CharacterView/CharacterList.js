import React from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { useCharacters } from '../../utils/queries/characters';
import { useTasks } from '../../utils/queries/tasks';
import {
  useTaskStatuses,
  useUpsertTaskStatus,
} from '../../utils/queries/taskStatuses';
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

const CharacterList = ({ setTask, setCharacter }) => {
  const { data: tasks = [] } = useTasks();
  const { data: characters = [] } = useCharacters();
  const { data: taskStatuses = [] } = useTaskStatuses();
  const { mutate: upsertTaskStatus } = useUpsertTaskStatus();

  const handleTaskStatusClick = taskStatus => {
    upsertTaskStatus({ ...taskStatus, completed: !taskStatus.completed });
  };

  const columns = useCharactersColumns({
    tasks,
    taskStatuses,
    onTaskStatusClick: handleTaskStatusClick,
    onTaskClick: setTask,
    onCharacterClick: setCharacter,
  });

  return (
    <div style={{ maxWidth: (tasks.length + 1) * 100 }}>
      <DataTable data={characters} columns={columns} theme="custom" />
    </div>
  );
};

export default CharacterList;
