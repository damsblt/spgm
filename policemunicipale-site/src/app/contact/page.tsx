import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <section className="section">
          <h1 className="page-title">Contact</h1>
          <p className="lede">
            Écrivez au Syndicat des Polices Municipales Genevoises.
          </p>
        </section>
      </div>
      <section className="section">
        <div className="contact-block">
          <h2>Adresse</h2>
          <p>
            <strong>Syndicat des Polices Municipales Genevoises</strong>
          </p>
          <p>Case postale</p>
          <p>1211 Genève 2</p>
          <h2 style={{ marginTop: "1.25rem" }}>Courriel</h2>
          <p>
            <a href="mailto:info@policemunicipale.ch">info@policemunicipale.ch</a>
          </p>
        </div>
      </section>
    </>
  );
}
