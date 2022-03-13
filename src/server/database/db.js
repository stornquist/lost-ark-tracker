import { migrateFromLocalStorage } from './migrateFromLocalStorage';
import { database } from './tables';
import { Connection } from 'jsstore';

const getWorkerPath = () => {
  if (process.env.NODE_ENV === 'development') {
    return require('file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js');
  } else {
    return require('file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js');
  }
};

const workerPath = getWorkerPath().default;
export const connection = new Connection(new Worker(workerPath));

export const initDB = async () => {
  console.debug('initiating DB');
  const isNew = await connection.initDb(database);

  if (isNew) {
    console.log('Migrating data from localStorage');
    await migrateFromLocalStorage();
  } else {
    console.log('DB connection open');
  }
};
