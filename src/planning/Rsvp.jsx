import { useEffect, useRef, useState } from 'react';
import { par } from '../content.js';
import { coupleName } from '../util.js';
import { STATUS, StatusBadge } from '../components/StatusBadge.jsx';
import { Sparkle } from '../components/Icons.jsx';

function RsvpCard({ couple, doc, isMe, onSave }) {
  const [allergier, setAllergier] = useState(doc?.allergier || '');
  const [note, setNote] = useState('');
  const [burst, setBurst] = useState(0);
  const focused = useRef(false);
  const timer = useRef();

  // Hent inn endringer fra andre, men ikke mens noen skriver i feltet her.
  useEffect(() => {
    if (!focused.current) setAllergier(doc?.allergier || '');
  }, [doc?.allergier]);

  const save = async (patch) => {
    const next = {
      status: doc?.status || 'vet-ikke',
      allergier: (doc?.allergier || '').slice(0, 500),
      ...patch,
      oppdatert: Date.now(),
    };
    try {
      await onSave(couple.id, next);
      setNote('Lagret');
    } catch (e) {
      setNote(e.message);
    }
  };

  const onText = (v) => {
    setAllergier(v);
    setNote('');
    clearTimeout(timer.current);
    timer.current = setTimeout(() => save({ allergier: v.slice(0, 500) }), 900);
  };

  const name = `rsvp-${couple.id}`;
  return (
    <li className="card rsvp">
      <div className="rsvp__head">
        <h3>{coupleName(couple)}</h3>
        {isMe && <span className="rsvp__you">Dere</span>}
      </div>
      <div className="seg-wrap">
      {burst > 0 && (
        <span className="burst" key={burst} aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => <Sparkle key={i} size={i % 2 ? 9 : 12} style={{ '--a': `${i * 45}deg` }} />)}
        </span>
      )}
      <fieldset className="seg">
        <legend className="visually-hidden">Svar fra {coupleName(couple)}</legend>
        <div className="seg__opts">
          {Object.entries(STATUS).map(([value, text]) => (
            <label key={value}>
              <input
                type="radio"
                name={name}
                value={value}
                checked={doc?.status === value}
                onChange={() => {
                  if (value === 'kommer') setBurst((n) => n + 1);
                  save({ status: value, allergier: allergier.slice(0, 500) });
                }}
              />
              {text}
            </label>
          ))}
        </div>
      </fieldset>
      </div>
      <div className="field">
        <label htmlFor={`${name}-allergi`}>Allergier og preferanser</label>
        <textarea
          id={`${name}-allergi`}
          value={allergier}
          maxLength={500}
          rows={2}
          placeholder="F.eks. nøtter, vegetar, ingen svin"
          onFocus={() => { focused.current = true; }}
          onBlur={() => {
            focused.current = false;
            clearTimeout(timer.current);
            if (allergier !== (doc?.allergier || '')) save({ allergier: allergier.slice(0, 500) });
          }}
          onChange={(e) => onText(e.target.value)}
        />
        <p className="field__hint" aria-live="polite">{note}</p>
      </div>
    </li>
  );
}

export default function Rsvp({ docs, me, store }) {
  const byId = Object.fromEntries(docs.map((d) => [d.id, d]));
  const onSave = (id, data) => store.set('rsvp', id, data);
  const mine = par.find((p) => p.id === me);
  const others = par.filter((p) => p.id !== me);
  return (
    <div className="rsvp-wrap">
      {mine && (
        <ul className="rsvp-list">
          <RsvpCard couple={mine} doc={byId[mine.id]} isMe onSave={onSave} />
        </ul>
      )}
      <div className="card others">
        <h3>De andre</h3>
        <ul>
          {others.map((p) => {
            const d = byId[p.id];
            return (
              <li key={p.id} className="others__row">
                <span className="others__names">
                  {coupleName(p)}
                  {d?.allergier && <span className="others__allergy">{d.allergier}</span>}
                </span>
                <StatusBadge status={d?.status} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
