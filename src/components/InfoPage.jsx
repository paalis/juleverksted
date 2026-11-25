import { kveld, praktisk, programFast, programTyper, aktiviteter, meny, par } from '../content.js';
import { coupleName, mapUrl, timeKey, plural } from '../util.js';
import { Icon, Garland, Sparkle, Ornament } from './Icons.jsx';
import Snow from './Snow.jsx';
import Countdown from './Countdown.jsx';
import { StatusBadge } from './StatusBadge.jsx';
import { AdventCandles, CalendarLeaf, LukeDoor, Bow, GiftTag } from './Festive.jsx';

function SectionHead({ id, title, children }) {
  return (
    <header className="section__head">
      <Ornament />
      <h2 id={id}>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  );
}

const SPARKLES = [
  { left: '6%', top: '34%', size: 12 },
  { left: '90%', top: '24%', size: 15 },
  { left: '84%', top: '74%', size: 9 },
];

export function Hero() {
  return (
    <section className="hero on-dark" aria-labelledby="tittel">
      <Snow />
      <div className="invite">
        <Garland className="invite__garland" />
        <div className="invite__title">
          {SPARKLES.map((s, i) => (
            <Sparkle key={i} size={s.size} className="sparkle" style={{ left: s.left, top: s.top, '--i': i }} />
          ))}
          <p className="invite__kicker">Velkommen til</p>
          <h1 id="tittel">{kveld.tittel}</h1>
        </div>
        <AdventCandles />
        <div className="invite__dates">
          <CalendarLeaf />
          <LukeDoor><Countdown /></LukeDoor>
        </div>
        <p className="invite__welcome">{kveld.velkomst}</p>
        <div className="invite__actions">
          <a className="btn btn--light" href="/planlegging">Svar på invitasjonen</a>
          <a className="btn btn--ghost" href="#program">Se kvelden</a>
        </div>
        <Bow className="invite__bow" />
      </div>
    </section>
  );
}

const typeName = (id) => programTyper.find((t) => t.id === id)?.tekst || '';
const votes = (f) => Object.keys(f.stemmer || {}).length;

