// Firestore-varianten. Lastes bare når firebase-config.js har en apiKey.
// Ingen innlogging: alt ligger under spaces/{hash}, og reglene i firestore.rules
// slipper bare gjennom gyldige hasher og gyldige felt.
import { initializeApp } from 'firebase/app';
import {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager,
  collection, doc, setDoc, deleteDoc, onSnapshot, deleteField, connectFirestoreEmulator,
} from 'firebase/firestore';
import { firebaseConfig } from '../firebase-config.js';
import { useEmulator } from './store.js';

let db;
function getDb() {
  if (db) return db;
  if (useEmulator) {
    db = initializeFirestore(initializeApp({ projectId: 'juleverksted-test', apiKey: 'demo' }), {});
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    return db;
  }
  const app = initializeApp(firebaseConfig);
  try {
    db = initializeFirestore(app, {
      localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
    });
  } catch {
    db = initializeFirestore(app, {});
  }
  return db;
}

const friendly = (err) =>
  err && err.code === 'permission-denied'
    ? 'Databasen sa nei. Sjekk at sikkerhetsreglene er publisert.'
    : 'Fikk ikke kontakt med databasen. Sjekk nettet og prøv igjen.';

export function createFirebaseStore(space) {
  const fs = getDb();
  const ref = (col, id) => doc(fs, 'spaces', space, col, id);
  const wrap = (p) => p.catch((err) => { throw new Error(friendly(err)); });

  return {
    mode: 'firebase',
    subscribe(col, cb, onError) {
      return onSnapshot(
        collection(fs, 'spaces', space, col),
        (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
        (err) => onError && onError(new Error(friendly(err))),
      );
    },
    set: (col, id, data) => wrap(setDoc(ref(col, id), data)),
    merge: (col, id, patch) => wrap(setDoc(ref(col, id), patch, { merge: true })),
    setField: (col, id, field, sub, value) =>
      wrap(setDoc(ref(col, id), { [field]: { [sub]: value === null ? deleteField() : value } }, { merge: true })),
    remove: (col, id) => wrap(deleteDoc(ref(col, id))),
    close() {},
  };
}
