import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { MembersLoginForm } from "@/components/MembersLoginForm";
import { MarkdownBody } from "@/components/MarkdownBody";
import {
  getMembersPassword,
  isMembersAuthenticated,
} from "@/lib/members-auth";
import { markdownToHtml } from "@/lib/markdown";
import { logoutMembers } from "./actions";

export const metadata: Metadata = {
  title: "Espace membres",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function getMembersMarkdown(): string | null {
  const filePath = path.join(
    process.cwd(),
    "content",
    "espace-membres",
    "index.md",
  );
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  // Drop export front-matter style header lines before first real section
  const parts = raw.split(/\n---\n/);
  const body = parts.length > 1 ? parts.slice(1).join("\n---\n").trim() : raw;
  return body;
}

export default async function EspaceMembresPage() {
  const configured = Boolean(getMembersPassword());
  const authenticated = await isMembersAuthenticated();
  const markdown = authenticated ? getMembersMarkdown() : null;
  const html = markdown ? await markdownToHtml(markdown) : null;

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

      <section className={`section ${authenticated ? "" : "section--narrow"}`.trim()}>
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
          <div className="section--narrow" style={{ padding: 0 }}>
            <p>
              Saisissez le mot de passe communiqué par le comité pour accéder
              aux documents réservés.
            </p>
            <MembersLoginForm />
          </div>
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

            {html ? (
              <MarkdownBody html={html} className="members-content" />
            ) : (
              <div className="notice">
                <p>
                  Contenu membres introuvable dans{" "}
                  <code>content/espace-membres/index.md</code>.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
