import Link from "next/link";
import { site } from "@/lib/config";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-6 sm:px-6">
      <Link href="/" className="font-semibold tracking-tight hover:text-accent">
        {site.name}
      </Link>
      <nav aria-label="Main">
        <ul className="flex gap-5 text-sm text-muted">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
