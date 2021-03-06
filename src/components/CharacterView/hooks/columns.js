import { useMemo } from 'react';
import Checkbox from '../../Checkbox/Checkbox';

export const useCharactersColumns = ({
  tasks,
  taskStatuses,
  onTaskStatusClick,
  onTaskClick,
  onCharacterClick,
}) =>
  useMemo(
    () => [
      {
        name: 'Character',
        selector: row => (
          <div onClick={() => onCharacterClick(row)}>{row.name}</div>
        ),
      },
      ...tasks.map(task => {
        const { id, name, type } = task;
        return {
          grow: 0,
          center: true,
          maxWidth: 80,
          name: (
            <div
              key={name + type}
              onClick={() => onTaskClick(task)}
              className="flex flex-col items-center"
            >
              {name}
              <p>{` (${type.charAt(0).toUpperCase()})`}</p>
            </div>
          ),
          selector: row => {
            const taskStatus = taskStatuses.find(
              s => s.task_id === id && row.id === s.character_id
            );
            return (
              <Checkbox
                checked={taskStatus ? taskStatus.completed : false}
                onChange={() => onTaskStatusClick(taskStatus)}
              />
            );
          },
        };
      }),
    ],
    [tasks, taskStatuses, onTaskStatusClick, onTaskClick, onCharacterClick]
  );
