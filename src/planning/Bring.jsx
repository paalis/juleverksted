import { useState } from 'react';
import { useLive } from './useLive.js';
import { taMedForslag } from '../content.js';
import { nameOf, newId, slug, plural } from '../util.js';
import { Icon } from '../components/Icons.jsx';

export default function Bring({ docs, me, store }) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const live = useLive();

  // Forslagene fra content.js finnes ikke i databasen før noen krysser av.
  const byId = Object.fromEntries(docs.map((d) => [d.id, d]));
  const suggested = taMedForslag.map((t, i) => {
    const id = `forslag-${slug(t) || i}`;
    return byId[id] || { id, tekst: t, tarMed: '', egen: false, opprettet: i };
  });
  const custom = docs.filter((d) => d.egen).sort((a, b) => a.opprettet - b.opprettet);
  const items = [...suggested, ...custom];
  const taken = items.filter((i) => i.tarMed).length;

  const run = (p) => p.then(() => setError('')).catch((e) => setError(e.message));

  const toggle = (item) => {
    if (!me) return;
    const tarMed = item.tarMed === me ? '' : me;
    const { id, ...rest } = item;
    run(store.set('bringlist', id, { ...rest, tarMed }));
  };

  const add = (e) => {
    e.preventDefault();
    const t = text.trim().slice(0, 120);
    if (!t) return;
    setText('');
    run(store.set('bringlist', newId(), { tekst: t, tarMed: me || '', egen: true, opprettet: Date.now() }));
  };

  return (
    <div className="card bring">
      <p className="bring__count">
        {plural(items.length, 'ting', 'ting')} på lista, {taken} er tatt.
      </p>
      {!me && <p className="field__hint">Velg hvem dere er øverst på siden for å krysse av.</p>}
      {items.length === 0 ? (
        <p className="empty">Lista er tom. Legg til det første under.</p>
      ) : (
        <ul className={live ? 'list--live' : undefined}>
          {items.map((item) => {
            const mine = item.tarMed && item.tarMed === me;
            const other = item.tarMed && !mine;
            const label = `${item.tekst}${other ? `, tas med av ${nameOf(item.tarMed)}` : ''}`;
            return (
              <li key={item.id} className="bring__item">
                <span className="check">
                  <input
                    type="checkbox"
                    checked={Boolean(item.tarMed)}
                    disabled={!me || other}
                    onChange={() => toggle(item)}
                    aria-label={mine ? `${item.tekst}: dere tar med` : label}
                  />
                  <span><Icon name="sjekk" size={18} /></span>
                </span>
                <span className="bring__text">
                  <span className="bring__name">{item.tekst}</span>
                  {item.tarMed && (
                    <span className={`bring__who ${mine ? 'bring__who--mine' : ''}`}>
                      {mine ? 'Dere tar med' : `${nameOf(item.tarMed)} tar med`}
                    </span>
                  )}
                </span>
                {item.egen && (
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label={`Fjern ${item.tekst}`}
                    onClick={() => run(store.remove('bringlist', item.id))}
                  >
                    <Icon name="kryss" size={18} />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
      <form className="add-row" onSubmit={add}>
        <label htmlFor="ny-ting" className="visually-hidden">Ny ting å ta med</label>
        <input
          id="ny-ting"
          type="text"
          value={text}
          maxLength={120}
          enterKeyHint="done"
          placeholder="Noe dere tar med"
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
