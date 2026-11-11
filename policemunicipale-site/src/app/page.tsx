import Image from "next/image";
import Link from "next/link";
import { formatDateFr, getAllArticles } from "@/lib/content";

const GALLERY = [
  "home-02022015-dsc06967-e1554211369450-960x449.jpg",
  "home-net4-960x449.jpg",
  "home-pep-9409-2-scaled-960x449.jpg",
  "home-pol4-modif-1024x6825-960x449.jpg",
  "home-02022015-dsc070111-960x449.jpg",
  "home-net3-960x449.jpg",
  "home-03102013-dsc-7901-scaled-960x449.jpg",
  "home-dscf5304-960x449.jpg",
];

const GOALS = [
  "Défendre et développer la LAPM et RAPM.",
  "Défendre et améliorer les conditions de travail et le bien commun des collaborateurs.",
  "Maintenir la paix sociale.",
  "Développer le partenariat avec le politique.",
];

const HISTORY = [
  {
    year: "1922–2000",
    text: "Union des Agents Municipaux de la Ville de Genève (UDAM)",
  },
  {
    year: "1964",
    text: "Adhésion à la Fédération Suisse des Fonctionnaires de police (FSFP)",
  },
  {
    year: "1997",
    text: "Adhésion au Groupement des Associations de police du Canton de Genève",
  },
  {
    year: "2000–2007",
    text: "Syndicat des Agents de Sécurité Municipale (SASM)",
  },
  {
    year: "2007–2013",
    text: "Syndicat de la Police Municipale de la Ville de Genève (SPM)",
  },
  {
    year: "2013",
    text: "Le 1er octobre, le SPM devient le SPMG pour représenter les agents des communes du canton.",
  },
  {
    year: "2013–auj.",
    text: "Syndicat des Polices Municipales Genevoises (SPMG)",
  },
  {
    year: "2022",
    text: "Fusion du syndicat UPMG et du SPMG pour unir les forces dans la lutte syndicale.",
  },
];

export default function HomePage() {
  const latest = getAllArticles().slice(0, 4);

  return (
    <>
      <section className="hero" aria-label="Présentation SPMG">
        <div className="hero__media">
          <Image
            src="/images/home-img-111111-1024x4741.jpg"
            alt="Agents de police municipale genevoise"
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className="hero__veil" />
        <div className="hero__content">
          <p className="hero__kicker">Policemunicipale.ch</p>
          <h1>SPMG</h1>
          <p className="hero__lead">
            Syndicat des Polices Municipales Genevoises — défendre les agents,
            renforcer le partenariat et améliorer les conditions de travail dans
            le canton de Genève.
          </p>
          <div className="hero__actions">
            <Link href="/communications" className="btn btn--primary">
              Communications
            </Link>
            <Link href="/formulaires" className="btn btn--ghost">
              Adhérer au SPMG
            </Link>
          </div>
        </div>
      </section>

      <div className="gallery-strip" aria-label="Galerie">
        {GALLERY.map((file) => (
          <figure key={file}>
            <Image
              src={`/images/${file}`}
              alt=""
              width={280}
              height={160}
            />
          </figure>
        ))}
      </div>

      <section className="section">
        <div className="section__head">
          <h2>Buts du syndicat</h2>
          <p>
            Depuis plus de 170 ans, la police municipale est un pilier de la
            sécurité locale à Genève. Le SPMG en porte la voix syndicale.
          </p>
        </div>
        <ul className="goals">
          {GOALS.map((goal) => (
            <li key={goal}>{goal}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Historique</h2>
          <p>
            Il y a plus de 170 ans, le 20 mars 1843, le Conseil d’État vote la
            loi sur les conseils municipaux. Aujourd’hui, la Police Municipale
            Genevoise reste un partenaire privilégié de l’État.
          </p>
        </div>
        <div className="timeline">
          {HISTORY.map((item) => (
            <div className="timeline__item" key={`${item.year}-${item.text}`}>
              <div className="timeline__year">{item.year}</div>
              <div>{item.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Dernières communications</h2>
          <p>Actualités et prises de position du syndicat.</p>
        </div>
        <div className="article-list">
          {latest.map((article) => (
            <Link
              key={article.slug}
              href={`/communications/${article.slug}`}
              className="article-card"
            >
              <div className="article-card__media">
                {article.featuredImage ? (
                  <Image
                    src={article.featuredImage}
                    alt=""
                    width={140}
                    height={110}
                  />
                ) : (
                  <div className="article-card__placeholder" />
                )}
              </div>
              <div>
                {article.date ? (
                  <time dateTime={article.date}>
                    {formatDateFr(article.date)}
                  </time>
                ) : null}
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <p style={{ marginTop: "1.25rem" }}>
          <Link href="/communications" className="btn btn--solid">
            Toutes les communications
          </Link>
        </p>
      </section>
    </>
  );
}
