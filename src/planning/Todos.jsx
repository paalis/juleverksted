import { useState } from 'react';
import { useLive } from './useLive.js';
import { newId } from '../util.js';
import { Icon } from '../components/Icons.jsx';

export default function Todos({ docs, store }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const live = useLive();
  const run = (p) => p.then(() => setError('')).catch((e) => setError(e.message));

  const items = [...docs].sort((a, b) => a.ferdig - b.ferdig || a.opprettet - b.opprettet);
  const left = items.filter((t) => !t.ferdig).length;

  const add = (e) => {
    e.preventDefault();
    const t = text.trim().slice(0, 200);
    if (!t) return;
    setText('');
    run(store.set('todos', newId(), { tekst: t, ferdig: false, opprettet: Date.now() }));
  };

  return (
    <div className="card">
      <div className="sub-head">
        <span className="visually-hidden">Status:</span>
        <p>{items.length ? `${left} av ${items.length} gjenstår` : ''}</p>
      </div>
      {items.length === 0 ? (
        <p className="empty">Ingenting på lista ennå. Kjøp lys? Hente bord?</p>
      ) : (
        <ul className={live ? 'list--live' : undefined}>
          {items.map((t) => (
            <li key={t.id} className={`todo__item ${t.ferdig ? 'todo__item--done' : ''}`}>
              <span className="check">
                <input
                  type="checkbox"
                  checked={t.ferdig}
                  aria-label={t.tekst}
                  onChange={() => run(store.set('todos', t.id, { tekst: t.tekst, ferdig: !t.ferdig, opprettet: t.opprettet }))}
                />
                <span><Icon name="sjekk" size={18} /></span>
              </span>
              <span className="todo__text">{t.tekst}</span>
              <button type="button" className="icon-btn" aria-label={`Slett ${t.tekst}`} onClick={() => run(store.remove('todos', t.id))}>
                <Icon name="kryss" size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <form className="add-row" onSubmit={add}>
        <label htmlFor="ny-todo" className="visually-hidden">Nytt punkt på huskelista</label>
        <input
          id="ny-todo"
          type="text"
          value={text}
          maxLength={200}
          enterKeyHint="done"
          placeholder="Nytt punkt"
          onChange={(e) => setText(e.target.value)}
        />
        <button className="btn btn--small" type="submit" disabled={!text.trim()}>
          <Icon name="pluss" size={18} /> Legg til
        </button>
      </form>
      {error && <p className="panel-error" role="alert">{error}</p>}
    </div>
  );
}
