import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { kveld, praktisk } from './src/content.js';
import { buildIcs } from './src/ics.js';

// Legger ut /juleverksted.ics (kalenderfil) laget fra content.js, både i dev og i bygget.
// En ekte fil fungerer bedre på iPhone enn en data-lenke.
function calendarFile() {
  const ics = () => buildIcs({
    tittel: kveld.tittel, start: kveld.start, adresse: praktisk.adresse, beskrivelse: kveld.velkomst,
    url: 'https://jul-e-verk-sted.vercel.app',
  });
  return {
    name: 'kalenderfil',
    configureServer(server) {
      server.middlewares.use('/juleverksted.ics', (_req, res) => {
        res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
        res.end(ics());
      });
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'juleverksted.ics', source: ics() });
    },
  };
}

export default defineConfig({
  plugins: [react(), calendarFile()],
  server: { host: true },
});
