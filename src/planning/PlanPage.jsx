import { useState } from 'react';
import { par, avstemminger } from '../content.js';
import { coupleName } from '../util.js';
import { Icon, Ornament } from '../components/Icons.jsx';
import { firebaseEnabled } from '../data/store.js';
import Rsvp from './Rsvp.jsx';
import Bring from './Bring.jsx';
import Polls from './Polls.jsx';
import Todos from './Todos.jsx';
import Program from './Program.jsx';

function Gate({ onUnlock }) {
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const ok = await onUnlock(code);
    setBusy(false);
    if (!ok) setMsg('Koden stemmer ikke. Sjekk invitasjonen og prøv igjen.');
  };

  return (
    <form className="gate" onSubmit={submit}>
      <label htmlFor="kode">Koden fra invitasjonen</label>
      <div className="gate__row">
        <input
          id="kode"
          type="text"
          value={code}
          autoComplete="off"
          autoCapitalize="characters"
          autoCorrect="off"
          spellCheck="false"
          enterKeyHint="go"
          aria-describedby="kode-msg"
          aria-invalid={Boolean(msg)}
          onChange={(e) => { setCode(e.target.value); setMsg(''); }}
        />
        <button className="btn btn--light" type="submit" disabled={busy || code.trim().length < 6}>
          Åpne
        </button>
      </div>
      <p id="kode-msg" className="gate__msg" role="status">{msg}</p>
    </form>
  );
}

function Section({ id, title, intro, children }) {
  return (
    <section className="section" aria-labelledby={id}>
      <div className="wrap">
        <header className="section__head">
          <Ornament />
          <h2 id={id}>{title}</h2>
          {intro && <p>{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

// Steg 2 etter koden: velg hvem dere er. Valget huskes på enheten, og styrer hva
// dere kan endre (bare deres egen påmelding).
function WhoAreYou({ setMe }) {
  return (
    <div className="who">
      <p className="who__q">Hvem er dere?</p>
      <ul className="who__list">
        {par.map((p) => (
          <li key={p.id}>
            <button type="button" className="who__btn" onClick={() => setMe(p.id)}>
              <span className="who__names">{coupleName(p)}</span>
              {p.vert && <span className="who__host">Vertskap</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PlanPage({ unlocked, onUnlock, onLock, me, setMe, store, data }) {
  const errors = Object.values(data).map((d) => d.error).filter(Boolean);
  const meCouple = par.find((p) => p.id === me);
  const ready = unlocked && meCouple;
  return (
    <>
      <section className={`hero hero--compact on-dark ${ready ? '' : 'hero--fill'}`} aria-labelledby="plan-tittel">
        <div className="plan-intro">
          <h1 id="plan-tittel">{ready ? `Hei, ${coupleName(meCouple)}!` : 'Planlegging'}</h1>
          {!unlocked && (
            <>
              <p>Her svarer dere på invitasjonen og avtaler hvem som tar med hva. Skriv inn koden fra invitasjonen, så husker telefonen den.</p>
              <Gate onUnlock={onUnlock} />
            </>
          )}
          {unlocked && !meCouple && (
            <>
              <p>Velg hvem dere er, så svarer dere bare for dere selv. Telefonen husker valget.</p>
              <WhoAreYou setMe={setMe} />
            </>
          )}
          {ready && (
            <>
              <p>
                Alt dere endrer her, ser de andre med en gang.{' '}
                <button type="button" className="link-btn" onClick={() => setMe('')}>Ikke dere? Bytt par</button>
              </p>
              <nav className="plan-nav" aria-label="Snarveier">
                <a href="#svar">Påmelding</a>
                <a href="#forslag">Programforslag</a>
                <a href="#ta-med">Hvem tar med hva</a>
                {avstemminger.length > 0 && <a href="#stem">Avstemming</a>}
                <a href="#husk">Huskeliste</a>
              </nav>
              {!firebaseEnabled && (
                <p className="mode-note">Testmodus: lagres bare i denne nettleseren til Firebase er satt opp.</p>
              )}
            </>
          )}
        </div>
      </section>

      {ready && (
        <main id="innhold">
          {errors.length > 0 && (
            <div className="wrap"><p className="panel-error" role="alert">{errors[0].message}</p></div>
          )}
          <Section id="svar" title="Påmelding" intro="Svar for dere selv. Allergier lagres når dere slutter å skrive.">
            <Rsvp docs={data.rsvp.docs} me={me} store={store} />
          </Section>
          <Section id="forslag" title="Programforslag" intro="Aktiviteter, mat eller drikke: foreslå det dere har lyst til, og stjernemerk de andres forslag. Det som får flest stjerner, havner i programmet og på menyen.">
            <Program docs={data.program.docs} me={me} store={store} />
          </Section>
          <Section id="ta-med" title="Hvem tar med hva" intro="Kryss av for det dere tar med, eller legg til noe nytt.">
            <Bring docs={data.bringlist.docs} me={me} store={store} />
          </Section>
          {avstemminger.length > 0 && (
            <Section id="stem" title="Avstemming" intro="Noen små valg vi tar sammen.">
              <Polls docs={data.polls.docs} me={me} store={store} />
            </Section>
          )}
          <Section id="husk" title="Vertens huskeliste" intro="Små og store ting som må ordnes før fredag.">
            <Todos docs={data.todos.docs} store={store} />
          </Section>
          <footer className="footer">
            <button type="button" className="btn btn--quiet btn--small" onClick={onLock}>
              <Icon name="lås" size={18} /> Logg ut på denne enheten
            </button>
          </footer>
        </main>
      )}
    </>
  );
}
