import { useEffect, useState } from 'react';
import { kveld } from '../content.js';
import { plural } from '../util.js';

const target = new Date(kveld.start);

function label(now) {
  const ms = target - now;
  if (Number.isNaN(ms)) return '';
  if (ms <= 0) {
    // Fra start og seks timer frem regner vi kvelden som i gang.
    return ms > -6 * 3600e3 ? 'Vi er i gang nå' : 'Takk for en fin kveld';
  }
  const min = Math.floor(ms / 60000);
  const days = Math.floor(min / 1440);
  const hours = Math.floor((min % 1440) / 60);
  const mins = min % 60;
  if (days >= 1) return `Om ${plural(days, 'dag', 'dager')}${hours ? ` og ${plural(hours, 'time', 'timer')}` : ''}`;
  if (hours >= 1) return `Om ${plural(hours, 'time', 'timer')}${mins ? ` og ${plural(mins, 'minutt', 'minutter')}` : ''}`;
  return `Om ${plural(Math.max(mins, 1), 'minutt', 'minutter')}`;
}

// Nedtelling som en rolig setning, oppdatert hvert halve minutt. Ingen sekunder som tikker.
export default function Countdown() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const text = label(now);
  if (!text) return null;
  return <p className="invite__count" role="timer">{text}</p>;
}
