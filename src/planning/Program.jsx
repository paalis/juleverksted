import { useState } from 'react';
import { useLive } from './useLive.js';
import { aktiviteter, meny, programTyper, par } from '../content.js';
import { nameOf, newId, plural } from '../util.js';
import { Icon, Sparkle } from '../components/Icons.jsx';

const hostId = par.find((p) => p.vert)?.id;
const votesOf = (f) => Object.keys(f.stemmer || {});

function Suggestion({ f, me, popular, store, onError }) {
  const voters = votesOf(f);
  const mine = Boolean(me && f.stemmer?.[me]);
  const run = (p) => p.then(() => onError('')).catch((e) => onError(e.message));
  const canEdit = me && (me === f.foreslattAv || me === hostId);

  return (
    <li className={`card idea ${f.valgt ? 'idea--chosen' : ''}`}>
      <div className="idea__top">
        <span className="tag">{programTyper.find((t) => t.id === f.type)?.tekst}</span>
        {popular && (
          <span className="tag tag--gold"><Sparkle size={11} /> Populær</span>
        )}
      </div>
      <h3 className="idea__title">{f.tittel}</h3>
      {f.tekst && <p className="idea__text">{f.tekst}</p>}
      <p className="idea__by">Foreslått av {f.foreslattAv ? nameOf(f.foreslattAv) : 'noen'}</p>

      <div className="idea__actions">
        <button
          type="button"
          className="vote"
          aria-pressed={mine}
          disabled={!me}
          onClick={() => run(store.setField('program', f.id, 'stemmer', me, mine ? null : true))}
        >
          <Icon name="stjerne" size={18} />
          <span>{mine ? 'Dere stemmer' : 'Stem'}</span>
          <span className="vote__n">{voters.length}</span>
        </button>

        <label className="switch">
          <input
            type="checkbox"
            checked={Boolean(f.valgt)}
            disabled={!me}
            onChange={() => run(store.merge('program', f.id, { valgt: !f.valgt }))}
          />
          <span className="switch__track" aria-hidden="true"><span className="switch__thumb" /></span>
          Med i programmet
        </label>
      </div>

      {voters.length > 0 && (
        <p className="idea__voters">{plural(voters.length, 'stemme', 'stemmer')}: {voters.map(nameOf).join(', ')}</p>
      )}

      {f.valgt && (
        <div className="idea__time field">
          <label htmlFor={`tid-${f.id}`}>Klokkeslett</label>
          <input
            id={`tid-${f.id}`}
            type="time"
            value={(f.tid || '').replace('.', ':')}
            step="300"
            disabled={!me}
            onChange={(e) => run(store.merge('program', f.id, { tid: e.target.value }))}
          />
        </div>
      )}

      {canEdit && (
        <button type="button" className="icon-btn idea__delete" aria-label={`Slett forslaget ${f.tittel}`}
          onClick={() => { if (window.confirm(`Slette «${f.tittel}»?`)) run(store.remove('program', f.id)); }}>
          <Icon name="kryss" size={18} />
        </button>
      )}
    </li>
  );
}

export default function Program({ docs, me, store }) {
  const [tittel, setTittel] = useState('');
  const [tekst, setTekst] = useState('');
  const [type, setType] = useState('verksted');
  const [error, setError] = useState('');
  const live = useLive();

  const items = [...docs].sort((a, b) => a.opprettet - b.opprettet);
  // De tre med flest stemmer (minst to) får en gullmerkelapp. Rekkefølgen står stille,
  // så et forslag ikke hopper bort i det man trykker på det.
  const popular = new Set(
    [...items].filter((f) => votesOf(f).length >= 2)
      .sort((a, b) => votesOf(b).length - votesOf(a).length).slice(0, 3).map((f) => f.id),
  );
  const existing = new Set(items.map((f) => f.tittel.toLowerCase()));

  const add = (e) => {
    e.preventDefault();
    const t = tittel.trim().slice(0, 80);
    if (!t || !me) return;
    store
      .set('program', newId(), {
        tittel: t, tekst: tekst.trim().slice(0, 300), type, foreslattAv: me,
        stemmer: { [me]: true }, valgt: false, tid: '', opprettet: Date.now(),
      })
      .then(() => { setTittel(''); setTekst(''); setError(''); })
      .catch((err) => setError(err.message));
  };

  // Hurtigvalg: verkstedidéer og mat-idéer som ikke er foreslått ennå.
  const ideas = [
    ...aktiviteter.map((a) => ({ tittel: a.tittel, tekst: a.tekst, ikon: a.ikon, type: 'verksted' })),
    ...meny.ideer.map((m) => ({ tittel: m.navn, tekst: m.tekst, ikon: 'bestikk', type: 'mat' })),
  ].filter((a) => !existing.has(a.tittel.toLowerCase()));

  return (
    <div className="ideas">
      {items.length === 0 ? (
        <p className="empty card">Ingen forslag ennå. Bli de første!</p>
      ) : (
        <ul className={`ideas__list ${live ? 'list--live' : ''}`}>
          {items.map((f) => (
            <Suggestion key={f.id} f={f} me={me} popular={popular.has(f.id)} store={store} onError={setError} />
          ))}
        </ul>
      )}

      <form className="card idea-form" onSubmit={add} id="nytt-forslag">
        <h3>Nytt forslag</h3>
        {ideas.length > 0 && (
          <div className="chips" aria-label="Hent en idé">
            {ideas.map((a) => (
              <button key={a.tittel} type="button" className="chip"
                onClick={() => { setTittel(a.tittel); setTekst(a.tekst); setType(a.type); }}>
                <Icon name={a.ikon} size={16} /> {a.tittel}
              </button>
            ))}
          </div>
        )}
        <div className="field">
          <label htmlFor="forslag-tittel">Hva vil dere gjøre?</label>
          <input id="forslag-tittel" type="text" value={tittel} maxLength={80} required
            placeholder="F.eks. Pakke inn gaver sammen" onChange={(e) => setTittel(e.target.value)} />
        </div>
        <fieldset className="field type-pick">
          <legend className="label">Type</legend>
          <div className="chips">
            {programTyper.map((t) => (
              <label key={t.id} className="chip chip--radio">
                <input type="radio" name="forslag-type" value={t.id} checked={type === t.id} onChange={() => setType(t.id)} />
                {t.tekst}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="field">
          <label htmlFor="forslag-tekst">Litt mer om det <span className="optional">(valgfritt)</span></label>
          <textarea id="forslag-tekst" value={tekst} maxLength={300} rows={2}
            placeholder="Hva trengs, hvor lang tid tar det?" onChange={(e) => setTekst(e.target.value)} />
        </div>
        <button className="btn" type="submit" disabled={!me || !tittel.trim()}>
          <Icon name="pluss" size={18} /> Legg til forslaget
        </button>
        {!me && <p className="field__hint">Velg hvem dere er øverst på siden først.</p>}
      </form>
      {error && <p className="panel-error" role="alert">{error}</p>}
    </div>
  );
}
