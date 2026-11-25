import { useMemo } from 'react';

// Veldig diskret snø: 14 partikler, langsomme, kun transform. Skjules helt ved
// prefers-reduced-motion (se .snow i styles.css). Dekorativ, derfor aria-hidden.
export default function Snow({ count = 14 }) {
  const flakes = useMemo(() => {
    // Fast «tilfeldighet» slik at mønsteret er likt ved hver last.
    let seed = 11;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    return Array.from({ length: count }, () => ({
      left: `${(rnd() * 100).toFixed(1)}%`,
      '--s': `${(2 + rnd() * 2.5).toFixed(1)}px`,
      '--o': (0.25 + rnd() * 0.4).toFixed(2),
      '--d': `${(16 + rnd() * 14).toFixed(1)}s`,
      '--delay': `${(-rnd() * 30).toFixed(1)}s`,
      '--drift': `${(rnd() * 40 - 20).toFixed(0)}px`,
    }));
  }, [count]);

  return (
    <div className="snow" aria-hidden="true">
      {flakes.map((style, i) => <i key={i} style={style} />)}
    </div>
  );
}
