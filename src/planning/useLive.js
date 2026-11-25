import { useEffect, useState } from 'react';

// Blir true litt etter første visning. Brukes til å la bare NYE listeelementer gli inn,
// ikke alt som allerede finnes når siden lastes.
export function useLive(delay = 600) {
  const [live, setLive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLive(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return live;
}
