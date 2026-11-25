// Tilgangskoden gjøres om til en SHA-256-hash i nettleseren. Hashen er rotstien i
// databasen (spaces/{hash}/...), så selve koden lagres aldri noe sted på serveren.
import { tilgang } from '../content.js';

const CODE_KEY = 'juleverksted.kode';
// NB: Endrer du prefikset, peker koden til et nytt, tomt område i databasen.
const PREFIX = 'juleverksted:';

export function normalizeCode(code) {
  return String(code || '').trim().toUpperCase().replace(/\s+/g, '');
}

export async function hashCode(code) {
  const bytes = new TextEncoder().encode(PREFIX + normalizeCode(code));
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Returnerer hashen hvis koden stemmer, ellers null. */
export async function checkCode(code) {
  if (normalizeCode(code).length < 6) return null;
  const hash = await hashCode(code);
  return hash === tilgang.kodeHash ? hash : null;
}

export function readStoredCode() {
  try { return localStorage.getItem(CODE_KEY); } catch { return null; }
}

export function storeCode(code) {
  try {
    if (code) localStorage.setItem(CODE_KEY, normalizeCode(code));
    else localStorage.removeItem(CODE_KEY);
  } catch { /* privat modus o.l. */ }
}

const COUPLE_KEY = 'juleverksted.par';
export function readStoredCouple() {
  try { return localStorage.getItem(COUPLE_KEY) || ''; } catch { return ''; }
}
export function storeCouple(id) {
  try { id ? localStorage.setItem(COUPLE_KEY, id) : localStorage.removeItem(COUPLE_KEY); } catch { /* */ }
}
