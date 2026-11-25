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
  sjekk: <path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1" className="check-path" />,
  kalender: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="1.5" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
      <path d="M12 12.6l.8 1.7 1.8.2-1.3 1.2.4 1.8-1.7-.9-1.7.9.4-1.8-1.3-1.2 1.8-.2z" />
    </>
  ),
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

// Selburose: den åttebladede stjernen fra lusekofta. Strek, så den holder seg lett.
export function Selburose({ size = 28, className }) {
  const petals = Array.from({ length: 8 }, (_, k) => {
    const a = (k * Math.PI) / 4 - Math.PI / 2;
    const p = (r, d) => `${(12 + r * Math.cos(a + d)).toFixed(2)} ${(12 + r * Math.sin(a + d)).toFixed(2)}`;
    return `M${p(2.2, 0)} L${p(6, -0.3)} L${p(10.5, 0)} L${p(6, 0.3)} Z`;
  });
  return (
    <svg {...base} strokeWidth={1.1} width={size} height={size} viewBox="0 0 24 24" className={className}>
      {petals.map((d) => <path key={d} d={d} />)}
      <rect x="10.6" y="10.6" width="2.8" height="2.8" transform="rotate(45 12 12)" />
    </svg>
  );
}

// Ornamentrad til seksjonsoverskrifter: strek – selburose – strek.
export function Ornament({ className = '' }) {
  return (
    <span className={`ornament ${className}`} aria-hidden="true">
      <span className="ornament__line" />
      <Selburose size={26} />
      <span className="ornament__line" />
    </span>
  );
}

// Fireuddet glimt.
export function Sparkle({ size = 14, className, style }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M12 1.5c.6 5.6 4.9 9.9 10.5 10.5-5.6.6-9.9 4.9-10.5 10.5C11.4 16.9 7.1 12.6 1.5 12 7.1 11.4 11.4 7.1 12 1.5z" fill="currentColor" />
    </svg>
  );
}

// Grankvist med julekuler som henger i tråder. Kvisten tegnes og kulene henger seg på
// plass (én gang ved lasting); deretter svaier de rolig. Se .garland i styles.css.
const P0 = [0, 20], P1 = [110, 78], P2 = [290, 78], P3 = [400, 20];
const bez = (t) => [0, 1].map((k) =>
  (1 - t) ** 3 * P0[k] + 3 * (1 - t) ** 2 * t * P1[k] + 3 * (1 - t) * t ** 2 * P2[k] + t ** 3 * P3[k]);

const KULER = [
  { t: 0.17, len: 22, r: 11, tone: 'red' },
  { t: 0.33, len: 44, r: 9, tone: 'gold' },
  { t: 0.5, len: 26, r: 15, tone: 'cream' },
  { t: 0.67, len: 40, r: 11, tone: 'red' },
  { t: 0.83, len: 20, r: 9, tone: 'gold' },
];

export function Garland({ className }) {
  const needles = [];
  const N = 46;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const [x, y] = bez(t);
    const [x2, y2] = bez(Math.min(1, t + 0.01));
    const ang = Math.atan2(y2 - y, x2 - x);
    const len = 11 + Math.sin(t * Math.PI) * 7;
    for (const side of [-1, 1]) {
      const a = ang + side * 0.85;
      needles.push(`M${x.toFixed(1)} ${y.toFixed(1)} l ${(Math.cos(a) * len).toFixed(1)} ${(Math.sin(a) * len).toFixed(1)}`);
    }
  }
  return (
    <svg viewBox="-10 0 420 170" className={`garland ${className || ''}`} aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <g className="garland__bough" strokeWidth="1.5">
        <path pathLength="1" d={`M${P0} C ${P1} ${P2} ${P3}`} />
        {needles.map((d) => <path key={d} pathLength="1" d={d} />)}
      </g>
      {KULER.map((k, i) => {
        const [x, y] = bez(k.t);
        const cy = y + k.len + 2.8 + k.r;
        return (
          <g key={i} className={`bauble bauble--${k.tone}`} style={{ '--i': i }}>
            <g className="bauble__swing">
              <path d={`M${x} ${y} V${y + k.len}`} strokeWidth="0.9" className="bauble__thread" />
              <rect x={x - 3} y={y + k.len - 1} width="6" height="4" rx="1" strokeWidth="1" className="bauble__cap" />
              <circle cx={x} cy={cy} r={k.r} strokeWidth="1.4" className="bauble__ball" />
              <path d={`M${x - k.r * 0.55} ${cy - k.r * 0.15} a ${k.r * 0.65} ${k.r * 0.65} 0 0 1 ${k.r * 0.45} ${-k.r * 0.45}`}
                strokeWidth="1.2" className="bauble__shine" />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
