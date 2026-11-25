import { useEffect, useState } from 'react';

/** Live-abonnement på en samling. Gir { docs, error, loading }. */
export function useCollection(store, col) {
  const [state, setState] = useState({ docs: [], error: null, loading: true });
  useEffect(() => {
    if (!store) {
      setState({ docs: [], error: null, loading: false });
      return undefined;
    }
    setState((s) => ({ ...s, loading: true }));
    return store.subscribe(
      col,
      (docs) => setState({ docs, error: null, loading: false }),
      (error) => setState((s) => ({ ...s, error, loading: false })),
    );
  }, [store, col]);
  return state;
}
