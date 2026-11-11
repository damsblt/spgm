import type { Metadata } from "next";
import Link from "next/link";
import { FORM_DEFINITIONS } from "@/lib/formulaires";

export const metadata: Metadata = {
  title: "Formulaires",
};

export default function FormulairesPage() {
  return (
    <>
      <div className="page-hero">
        <section className="section">
          <h1 className="page-title">Formulaires</h1>
          <p className="lede">
            Adhésion, changement d’adresse et réadmission — remplissez les
            formulaires en ligne ; une confirmation vous est envoyée par courriel.
          </p>
        </section>
      </div>
      <section className="section">
        <div className="article-list">
          {FORM_DEFINITIONS.map((form) => (
            <article
              key={form.slug}
              className="article-card"
              style={{ gridTemplateColumns: "1fr" }}
            >
              <div>
                <h3>{form.shortTitle}</h3>
                <p>{form.description}</p>
                <p style={{ marginTop: "0.85rem" }}>
                  <Link className="btn btn--solid" href={`/formulaires/${form.slug}`}>
                    Remplir le formulaire
                  </Link>
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
