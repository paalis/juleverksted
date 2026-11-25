import { useEffect, useState } from 'react';
import { kveld } from '../content.js';

const target = new Date(kveld.start);

function parts(now) {
  const ms = target - now;
  if (Number.isNaN(ms)) return null;
  if (ms <= 0) return { tekst: ms > -6 * 3600e3 ? 'Vi er i gang nå' : 'Takk for en fin kveld' };
  const min = Math.floor(ms / 60000);
  const days = Math.floor(min / 1440);
  const hours = Math.floor((min % 1440) / 60);
  if (days >= 1) return { tall: days, enhet: days === 1 ? 'dag igjen' : 'dager igjen' };
  if (hours >= 1) return { tall: hours, enhet: hours === 1 ? 'time igjen' : 'timer igjen' };
  return { tall: Math.max(min, 1), enhet: min === 1 ? 'minutt igjen' : 'minutter igjen' };
}

// Nedtelling som en adventsluke: ett stort tall og en liten enhet.
// Oppdateres hvert halve minutt. Ingen sekunder som tikker.
export default function Countdown() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const p = parts(now);
  if (!p) return null;
  if (p.tekst) return <p className="luke luke--text">{p.tekst}</p>;
  return (
    <p className="luke" role="timer">
      <span className="luke__tall">{p.tall}</span>
      <span className="luke__enhet">{p.enhet}</span>
    </p>
  );
}
