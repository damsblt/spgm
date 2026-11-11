import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const COMMUNICATIONS_DIR = path.join(CONTENT_DIR, "communications");

export type PageMeta = {
  slug: string;
  title: string;
  source?: string;
  body: string;
};

export type ArticleMeta = {
  slug: string;
  title: string;
  date?: string;
  source?: string;
  excerpt: string;
  body: string;
  featuredImage?: string;
};

function stripMetaLines(raw: string): {
  title: string;
  source?: string;
  date?: string;
  body: string;
} {
  const { content } = matter(raw);
  const lines = content.split("\n");
  let title = "";
  let source: string | undefined;
  let date: string | undefined;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }
    if (!title && line.startsWith("# ")) {
      title = line.replace(/^#\s+/, "").replace(/^-+|-+$/g, "").trim();
      i++;
      continue;
    }
    const sourceMatch = line.match(/^\*\*Source:\*\*\s*(.+)$/i);
    if (sourceMatch) {
      source = sourceMatch[1].trim();
      i++;
      continue;
    }
    const dateMatch = line.match(/^\*\*Date:\*\*\s*(.+)$/i);
    if (dateMatch) {
      date = dateMatch[1].trim();
      i++;
      continue;
    }
    if (line === "---") {
      i++;
      break;
    }
    break;
  }

  const body = lines.slice(i).join("\n").trim();
  return { title: title || "Sans titre", source, date, body };
}

function rewriteImagePaths(markdown: string): string {
  return markdown
    .replace(/\]\(\.\.\/images\//g, "](/images/")
    .replace(/\]\(images\//g, "](/images/");
}

function firstImage(markdown: string): string | undefined {
  const match = markdown.match(/!\[[^\]]*\]\((\/images\/[^)]+)\)/);
  return match?.[1];
}

function excerptFrom(markdown: string, max = 180): string {
  const text = markdown
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

export function getPage(slug: string): PageMeta | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = stripMetaLines(raw);
  return {
    slug,
    title: parsed.title,
    source: parsed.source,
    body: rewriteImagePaths(parsed.body),
  };
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(COMMUNICATIONS_DIR)) return [];
  const files = fs
    .readdirSync(COMMUNICATIONS_DIR)
    .filter((f) => f.endsWith(".md"));

  const articles = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(COMMUNICATIONS_DIR, file), "utf8");
    const parsed = stripMetaLines(raw);
    const body = rewriteImagePaths(parsed.body);
    return {
      slug,
      title: parsed.title,
      date: parsed.date,
      source: parsed.source,
      body,
      excerpt: excerptFrom(body),
      featuredImage: firstImage(body),
    } satisfies ArticleMeta;
  });

  return articles.sort((a, b) => {
    const da = a.date ?? "";
    const db = b.date ?? "";
    return db.localeCompare(da);
  });
}

export function getArticle(slug: string): ArticleMeta | null {
  return getAllArticles().find((a) => a.slug === slug) ?? null;
}

export function formatDateFr(iso?: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("fr-CH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
