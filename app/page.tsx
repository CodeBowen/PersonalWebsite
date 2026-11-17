import Link from "next/link";
import { PostList } from "@/components/post-list";
import { ProjectCard } from "@/components/project-card";
import { getPosts, getProjects } from "@/lib/content";
import { site } from "@/lib/config";

export default async function HomePage() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="space-y-16 pt-8">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Hi, I&apos;m {site.name}.
        </h1>
        {/* TODO(content): write a two- or three-sentence intro. */}
        <p className="mt-4 max-w-xl text-lg text-muted">
          I&apos;m a software engineer who builds things for the web and the cloud. This is where I
          share my projects and write about what I&apos;m learning.
        </p>
        <p className="mt-4">
          <Link href="/about" className="text-accent hover:underline">
            More about me →
          </Link>
        </p>
      </section>

      <section aria-labelledby="featured-projects">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 id="featured-projects" className="text-xl font-semibold">
            Featured projects
          </h2>
          <Link href="/projects" className="text-sm text-muted hover:text-foreground">
            All projects →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section aria-labelledby="latest-posts">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 id="latest-posts" className="text-xl font-semibold">
            Latest writing
          </h2>
          <Link href="/blog" className="text-sm text-muted hover:text-foreground">
            All posts →
          </Link>
        </div>
        <PostList posts={posts.slice(0, 3)} />
      </section>
    </div>
  );
}
