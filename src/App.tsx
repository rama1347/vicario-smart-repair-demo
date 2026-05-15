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
const publicEmail = 'vicario.smartrepair@web.de'
const phoneDisplay = '+49 157 76130545'
const phoneHref = 'tel:+4915776130545'
const mapsHref =
  'https://www.google.com/maps/search/?api=1&query=Neubr%C3%BCcker%20Ring%2050%2051109%20K%C3%B6ln'
const googleReviewsHref =
  'https://www.google.de/maps/place/Vicario+Smart-Repair/@50.9284952,7.0589737,17z/data=!4m8!3m7!1s0x47bf27a6148afcbd:0x7890ed1d06b10f75!8m2!3d50.9284952!4d7.0615486!9m1!1b1!16s%2Fg%2F11h54z6s1v'

const mailHref = `mailto:${publicEmail}?subject=${encodeURIComponent(
  'Anfrage Vicario Smart-Repair',
)}&body=${encodeURIComponent(
  'Hallo Vicario Smart-Repair,\n\nich möchte eine Anfrage stellen.\n\nFahrzeugmodell:\nAnliegen:\nRückrufnummer:\n\nFotos füge ich bei Bedarf im Anhang hinzu.\n',
)}`

const trustMetrics = [
  {
    label: 'Google-Bewertung',
    value: '4,5 / 5',
    text: '50+ Bewertungen von Kunden aus Köln und Umgebung.',
  },
  {
    label: 'Standort',
    value: 'Köln-Neubrück',
    text: 'Direkt am Neubrücker Ring erreichbar.',
  },
  {
    label: 'Service',
    value: 'Ersatzwagen',
    text: 'Kostenloser Ersatzwagen nach vorheriger Abstimmung.',
  },
  {
    label: 'Annahme',
    value: '24h',
    text: 'Fahrzeugabgabe nach Abstimmung auch außerhalb der Öffnungszeiten möglich.',
  },
]

const reviews = [
  {
    topic: 'Reparatur',
    quote: 'Bin sehr zufrieden mit der Reparatur. Ein Mann ein Wort …',
    label: 'Google-Bewertung · 5 Sterne',
  },
  {
    topic: 'Preis-Leistung',
    quote: 'Hier wird einem schnell, kompetent und zum fairen Preis geholfen.',
    label: 'Google-Bewertung · 5 Sterne',
  },
  {
    topic: 'Service',
    quote: 'Sehr nett und zuvorkommend. Zudem sehr zuverlässig und schnell. Einfach rundum zufrieden.',
    label: 'Google-Bewertung · 5 Sterne',
  },
]

const reasons = [
  {
    title: 'Smart-Repair für sichtbare Schäden',
    text: 'Kratzer, Parkschrammen, kleine Dellen und Beulen werden gezielt bearbeitet, wenn eine saubere Reparatur möglich ist.',
  },
  {
    title: 'Kosten und Umfang vorher besprechen',
    text: 'Vor der Arbeit wird erklärt, welcher Reparaturweg sinnvoll ist und welche Arbeiten wirklich nötig sind.',
  },
  {
    title: 'Kostenloser Ersatzwagen',
    text: 'Während das Fahrzeug in der Werkstatt ist, kann bei passender Planung ein kostenloser Ersatzwagen bereitstehen.',
  },
  {
    title: '24-Stunden-Annahme',
    text: 'Die Fahrzeugabgabe ist auch außerhalb der regulären Öffnungszeiten möglich, wenn sie vorher abgestimmt wurde.',
  },
  {
    title: 'Prüfung auch kurzfristig möglich',
    text: 'Sichtbare Schäden können vor Ort angeschaut werden. Für sichere Planung empfiehlt sich vorher ein Anruf.',
  },
  {
    title: 'Persönlicher Ansprechpartner',
    text: 'Alessandro Vicario ist der persönliche Ansprechpartner für direkte Absprache, kurze Wege und nachvollziehbare Beratung.',
  },
]

