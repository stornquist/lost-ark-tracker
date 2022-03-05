import { useMemo } from 'react';
import { BiTrash } from 'react-icons/bi';

export const useCharactersColumns = ({
  tasks,
  taskStatuses,
  onTaskStatusClick,
  onDeleteCharacter,
  onTaskClick,
  onCharacterClick,
}) =>
  useMemo(
    () => [
      {
        name: 'Character',
        selector: row => (
          <div className="group w-full" onClick={() => onCharacterClick(row)}>
            {row.name}
          </div>
        ),
      },
      ...tasks.map(task => {
        const { id, name, type } = task;
        return {
          name: (
            <div key={name + type} onClick={() => onTaskClick(task)}>
              {name}
              <p>{` (${type.charAt(0).toUpperCase()})`}</p>
            </div>
          ),
          selector: row => {
            const taskStatus = taskStatuses.find(
              s => s.task_id === id && row.id === s.character_id
            );
            return (
              <input
                type="checkbox"
                className="appearance-none w-4 h-4 bg-red-400 checked:bg-green-400 rounded-sm"
                checked={taskStatus ? taskStatus.completed : false}
                onChange={() => onTaskStatusClick(taskStatus)}
              />
            );
          },
        };
      }),
    ],
    [tasks, taskStatuses, onTaskStatusClick, onTaskClick, onDeleteCharacter]
  );
