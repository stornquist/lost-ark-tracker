import React, { useEffect, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { useCheckReset } from '../../utils/checkReset';
import {
  useCharacters,
  useDeleteCharacter,
  useUpsertCharacter,
} from '../../utils/queries/characters';
import {
  useDeleteTask,
  useTasks,
  useUpsertTask,
} from '../../utils/queries/tasks';
import {
  useTaskStatuses,
  useUpsertTaskStatus,
} from '../../utils/queries/taskStatuses';
import AddEditCharacter from '../AddEditCharacter';
import AddEditTask from '../AddEditTask/AddEditTask';
import Button from '../Button';
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

const Main = () => {
  const { data: tasks = [] } = useTasks();
  const { mutate: upsertTask } = useUpsertTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { data: characters = [] } = useCharacters();
  const { mutate: upsertCharacter } = useUpsertCharacter();
  const { mutate: deleteCharacter } = useDeleteCharacter();
  const { data: taskStatuses } = useTaskStatuses();
  const { mutate: upsertTaskStatus } = useUpsertTaskStatus();
  const checkReset = useCheckReset();
  const [character, setCharacter] = useState(null);
  const [task, setTask] = useState(null);
  const [characterModal, showCharacterModal] = useState(false);
  const [taskModal, showTaskModal] = useState(false);

  const handleTaskStatusClick = taskStatus => {
    upsertTaskStatus({ ...taskStatus, completed: !taskStatus.completed });
  };

  const handleTaskClick = task => {
    setTask(task);
    showTaskModal(true);
  };

  const handleCharacterClick = character => {
    setCharacter(character);
    showCharacterModal(true);
  };

  useEffect(() => {
    const interval = setInterval(checkReset, 10000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const columns = useCharactersColumns({
    tasks,
    taskStatuses,
    onTaskStatusClick: handleTaskStatusClick,
    onDeleteCharacter: deleteCharacter,
    onTaskClick: handleTaskClick,
    onCharacterClick: handleCharacterClick,
  });

  return (
    <div className="m-32">
      {characterModal && (
        <AddEditCharacter
          className="inline mr-2"
          character={character}
          onClose={() => {
            setCharacter(null);
            showCharacterModal(false);
          }}
          onDelete={deleteCharacter}
        />
      )}
      {taskModal && (
        <AddEditTask
          className="inline"
          task={task}
          onClose={() => {
            setTask(null);
            showTaskModal(false);
          }}
          onDelete={deleteTask}
        />
      )}
      <Button
        color="green"
        size="md"
        onClick={() => showCharacterModal(true)}
        label="New character"
      />
      <Button
        color="green"
        size="md"
        onClick={() => showTaskModal(true)}
        label="New task"
      />
      <DataTable data={characters} columns={columns} theme="custom" />
    </div>
  );
};

export default Main;
