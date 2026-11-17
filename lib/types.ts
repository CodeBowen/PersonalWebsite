/**
 * Content models. Today these come from the `metadata` export of MDX files in
 * /content; a future backend (database or CMS) should return the same shapes.
 */

export type PostMeta = {
  title: string;
  summary: string;
  /** ISO date, e.g. "2026-12-01" */
  date: string;
  /** Drafts are visible in `next dev` but excluded from production builds. */
  draft?: boolean;
};

export type Post = PostMeta & { slug: string };

export type ProjectMeta = {
  title: string;
  summary: string;
  /** ISO date, used for ordering (newest first). */
  date: string;
  tech: string[];
  repoUrl?: string;
  liveUrl?: string;
  /** Path under /public, e.g. "/projects/my-project.png" (16:9 works best). */
  cover?: string;
  /** YouTube video id for a demo, e.g. "dQw4w9WgXcQ". */
  youtubeId?: string;
  /** Featured projects are shown on the home page. */
  featured?: boolean;
};

export type Project = ProjectMeta & { slug: string };
