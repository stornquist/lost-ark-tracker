import React, { useState } from 'react';
import { useDeleteTask } from '../../utils/queries/tasks';
import AddEditCharacter from '../AddEditCharacter';
import AddEditTask from '../AddEditTask/AddEditTask';
import Button from '../Button';
import CharacterList from './CharacterList';

const CharacterView = () => {
  const { mutate: deleteTask } = useDeleteTask();
  const [character, setCharacter] = useState(null);
  const [task, setTask] = useState(null);
  const [characterModal, showCharacterModal] = useState(false);
  const [taskModal, showTaskModal] = useState(false);

  return (
    <div>
      {characterModal && (
        <AddEditCharacter
          className="inline mr-2"
          character={character}
          onClose={() => {
            setCharacter(null);
            showCharacterModal(false);
          }}
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
      <div className="grid gap-2 grid-flow-col xl:w-1/5 lg:w-1/3 md:w-1/2 pt-4">
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
      </div>
      <CharacterList
        setTask={task => {
          setTask(task);
          showTaskModal(true);
        }}
        setCharacter={character => {
          setCharacter(character);
          showCharacterModal(true);
        }}
      />
    </div>
  );
};

export default CharacterView;
