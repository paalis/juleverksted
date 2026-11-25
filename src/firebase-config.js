// Firebase-konfigurasjon for nettsiden.
//
// Hent verdiene i Firebase-konsollen: Prosjektinnstillinger (tannhjulet) → Generelt →
// «Dine apper» → Nettapp (</>) → «SDK-oppsett og konfigurasjon» → Config.
//
// Verdiene er ikke hemmelige (de sendes uansett til nettleseren). Tilgangen styres av
// sikkerhetsreglene i firestore.rules.
//
// Så lenge apiKey er tom, lagres alt bare lokalt i nettleseren (fint til testing).
export const firebaseConfig = {
  apiKey: '',
  authDomain: 'DITT-PROSJEKT.firebaseapp.com',
  projectId: 'DITT-PROSJEKT',
  storageBucket: 'DITT-PROSJEKT.firebasestorage.app',
  messagingSenderId: '000000000000',
  appId: '1:000000000000:web:0000000000000000',
};
