// Lager kalenderfilen (.ics) ut fra content.js. Brukes både av nettsiden og av
// byggesteget i vite.config.js, som legger den ut som /juleverksted.ics.
const isFilled = (s) => Boolean(s) && !/\[.*\]/.test(s);

// «2026-12-11T19:00» er norsk tid. Regn om til et ekte tidspunkt uansett hvilken
// tidssone maskinen (nettleser eller byggeserver) står i.
export function osloTime(local) {
  const [d, t = '00:00'] = local.split('T');
  const [y, mo, da] = d.split('-').map(Number);
  const [h, mi] = t.split(':').map(Number);
  const guess = Date.UTC(y, mo - 1, da, h, mi);
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Oslo', hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
  }).formatToParts(new Date(guess)).map((p) => [p.type, p.value]));
  const asOslo = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute);
  return new Date(guess - (asOslo - guess));
}

const utc = (x) => x.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

export function buildIcs({ tittel, start, adresse, beskrivelse, url }) {
  const d = osloTime(start);
  if (Number.isNaN(d.getTime())) return null;
  const end = new Date(d.getTime() + 6 * 3600e3);
  const esc = (s) => String(s || '').replace(/[\\,;]/g, (m) => `\\${m}`).replace(/\n/g, '\\n');
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Juleverksted//NO', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:juleverksted-${utc(d)}@juleverksted`,
    `DTSTAMP:${utc(new Date())}`,
    `DTSTART:${utc(d)}`,
    `DTEND:${utc(end)}`,
    `SUMMARY:${esc(tittel)}`,
    isFilled(adresse) ? `LOCATION:${esc(adresse)}` : '',
    `DESCRIPTION:${esc(beskrivelse)}${url ? `\\n\\n${esc(url)}` : ''}`,
    'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', `DESCRIPTION:${esc(tittel)} i morgen`, 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].filter(Boolean).join('\r\n');
}

/** Lenke som åpner hendelsen ferdig utfylt i Google Kalender. */
export function googleCalendarUrl({ tittel, start, adresse, beskrivelse }) {
  const d = osloTime(start);
  if (Number.isNaN(d.getTime())) return null;
  const fmt = utc;
  const q = new URLSearchParams({
    action: 'TEMPLATE',
    text: tittel,
    dates: `${fmt(d)}/${fmt(new Date(d.getTime() + 6 * 3600e3))}`,
    details: beskrivelse || '',
    ...(isFilled(adresse) ? { location: adresse } : {}),
  });
  return `https://calendar.google.com/calendar/render?${q}`;
}
