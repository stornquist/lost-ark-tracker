import { useMemo } from 'react';
import { capitalize } from '../../../utils/capitalize';
import { BiTrash } from 'react-icons/bi';

export const useMainColumns = ({ data, handleTaskComplete: setTaskComplete }) =>
  useMemo(
    () => [
      {
        name: 'Character',
        selector: row => (
          <div className="group w-full">
            {row.name}{' '}
            <BiTrash
              className="w-12 inline text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              size={18}
            />
          </div>
        ),
      },
      ...Object.entries(data[0].tasks).map(([taskName, taskData]) => {
        return {
          name: (
            <div>
              {capitalize(taskName)}
              {taskData.type ? ` (${taskData.type})` : ''}
            </div>
          ),
          selector: row => {
            return (
              <input
                type="checkbox"
                className="appearance-none w-4 h-4 bg-red-400 checked:bg-green-400 rounded-sm"
                checked={row.tasks[taskName].completed}
                onChange={() =>
                  setTaskComplete(
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
    [(data, setTaskComplete)]
  );
