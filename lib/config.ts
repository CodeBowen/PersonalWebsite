/**
 * Site-wide settings. The site URL is the single source of truth for
 * canonical URLs, RSS, sitemap and social preview images. To move from
 * bowenzhang.dev to bowenzhang.com later, change NEXT_PUBLIC_SITE_URL.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  // Vercel preview deployments get their own URL.
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://bowenzhang.dev";
}

export const site = {
  url: resolveSiteUrl().replace(/\/$/, ""),
  name: "Bowen Zhang",
  title: "Bowen Zhang",
  // TODO(content): replace with your own one-line description.
  description:
    "Software engineer. I write about the things I build and learn along the way.",
  // TODO(content): set up this alias (e.g. Cloudflare Email Routing) to forward to your inbox.
  email: "hello@bowenzhang.dev",
  links: {
    // TODO(content): replace the LinkedIn URL with your real profile.
    github: "https://github.com/CodeBowen",
    linkedin: "https://www.linkedin.com/in/your-linkedin-id",
  },
  nav: [
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ],
} as const;
