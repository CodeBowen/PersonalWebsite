/**
 * The only module that knows where content lives.
 *
 * Pages call these functions and never read files themselves. Today they read
 * MDX files from /content; when a backend arrives, rewrite this file to query
 * a database or CMS and the pages stay the same.
 */
import { readdir } from "node:fs/promises";
import path from "node:path";
import type { ComponentType } from "react";
import { cacheLife } from "next/cache";
import type { Post, PostMeta, Project, ProjectMeta } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const showDrafts = process.env.NODE_ENV !== "production";

type MdxModule<M> = { default: ComponentType; metadata: M };

async function listSlugs(collection: "blog" | "projects"): Promise<string[]> {
  const files = await readdir(path.join(CONTENT_DIR, collection));
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function requireFields<M extends object>(
  meta: M | undefined,
  fields: (keyof M)[],
  where: string,
): M {
  if (!meta) throw new Error(`${where} is missing \`export const metadata = {...}\``);
  for (const field of fields) {
    if (meta[field] === undefined || meta[field] === "") {
      throw new Error(`${where} metadata is missing "${String(field)}"`);
    }
  }
  return meta;
}

function newestFirst(a: { date: string }, b: { date: string }) {
  return b.date.localeCompare(a.date);
}

// ---------------------------------------------------------------- Blog posts

async function importPost(slug: string): Promise<MdxModule<PostMeta>> {
  return import(`@/content/blog/${slug}.mdx`);
}

export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("max");

  const slugs = await listSlugs("blog");
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await importPost(slug);
      const meta = requireFields(metadata, ["title", "summary", "date"], `content/blog/${slug}.mdx`);
      return { ...meta, slug };
    }),
  );
  return posts.filter((post) => showDrafts || !post.draft).sort(newestFirst);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}

/** The rendered body of a post, as a React component. */
export async function getPostBody(slug: string): Promise<ComponentType> {
  return (await importPost(slug)).default;
}

// ------------------------------------------------------------------ Projects

async function importProject(slug: string): Promise<MdxModule<ProjectMeta>> {
  return import(`@/content/projects/${slug}.mdx`);
}

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("max");

  const slugs = await listSlugs("projects");
  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const { metadata } = await importProject(slug);
      const meta = requireFields(
        metadata,
        ["title", "summary", "date", "tech"],
        `content/projects/${slug}.mdx`,
      );
      return { ...meta, slug };
    }),
  );
  return projects.sort(newestFirst);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}

export async function getProjectBody(slug: string): Promise<ComponentType> {
  return (await importProject(slug)).default;
}
