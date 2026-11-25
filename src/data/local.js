// Lokal variant av databasen: brukes når Firebase ikke er satt opp ennå.
// Lagrer i localStorage og oppdaterer andre faner via «storage»-hendelsen,
// slik at «live»-oppførselen kan testes i to faner side om side.
export function createLocalStore(space) {
  const key = `juleverksted.lokal.${space}`;
  const listeners = new Map(); // samling -> Set(cb)

  const read = () => {
    try { return JSON.parse(localStorage.getItem(key)) || {}; } catch { return {}; }
  };
  let db = read();

  const emit = (col) => {
    const docs = Object.entries(db[col] || {}).map(([id, data]) => ({ id, ...data }));
    (listeners.get(col) || []).forEach((cb) => cb(docs));
  };
  const write = (col) => {
    try { localStorage.setItem(key, JSON.stringify(db)); } catch { /* fullt/privat */ }
    emit(col);
  };

  const onStorage = (e) => {
    if (e.key !== key) return;
    db = read();
    listeners.forEach((_, col) => emit(col));
  };
  window.addEventListener('storage', onStorage);

  return {
    mode: 'lokal',
    subscribe(col, cb) {
      if (!listeners.has(col)) listeners.set(col, new Set());
      listeners.get(col).add(cb);
      queueMicrotask(() => emit(col));
      return () => listeners.get(col).delete(cb);
    },
    async set(col, id, data) {
      db[col] = { ...(db[col] || {}), [id]: data };
      write(col);
    },
    async setField(col, id, field, sub, value) {
      const docs = (db[col] = { ...(db[col] || {}) });
      const doc = { ...(docs[id] || {}) };
      const map = { ...(doc[field] || {}) };
      if (value === null) delete map[sub];
      else map[sub] = value;
      doc[field] = map;
      docs[id] = doc;
      write(col);
    },
    async remove(col, id) {
      if (db[col]) delete db[col][id];
      write(col);
    },
    close() { window.removeEventListener('storage', onStorage); },
  };
}
