import { useCallback, useEffect, useState } from 'react';
import InfoPage from './components/InfoPage.jsx';
import PlanPage from './planning/PlanPage.jsx';
import Envelope, { envelopeSeen, markEnvelope } from './components/Envelope.jsx';
import { Icon } from './components/Icons.jsx';
import { createStore } from './data/store.js';
import { checkCode, readStoredCode, storeCode, readStoredCouple, storeCouple } from './data/code.js';
import { useCollection } from './planning/useCollection.js';

const PLAN = '/planlegging';
const isPlan = () => window.location.pathname.replace(/\/$/, '') === PLAN;

// Enkel ruting uten bibliotek: /planlegging viser planleggingen, alt annet infosiden.
// Lenker til / og /planlegging fanges opp her, så siden ikke lastes på nytt.
function onNavClick(e) {
  const a = e.target.closest('a[href]');
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
  const url = new URL(a.href, window.location.href);
  if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
  if (url.pathname !== '/' && url.pathname !== PLAN) return;
  e.preventDefault();
  window.history.pushState({}, '', url.pathname + url.hash);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export default function App() {
  const [plan, setPlan] = useState(isPlan);
  const [store, setStore] = useState(null);
  const [me, setMeState] = useState(readStoredCouple);
  // Brevet vises første gang noen åpner forsiden (og når de ber om det igjen).
  const [letter, setLetter] = useState(() => !isPlan() && !envelopeSeen());
  const [heroKey, setHeroKey] = useState(0);
  const leavingLetter = () => { window.scrollTo(0, 0); setHeroKey((k) => k + 1); };
  const openedLetter = () => { markEnvelope(true); setLetter(false); };
  const showLetter = () => { markEnvelope(false); window.scrollTo(0, 0); setLetter(true); };

  useEffect(() => {
    const onPop = () => {
      setPlan(isPlan());
      const target = window.location.hash && document.getElementById(window.location.hash.slice(1));
      if (target) requestAnimationFrame(() => target.scrollIntoView());
      else window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onNavClick);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onNavClick);
    };
  }, []);

  const unlock = useCallback(async (code) => {
    const hash = await checkCode(code);
    if (!hash) return false;
    storeCode(code);
    setStore(await createStore(hash));
    return true;
  }, []);

  // Husket kode på enheten: lås opp automatisk.
  useEffect(() => {
    const saved = readStoredCode();
    if (saved) unlock(saved).then((ok) => { if (!ok) storeCode(null); });
  }, [unlock]);

  const lock = () => {
    storeCode(null);
    setMe('');
    store?.close();
    setStore(null);
  };

  const setMe = (id) => { setMeState(id); storeCouple(id); };

  const data = {
    rsvp: useCollection(store, 'rsvp'),
    bringlist: useCollection(store, 'bringlist'),
    polls: useCollection(store, 'polls'),
    todos: useCollection(store, 'todos'),
    program: useCollection(store, 'program'),
  };
  const rsvps = store ? Object.fromEntries(data.rsvp.docs.map((d) => [d.id, d])) : null;

  useEffect(() => { document.title = plan ? 'Planlegging – Juleverksted' : 'Juleverksted'; }, [plan]);

  return (
    <>
      {letter && !plan && <Envelope onLeave={leavingLetter} onOpened={openedLetter} />}
      <div className="page" inert={letter && !plan ? '' : undefined}>
      <a className="skip-link" href="#innhold">Hopp til innhold</a>
      <header className="topbar on-dark">
        <div className="wrap wrap--wide topbar__inner">
          <a className="topbar__brand" href="/">
            <Icon name="stjerne" size={18} /> <span>Juleverksted</span>
          </a>
          <nav aria-label="Hovedmeny">
            <a href="/" aria-current={plan ? undefined : 'page'}>Kvelden</a>
            <a href={PLAN} aria-current={plan ? 'page' : undefined}>Planlegging</a>
          </nav>
        </div>
      </header>
      {plan ? (
        <PlanPage unlocked={Boolean(store)} onUnlock={unlock} onLock={lock} me={me} setMe={setMe} store={store} data={data} />
      ) : (
        <InfoPage rsvps={rsvps} forslag={store ? data.program.docs : null} heroKey={heroKey} onShowLetter={showLetter} />
      )}
      </div>
    </>
  );
}
