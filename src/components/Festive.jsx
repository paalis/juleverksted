import { useEffect, useState } from 'react';
import { kveld, praktisk } from '../content.js';
import { googleCalendarUrl } from '../ics.js';
import { Icon, Selburose } from './Icons.jsx';

const MÅNEDER = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'];
const DAGER = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];

function useNow(ms = 60000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), ms);
    return () => clearInterval(t);
  }, [ms]);
  return now;
}

/** De fire adventssøndagene i året for kvelden. */
function adventSundays(year) {
  const xmasDay = new Date(year, 11, 25).getDay();
  const fourth = 25 - (xmasDay === 0 ? 7 : xmasDay);
  return [3, 2, 1, 0].map((k) => new Date(year, 11, fourth - 7 * k));
}

// Adventsstake: lysene tennes etter den ekte kalenderen. Flammene blafrer rolig.
export function AdventCandles() {
  const now = useNow();
  const year = new Date(kveld.start).getFullYear();
  const sundays = adventSundays(year);
  const lit = sundays.filter((s) => now >= s).length;
  const next = sundays[lit];
  const caption = next
    ? `${lit === 0 ? 'Første' : ['', 'Andre', 'Tredje', 'Fjerde'][lit]} lys tennes ${DAGER[next.getDay()]} ${next.getDate()}. ${MÅNEDER[next.getMonth()]}`
    : 'Alle fire lysene er tent';

  return (
    <figure className="candles" aria-label={`Adventsstake med ${lit} av 4 lys tent. ${caption}.`}>
      <svg viewBox="0 0 220 96" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f6d48a" stopOpacity=".55" />
            <stop offset="100%" stopColor="#f6d48a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="flame" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#f3b24e" />
            <stop offset="60%" stopColor="#f8d98c" />
            <stop offset="100%" stopColor="#fff4d6" />
          </linearGradient>
        </defs>
        {/* Staken: en lav bue med greiner */}
        <path className="candles__base" d="M14 86 C 60 96, 160 96, 206 86" />
        <path className="candles__base" d="M30 84 l -6 -6 M58 88 l -4 -8 M162 88 l 4 -8 M190 84 l 6 -6" />
        {[0, 1, 2, 3].map((i) => {
          const x = 40 + i * 47;
          const on = i < lit;
          return (
            <g key={i} className={`candle ${on ? 'candle--lit' : ''}`} style={{ '--i': i }}>
              {on && <circle cx={x} cy={22} r={20} fill="url(#glow)" className="candle__glow" />}
              <rect x={x - 8} y={34} width={16} height={52} rx={2} className="candle__body" />
              <path d={`M${x - 8} ${40} q 4 3 8 0 q 4 -3 8 0`} className="candle__drip" />
              <path d={`M${x} 34 v -6`} className="candle__wick" />
              {on && (
                <g className="candle__flame">
                  <path d={`M${x} 6 C ${x + 7} 16, ${x + 6} 27, ${x} 29 C ${x - 6} 27, ${x - 7} 16, ${x} 6 Z`} fill="url(#flame)" />
                  <path d={`M${x} 17 C ${x + 2.5} 22, ${x + 2} 26, ${x} 27 C ${x - 2} 26, ${x - 2.5} 22, ${x} 17 Z`} fill="#fff" opacity=".7" />
                </g>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

// Kalenderblad som legger kvelden i kalenderen. Ekte .ics-fil (fungerer på iPhone),
// og en reserve-lenke til Google Kalender.
export function CalendarLeaf() {
  const d = new Date(kveld.start);
  const google = googleCalendarUrl({
    tittel: kveld.tittel, start: kveld.start, adresse: praktisk.adresse, beskrivelse: kveld.velkomst,
  });
  return (
    <div className="leaf-wrap">
      <a className="leaf" href="/juleverksted.ics" download="juleverksted.ics" aria-label={`Legg i kalenderen: ${kveld.datoTekst} ${kveld.tidTekst}`}>
        <span className="leaf__rings" aria-hidden="true"><i /><i /></span>
        <span className="leaf__month">{MÅNEDER[d.getMonth()]}</span>
        <span className="leaf__day">{d.getDate()}</span>
        <span className="leaf__weekday">{DAGER[d.getDay()]}</span>
        <span className="leaf__add">
          <Icon name="kalender" size={15} /> Legg i kalender
        </span>
      </a>
      {google && (
        <a className="leaf-alt" href={google} target="_blank" rel="noreferrer">eller Google Kalender</a>
      )}
    </div>
  );
}

// Adventsluke rundt nedtellingen: døra åpner seg én gang når siden lastes.
export function LukeDoor({ children }) {
  return (
    <div className="luke-door">
      {children}
      <span className="luke-door__panel" aria-hidden="true">
        <Selburose size={30} />
        <span className="luke-door__knob" />
      </span>
    </div>
  );
}

// Gavesløyfe nederst på invitasjonskortet.
export function Bow({ className }) {
  return (
    <svg viewBox="0 0 160 70" className={`bow ${className || ''}`} aria-hidden="true" focusable="false">
      <path className="bow__tail" d="M76 38 L 56 66 L 64 64 L 66 70 L 80 42 Z" />
      <path className="bow__tail" d="M84 38 L 104 66 L 96 64 L 94 70 L 80 42 Z" />
      <path className="bow__loop" d="M78 34 C 60 6, 22 10, 30 30 C 36 46, 64 40, 78 36 Z" />
      <path className="bow__loop" d="M82 34 C 100 6, 138 10, 130 30 C 124 46, 96 40, 82 36 Z" />
      <path className="bow__fold" d="M70 30 C 56 22, 42 22, 40 28 M90 30 C 104 22, 118 22, 120 28" />
      <rect className="bow__knot" x="72" y="28" width="16" height="14" rx="4" />
    </svg>
  );
}

// Gavelapp til gjestelisten. Svinger på snora når den trykkes på (ren pynt,
// derfor ingen knapp: navnet og statusen er vanlig tekst for skjermlesere).
export function GiftTag({ children, host, badge, i = 0 }) {
  const [swing, setSwing] = useState(0);
  const cls = swing ? (swing % 2 ? 'gift-tag--swing-a' : 'gift-tag--swing-b') : '';
  return (
    <li className="tag-item" style={{ '--i': i }}>
      <div className={`gift-tag ${cls}`} onPointerDown={() => setSwing((n) => n + 1)}>
        <span className="gift-tag__hole" aria-hidden="true" />
        <span className="gift-tag__names">{children}</span>
        {host && <span className="gift-tag__host">Vertskap</span>}
        {badge}
      </div>
    </li>
  );
}
