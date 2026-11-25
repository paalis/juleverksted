// KUN UTVIKLING (npm run dev). Fjernes fra produksjonsbygget.
// Stresstest etter break-ui: åpne /?data=verst eller /?data=tom.
// Dataene går inn samme vei som ekte data: gjestelisten i content.js og den lokale databasen.
import { par } from '../content.js';

const NAVN = [
  ['Aleksandra Wiśniewska-Kowalczyk', 'Bartholomew Fitzgerald'],
  ['Jo', 'Bo'],
  ['Marie-Thérèse', 'Hans Christian Ødegård-Bjørnstad'],
  ['Kristoffer', ''],
];

export async function applyWorstCase() {
  const mode = new URLSearchParams(window.location.search).get('data');
  if (mode !== 'verst' && mode !== 'tom') return;

  const { storeCode } = await import('../data/code.js');
  const { tilgang } = await import('../content.js');
  // Koden er bare kjent som hash, så testmodus bruker hashen direkte.
  const key = `juleverksted.lokal.${tilgang.kodeHash}`;
  storeCode('PEPPERKAKE11');

  if (mode === 'tom') {
    localStorage.setItem(key, JSON.stringify({}));
    return;
  }
  par.forEach((p, i) => { p.navn = NAVN[i] || p.navn; });

  const now = Date.now();
  const bringlist = {};
  const ting = [
    'Hjemmelaget gløgg uten alkohol, helst den med kardemomme og appelsinskall fra i fjor, minst to liter',
    'Limpistol',
    'X',
    'Ekstra skjøteledning (5 m) til limpistolene på kjøkkenet',
    'Bånd',
    'Saks',
    'Glutenfrie pepperkaker fra bakeriet på hjørnet',
    'Ståltråd',
    'Lys',
    'Sukkertøy',
    'Melis',
    'Servietter med nisser',
    'Kaffe',
    'Kakebokser til å ta med husene hjem i',
  ];
  ting.forEach((t, i) => {
    bringlist[`egen${i}`] = { tekst: t, tarMed: i % 3 === 0 ? par[i % 4].id : '', egen: true, opprettet: now + i };
  });
  bringlist['forslag-mandler-og-rosiner'] = { tekst: 'Mandler og rosiner', tarMed: par[0].id, egen: false, opprettet: 1 };

  const rsvp = {
    [par[0].id]: { status: 'kommer', allergier: 'Nøtter (alvorlig, også spor av nøtter), laktoseintoleranse, vegetar på hverdager men spiser ribbe på jul. Ingen koriander takk!', oppdatert: now },
    [par[1].id]: { status: 'kommer-ikke', allergier: '', oppdatert: now },
    [par[2].id]: { status: 'vet-ikke', allergier: 'Glutenfri', oppdatert: now },
  };
  const polls = {
    'verksted-3': { stemmer: { [par[0].id]: 'julekort', [par[1].id]: 'julekort', [par[2].id]: 'nei', [par[3].id]: 'julekort' } },
  };
  const todos = {};
  ['Kjøpe stearinlys', 'Hente ekstra stoler hos naboen og huske å levere dem tilbake søndag', 'Bake pepperkakevegger (4 hus × 6 deler)', 'Strykeduk', 'Lage spilleliste', 'Kjøpe melis', 'Vaske gulv', 'Kjøle ned gløgg', 'Fyre i peisen', 'Rydde gang']
    .forEach((t, i) => { todos[`t${i}`] = { tekst: t, ferdig: i % 4 === 0, opprettet: now + i }; });

  localStorage.setItem(key, JSON.stringify({ bringlist, rsvp, polls, todos }));
}
