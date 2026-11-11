import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OnlineForm } from "@/components/OnlineForm";
import { FORM_DEFINITIONS, getFormDefinition } from "@/lib/formulaires";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return FORM_DEFINITIONS.map((form) => ({ slug: form.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const form = getFormDefinition(slug);
  if (!form) return { title: "Formulaire" };
  return { title: form.shortTitle };
}

export default async function FormulaireDetailPage({ params }: Props) {
  const { slug } = await params;
  const form = getFormDefinition(slug);
  if (!form) notFound();

  return (
    <>
      <div className="page-hero">
        <section className="section">
          <p className="form-crumb">
            <Link href="/formulaires">Formulaires</Link>
            <span aria-hidden="true"> / </span>
            <span>{form.shortTitle}</span>
          </p>
          <h1 className="page-title">{form.title}</h1>
          <p className="lede">{form.description}</p>
        </section>
      </div>
      <section className="section section--narrow">
        <OnlineForm definition={form} />
        <div className="contact-block" style={{ marginTop: "1.75rem" }}>
          <h2>Contact</h2>
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
