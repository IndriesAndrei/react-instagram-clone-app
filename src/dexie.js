// create indexedDb database on browser Application->IndexedDb
import Dexie from "dexie";

// create a new myInsta database with Dexie
export const db = new Dexie('myInsta');

// we will make 2 tables: bio and gallery
db.version(1).stores({
    bio: ', name, about', // first will be blank
    gallery: '++id, url' // id will auto increment
});

