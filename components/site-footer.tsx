import { site } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-auto w-full max-w-3xl px-4 py-10 text-sm text-muted sm:px-6">
      <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-6">
        <a href={`mailto:${site.email}`} className="hover:text-foreground">
          Email
        </a>
        <a href={site.links.github} className="hover:text-foreground" rel="me">
          GitHub
        </a>
        <a href={site.links.linkedin} className="hover:text-foreground" rel="me">
          LinkedIn
        </a>
        <a href="/rss.xml" className="hover:text-foreground">
          RSS
        </a>
      </div>
    </footer>
  );
}
