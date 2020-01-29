import Dexie from 'dexie';

// create database
const db = new Dexie('Todo');
db.version(1).stores({tasks:'++id,text'});

export default db;