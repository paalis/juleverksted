// ─────────────────────────────────────────────────────────────────────────────
//  Alt innhold på siden ligger her. Endre tekstene, lagre, og deploy på nytt.
//  Du trenger ikke røre noe annet. Ting i [HAKEPARENTES] er plassholdere.
// ─────────────────────────────────────────────────────────────────────────────

export const tilgang = {
  // SHA-256 av tilgangskoden (ikke selve koden). Lag en ny med:
  //   npm run hash-kode -- NYKODE
  // Nåværende kode: PEPPERKAKE11
  kodeHash: '655ebe99ecc561a8f235d5b59a4f38fe1cca7aecafd8d480e755840b14ed4e4a',
};

export const kveld = {
  tittel: 'Juleverksted',
  // Dato og starttid styrer nedtellingen. Format: ÅÅÅÅ-MM-DDTTT:MM (norsk tid).
  start: '2026-12-11T18:00', // [KLOKKESLETT] – bytt 18:00 til riktig tid
  datoTekst: 'Fredag 11. desember',
  tidTekst: 'kl. 18.00', // [KLOKKESLETT]
  velkomst:
    'Vi rydder spisebordet, setter frem lim, bånd og pepperkakedeig, og håper dere vil tilbringe en kveld med oss. Ingen trenger å være flinke med hendene. Det holder å komme sulten og i godt humør.',
};

export const praktisk = {
  adresse: '[ADRESSE]',
  adresseNotat: 'Ring på, så åpner vi.',
  // Kartlenke og kalenderfil vises automatisk når adressen er fylt ut.
  parkering: 'Det er plass til to biler i oppkjørselen. Ellers er det gratis gateparkering rett nedi gata.',
  taMed: [
    'Innesko eller tykke sokker',
    'Forkle hvis du har et du er glad i',
    'Det du har krysset av for under «Hvem tar med hva»',
  ],
  barn: '[JA/NEI] – f.eks. «Denne kvelden er bare for voksne. Barnevakt anbefales!»',
  kjaeledyr: '[JA/NEI] – f.eks. «Katten vår er hjemme, si fra hvis du er allergisk.»',
};

// Programmet er ikke spikret: gjestene foreslår og stemmer under Planlegging.
// Her står bare det som ligger fast. Forslag som krysses av som «med i programmet»
// legges inn i tidslinjen automatisk, sortert etter klokkeslett.
export const programFast = [
  { tid: '18.00', tittel: 'Vi tar imot dere', tekst: 'Gløgg med og uten alkohol, mandler og rosiner.' }, // [KLOKKESLETT]
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
    taMed: 'Hageklipper eller en god saks, og gjerne kongler eller tørkede appelsiner.',
  },
  {
    ikon: 'hus',
    tittel: 'Pepperkakehus',
    tekst: 'Hvert par bygger ett hus. Vi stiller med ferdig stekte vegger og melisglasur.',
    taMed: 'Godteri til pynt, og en flat plate eller et brett å bære huset hjem på.',
  },
  {
    ikon: 'kort',
    tittel: 'Julekort',
    tekst: 'For dem som vil ha en rolig stund: stempler, akvarell og fint papir.',
    taMed: 'Adresselisten din, hvis du vil skrive ferdig kortene med en gang.',
  },
];

export const meny = {
  ingress: 'Vi lager mat til alle. Skriv allergier og preferanser i påmeldingen, så tilpasser vi.',
  retter: [
    { navn: 'Gløgg og pepperkaker', tekst: 'Med og uten alkohol.' },
    { navn: 'Ribbe eller nøttestek', tekst: 'Med surkål, rødkål, poteter og tyttebær.' },
    { navn: 'Riskrem', tekst: 'Med rød saus, og én mandel til den heldige.' },
    { navn: 'Kaffe og sju slag', tekst: 'Bakt sammen med dere som har lyst.' },
  ],
  allergiNotat: 'Nøttestek og glutenfritt alternativ er med i planen. Si fra om alt annet.',
};

// Gjestelisten. «id» brukes i databasen. Ikke endre id etter at folk har svart.
export const par = [
  { id: 'vert', navn: ['[Fornavn]', '[Fornavn]'], vert: true },
  { id: 'par-2', navn: ['[Fornavn]', '[Fornavn]'] },
  { id: 'par-3', navn: ['[Fornavn]', '[Fornavn]'] },
  { id: 'par-4', navn: ['[Fornavn]', '[Fornavn]'] },
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

// Andre avstemminger. Hvert par har én stemme per avstemming og kan endre den.
// (Programmet stemmes over for seg, under «Programforslag».)
export const avstemminger = [
  {
    id: 'dessert',
    sporsmal: 'Hva vil dere ha til dessert?',
    valg: [
      { id: 'riskrem', tekst: 'Riskrem' },
      { id: 'karamellpudding', tekst: 'Karamellpudding' },
      { id: 'multekrem', tekst: 'Multekrem' },
    ],
  },
  {
    id: 'musikk',
    sporsmal: 'Hva skal stå på i bakgrunnen?',
    valg: [
      { id: 'norsk', tekst: 'Norske julesanger' },
      { id: 'jazz', tekst: 'Rolig julejazz' },
      { id: 'pop', tekst: 'Julepop for full guffe' },
    ],
  },
];
