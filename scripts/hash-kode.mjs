// Lager hashen for en ny tilgangskode.
// Bruk: npm run hash-kode -- NYKODE
// Lim inn resultatet i tilgang.kodeHash i src/content.js.
import { createHash } from 'node:crypto';

const raw = process.argv.slice(2).join(' ');
const code = raw.trim().toUpperCase().replace(/\s+/g, '');
if (code.length < 6) {
  console.error('Koden må ha minst 6 tegn. Eksempel: npm run hash-kode -- STJERNESKUDD');
  process.exit(1);
}
const hash = createHash('sha256').update(`juleverksted:${code}`).digest('hex');
console.log(`Kode: ${code}\nHash: ${hash}`);
