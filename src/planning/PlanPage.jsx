import { useState } from 'react';
import { par } from '../content.js';
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

export default function PlanPage({ unlocked, onUnlock, onLock, me, setMe, store, data }) {
  const errors = Object.values(data).map((d) => d.error).filter(Boolean);
  return (
    <>
      <section className="hero hero--compact on-dark" aria-labelledby="plan-tittel">
        <div className="plan-intro">
          <h1 id="plan-tittel">Planlegging</h1>
          {!unlocked ? (
            <>
              <p>Her svarer dere på invitasjonen og avtaler hvem som tar med hva. Skriv inn koden fra invitasjonen, så husker telefonen den.</p>
              <Gate onUnlock={onUnlock} />
            </>
          ) : (
            <>
              <p>Alt dere endrer her, ser de andre med en gang.</p>
              <div className="whoami">
                <label htmlFor="hvem">Vi er</label>
                <select id="hvem" value={me} onChange={(e) => setMe(e.target.value)}>
                  <option value="">Velg par</option>
                  {par.map((p) => <option key={p.id} value={p.id}>{coupleName(p)}</option>)}
                </select>
              </div>
              <nav className="plan-nav" aria-label="Snarveier">
                <a href="#svar">Påmelding</a>
                <a href="#forslag">Programforslag</a>
                <a href="#ta-med">Hvem tar med hva</a>
                <a href="#stem">Avstemming</a>
                <a href="#husk">Huskeliste</a>
              </nav>
              {!firebaseEnabled && (
                <p className="mode-note">Testmodus: lagres bare i denne nettleseren til Firebase er satt opp.</p>
              )}
            </>
          )}
        </div>
      </section>

      {unlocked && (
        <main id="innhold">
          {errors.length > 0 && (
            <div className="wrap"><p className="panel-error" role="alert">{errors[0].message}</p></div>
          )}
          <Section id="svar" icon="kort" title="Påmelding" intro="Svar for dere selv. Allergier lagres når dere slutter å skrive.">
            <Rsvp docs={data.rsvp.docs} me={me} store={store} />
          </Section>
          <Section id="forslag" title="Programforslag" intro="Foreslå det dere har lyst til, og stjernemerk de andres forslag. Det som får flest stjerner, setter vi inn i programmet.">
            <Program docs={data.program.docs} me={me} store={store} />
          </Section>
          <Section id="ta-med" icon="veske" title="Hvem tar med hva" intro="Kryss av for det dere tar med, eller legg til noe nytt.">
            <Bring docs={data.bringlist.docs} me={me} store={store} />
          </Section>
          <Section id="stem" icon="stjerne" title="Avstemming" intro="Noen små valg vi tar sammen.">
            <Polls docs={data.polls.docs} me={me} store={store} />
          </Section>
          <Section id="husk" icon="sjekk" title="Vertens huskeliste" intro="Små og store ting som må ordnes før fredag.">
            <Todos docs={data.todos.docs} store={store} />
          </Section>
          <footer className="footer">
            <button type="button" className="btn btn--quiet btn--small" onClick={onLock}>
              <Icon name="lås" size={18} /> Glem koden på denne enheten
            </button>
          </footer>
        </main>
      )}
    </>
  );
}
