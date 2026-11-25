import { useEffect, useRef, useState } from 'react';
import { kveld } from '../content.js';
import { coupleName, coupleById } from '../util.js';
import { readStoredCouple } from '../data/code.js';
import { Selburose } from './Icons.jsx';

const SEEN_KEY = 'juleverksted.brev';

export function envelopeSeen() {
  try { return localStorage.getItem(SEEN_KEY) === '1'; } catch { return false; }
}
export function markEnvelope(seen) {
  try { seen ? localStorage.setItem(SEEN_KEY, '1') : localStorage.removeItem(SEEN_KEY); } catch { /* */ }
}

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

// Invitasjonen kommer som et brev. Trykk på seglet: seglet løsner, klaffen vippes opp,
// kortet glir ut, og så toner konvolutten bort og siden kommer frem.
// Sjelden og første gang: her bor «delight»-budsjettet. Ved redusert bevegelse: bare inntoning.
export default function Envelope({ onLeave, onOpened }) {
  const [stage, setStage] = useState('closed'); // closed → opening → leaving
  const sealRef = useRef(null);
  const couple = coupleById(readStoredCouple());
  const to = couple ? `Til ${coupleName(couple)}` : 'Til våre kjære venner';

  useEffect(() => {
    sealRef.current?.focus({ preventScroll: true });
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => { html.style.overflow = prev; };
  }, []);

  const open = () => {
    if (stage !== 'closed') return;
    if (reduceMotion()) return leave(250);
    setStage('opening');
    setTimeout(() => leave(450), 1700);
  };

  // Siden bak starter heroen sin i det konvolutten begynner å tone ut.
  const leave = (ms) => {
    setStage('leaving');
    onLeave?.();
    setTimeout(onOpened, ms);
  };
  const skip = () => leave(250);

  return (
    <div className={`env-overlay env-overlay--${stage}`} role="dialog" aria-modal="true" aria-label="Invitasjon">
      <div className="env-scene">
        <div className={`envelope envelope--${stage}`}>
          <div className="envelope__back" />
          <div className="letter" aria-hidden={stage === 'closed'}>
            <p className="letter__kicker">Du er invitert til</p>
            <p className="letter__title">{kveld.tittel}</p>
            <p className="letter__when">{kveld.datoTekst}, {kveld.tidTekst}</p>
          </div>
          <div className="envelope__pocket">
            <p className="envelope__to">{to}</p>
          </div>
          <div className="envelope__flap" />
          <button ref={sealRef} type="button" className="seal" onClick={open} aria-label="Åpne invitasjonen">
            <Selburose size={30} />
          </button>
        </div>
      </div>
      <p className="env-hint" aria-hidden="true" style={stage !== 'closed' ? { animation: 'none', opacity: 0, transition: 'opacity 200ms' } : undefined}>Trykk på seglet for å åpne</p>
      <button type="button" className="env-skip" onClick={skip}>Hopp over</button>
    </div>
  );
}
