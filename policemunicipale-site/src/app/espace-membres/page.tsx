import type { Metadata } from "next";
import Link from "next/link";
import { MembersLoginForm } from "@/components/MembersLoginForm";
import {
  getMembersPassword,
  isMembersAuthenticated,
} from "@/lib/members-auth";
import { logoutMembers } from "./actions";

export const metadata: Metadata = {
  title: "Espace membres",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const RECOVERED_LINKS = [
  {
    label: "Formulaire d’admission SPMG-FSFP (PDF)",
    href: "https://policemunicipale.ch/wp-content/uploads/2024/10/Demande-dadmission-au-SPMG-FSFP.pdf",
  },
  {
    label: "Changement d’adresse (PDF)",
    href: "https://policemunicipale.ch/wp-content/uploads/2024/10/Formulaire-dannonce-de-changement-dadresse-SPMG-FSFP.pdf",
  },
  {
    label: "Demande de réadmission (PDF)",
    href: "https://policemunicipale.ch/wp-content/uploads/2024/10/Demande-de-readmission-au-SPMG-FSFP.pdf",
  },
  {
    label: "Contact — info@policemunicipale.ch",
    href: "mailto:info@policemunicipale.ch",
  },
];

export default async function EspaceMembresPage() {
  const configured = Boolean(getMembersPassword());
  const authenticated = await isMembersAuthenticated();

  return (
    <>
      <div className="page-hero">
        <section className="section">
          <h1 className="page-title">Espace membres</h1>
          <p className="lede">
            Zone réservée aux membres du SPMG. Accès par mot de passe.
          </p>
        </section>
      </div>

      <section className="section section--narrow">
        {!configured ? (
          <div className="notice">
            <p>
              L’espace membres n’est pas encore configuré. Définissez{" "}
              <code>MEMBERS_PASSWORD</code> (préféré) ou l’alias{" "}
              <code>ESPACE_MEMBRES_PASSWORD</code> — localement dans{" "}
              <code>.env.local</code>, ou dans Vercel → Settings → Environment
              Variables.
            </p>
          </div>
        ) : !authenticated ? (
          <>
            <p>
              Saisissez le mot de passe communiqué par le comité pour accéder
              aux documents réservés.
            </p>
            <MembersLoginForm />
          </>
        ) : (
          <div className="members-panel">
            <div className="members-panel__head">
              <p className="members-panel__status">Session active</p>
              <form action={logoutMembers}>
                <button type="submit" className="btn btn--ghost members-logout">
                  Se déconnecter
                </button>
              </form>
            </div>

            <div className="notice">
              <p>
                Le contenu WordPress de l’espace membres (
                <code>/media/</code>) n’était pas exportable (page protégée /
                vide). Le contenu détaillé arrivera ici ultérieurement.
              </p>
            </div>

            <h2 className="page-title" style={{ fontSize: "1.35rem" }}>
              Documents utiles (récupérés)
            </h2>
            <p className="lede" style={{ marginBottom: "1rem" }}>
              Liens publics déjà présents sur le site exporté, utiles aux
              membres en attendant la migration complète.
            </p>
            <ul className="members-links">
              {RECOVERED_LINKS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} rel="noreferrer" target="_blank">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/formulaires">Page Formulaires</Link>
              </li>
              <li>
                <Link href="/comite">Le comité</Link>
              </li>
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
