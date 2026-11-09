import type { Metadata } from "next";
import Image from "next/image";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getPage } from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Partenaires & sponsors",
};

const SPONSORS = [
  { name: "Peugeot", detail: "Concessionnaire automobile", href: "http://www.peugeot.ch/" },
  { name: "Citroën", detail: "Concessionnaire automobile", href: "http://www.citroen.ch/fr/accueil" },
  { name: "Alfa Romeo", detail: "Concessionnaire automobile", href: "http://www.alfaromeo.ch/ch/de/home" },
  { name: "FIAT", detail: "Concessionnaire automobile", href: "http://www.fiat.com/" },
  {
    name: "Generali",
    detail: "Assurance — flyer Affinity et conseiller Samuel Moukouri (liens sur le site source)",
    href: "https://policemunicipale.ch/sponsors/",
  },
  {
    name: "Mercedes Benz",
    detail: "Concessionnaire automobile",
    href: "http://www.mercedes-benz.ch/",
  },
  { name: "Volvo", detail: "Concessionnaire automobile", href: "http://www.volvocars.com/fr-ch" },
  { name: "Ako Style Coiffure", detail: "Salon de coiffure", href: "http://akostyle.ch/" },
  {
    name: "TNS Informatika IDN",
    detail: "Électricien",
    href: "/images/carte-de-visite.jpeg",
  },
  { name: "Harmony", detail: "Fitness", href: "http://www.harmony.ch/" },
  { name: "Evo Fitness", detail: "Fitness", href: "https://evofitness.ch/" },
  { name: "Assurlife", detail: "Assurance collective", href: undefined },
];

export default async function PartenairesPage() {
  const page = getPage("partenaires-sponsors");
  const html = page ? await markdownToHtml(page.body) : "";

  return (
    <>
      <div className="page-hero">
        <section className="section">
          <h1 className="page-title">Partenaires & sponsors</h1>
          <p className="lede">
            Organisations partenaires et sponsors qui soutiennent le SPMG.
          </p>
        </section>
      </div>
      <section className="section">
        <h2 className="page-title" style={{ fontSize: "1.5rem" }}>
          Partenaires
        </h2>
        <div className="partner-logos">
          <a href="http://www.vspb.org/fr/" rel="noreferrer" target="_blank">
            <Image src="/images/fsfp.jpg" alt="FSFP" width={120} height={56} />
          </a>
          <a href="http://www.uspro.ch/" rel="noreferrer" target="_blank">
            <Image src="/images/uspro.jpg" alt="USPRO" width={120} height={56} />
          </a>
        </div>

        <h2 className="page-title" style={{ fontSize: "1.5rem" }}>
          Sponsors
        </h2>
        <div className="prose" style={{ maxWidth: "100%" }}>
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Activité</th>
              </tr>
            </thead>
            <tbody>
              {SPONSORS.map((sponsor) => (
                <tr key={sponsor.name}>
                  <td>
                    {sponsor.href ? (
                      <a href={sponsor.href} rel="noreferrer" target="_blank">
                        {sponsor.name}
                      </a>
                    ) : (
                      sponsor.name
                    )}
                  </td>
                  <td>{sponsor.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {html ? (
          <details style={{ marginTop: "2rem" }}>
            <summary>Contenu exporté (Markdown)</summary>
            <MarkdownBody html={html} />
          </details>
        ) : null}
      </section>
    </>
  );
}
