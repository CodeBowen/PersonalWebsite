# bowenzhang.dev

Personal site: portfolio, blog, and a place to learn Next.js.
Built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS and MDX. Hosted on Vercel.

Repository: https://github.com/CodeBowen/PersonalWebsite

## Run it

```bash
npm install
npm run dev      # http://localhost:3000 (drafts visible)
npm run build    # production build
npm run lint
```

## Add content

- **Blog post:** add `content/blog/<slug>.mdx` starting with
  `export const metadata = { title, summary, date: "YYYY-MM-DD", draft: false }`.
- **Project:** add `content/projects/<slug>.mdx` with
  `export const metadata = { title, summary, date, tech: [...], repoUrl?, liveUrl?, cover?, youtubeId?, featured? }`.
  Cover images go in `public/projects/` (16:9).
- **Video in a post:** `<YouTube id="VIDEO_ID" title="..." />` (no import needed).
- **Photo in a post:** `![alt](/photos/x.jpg)` for a file in `public/photos/`, or
  `import photo from "./x.jpg"` + `<Image src={photo} alt="..." />` for automatic resizing.

Search the codebase for `TODO(content)` to find every placeholder to replace.

## How it's organised

| Path | What |
| --- | --- |
| `lib/content.ts` | The **only** module that reads content. Swap it for a database/CMS later; pages won't change. |
| `lib/types.ts` | `Post` and `Project` shapes. |
| `lib/config.ts` | Name, links, email, nav, and the site URL (`NEXT_PUBLIC_SITE_URL`). |
| `mdx-components.tsx` | Components available in every MDX file. |
| `app/` | Pages, RSS (`rss.xml`), sitemap, robots, social preview images. |

## Deploy (first time)

1. Push to GitHub (the remote is already set to `CodeBowen/PersonalWebsite`):
   ```bash
   git push -u origin main
   ```
2. At vercel.com (Hobby plan), **Add New → Project** and import `CodeBowen/PersonalWebsite`. No build settings needed.
   Every later `git push` to `main` redeploys automatically.
3. In Vercel: **Settings → Environment Variables**, set `NEXT_PUBLIC_SITE_URL=https://bowenzhang.dev`.
4. Buy `bowenzhang.dev`, add it under **Settings → Domains**, and follow the DNS instructions.
5. **Analytics → Enable** to turn on Vercel Web Analytics.

## Moving to bowenzhang.com later

Add the `.com` domain in Vercel, make it primary, redirect `.dev` to it (301), and change
`NEXT_PUBLIC_SITE_URL`. Keep renewing `.dev` so old links keep working.
