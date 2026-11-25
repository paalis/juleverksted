// Firebase-konfigurasjon for nettsiden.
//
// Hent verdiene i Firebase-konsollen: Prosjektinnstillinger (tannhjulet) → Generelt →
// «Dine apper» → Nettapp (</>) → «SDK-oppsett og konfigurasjon» → Config.
//
// Verdiene er ikke hemmelige (de sendes uansett til nettleseren). Tilgangen styres av
// sikkerhetsreglene i firestore.rules.
//
// Så lenge apiKey er tom, lagres alt bare lokalt i nettleseren (fint til testing).
// Google Analytics er bevisst utelatt: siden er privat og trenger ingen sporing.
export const firebaseConfig = {
  apiKey: 'AIzaSyClqr4FTWdRju7_BA9vDIc8OJ2gEz2vkwM',
  authDomain: 'juleverksted-a88d3.firebaseapp.com',
  projectId: 'juleverksted-a88d3',
  storageBucket: 'juleverksted-a88d3.firebasestorage.app',
  messagingSenderId: '547466454580',
  appId: '1:547466454580:web:b4bc03a3d1c7072b6c4c61',
};
