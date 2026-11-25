// Felles grensesnitt for delt data. Velger Firebase når firebase-config.js er fylt ut,
// ellers en lokal variant som lagrer i nettleseren (og synker live mellom faner).
//
//   store.subscribe(samling, cb)   cb får [{ id, ...data }] ved hver endring
//   store.set(samling, id, data)
//   store.merge(samling, id, delvisData)
//   store.setField(samling, id, felt, underfelt, verdi)   verdi null = slett feltet
//   store.remove(samling, id)
import { firebaseConfig } from '../firebase-config.js';
import { createLocalStore } from './local.js';

// VITE_EMULATOR=1 npm run dev  → bruker den lokale Firestore-emulatoren (port 8080).
export const useEmulator = Boolean(import.meta.env.DEV && import.meta.env.VITE_EMULATOR);
export const firebaseEnabled = Boolean(firebaseConfig && firebaseConfig.apiKey) || useEmulator;

export async function createStore(space) {
  if (!/^[0-9a-f]{64}$/.test(space)) throw new Error('Ugyldig kode.');
  if (!firebaseEnabled) return createLocalStore(space);
  const { createFirebaseStore } = await import('./firebase.js');
  return createFirebaseStore(space);
}
