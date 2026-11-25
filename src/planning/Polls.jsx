import { useState } from 'react';
import { avstemminger } from '../content.js';
import { nameOf, plural } from '../util.js';
import { Icon } from '../components/Icons.jsx';

export default function Polls({ docs, me, store }) {
  const [error, setError] = useState('');
  const byId = Object.fromEntries(docs.map((d) => [d.id, d]));

  const vote = (pollId, optId, current) => {
    if (!me) return;
    store
      .setField('polls', pollId, 'stemmer', me, current === optId ? null : optId)
      .then(() => setError(''))
      .catch((e) => setError(e.message));
  };

  if (avstemminger.length === 0) return <p className="empty">Ingen avstemminger akkurat nå.</p>;

  return (
    <div className="polls">
      {avstemminger.map((poll) => {
        const votes = byId[poll.id]?.stemmer || {};
        const total = Object.keys(votes).length;
        const mine = votes[me];
        return (
          <section key={poll.id} className="card poll" aria-labelledby={`poll-${poll.id}`}>
            <h3 id={`poll-${poll.id}`}>{poll.sporsmal}</h3>
            <div className="poll__opts">
              {poll.valg.map((v) => {
                const voters = Object.entries(votes).filter(([, o]) => o === v.id).map(([c]) => c);
                const n = voters.length;
                return (
                  <button
                    key={v.id}
                    type="button"
                    className="poll__opt"
                    aria-pressed={mine === v.id}
                    disabled={!me}
                    onClick={() => vote(poll.id, v.id, mine)}
                  >
                    <span className="poll__label">
                      {mine === v.id && <Icon name="sjekk" size={18} />}
                      <span>
                        {v.tekst}
                        {n > 0 && <span className="poll__voters">{voters.map(nameOf).join(', ')}</span>}
                      </span>
                    </span>
                    <span className="poll__n">{n > 0 ? plural(n, 'stemme', 'stemmer') : ''}</span>
                    <span className="poll__bar" style={{ '--share': total ? n / total : 0 }} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
            <p className="poll__hint">
              {!me
                ? 'Velg hvem dere er øverst på siden for å stemme.'
                : mine
                  ? 'Trykk på stemmen deres igjen for å angre.'
                  : 'Ett valg per par. Dere kan ombestemme dere.'}
            </p>
          </section>
        );
      })}
      {error && <p className="panel-error" role="alert">{error}</p>}
    </div>
  );
}
