import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Prose } from "@/components/prose";
import { TechList } from "@/components/project-card";
import { YouTube } from "@/components/youtube";
import { getProject, getProjectBody, getProjects } from "@/lib/content";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const Body = await getProjectBody(slug);

  return (
    <article className="pt-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">{project.title}</h1>
        <p className="mt-2 text-lg text-muted">{project.summary}</p>
        <TechList tech={project.tech} className="mt-4" />
        <div className="mt-4 flex gap-4 text-sm">
          {project.repoUrl && (
            <a href={project.repoUrl} className="text-accent hover:underline">
              Source code →
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} className="text-accent hover:underline">
              Live site →
            </a>
          )}
        </div>
      </header>

      {project.youtubeId ? (
        <YouTube id={project.youtubeId} title={`${project.title} demo`} />
      ) : (
        project.cover && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg border border-border">
            <Image
              src={project.cover}
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
        )
      )}

      <Prose>
        <Body />
      </Prose>
    </article>
  );
}
