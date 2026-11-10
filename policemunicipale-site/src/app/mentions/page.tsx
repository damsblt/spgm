import type { Metadata } from "next";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getPage } from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default async function MentionsPage() {
  const page = getPage("copyright-spmg");
  const html = page
    ? await markdownToHtml(page.body)
    : "<p>Mentions non disponibles.</p>";

  return (
    <>
      <div className="page-hero">
        <section className="section">
          <h1 className="page-title">Mentions légales</h1>
          <p className="lede">Copyright et clause de non-responsabilité SPMG.</p>
        </section>
      </div>
      <section className="section section--narrow">
        <MarkdownBody html={html} />
        <div className="notice">
          Ce site est un <strong>brouillon local</strong> réalisé à partir d’un
          export de contenu. Il n’est pas connecté à la production Infomaniak.
        </div>
      </section>
    </>
  );
}
