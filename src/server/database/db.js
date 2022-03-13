import { migrateFromLocalStorage } from './migrateFromLocalStorage';
import { database } from './tables';
import { Connection } from 'jsstore';
import { toast } from 'react-toastify';

const getWorkerPath = () => {
  if (process.env.NODE_ENV === 'development') {
    return require('file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js');
  } else {
    return require('file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js');
  }
};

const workerPath = getWorkerPath().default;
export const connection = new Connection(new Worker(workerPath));
window.connection = connection;

export const initDB = async () => {
  console.debug('initiating DB');
  const isNew = await connection.initDb(database);

  if (isNew && localStorage.characters) {
    console.log('Migrating data from localStorage');
    const toastId = toast.info('Migrating data to IndexedDB, please hold...', {
      pauseOnHover: false,
      autoClose: false,
      pauseOnFocusLoss: false,
      hideProgressBar: false,
      closeOnClick: false,
      onClose: () => {
        toast.success('Successfully migrated to IndexedDB.');
      },
    });
    await migrateFromLocalStorage();

    setTimeout(() => toast.dismiss(toastId), 2000);
  } else {
    console.log('DB connection open');
  }
};