const services = [
  {
    title: 'Smart-Repair',
    text: 'Kleine optische Schäden werden gezielt bearbeitet, ohne direkt hohe Ersatzteil- oder Demontagekosten auszulösen.',
    details: ['kleine Schäden', 'gezielt', 'kostenschonend'],
  },
  {
    title: 'Parkschrammen & Lackkratzer',
    text: 'Schäden an Stoßfänger, Kotflügel, Tür oder Klarlack werden sauber ausgebessert, wenn der Zustand es zulässt.',
    details: ['Stoßfänger', 'Klarlack', 'Kratzer'],
  },
  {
    title: 'Dellen & Beulen',
    text: 'Kleine Karosserie- und Blechschäden werden je nach Stelle und Lackzustand passend bearbeitet.',
    details: ['Tür', 'Kotflügel', 'Blechschäden'],
  },
  {
    title: 'Felgendoktor',
    text: 'Kratzer, Bordsteinschäden und optische Schäden an Felgen werden für ein gepflegtes Felgenbild aufbereitet.',
    details: ['Alufelgen', 'Bordsteinschäden', 'Felgenbild'],
  },
  {
    title: 'Brandlöcher in Sitzen',
    text: 'Brandlöcher, kleine Einschnitte und sichtbare Schäden an Polster oder Leder können je nach Material ausgebessert werden.',
    details: ['Sitze', 'Innenraum', 'Polster'],
  },
  {
    title: 'Fahrzeugaufbereitung',
    text: 'Pflege und Aufbereitung für Lack, Innenraum und Fahrzeugdetails – für ein sauberes, gepflegtes Gesamtbild.',
    details: ['Lackpflege', 'Innenraum', 'Aufbereitung'],
  },
  {
    title: 'Kfz-Reparatur',
    text: 'Diagnose, Wartung und Reparaturen mit Blick auf Alltag, Sicherheit und Werterhalt des Fahrzeugs.',
    details: ['Diagnose', 'Wartung', 'Reparatur'],
  },
  {
    title: 'Tuning & Umbauten',
    text: 'Ausgewählte Tuning-Arbeiten an Felgen, Fahrwerk, Bremsanlage, Abgasanlage, Karosserie und Fahrzeugoptik – nach Absprache.',
    details: ['Alufelgen', 'Fahrwerk', 'Umbauten'],
  },
]

const beforeAfter = [
  {
    title: 'Lackkratzer am Kotflügel',
    before: 'sichtbarer Kratzer im Lack',
    after: 'sauberere Oberfläche und gepflegteres Bild',
    beforeImage: assetUrl('vicario-before-after/scratch-before.jpg'),
    afterImage: assetUrl('vicario-before-after/scratch-after.jpg'),
  },
  {
    title: 'Felge aufbereitet',
    before: 'Felge vor der Aufbereitung',
    after: 'sichtbar aufbereitete Felge am Fahrzeug',
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
    title: 'Kontakt aufnehmen',
    text: 'Per Telefon, E-Mail oder Anfrage mit Foto startet der erste Kontakt.',
  },
  {
    step: '02',
    title: 'Anliegen besprechen',
    text: 'Ob Lackschaden, Felge, Innenraum, Reparatur oder Tuning: Der passende Weg wird vorab abgestimmt.',
  },
  {
    step: '03',
    title: 'Termin oder Annahme klären',
    text: 'Je nach Aufwand wird ein Termin, die Fahrzeugabgabe oder eine kurze Prüfung vor Ort vereinbart.',
  },
  {
    step: '04',
    title: 'Arbeit durchführen lassen',
    text: 'Die Arbeit beginnt erst, wenn Umfang, Aufwand und Vorgehen besprochen sind.',
  },
]

const localAreas = ['Neubrück', 'Brück', 'Merheim', 'Köln-Ost', 'Ostheim', 'Rath/Heumar']

