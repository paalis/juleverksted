// Enkle strek-ikoner og -illustrasjoner. Alle bruker currentColor.
// Dekorative ikoner får aria-hidden; teksten ved siden av bærer meningen.

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
};

const paths = {
  stjerne: <path d="M12 3.5l2.3 5.6 6 .4-4.6 3.9 1.5 5.9L12 16.1l-5.2 3.2 1.5-5.9-4.6-3.9 6-.4z" />,
  gran: (
    <>
      <path d="M12 3l4 5h-2.2l3.7 4.6h-2.3L19.5 18h-15l4.3-5.4H6.5L10.2 8H8z" />
      <path d="M12 18v3" />
    </>
  ),
  pepperkake: (
    <>
      <circle cx="12" cy="6" r="2.6" />
      <path d="M9.6 8.4c-1.2.5-2.6 1.4-4 2.2a1.3 1.3 0 0 0 1 2.4l2.6-.8-.6 3.3-1.8 3.6a1.3 1.3 0 0 0 2.3 1.1L12 17l2.9 3.2a1.3 1.3 0 0 0 2.3-1.1l-1.8-3.6-.6-3.3 2.6.8a1.3 1.3 0 0 0 1-2.4c-1.4-.8-2.8-1.7-4-2.2" />
      <path d="M11 6h.01M13 6h.01M12 11.2h.01M12 13.6h.01" />
    </>
  ),
  krans: (
    <>
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M8.4 5.9l1.2 2M15.6 5.9l-1.2 2M18.6 10.2l-2.2.8M5.4 10.2l2.2.8M8 18l1.3-1.9M16 18l-1.3-1.9" />
    </>
  ),
  hus: (
    <>
      <path d="M4 11l8-6.5 8 6.5" />
      <path d="M6 9.5V20h12V9.5" />
      <path d="M10.2 20v-4.4a1.8 1.8 0 0 1 3.6 0V20" />
      <path d="M8 8.2l.9 1.1.9-1.1M14.2 8.2l.9 1.1.9-1.1" />
    </>
  ),
  kort: (
    <>
      <rect x="3.5" y="6" width="17" height="12" rx="1.5" />
      <path d="M3.5 7.5l8.5 5.5 8.5-5.5" />
    </>
  ),
  sted: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  bil: (
    <>
      <path d="M4.5 16.5V12l1.8-4.5h11.4l1.8 4.5v4.5" />
      <path d="M3.5 12h17v4.5h-17z" />
      <path d="M6.5 16.5v2M17.5 16.5v2M7 14.2h.01M17 14.2h.01" />
    </>
  ),
  veske: (
    <>
      <path d="M5 8.5h14l-1 11.5H6z" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
    </>
  ),
  barn: (
    <>
      <circle cx="12" cy="6.5" r="2.5" />
      <path d="M8 21v-5l-1.5-3.5L12 11l5.5 1.5L16 16v5M12 15v6" />
    </>
  ),
  pote: (
    <>
      <path d="M12 13c-2.6 0-5 2.4-5 4.7 0 1.4 1.1 2.3 2.4 2.3 1 0 1.7-.6 2.6-.6s1.6.6 2.6.6c1.3 0 2.4-.9 2.4-2.3 0-2.3-2.4-4.7-5-4.7z" />
      <ellipse cx="7" cy="9.5" rx="1.6" ry="2.1" />
      <ellipse cx="10.2" cy="6.2" rx="1.6" ry="2.1" />
      <ellipse cx="13.8" cy="6.2" rx="1.6" ry="2.1" />
      <ellipse cx="17" cy="9.5" rx="1.6" ry="2.1" />
    </>
  ),
  sjekk: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  pluss: <path d="M12 5v14M5 12h14" />,
  kryss: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  lås: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="1.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  bestikk: (
    <>
      <path d="M7 3v7a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3M9 12v9" />
      <path d="M16.5 21V3c-1.9 1.3-3 3.5-3 6.5 0 1.7.8 3 3 3" />
    </>
  ),
};

export function Icon({ name, size = 22, className, title }) {
  return (
    <svg
      {...base}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      {...(title ? { 'aria-hidden': undefined, role: 'img', 'aria-label': title } : null)}
    >
      {paths[name]}
    </svg>
  );
}

// Grankvist til heroen: én sammenhengende strek med nåler, tegnet som et trykk.
export function GranKvist({ className }) {
  return (
    <svg {...base} strokeWidth={1.1} viewBox="0 0 320 120" className={className}>
      <path d="M6 96 C 70 80, 150 60, 314 24" />
      {Array.from({ length: 17 }, (_, i) => {
        const t = i / 16;
        const x = 22 + t * 270;
        const y = 92 - t * 62 - Math.sin(t * Math.PI) * 10;
        const len = 20 - t * 8;
        return (
          <g key={i}>
            <path d={`M${x} ${y} l ${len * 0.55} ${-len}`} />
            <path d={`M${x + 4} ${y - 1} l ${len * 0.75} ${len * 0.62}`} />
          </g>
        );
      })}
      <circle cx="118" cy="86" r="5.5" />
      <circle cx="131" cy="93" r="4.5" />
      <circle cx="126" cy="79" r="3.8" />
    </svg>
  );
}
