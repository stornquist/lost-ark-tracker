export const addNewTask = (data, setData, task) => {
  setData([
    ...data.map(character => {
      return {
        ...character,
        tasks: {
          ...character.tasks,
          [task.name]: { type: task.type, completed: false },
        },
      };
    }),
  ]);
};