const faqs = [
  {
    question: 'Welche Leistungen bietet Vicario Smart-Repair an?',
    answer:
      'Zum Angebot gehören Smart-Repair, Lack- und Parkschäden, Dellen, Felgen, Innenraum, Fahrzeugaufbereitung, Kfz-Reparatur und Tuning. Viele Arbeiten werden direkt vor Ort oder vorab telefonisch besprochen.',
  },
  {
    question: 'Welche Fotos soll ich für eine Anfrage senden?',
    answer:
      'Am besten ein Detailfoto vom Schaden und ein zweites Foto aus etwas Abstand. So erkennt die Werkstatt die Stelle am Fahrzeug besser.',
  },
  {
    question: 'Reicht ein Foto für einen festen Preis?',
    answer:
      'Ein Foto hilft bei der groben Richtung. Ein verbindlicher Preis ist erst am Fahrzeug möglich, weil Tiefe, Stelle und Lackzustand eine Rolle spielen.',
  },
  {
    question: 'Gibt es einen Ersatzwagen?',
    answer:
      'Nach Absprache kann für die Dauer der Arbeiten ein kostenloser Ersatzwagen zur Verfügung gestellt werden.',
  },
  {
    question: 'Kann ich mein Auto außerhalb der Öffnungszeiten abgeben?',
    answer:
      'Ja, eine 24-Stunden-Annahme ist mit vorheriger Abstimmung möglich.',
  },
  {
    question: 'Kann ich ohne Termin vorbeikommen?',
    answer:
      'Eine kurze Prüfung vor Ort kann möglich sein. Für eine bessere Planung empfiehlt sich vorher ein Anruf.',
  },
  {
    question: 'Repariert ihr auch Brandlöcher oder Schäden im Sitz?',
    answer:
      'Kleine Schäden an Sitzen, wie Brandlöcher oder Einschnitte, können je nach Material und Zustand ausgebessert werden.',
  },
  {
    question: 'Macht Vicario auch Tuning?',
    answer:
      'Ja, ausgewählte Tuning-Arbeiten wie Alufelgen, Fahrwerk, Karosserie, Sportabgasanlagen, Sportbremsanlagen oder Umbauten können individuell besprochen werden.',
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
    question: 'Arbeitet Vicario an verschiedenen Marken?',
    answer:
      'Viele Arbeiten sind markenunabhängig möglich. Bei speziellen Reparaturen oder Umbauten wird vorab geklärt, ob und wie die Umsetzung sinnvoll ist.',
  },
]

const footerServices = [
  'Smart-Repair',
  'Felgendoktor',
  'Lackkratzer',
  'Dellen & Beulen',
  'Brandlöcher in Sitzen',
  'Fahrzeugaufbereitung',
  'Kfz-Reparatur',
  'Tuning',
]

