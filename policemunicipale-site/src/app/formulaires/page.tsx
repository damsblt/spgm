import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formulaires",
};

const FORMS = [
  {
    title: "Adhésion au SPMG",
    description:
      "Pour adhérer au Syndicat des Polices Municipales Genevoises, téléchargez le formulaire, joignez une photo passeport, puis renvoyez le dossier par courriel ou courrier.",
    href: "https://policemunicipale.ch/wp-content/uploads/2024/10/Demande-dadmission-au-SPMG-FSFP.pdf",
    label: "Télécharger le formulaire d’admission",
  },
  {
    title: "Déménagement",
    description:
      "Communiquez votre changement d’adresse au moyen du formulaire dédié, puis envoyez-le à info@policemunicipale.ch.",
    href: "https://policemunicipale.ch/wp-content/uploads/2024/10/Formulaire-dannonce-de-changement-dadresse-SPMG-FSFP.pdf",
    label: "Télécharger le formulaire de changement d’adresse",
  },
  {
    title: "Réadmission",
    description:
      "Pour une demande de réadmission au SPMG-FSFP, utilisez le formulaire correspondant.",
    href: "https://policemunicipale.ch/wp-content/uploads/2024/10/Demande-de-readmission-au-SPMG-FSFP.pdf",
    label: "Télécharger le formulaire de réadmission",
  },
];

export default function FormulairesPage() {
  return (
    <>
      <div className="page-hero">
        <section className="section">
          <h1 className="page-title">Formulaires</h1>
          <p className="lede">
            Adhésion, changement d’adresse et réadmission — documents PDF hébergés
            sur le site source.
          </p>
        </section>
      </div>
      <section className="section">
        <div className="article-list">
          {FORMS.map((form) => (
            <article
              key={form.title}
              className="article-card"
              style={{ gridTemplateColumns: "1fr" }}
            >
              <div>
                <h3>{form.title}</h3>
                <p>{form.description}</p>
                <p style={{ marginTop: "0.85rem" }}>
                  <a
                    className="btn btn--solid"
                    href={form.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {form.label}
                  </a>
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="contact-block" style={{ marginTop: "1.5rem" }}>
          <h2>Adresse de retour</h2>
          <p>
            <strong>Syndicat des Polices Municipales Genevoises</strong>
          </p>
          <p>Case postale — 1211 Genève 2</p>
          <p>
            <a href="mailto:info@policemunicipale.ch">info@policemunicipale.ch</a>
          </p>
        </div>
      </section>
    </>
  );
}
