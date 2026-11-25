import { kveld, praktisk, program, aktiviteter, meny, par } from '../content.js';
import { coupleName } from '../util.js';
import { Icon, GranKvist } from './Icons.jsx';
import Snow from './Snow.jsx';
import Countdown from './Countdown.jsx';
import { StatusBadge } from './StatusBadge.jsx';

function SectionHead({ id, icon, title, children }) {
  return (
    <header className="section__head">
      <Icon name={icon} size={26} />
      <h2 id={id}>{title}</h2>
      {children && <p>{children}</p>}
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero on-dark" aria-labelledby="tittel">
      <Snow />
      <div className="invite">
        <Icon name="stjerne" size={28} className="invite__star" />
        <h1 id="tittel">{kveld.tittel}</h1>
        <p className="invite__when">
          <span>{kveld.datoTekst}</span>
          <span>{kveld.tidTekst}</span>
        </p>
        <Countdown />
        <p className="invite__welcome">{kveld.velkomst}</p>
        <div className="invite__actions">
          <a className="btn btn--light" href="/planlegging">Svar på invitasjonen</a>
          <a className="btn btn--ghost" href="#program">Se programmet</a>
        </div>
        <GranKvist className="invite__sprig" />
      </div>
    </section>
  );
}

export default function InfoPage({ rsvps }) {
  return (
    <>
      <Hero />
      <main id="innhold">
        <section className="section" aria-labelledby="praktisk">
          <div className="wrap">
            <SectionHead id="praktisk" icon="gran" title="Praktisk" />
            <dl className="facts card">
              <div className="fact">
                <Icon name="sted" />
                <dt>Adresse</dt>
                <dd>{praktisk.adresse}<br />{praktisk.adresseNotat}</dd>
              </div>
              <div className="fact">
                <Icon name="bil" />
                <dt>Parkering</dt>
                <dd>{praktisk.parkering}</dd>
              </div>
              <div className="fact">
                <Icon name="veske" />
                <dt>Ta med</dt>
                <dd>
                  <ul>{praktisk.taMed.map((t) => <li key={t}>{t}</li>)}</ul>
                </dd>
              </div>
              <div className="fact">
                <Icon name="barn" />
                <dt>Barn</dt>
                <dd>{praktisk.barn}</dd>
              </div>
              <div className="fact">
                <Icon name="pote" />
                <dt>Kjæledyr</dt>
                <dd>{praktisk.kjaeledyr}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section" aria-labelledby="program">
          <div className="wrap">
            <SectionHead id="program" icon="stjerne" title="Kvelden" />
            <ol className="timeline">
              {program.map((p) => (
                <li key={p.tid + p.tittel}>
                  <time>{p.tid}</time>
                  <div className="timeline__body">
                    <h3>{p.tittel}</h3>
                    {p.tekst && <p>{p.tekst}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" aria-labelledby="lager">
          <div className="wrap wrap--wide">
            <SectionHead id="lager" icon="pepperkake" title="Dette lager vi" />
            <ul className="activities">
              {aktiviteter.map((a) => (
                <li key={a.tittel} className="card activity">
                  <Icon name={a.ikon} size={30} />
                  <h3>{a.tittel}</h3>
                  <p>{a.tekst}</p>
                  {a.taMed && (
                    <p className="activity__bring">
                      <strong>Ta med</strong>
                      {a.taMed}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" aria-labelledby="mat">
          <div className="wrap">
            <SectionHead id="mat" icon="bestikk" title="Mat og drikke">{meny.ingress}</SectionHead>
            <div className="card menu">
              <Icon name="stjerne" size={18} className="menu__ornament" />
              <ul>
                {meny.retter.map((r) => (
                  <li key={r.navn}>
                    <h3>{r.navn}</h3>
                    {r.tekst && <p>{r.tekst}</p>}
                  </li>
                ))}
              </ul>
            </div>
            <p className="menu__note">
              {meny.allergiNotat} <a href="/planlegging">Skriv det i påmeldingen.</a>
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="gjester">
          <div className="wrap">
            <SectionHead id="gjester" icon="hus" title="Hvem kommer" />
            <ul className="guests">
              {par.map((p) => (
                <li key={p.id} className="guest">
                  <span className="guest__names">
                    {coupleName(p)}
                    {p.vert && <span className="guest__host">Vertskap</span>}
                  </span>
                  {rsvps && <StatusBadge status={rsvps[p.id]?.status} />}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <footer className="footer">
        <Icon name="gran" />
        Vi gleder oss til å se dere.
      </footer>
    </>
  );
}
