import { par } from './content.js';

export const coupleName = (p) => (p ? p.navn.filter(Boolean).join(' og ') : '');
export const coupleById = (id) => par.find((p) => p.id === id);
export const nameOf = (id) => coupleName(coupleById(id)) || 'Noen';

export const plural = (n, en, flere) => `${n} ${n === 1 ? en : flere}`;

export const newId = () =>
  (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}${Math.random()}`)
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 24);

export const slug = (s) =>
  s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/æ/g, 'ae').replace(/ø/g, 'o').replace(/å/g, 'a')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);

const isFilled = (s) => Boolean(s) && !/\[.*\]/.test(s);

/** Kartlenke for adressen, eller null hvis adressen fortsatt er en plassholder. */
export function mapUrl(adresse) {
  return isFilled(adresse) ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresse)}` : null;
}

/** Kalenderfil (.ics) som data-URL. Varer i seks timer fra start. */
export function icsUrl({ tittel, start, adresse, beskrivelse, url }) {
  const d = new Date(start);
  if (Number.isNaN(d.getTime())) return null;
  const end = new Date(d.getTime() + 6 * 3600e3);
  const fmt = (x) => x.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const esc = (s) => String(s || '').replace(/[\\,;]/g, (m) => `\\${m}`).replace(/\n/g, '\\n');
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Juleverksted//NO', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:juleverksted-${fmt(d)}@juleverksted`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(d)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${esc(tittel)}`,
    isFilled(adresse) ? `LOCATION:${esc(adresse)}` : '',
    `DESCRIPTION:${esc(beskrivelse)}${url ? `\\n${esc(url)}` : ''}`,
    'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', `DESCRIPTION:${esc(tittel)} i morgen`, 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].filter(Boolean);
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join('\r\n'))}`;
}

/** Sorterer «18.30» / «18:30» som tid; tomme sist. */
export const timeKey = (t) => (t ? t.replace(':', '.').padStart(5, '0') : '99.99');
