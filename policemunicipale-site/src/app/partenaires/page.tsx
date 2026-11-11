import type { Metadata } from "next";
import Image from "next/image";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getPage } from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Partenaires",
};

export default async function PartenairesPage() {
  const page = getPage("partenaires-sponsors");
  const html = page ? await markdownToHtml(page.body) : "";

  return (
    <>
      <div className="page-hero">
        <section className="section">
          <h1 className="page-title">Partenaires</h1>
          <p className="lede">
            Organisations partenaires qui soutiennent le SPMG.
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
