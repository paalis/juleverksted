// ─────────────────────────────────────────────────────────────────────────────
//  Alt innhold på siden ligger her. Endre tekstene, lagre, og deploy på nytt.
//  Du trenger ikke røre noe annet. Ting i [HAKEPARENTES] er plassholdere.
// ─────────────────────────────────────────────────────────────────────────────

export const tilgang = {
  // SHA-256 av tilgangskoden (ikke selve koden). Lag en ny med:
  //   npm run hash-kode -- NYKODE
  // Nåværende kode: PREJULESANG
  kodeHash: '3c57eb0f20fee34500977a316319af79b511749092c35a6f090a0ff04fae4ce8',
};

export const kveld = {
  tittel: 'Juleverksted',
  // Dato og starttid styrer nedtellingen. Format: ÅÅÅÅ-MM-DDTTT:MM (norsk tid).
  start: '2026-12-11T19:00',
  datoTekst: 'Fredag 11. desember',
  tidTekst: 'kl. 19.00',
  velkomst:
    'Nissen har meldt fra om akutt mangel på verkstedhjelpere, og vi har sagt ja på vegne av dere alle. Ingen fagbrev kreves, og forkle er frivillig. Det eneste vi kan love, er glitter på steder dere ikke visste fantes.',
};

export const praktisk = {
  adresse: 'Huldervegen 65',
  adresseNotat: 'Ring på, så åpner vi.',
  // Kartlenke og kalenderfil vises automatisk når adressen er fylt ut.
  // Om drikke. Vises øverst i «Praktisk».
  drikke: 'Det blir gløgg og rødvin, og noe alkoholfritt til sjåførene. Erfaringen tilsier at kransene blir penere for hvert glass, i hvert fall i våre egne øyne.',
  taMed: 'Bare dere selv og godt humør. Har dere krysset av for noe under «Hvem tar med hva», så ta med det også.',
  kjaeledyr: 'Vi har ingen kjæledyr, så allergikere kan puste lettet ut.',
};

// Programmet er ikke spikret: gjestene foreslår og stemmer under Planlegging.
// Her står bare det som ligger fast. Forslag som krysses av som «med i programmet»
// legges inn i tidslinjen automatisk, sortert etter klokkeslett.
export const programFast = [
  { tid: '19.00', tittel: 'Vi tar imot dere', tekst: 'Gløgg med og uten alkohol, mandler og rosiner.' },
];

// Typer programforslag (brukes i skjemaet og som merkelapp).
export const programTyper = [
  { id: 'verksted', tekst: 'Verksted' },
  { id: 'mat', tekst: 'Mat og drikke' },
  { id: 'kos', tekst: 'Kos og lek' },
  { id: 'annet', tekst: 'Annet' },
];

// Idéer til verksteder. Vises som inspirasjon, og kan foreslås til programmet med ett trykk.
// «ikon» kan være: krans, hus, kort, stjerne, gran.
export const aktiviteter = [
  {
    ikon: 'krans',
    tittel: 'Adventskrans',
    tekst: 'En enkel krans av gran, mose og fire lys. Vi har halmringer og ståltråd til alle.',
  },
  {
    ikon: 'hus',
    tittel: 'Pepperkakehus',
    tekst: 'Hvert par bygger ett hus. Vi stiller med ferdig stekte vegger og melisglasur.',
  },
  {
    ikon: 'kort',
    tittel: 'Julekort',
    tekst: 'For dem som vil ha en rolig stund: stempler, akvarell og fint papir.',
  },
];

// Maten er like uskrevet som programmet. Dette er bare idéer: gjestene foreslår og
// stemmer under Planlegging (type «Mat og drikke»), og det som velges vises på forsiden.
export const meny = {
  ingress: 'Menyen er like uskrevet som programmet. Her er noen idéer å tygge på. Foreslå gjerne egne, og stem frem favorittene.',
  ideer: [
    { navn: 'Gløgg og pepperkaker', tekst: 'Klassikeren som får hendene i gang.' },
    { navn: 'Ribbe eller nøttestek', tekst: 'Eller noe helt annet, hvis dere heller vil ha det.' },
    { navn: 'Fingermat mens vi jobber', tekst: 'Noe man kan spise med glitter på fingrene.' },
    { navn: 'Riskrem', tekst: 'Med rød saus, og én mandel til den heldige.' },
    { navn: 'Kaffe og sju slag', tekst: 'Eller tre slag og god samvittighet.' },
  ],
  allergiNotat: 'Allergier og preferanser skriver dere i påmeldingen, så tar vi hensyn uansett hva vi ender opp med.',
};

// Gjestelisten (bare fornavn, siden er åpen for alle med lenken). «id» brukes i databasen. Ikke endre id etter at folk har svart.
export const par = [
  { id: 'vert', navn: ['Pål André', 'Ingrid'], vert: true },
  { id: 'par-2', navn: ['Sander', 'Kristina'] },
  { id: 'par-3', navn: ['Bjørn-Terje', 'Camilla'] },
  { id: 'par-4', navn: ['Eivind', 'Eirill'] },
];

// Forslag i «Hvem tar med hva». Gjestene kan legge til flere selv.
export const taMedForslag = [
  'Gløgg (alkoholfri)',
  'Mandler og rosiner',
  'Ekstra limpistol',
  'Godteri til pepperkakehus',
  'Gran og mose til kransene',
  'Stearinlys til kransene',
  'Småkaker til kaffen',
];

// Avstemminger (valgfritt). Tom liste skjuler seksjonen. Hvert par har én stemme.
// (Programmet stemmes over for seg, under «Programforslag».)
export const avstemminger = [
  // Eksempel:
  // { id: 'musikk', sporsmal: 'Hva skal stå på?', valg: [{ id: 'norsk', tekst: 'Norske julesanger' }, { id: 'jazz', tekst: 'Julejazz' }] },
]
