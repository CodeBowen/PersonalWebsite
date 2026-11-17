import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-xl border border-border transition hover:border-accent"
    >
      {project.cover && (
        <div className="relative aspect-video w-full border-b border-border">
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 360px"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="font-medium group-hover:text-accent">{project.title}</h3>
        <p className="mt-1 text-sm text-muted">{project.summary}</p>
        <TechList tech={project.tech} className="mt-3" />
      </div>
    </Link>
  );
}

export function TechList({ tech, className = "" }: { tech: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tech.map((t) => (
        <li key={t} className="rounded-full border border-border px-2 py-0.5 text-xs text-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}
