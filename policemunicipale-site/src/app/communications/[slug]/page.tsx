import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/MarkdownBody";
import {
  formatDateFr,
  getAllArticles,
  getArticle,
} from "@/lib/content";
import { markdownToHtml } from "@/lib/markdown";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article introuvable" };
  return { title: article.title };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const html = await markdownToHtml(article.body);

  return (
    <>
      <div className="page-hero">
        <section className="section section--narrow">
          <p style={{ margin: "0 0 0.75rem" }}>
            <Link href="/communications">← Communications</Link>
          </p>
          <h1 className="page-title">{article.title}</h1>
          <div className="meta-row">
            {article.date ? (
              <time dateTime={article.date}>{formatDateFr(article.date)}</time>
            ) : null}
            {article.source ? (
              <a href={article.source} rel="noreferrer" target="_blank">
                Source originale
              </a>
            ) : null}
          </div>
        </section>
      </div>
      <section className="section section--narrow">
        <MarkdownBody html={html} />
      </section>
    </>
  );
}
