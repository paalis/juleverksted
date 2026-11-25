# Juleverksted

Info- og planleggingsside for juleverkstedet fredag 11. desember 2026.
React + Vite, deployet på Vercel, delt data i Firebase Firestore (uten innlogging).

- `/` – invitasjonen: nedtelling, praktisk info, program, aktiviteter, meny og gjesteliste.
- `/planlegging` – bak tilgangskoden: påmelding, hvem tar med hva, avstemming og vertens huskeliste. Alle ser endringer med en gang.

## Endre innholdet

Alt innhold ligger i **`src/content.js`**: dato og klokkeslett, velkomsttekst, adresse, parkering,
program, aktiviteter, meny, parene, forslag til «ta med» og avstemmingene. Endre tekstene og
deploy på nytt. Du trenger ikke røre noe annet.

Plassholdere som må fylles ut står i `[HAKEPARENTES]`:
`[KLOKKESLETT]` (både `start` og `tidTekst`), `[ADRESSE]`, `[JA/NEI]` for barn og kjæledyr, og `[Fornavn]` for parene.

Merk: `id` på parene og avstemmingene brukes i databasen. Ikke endre dem etter at folk har svart.

## Bytte tilgangskode

Koden lagres aldri i klartekst. Siden sjekker SHA-256-hashen av koden, og hashen er også stien i databasen.

```bash
npm run hash-kode -- NYKODE
```

Lim inn hashen i `tilgang.kodeHash` i `src/content.js` og deploy. Store og små bokstaver og mellomrom spiller ingen rolle.
Når du bytter kode, starter dere i et nytt, tomt område i databasen. Gjør det derfor før gjestene begynner å svare.

## Firebase-oppsett (én gang)

1. Gå til <https://console.firebase.google.com> → **Legg til prosjekt**. Google Analytics trengs ikke.
2. **Build → Firestore Database → Opprett database**. Velg **Production mode** og region **`europe-north1` (Finland)**,
   eventuelt `eur3` (multi-region Europa). Regionen kan ikke endres senere.
3. **Prosjektinnstillinger** (tannhjulet) → **Generelt** → «Dine apper» → **`</>` (Nettapp)**. Gi den et navn, men ikke velg Hosting.
   Kopier verdiene fra `firebaseConfig` inn i **`src/firebase-config.js`**.
4. Publiser sikkerhetsreglene, enten slik:
   - **Konsollen:** Firestore → **Regler**, lim inn hele `firestore.rules` og trykk **Publiser**, eller slik:
   - **CLI:**
     ```bash
     npm i -g firebase-tools
     ```
     ```bash
     firebase login
     ```
     ```bash
     firebase use --add
     ```
     ```bash
     firebase deploy --only firestore:rules
     ```
5. Deploy siden på nytt. Teksten «Testmodus» på planleggingssiden forsvinner når Firebase er koblet til.

Webkonfigurasjonen er ikke hemmelig. Tilgangen styres av reglene: bare stier under `spaces/{64 hex-tegn}` er åpne,
og bare med riktige felt og størrelser. Ingen kan liste opp innholdet uten å kjenne koden.

## Lokalt

```bash
npm install
```
```bash
npm run dev
```

Uten Firebase-konfig lagres alt i nettleseren, og live-oppdatering virker mellom faner. Mot Firestore-emulatoren:

```bash
firebase emulators:start --only firestore
```
```bash
VITE_EMULATOR=1 npm run dev
```

Stresstest med lange navn og mange poster (bare i dev-modus): `/planlegging?data=verst` eller `?data=tom`.
Det overskriver de lokale testdataene.

## Deploy

Vercel oppdager Vite automatisk (bygg: `npm run build`, ut: `dist`). `vercel.json` setter `noindex` og sender `/planlegging` til appen.