function StarRating() {
  return (
    <div className="star-rating" aria-label="5 von 5 Sternen">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M12 2.8 14.7 8.3 20.8 9.2 16.4 13.5 17.4 19.5 12 16.7 6.6 19.5 7.6 13.5 3.2 9.2 9.3 8.3 12 2.8Z" />
        </svg>
      ))}
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg className="review-link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M5 12H18" />
      <path d="M13 7L18 12L13 17" />
    </svg>
  )
}

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
      'ich möchte eine Anfrage stellen.',
      '',
      `Name: ${formData.name || '-'}`,
      `Fahrzeugmodell: ${formData.vehicle || '-'}`,
      `Anliegen: ${formData.damage || '-'}`,
      `Rückrufnummer: ${formData.phone || '-'}`,
      '',
      selectedFileCount > 0
        ? 'Fotos habe ich ausgewählt und füge sie im E-Mail-Fenster hinzu.'
        : 'Fotos füge ich bei Bedarf im Anhang hinzu.',
    ].join('\n')

    return `mailto:${publicEmail}?subject=${encodeURIComponent(
      'Anfrage Vicario Smart-Repair',
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
          <a href="#betrieb">Betrieb</a>
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
            <h1>Smart-Repair, Reparatur und Tuning in Köln-Neubrück.</h1>
            <p className="hero-lead">
              Vicario Smart-Repair verbindet Smart-Repair, Kfz-Reparatur, Felgendoktor,
              Aufbereitung und Tuning – direkt am Neubrücker Ring in Köln-Neubrück.
            </p>
            <div className="hero-actions" aria-label="Kontaktoptionen">
              <a className="primary-button" href="#anfrage">
                Schaden anfragen
              </a>
              <a className="secondary-button" href={phoneHref}>
                Direkt anrufen
              </a>
            </div>
            <div className="hero-proof" aria-label="Kurzinfos">
              <span>Google 4,5 / 5 · 50+ Bewertungen</span>
              <span>Kostenloser Ersatzwagen</span>
              <span>24h-Annahme nach Abstimmung</span>
              <span>Samstags geöffnet</span>
            </div>
          </div>

          <aside className="hero-card" aria-label="Schnellkontakt">
            <p className="card-label">Schnellkontakt</p>
            <h2>Schaden zeigen. Reparaturweg klären.</h2>
            <dl>
              <div>
                <dt>Kurz vorbereiten</dt>
                <dd>
                  Foto, Fahrzeugmodell und kurze Beschreibung reichen oft für eine erste Klärung.
                  Bei Bedarf wird das Fahrzeug vor Ort genauer angesehen.
                </dd>
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
                <dd>Mo-Fr 10:00-14:00 und 15:00-19:00, Sa 10:00-15:00</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="trust-section" id="vertrauen" aria-label="Vertrauen und Bewertungen">
        <div className="trust-heading">
          <p className="section-label">Vertrauen</p>
          <h2>Vor der Arbeit wissen, woran man ist.</h2>
          <p>
            Bei Lack-, Karosserie- und Felgenschäden möchten Kunden vorab wissen, welcher Aufwand
            entsteht, welcher Reparaturweg sinnvoll ist und welche Kosten zu erwarten sind. Aufwand,
            Reparaturweg und Kosten werden vor Beginn nachvollziehbar besprochen.
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
          <h3>Google-Bewertungen</h3>
          <p>Kurze Auszüge aus öffentlich sichtbaren Bewertungen.</p>
        </div>
        <div className="review-grid" aria-label="Auszüge aus Google-Bewertungen">
          {reviews.map((review) => (
            <article className="review-card" key={review.quote}>
              <span className="review-topic">{review.topic}</span>
              <p>„{review.quote}“</p>
              <StarRating />
              <span className="review-meta">{review.label}</span>
            </article>
          ))}
        </div>
        <a className="review-link" href={googleReviewsHref} target="_blank" rel="noreferrer">
          <span>Weitere Bewertungen bei Google ansehen</span>
          <ArrowIcon />
        </a>
      </section>

      <section className="why-section" id="warum">
        <div className="section-copy">
          <p className="section-label">Warum Vicario?</p>
          <h2>Mehr als Smart-Repair: Werkstatt, Service und Fahrzeugdetails aus einer Hand.</h2>
          <p>
            Zum Angebot gehören kleine Lackschäden, Smart-Repair, Kfz-Reparatur, Felgen,
            Aufbereitung, Innenraum und ausgewählte Tuning-Arbeiten. Kunden bekommen Hilfe bei
            vielen Arbeiten rund ums Fahrzeug – mit direkter Betreuung vor Ort.
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
          <h2>Leistungen für Smart-Repair, Reparatur und Fahrzeugdetails.</h2>
          <p>
            Von kleinen Schönheitsfehlern bis zu ausgewählten Reparatur- und Tuning-Arbeiten:
            Vicario Smart-Repair bündelt viele Arbeiten rund um Lack, Felgen, Innenraum,
            Aufbereitung und Fahrzeugtechnik.
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
            Vorher-Nachher-Beispiele zeigen direkt, wie Lack, Felgen oder Stoßfänger nach der
            Bearbeitung wieder gepflegter wirken können.
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
          <h2>Vom Kontakt zur Reparatur in vier Schritten.</h2>
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
          <p className="section-label">Anfrage</p>
          <h2>Schaden oder Reparatur anfragen.</h2>
          <p>
            Schicken Sie die wichtigsten Angaben mit, damit die Werkstatt den passenden Weg
            vorbereiten kann. Ein endgültiger Preis ist erst nach Sichtung am Fahrzeug möglich.
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
                Was soll gemacht werden?
                <textarea
                  value={formData.damage}
                  onChange={updateField('damage')}
                  placeholder="z. B. Parkschramme hinten rechts, Felgenschaden, Brandloch im Sitz, Wartung oder Tuning-Wunsch ..."
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
          <h2>Werkstatt in Köln-Neubrück – direkt am Neubrücker Ring.</h2>
          <p>
            Vicario Smart-Repair liegt am Neubrücker Ring 50 und ist gut erreichbar aus Neubrück,
            Brück, Merheim, Ostheim, Rath/Heumar und Köln-Ost.
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
              Route in Google Maps öffnen
            </a>
          </div>
        </div>
      </section>

      <section className="about-section" id="betrieb">
        <div className="section-copy inverse">
          <p className="section-label">Betrieb</p>
          <h2>Klare und persönliche Betreuung direkt in der Werkstatt.</h2>
          <p>
            Vicario Smart-Repair verbindet klassische Kfz-Reparatur mit Smart-Repair,
            Felgenreparatur, Fahrzeugaufbereitung, Innenraumarbeiten und ausgewählten
            Tuning-Leistungen. Kunden haben einen direkten Ansprechpartner, kurze Wege und wissen
            vor Beginn, welcher Weg sinnvoll ist.
          </p>
        </div>
        <div className="profile-card">
          <span>Inhaber</span>
          <strong>Alessandro Vicario</strong>
          <p>
            Ihr Ansprechpartner für Smart-Repair, Kfz-Reparatur, Felgen, Aufbereitung, Tuning und
            Fahrzeugdetails – für viele Marken und Fahrzeugtypen.
          </p>
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
        <div className="contact-panel">
          <div className="contact-copy">
            <p className="section-label">Kontakt</p>
            <h2>Schaden, Reparatur oder Termin klären?</h2>
            <p>
              Rufen Sie direkt an oder senden Sie die wichtigsten Angaben vorab. Die Werkstatt
              befindet sich am Neubrücker Ring in Köln-Neubrück.
            </p>
          </div>
          <div className="contact-actions" aria-label="Kontaktaktionen">
            <div className="contact-buttons">
              <a className="contact-primary" href={phoneHref}>
                Direkt anrufen
              </a>
              <a href="#anfrage">
                Anfrage senden
              </a>
              <a href={mapsHref} target="_blank" rel="noreferrer">
                Route planen
              </a>
            </div>
            <p className="contact-note">
              E-Mail: <a href={mailHref}>{publicEmail}</a>
            </p>
          </div>
        </div>
      </section>

      <div
        className={`mobile-action-bar${showMobileBar ? ' is-visible' : ''}`}
        aria-label="Schnellkontakt mobil"
      >
        <a href="#anfrage">Anfragen</a>
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
            <p>
              Smart-Repair, Kfz-Reparatur, Felgendoktor, Aufbereitung und Tuning in
              Köln-Neubrück.
            </p>
          </div>
          <div>
            <h3>Öffnungszeiten</h3>
            <p>Mo-Fr 10:00–14:00 und 15:00–19:00</p>
            <p>Sa 10:00–15:00</p>
            <p>24-Stunden-Annahme nach Absprache</p>
          </div>
          <div className="footer-services">
            <h3>Leistungen</h3>
            <div className="footer-service-columns">
              <ul>
                {footerServices.slice(0, 4).map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
              <ul>
                {footerServices.slice(4).map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h3>Standort & Rechtliches</h3>
            <p>Neubrücker Ring 50</p>
            <p>51109 Köln-Neubrück</p>
            <p>
              <a href={mapsHref} target="_blank" rel="noreferrer">
                Route planen
              </a>
            </p>
            <p>
              <a href="https://www.vicario-smart-repair.de/impressum/" target="_blank" rel="noreferrer">
                Impressum
              </a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© Vicario Smart-Repair</span>
        </div>
      </footer>
    </main>
  )
}

export default App
