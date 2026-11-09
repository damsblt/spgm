import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatDateFr, getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Communications",
};

export default function CommunicationsPage() {
  const articles = getAllArticles();

  return (
    <>
      <div className="page-hero">
        <section className="section">
          <h1 className="page-title">Communications</h1>
          <p className="lede">
            {articles.length} articles et actualités publiés par le SPMG.
          </p>
        </section>
      </div>
      <section className="section">
        <div className="article-list">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/communications/${article.slug}`}
              className="article-card"
            >
              <div className="article-card__media">
                {article.featuredImage ? (
                  <Image
                    src={article.featuredImage}
                    alt=""
                    width={140}
                    height={110}
                  />
                ) : (
                  <div className="article-card__placeholder" />
                )}
              </div>
              <div>
                {article.date ? (
                  <time dateTime={article.date}>
                    {formatDateFr(article.date)}
                  </time>
                ) : null}
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
