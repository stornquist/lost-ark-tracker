import { useMemo } from 'react';
import { capitalize } from '../../../utils/capitalize';
import { BiTrash } from 'react-icons/bi';

export const useCharactersColumns = ({
  data,
  handleTaskStatusChange: setTaskStatus,
  onDeleteCharacter,
}) =>
  useMemo(
    () => [
      {
        name: 'Character',
        selector: row => (
          <div className="group w-full">
            {row.name}
            {data.length > 1 && (
              <BiTrash
                className="w-12 inline text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                size={18}
                onClick={() => onDeleteCharacter(row)}
              />
            )}
          </div>
        ),
      },
      ...Object.entries(data[0].tasks).map(([taskName, taskData], index) => {
        return {
          id: 'taskname' + index,
          name: (
            <div key={taskName + taskData.type}>
              {capitalize(taskName)}
              <p>
                {taskData.type
                  ? ` (${taskData.type.charAt(0).toUpperCase()})`
                  : ''}
              </p>
            </div>
          ),
          selector: row => {
            return (
              <input
                type="checkbox"
                className="appearance-none w-4 h-4 bg-red-400 checked:bg-green-400 rounded-sm"
                checked={row.tasks[taskName].completed}
                onChange={() =>
                  setTaskStatus(
                    row.id,
                    taskName,
                    !row.tasks[taskName].completed
                  )
                }
              />
            );
          },
        };
      }),
    ],
    [data, setTaskStatus, onDeleteCharacter]
  );
