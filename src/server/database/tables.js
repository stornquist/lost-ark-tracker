const character = {
  name: 'characters',
  columns: {
    id: { primaryKey: true, autoIncrement: true },
    name: { notNull: true, dataType: 'string' },
  },
};

const task = {
  name: 'tasks',
  columns: {
    id: { primaryKey: true, autoIncrement: true },
    name: { notNull: true, dataType: 'string' },
    type: { notNull: true, dataType: 'string' },
  },
};

const task_status = {
  name: 'task_statuses',
  columns: {
    id: { primaryKey: true, autoIncrement: true },
    task_id: { notNull: true, dataType: 'number' },
    character_id: { notNull: true, dataType: 'number' },
    completed: { notNull: true, dataType: 'boolean' },
  },
};

const rapport = {
  name: 'rapports',
  columns: {
    id: { primaryKey: true, autoIncrement: true },
    name: { notNull: true, dataType: 'string' },
    instrument: { notNull: true, dataType: 'number' },
    emote: { notNull: true, dataType: 'number' },
  },
};

const crystal_aura = {
  name: 'crystal_aura',
  columns: {
    id: { primaryKey: true, autoIncrement: true },
    is_active: { notNull: true, dataType: 'boolean' },
  },
};

const resets = {
  name: 'resets',
  columns: {
    id: { primaryKey: true, autoIncrement: true },
    type: { notNull: true, dataType: 'string' }, // "weekly" | "daily"
    date: { notNull: true, dataType: 'date_time' },
  },
};

export const database = {
  name: 'lost_ark_tracker',
  tables: [character, task, task_status, rapport, crystal_aura, resets],
};
