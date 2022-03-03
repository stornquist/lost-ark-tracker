export const useNewCharacter = data => {
  return name => {
    const id = Math.max(...data.map(char => char.id)) + 1;
    const tasks = {};
    for (const key of Object.keys(data[0].tasks)) {
      tasks[key] = { ...data[0].tasks[key], completed: false };
    }
    return { id, name, tasks };
  };
};
