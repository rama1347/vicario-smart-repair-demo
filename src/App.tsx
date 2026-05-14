import './App.css'
import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type FormEvent,
} from 'react'

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`

const workshopImage = assetUrl('vicario-workshop.png')
const publicEmail = 'info@vicario-smart-repair.de'
const phoneDisplay = '+49 157 76130545'
const phoneHref = 'tel:+4915776130545'
const mapsHref =
  'https://www.google.com/maps/search/?api=1&query=Neubr%C3%BCcker%20Ring%2050%2051109%20K%C3%B6ln'
const googleReviewsHref =
  'https://www.google.de/maps/place/Vicario+Smart-Repair/@50.9284952,7.0589737,17z/data=!4m8!3m7!1s0x47bf27a6148afcbd:0x7890ed1d06b10f75!8m2!3d50.9284952!4d7.0615486!9m1!1b1!16s%2Fg%2F11h54z6s1v'

const mailHref = `mailto:${publicEmail}?subject=${encodeURIComponent(
  'Schadenanfrage Vicario Smart-Repair',
)}&body=${encodeURIComponent(
  'Hallo Vicario Smart-Repair,\n\nich möchte einen Schaden einschätzen lassen.\n\nFahrzeugmodell:\nSchaden:\nRückrufnummer:\n\nFotos füge ich im Anhang hinzu.\n',
)}`

const trustMetrics = [
  {
    label: 'Google-Bewertung',
    value: '4,5 / 5',
    text: 'Viele Kunden loben Rückmeldung, Absprache und Ergebnis.',
  },
  {
    label: 'Kundenbewertungen',
    value: '50+',
    text: 'Erfahrungen von Kunden aus Köln und Umgebung.',
  },
  {
    label: 'Standort',
    value: 'Köln-Neubrück',
    text: 'Direkt am Neubrücker Ring.',
  },
  {
    label: 'Kontakt',
    value: 'Foto oder Anruf',
    text: 'Schaden zeigen oder direkt telefonisch klären.',
  },
]

const reviews = [
  {
    quote: 'Bin sehr zufrieden mit der Reparatur. Ein Mann ein Wort …',
    label: 'Öffentliche Google-Bewertung · 5 Sterne',
  },
  {
    quote: 'Hier wird einem schnell, kompetent und zum fairen Preis geholfen.',
    label: 'Öffentliche Google-Bewertung · 5 Sterne',
  },
  {
    quote: 'Sehr nette und hilfsbereite Werkstatt … Guter Service, gute Arbeiten.',
    label: 'Öffentliche Google-Bewertung · 5 Sterne',
  },
]

const reasons = [
  {
    title: 'Erst prüfen, dann entscheiden',
    text: 'Der Schaden wird zuerst eingeordnet, bevor Termin, Aufwand oder Reparaturweg feststehen.',
  },
  {
    title: 'Kosten vorher besprechen',
    text: 'Der mögliche Aufwand wird vor der Arbeit erklärt, damit keine unnötigen Reparaturen entstehen.',
  },
  {
    title: 'Smart-Repair für sichtbare Schäden',
    text: 'Kratzer, Dellen, Felgen und Parkschrammen werden gezielt geprüft und passend eingeordnet.',
  },
  {
    title: 'Mobilität nach Absprache',
    text: 'Wenn das Fahrzeug länger bleibt, wird vorher geklärt, welche Lösung möglich ist.',
  },
  {
    title: 'Samstags geöffnet',
    text: 'Praktisch für Kunden, die unter der Woche wenig Zeit für die Werkstatt haben.',
  },
  {
    title: 'Abgabe nach Absprache',
    text: 'Wenn es zeitlich eng ist, kann eine passende Abgabe vorher besprochen werden.',
  },
]

const services = [
  {
    title: 'Smart-Repair',
    text: 'Für kleine optische Schäden an Lack, Stoßfänger oder Karosserie, wenn eine gezielte Reparatur möglich ist.',
    details: ['Kratzer', 'kleine Dellen', 'Parkschrammen'],
  },
  {
    title: 'Lackkratzer & Parkschrammen',
    text: 'Kratzer und Parkschäden an Stoßfänger, Kotflügel oder Tür werden geprüft und verständlich erklärt.',
    details: ['Stoßfänger', 'Klarlack', 'Lackschäden'],
  },
  {
    title: 'Dellen & Beulen',
    text: 'Kleine Dellen und Beulen werden je nach Stelle, Lackzustand und Aufwand passend eingeordnet.',
    details: ['Tür', 'Kotflügel', 'Karosserie'],
  },
  {
    title: 'Felgenreparatur',
    text: 'Schrammen und optische Schäden an Felgen werden sauber aufbereitet, damit das Fahrzeug wieder gepflegt wirkt.',
    details: ['Bordsteinschäden', 'Oberfläche', 'Felgenbild'],
  },
  {
    title: 'Kfz-Reparatur',
    text: 'Diagnose, Wartung und Reparatur mit klarer Rückmeldung, bevor größere Arbeiten durchgeführt werden.',
    details: ['Diagnose', 'Wartung', 'Reparatur'],
  },
  {
    title: 'Aufbereitung & Fahrzeugdetails',
    text: 'Pflege, optische Details und dezente Anpassungen für ein sauberes, gepflegtes Fahrzeugbild.',
    details: ['Aufbereitung', 'Details', 'Optik'],
  },
]

const beforeAfter = [
  {
    title: 'Lackkratzer am Kotflügel',
    before: 'sichtbarer Kratzer im Lack',
    after: 'Oberfläche deutlich sauberer und gepflegter',
    beforeImage: assetUrl('vicario-before-after/scratch-before.jpg'),
    afterImage: assetUrl('vicario-before-after/scratch-after.jpg'),
  },
  {
    title: 'Felge aufbereitet',
    before: 'Felge vor der Aufbereitung',
    after: 'fertige Felge am Fahrzeug',
    beforeImage: assetUrl('vicario-before-after/wheel-before.jpg'),
    afterImage: assetUrl('vicario-before-after/wheel-after.jpg'),
  },
  {
    title: 'Parkschramme am Heck',
    before: 'sichtbare Lackspuren am Stoßfänger',
    after: 'ruhigeres, gepflegtes Heckbild',
    beforeImage: assetUrl('vicario-before-after/bumper-before.jpg'),
    afterImage: assetUrl('vicario-before-after/bumper-after.jpg'),
  },
]

const process = [
  {
    step: '01',
    title: 'Schaden fotografieren',
    text: 'Machen Sie ein Foto aus der Nähe und ein weiteres Foto mit etwas Abstand zum Fahrzeug.',
  },
  {
    step: '02',
    title: 'Anfrage senden',
    text: 'Senden Sie Fahrzeugmodell, kurze Beschreibung und Rückrufnummer für die erste Einordnung mit.',
  },
  {
    step: '03',
    title: 'Rückmeldung erhalten',
    text: 'Sie erhalten eine Rückmeldung, ob eine Reparatur möglich wirkt, ob Rückfragen offen sind oder ob ein Termin sinnvoll ist.',
  },
  {
    step: '04',
    title: 'Vor Ort prüfen lassen',
    text: 'Endgültig wird der Schaden am Fahrzeug beurteilt, bevor die Arbeit beginnt.',
  },
]

const localAreas = ['Neubrück', 'Brück', 'Merheim', 'Köln-Ost', 'Ostheim', 'Rath/Heumar']

const faqs = [
  {
    question: 'Welche Fotos soll ich für eine Anfrage senden?',
    answer:
      'Am besten ein Detailfoto vom Schaden und ein zweites Foto aus etwas Abstand. So erkennt die Werkstatt die Stelle am Fahrzeug besser.',
  },
  {
    question: 'Reicht ein Foto für einen festen Preis?',
    answer:
      'Ein Foto hilft für eine erste Einschätzung. Der endgültige Aufwand wird direkt am Fahrzeug geprüft, damit die Absprache fair bleibt.',
  },
  {
    question: 'Kann ich auch direkt anrufen?',
    answer:
      'Ja. Für schnelle Rückfragen oder kurzfristige Termine erreichen Sie Vicario Smart-Repair telefonisch unter +49 157 76130545.',
  },
  {
    question: 'Welche Schäden sind typisch für Smart-Repair?',
    answer:
      'Typisch sind kleine Lackkratzer, Parkschrammen, Dellen, Beulen, Felgenschäden und optische Schäden im sichtbaren Fahrzeugbereich.',
  },
  {
    question: 'Ist samstags geöffnet?',
    answer:
      'Ja. Samstags ist die Werkstatt von 10:00 bis 15:00 Uhr geöffnet.',
  },
  {
    question: 'Wo befindet sich die Werkstatt genau?',
    answer:
      'Vicario Smart-Repair befindet sich am Neubrücker Ring 50 in 51109 Köln, gut erreichbar aus Neubrück, Brück, Merheim und Köln-Ost.',
  },
  {
    question: 'Wie schnell bekomme ich eine Rückmeldung?',
    answer:
      'Anfragen werden so schnell wie möglich geprüft. Je klarer Fotos, Fahrzeugmodell und Beschreibung sind, desto schneller kann der nächste Schritt eingeschätzt werden.',
  },
  {
    question: 'Muss ich für die erste Einschätzung direkt vorbeikommen?',
    answer:
      'Für eine erste Einordnung reichen oft Fotos. Die endgültige Beurteilung erfolgt jedoch am Fahrzeug vor Ort.',
  },
  {
    question: 'Wann lohnt sich Smart-Repair nicht?',
    answer:
      'Wenn der Schaden zu groß, ungünstig gelegen oder technisch problematisch ist, wird das offen angesprochen. Dann wird ein anderer Reparaturweg empfohlen.',
  },
]

const footerServices = ['Smart-Repair', 'Felgenreparatur', 'Lackkratzer', 'Dellen & Beulen']

function App() {
  const [showMobileBar, setShowMobileBar] = useState(false)
  const [selectedFileCount, setSelectedFileCount] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    vehicle: '',
    damage: '',
    phone: '',
  })

  useEffect(() => {
    const handleScroll = () => setShowMobileBar(window.scrollY > 760)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const requestMailHref = useMemo(() => {
    const body = [
      'Hallo Vicario Smart-Repair,',
      '',
      'ich möchte einen Schaden einschätzen lassen.',
      '',
      `Name: ${formData.name || '-'}`,
      `Fahrzeugmodell: ${formData.vehicle || '-'}`,
      `Schaden: ${formData.damage || '-'}`,
      `Rückrufnummer: ${formData.phone || '-'}`,
      '',
      selectedFileCount > 0
        ? 'Fotos habe ich ausgewählt und füge sie im E-Mail-Fenster hinzu.'
        : 'Fotos füge ich im Anhang hinzu.',
    ].join('\n')

    return `mailto:${publicEmail}?subject=${encodeURIComponent(
      'Schadenanfrage Vicario Smart-Repair',
    )}&body=${encodeURIComponent(body)}`
  }, [formData, selectedFileCount])

  const updateField =
    (field: keyof typeof formData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((current) => ({ ...current, [field]: event.target.value }))
    }

  const handleRequestSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    window.location.href = requestMailHref
  }

  return (
    <main style={{ '--workshop-image': `url(${workshopImage})` } as CSSProperties}>
      <header className="site-header" aria-label="Hauptnavigation">
        <a className="brand" href="#top" aria-label="Vicario Smart-Repair Startseite">
          <span className="brand-mark">VS</span>
          <span className="brand-copy">
            <strong>Vicario</strong>
            <small>Smart-Repair</small>
          </span>
        </a>
        <nav>
          <a href="#vertrauen">Vertrauen</a>
          <a href="#leistungen">Leistungen</a>
          <a href="#arbeiten">Arbeiten</a>
          <a href="#anfrage">Anfrage</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="header-action" href="#anfrage" aria-label="Schadenanfrage öffnen">
          Schaden anfragen
        </a>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-shade" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">Kfz-Werkstatt in Köln-Neubrück</p>
            <h1>Kratzer, Dellen und Lackschäden sauber beheben lassen.</h1>
            <p className="hero-lead">
              Senden Sie ein Foto vom Schaden und erhalten Sie eine erste Rückmeldung – klar,
              direkt und ohne unnötiges Hin und Her.
            </p>
            <div className="hero-actions" aria-label="Kontaktoptionen">
              <a className="primary-button" href="#anfrage">
                Foto vom Schaden senden
              </a>
              <a className="secondary-button" href={phoneHref}>
                Direkt anrufen
              </a>
            </div>
            <div className="hero-proof" aria-label="Kurzinfos">
              <span>Google 4,5 / 5</span>
              <span>50+ Bewertungen</span>
              <span>Köln-Neubrück · Neubrücker Ring</span>
              <span>Samstags geöffnet</span>
            </div>
          </div>

          <aside className="hero-card" aria-label="Schnellkontakt">
            <p className="card-label">Schaden einschätzen lassen</p>
            <h2>Schaden zeigen. Nächsten Schritt klären.</h2>
            <dl>
              <div>
                <dt>Für eine schnelle Rückmeldung</dt>
                <dd>Foto vom Schaden, Fahrzeugmodell, kurze Beschreibung und Rückrufnummer.</dd>
              </div>
              <div>
                <dt>Telefon</dt>
                <dd>{phoneDisplay}</dd>
              </div>
              <div>
                <dt>Adresse</dt>
                <dd>Neubrücker Ring 50, 51109 Köln</dd>
              </div>
              <div>
                <dt>Öffnungszeiten</dt>
                <dd>Mo-Fr 10:00-19:00, Sa 10:00-15:00</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="trust-section" id="vertrauen" aria-label="Vertrauen und Bewertungen">
        <div className="trust-heading">
          <p className="section-label">Vertrauen</p>
          <h2>Erst verstehen, dann reparieren.</h2>
          <p>
            Bei Lack- und Karosserieschäden wollen Kunden vorher wissen, was möglich ist, welcher
            Aufwand entsteht und welcher nächste Schritt sinnvoll ist. Deshalb wird der Schaden
            verständlich besprochen, bevor die Arbeit beginnt.
          </p>
        </div>

        <div className="trust-metrics">
          {trustMetrics.map((item) => (
            <article className="metric-card" key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="review-heading">
          <h3>Aus Google-Bewertungen</h3>
          <p>Kurze Auszüge aus öffentlich sichtbaren Bewertungen.</p>
        </div>
        <div className="review-grid" aria-label="Auszüge aus Google-Bewertungen">
          {reviews.map((review) => (
            <article className="review-card" key={review.quote}>
              <p>„{review.quote}“</p>
              <span>{review.label}</span>
            </article>
          ))}
        </div>
        <a className="review-link" href={googleReviewsHref} target="_blank" rel="noreferrer">
          Weitere Bewertungen bei Google ansehen
        </a>
      </section>

      <section className="why-section" id="warum">
        <div className="section-copy">
          <p className="section-label">Warum Vicario?</p>
          <h2>Eine Werkstatt, die Schäden verständlich erklärt.</h2>
          <p>
            Bei sichtbaren Schäden zählt nicht nur das Ergebnis, sondern auch die Absprache davor.
            Sie erfahren, was möglich ist, was sich lohnt und welcher nächste Schritt sinnvoll ist.
          </p>
        </div>
        <div className="reason-grid" aria-label="Qualitätsmerkmale">
          {reasons.map((reason) => (
            <article className="reason-card" key={reason.title}>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-section" id="leistungen">
        <div className="section-heading">
          <p className="section-label">Leistungen</p>
          <h2>Hilfe bei Lackschäden, Dellen, Felgen und Fahrzeugdetails.</h2>
          <p>
            Der Schwerpunkt liegt auf sichtbaren Schäden, kleineren Reparaturen und gepflegten
            Fahrzeugdetails. Größere Arbeiten werden erst nach Prüfung und klarer Absprache
            eingeordnet.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>
                {service.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="before-after-section" id="arbeiten">
        <div className="section-heading compact">
          <p className="section-label">Arbeitsbeispiele</p>
          <h2>So können reparierte Fahrzeugdetails wieder aussehen.</h2>
          <p>
            Anhand echter Fahrzeugdetails sehen Sie direkt, wie Kratzer, Felgen oder Stoßfänger
            nach der Bearbeitung wieder wirken können.
          </p>
        </div>
        <div className="repair-grid">
          {beforeAfter.map((item) => (
            <article className="repair-card" key={item.title}>
              <h3>{item.title}</h3>
              <div className="repair-pair" aria-label={`${item.title} vorher und nachher`}>
                <figure className="repair-figure">
                  <img src={item.beforeImage} alt={`${item.title} vorher`} />
                  <figcaption>Vorher</figcaption>
                </figure>
                <figure className="repair-figure">
                  <img src={item.afterImage} alt={`${item.title} nachher`} />
                  <figcaption>Nachher</figcaption>
                </figure>
              </div>
              <div className="repair-caption">
                <p>{item.before}</p>
                <p>{item.after}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section" id="ablauf">
        <div className="section-heading compact">
          <p className="section-label">Ablauf</p>
          <h2>Vom Foto zur Reparatur in vier klaren Schritten.</h2>
        </div>
        <div className="process-grid">
          {process.map((item) => (
            <article className="process-step" key={item.step}>
              <span>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="appointment-section" id="anfrage">
        <div className="appointment-image">
          <img src={workshopImage} alt="Moderne Kfz-Werkstatt mit Hebebühne, Werkzeug und Fahrzeug" />
        </div>
        <div className="appointment-content">
          <p className="section-label">Schadenanfrage</p>
          <h2>Schaden anfragen – mit Foto und Rückrufnummer.</h2>
          <p>
            Je klarer die Fotos und Angaben sind, desto schneller kann die Werkstatt den nächsten
            Schritt einschätzen. Ob Smart-Repair, Lackarbeit oder ein Termin vor Ort sinnvoll ist,
            wird nach den Angaben geprüft. Ein endgültiger Preis ist erst nach Sichtung am Fahrzeug
            möglich.
          </p>

          <form className="request-form" onSubmit={handleRequestSubmit}>
            <div className="form-grid">
              <label>
                Name
                <input
                  value={formData.name}
                  onChange={updateField('name')}
                  placeholder="Ihr Name"
                  autoComplete="name"
                />
              </label>
              <label>
                Rückrufnummer
                <input
                  value={formData.phone}
                  onChange={updateField('phone')}
                  placeholder="+49 ..."
                  autoComplete="tel"
                />
              </label>
              <label>
                Fahrzeugmodell
                <input
                  value={formData.vehicle}
                  onChange={updateField('vehicle')}
                  placeholder="z. B. VW Golf, BMW 3er"
                />
              </label>
              <label className="file-field">
                Fotos auswählen
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => setSelectedFileCount(event.currentTarget.files?.length ?? 0)}
                />
                <span>{selectedFileCount > 0 ? `${selectedFileCount} Foto(s) ausgewählt` : 'JPG oder PNG'}</span>
              </label>
              <label className="wide-field">
                Was ist passiert?
                <textarea
                  value={formData.damage}
                  onChange={updateField('damage')}
                  placeholder="z. B. Parkschramme hinten rechts, Kratzer am Kotflügel ..."
                  rows={5}
                />
              </label>
            </div>
            <p className="form-note">
              Nach dem Klick öffnet sich Ihr E-Mail-Programm mit den Angaben. Fotos können Sie im
              E-Mail-Fenster anhängen.
            </p>
            <div className="appointment-actions">
              <button className="primary-button" type="submit">
                E-Mail mit Anfrage vorbereiten
              </button>
              <a className="text-link" href={phoneHref}>
                Lieber direkt anrufen
              </a>
            </div>
          </form>
        </div>
      </section>

      <section className="location-section" aria-label="Standort und Anfahrt">
        <div className="section-copy">
          <p className="section-label">Anfahrt</p>
          <h2>Ihre Werkstatt in Köln-Neubrück, direkt am Neubrücker Ring.</h2>
          <p>
            Gut erreichbar für Kunden aus Neubrück, Brück, Merheim, Ostheim, Rath/Heumar und
            Köln-Ost. Die Route zur Werkstatt kann direkt geöffnet werden.
          </p>
          <div className="area-list" aria-label="Einzugsgebiet">
            {localAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </div>
        <div className="map-card">
          <div className="map-visual" aria-label="Standort am Neubrücker Ring">
            <span className="map-road map-road-main">Neubrücker Ring</span>
            <span className="map-road map-road-side">Köln-Neubrück</span>
            <span className="map-pin">VS</span>
          </div>
          <div className="map-details">
            <strong>Neubrücker Ring 50, 51109 Köln</strong>
            <a href={mapsHref} target="_blank" rel="noreferrer">
              Route planen
            </a>
          </div>
        </div>
      </section>

      <section className="about-section" id="betrieb">
        <div className="section-copy inverse">
          <p className="section-label">Betrieb</p>
          <h2>Persönliche Werkstatt, direkte Absprache, saubere Arbeit.</h2>
          <p>
            Vicario Smart-Repair verbindet Kfz-Reparatur mit gezielter Arbeit an Lack, Felgen und
            Karosseriedetails. Kunden bekommen eine verständliche Rückmeldung, klare Absprache und
            wissen vor Beginn, welcher Weg sinnvoll ist.
          </p>
        </div>
        <div className="profile-card">
          <span>Inhaber</span>
          <strong>Alessandro Vicario</strong>
          <p>Ihr Ansprechpartner für Smart-Repair, Kfz-Reparatur, Lack, Felgen und Fahrzeugdetails.</p>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="section-heading compact">
          <p className="section-label">FAQ</p>
          <h2>Häufige Fragen vor der Anfrage.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact-section" id="kontakt">
        <div className="contact-copy">
          <p className="section-label">Kontakt</p>
          <h2>Foto senden, Rückruf erhalten oder Termin abstimmen.</h2>
          <p>
            Für eine schnelle Einschätzung reichen wenige Angaben. Wenn es dringend ist, rufen Sie
            direkt an.
          </p>
        </div>
        <div className="contact-actions">
          <a href={mailHref}>
            <span>E-Mail</span>
            <strong>{publicEmail}</strong>
          </a>
          <a href={phoneHref}>
            <span>Telefon</span>
            <strong>{phoneDisplay}</strong>
          </a>
          <a href={mapsHref} target="_blank" rel="noreferrer">
            <span>Adresse</span>
            <strong>Neubrücker Ring 50, 51109 Köln</strong>
          </a>
        </div>
      </section>

      <div
        className={`mobile-action-bar${showMobileBar ? ' is-visible' : ''}`}
        aria-label="Schnellkontakt mobil"
      >
        <a href="#anfrage">Foto senden</a>
        <a href={phoneHref}>Anrufen</a>
      </div>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <a className="footer-brand" href="#top">
              <span className="brand-mark">VS</span>
              <span>
                <strong>Vicario</strong>
                <small>Smart-Repair</small>
              </span>
            </a>
            <p>Smart-Repair, Kfz-Reparatur und Fahrzeugdetails in Köln-Neubrück.</p>
          </div>
          <div>
            <h3>Kontakt</h3>
            <p>
              <a href={phoneHref}>{phoneDisplay}</a>
            </p>
            <p>
              <a href={mailHref}>{publicEmail}</a>
            </p>
            <p>Neubrücker Ring 50, 51109 Köln</p>
          </div>
          <div>
            <h3>Öffnungszeiten</h3>
            <p>Mo-Fr 10:00-14:00 und 15:00-19:00</p>
            <p>Sa 10:00-15:00</p>
            <p>Abgabe nach Absprache</p>
          </div>
          <div>
            <h3>Leistungen</h3>
            <ul>
              {footerServices.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© Vicario Smart-Repair</span>
          <div>
            <a href="https://www.vicario-smart-repair.de/impressum/" target="_blank" rel="noreferrer">
              Impressum
            </a>
            <a href="https://www.vicario-smart-repair.de/impressum/" target="_blank" rel="noreferrer">
              Datenschutz
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