function Program({ forslag }) {
  const valgt = (forslag || []).filter((f) => f.valgt);
  const timeline = [
    ...programFast.map((p) => ({ ...p, fast: true })),
    ...valgt.map((f) => ({ tid: f.tid, tittel: f.tittel, tekst: f.tekst, id: f.id })),
  ].sort((a, b) => timeKey(a.tid).localeCompare(timeKey(b.tid)));
  const populære = (forslag || [])
    .filter((f) => !f.valgt && votes(f) > 0)
    .sort((a, b) => votes(b) - votes(a) || a.opprettet - b.opprettet)
    .slice(0, 3);

  return (
    <section className="section section--dark on-dark" aria-labelledby="program">
      <div className="wrap">
        <SectionHead id="program" title="Kvelden">
          Programmet lager vi sammen. Foreslå det dere har lyst til, og stem på de andres forslag.
        </SectionHead>
        <ol className="timeline">
          {timeline.map((p) => (
            <li key={p.id || p.tid + p.tittel}>
              {p.tid ? <time>{p.tid.replace(':', '.')}</time> : <time aria-label="Tid ikke satt">–</time>}
              <div className="timeline__body">
                <h3>{p.tittel}</h3>
                {p.tekst && <p>{p.tekst}</p>}
              </div>
            </li>
          ))}
          <li className="timeline__open">
            <time aria-hidden="true">…</time>
            <div className="timeline__body">
              <h3>Resten bestemmer vi sammen</h3>
              <p>{valgt.length ? `${plural(valgt.length, 'forslag', 'forslag')} er med så langt.` : 'Ingen forslag er valgt ennå.'}</p>
            </div>
          </li>
        </ol>

        {populære.length > 0 && (
          <div className="popular">
            <h3>Flest stemmer akkurat nå</h3>
            <ul>
              {populære.map((f) => (
                <li key={f.id}>
                  <span className="popular__title">{f.tittel}</span>
                  <span className="popular__meta">{typeName(f.type)}</span>
                  <span className="popular__votes">
                    <Icon name="stjerne" size={14} /> {votes(f)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="section__cta">
          <a className="btn btn--light" href="/planlegging#forslag">
            <Icon name="pluss" size={18} /> Foreslå noe til kvelden
          </a>
        </div>
      </div>
    </section>
  );
}

function Mat({ forslag }) {
  const mat = (forslag || []).filter((f) => f.type === 'mat');
  const valgt = mat.filter((f) => f.valgt).sort((a, b) => timeKey(a.tid).localeCompare(timeKey(b.tid)));
  const populære = mat.filter((f) => !f.valgt && votes(f) > 0).sort((a, b) => votes(b) - votes(a)).slice(0, 3);
  const showIdeas = valgt.length === 0;

  return (
    <section className="section" aria-labelledby="mat">
      <div className="wrap">
        <SectionHead id="mat" title="Mat og drikke">{meny.ingress}</SectionHead>
        <div className={`card menu ${showIdeas ? 'menu--draft' : ''}`}>
          <p className="menu__stamp">{showIdeas ? 'Idéer, ikke bestemt' : 'På bordet så langt'}</p>
          <ul>
            {showIdeas
              ? meny.ideer.map((r) => (
                <li key={r.navn}>
                  <h3>{r.navn}</h3>
                  {r.tekst && <p>{r.tekst}</p>}
                </li>
              ))
              : valgt.map((f) => (
                <li key={f.id}>
                  <h3>{f.tittel}</h3>
                  {f.tekst && <p>{f.tekst}</p>}
                </li>
              ))}
          </ul>
          {populære.length > 0 && (
            <div className="menu__votes">
              <p>Flest stjerner blant forslagene:</p>
              <ul>
                {populære.map((f) => (
                  <li key={f.id}>
                    {f.tittel} <span><Icon name="stjerne" size={13} /> {votes(f)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="section__cta">
          <a className="btn" href="/planlegging#forslag">
            <Icon name="bestikk" size={18} /> Foreslå mat eller drikke
          </a>
        </div>
        <p className="menu__note">
          {meny.allergiNotat} <a href="/planlegging#svar">Gå til påmeldingen.</a>
        </p>
      </div>
    </section>
  );
}

export default function InfoPage({ rsvps, forslag, heroKey, onShowLetter }) {
  const kart = mapUrl(praktisk.adresse);
  return (
    <>
      <Hero key={heroKey} />
      <main id="innhold">
        <section className="section" aria-labelledby="praktisk">
          <div className="wrap wrap--ticket">
            <SectionHead id="praktisk" title="Praktisk" />
            <div className="ticket">
              <div className="ticket__stub">
                <p className="ticket__label">Her er vi</p>
                <p className="ticket__address">{praktisk.adresse}</p>
                {praktisk.veibeskrivelse && (
                  <div className="tale">
                    <div className="tale__side tale__side--l" aria-hidden="true">
                      <Icon name="troll" size={38} />
                      <Icon name="bro" size={38} />
                    </div>
                    <p className="ticket__tale">{praktisk.veibeskrivelse}</p>
                    <div className="tale__side tale__side--r" aria-hidden="true">
                      <Icon name="bukk" size={38} />
                      <Icon name="krone" size={38} />
                    </div>
                  </div>
                )}
                <p className="ticket__note">{praktisk.adresseNotat}</p>
                <div className="ticket__actions">
                  {kart && (
                    <a className="btn btn--small" href={kart} target="_blank" rel="noreferrer">
                      <Icon name="sted" size={18} /> Åpne i kart
                    </a>
                  )}
                  <a className="btn btn--quiet btn--small" href="/juleverksted.ics" download="juleverksted.ics">
                    <Icon name="kalender" size={18} /> Legg i kalender
                  </a>
                </div>
              </div>
              <dl className="ticket__body facts">
                <div className="fact">
                  <Icon name="glass" />
                  <dt>I glasset</dt>
                  <dd>{praktisk.drikke}</dd>
                </div>
                <div className="fact">
                  <Icon name="veske" />
                  <dt>Ta med</dt>
                  <dd>{praktisk.taMed}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <Program forslag={forslag} />

        <section className="section" aria-labelledby="lager">
          <div className="wrap wrap--wide">
            <SectionHead id="lager" title="Idéer til verksteder">
              Noen forslag for å komme i gang. Liker dere en av dem, så stem den frem under Planlegging.
            </SectionHead>
            <ul className="activities">
              {aktiviteter.map((a) => (
                <li key={a.tittel} className="recipe">
                  <span className="recipe__tape" aria-hidden="true" />
                  <span className="activity__icon"><Icon name={a.ikon} size={28} /></span>
                  <h3>{a.tittel}</h3>
                  <p>{a.tekst}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Mat forslag={forslag} />

        <section className="section" aria-labelledby="gjester">
          <div className="wrap">
            <SectionHead id="gjester" title="Hvem kommer" />
            <ul className="tags">
              {par.map((p, i) => (
                <GiftTag key={p.id} i={i} host={p.vert} badge={rsvps && <StatusBadge status={rsvps[p.id]?.status} />}>
                  {coupleName(p)}
                </GiftTag>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <footer className="footer">
        <Ornament />
        Vi gleder oss til å se dere.
        {onShowLetter && (
          <p className="footer__letter">
            <button type="button" className="link-btn link-btn--ink" onClick={onShowLetter}>Åpne brevet igjen</button>
          </p>
        )}
      </footer>
    </>
  );
}
