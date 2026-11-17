import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/content";
import { site } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);

  const pages = ["", "/about", "/projects", "/blog"].map((path) => ({
    url: `${site.url}${path}`,
  }));

  return [
    ...pages,
    ...posts
      .filter((post) => !post.draft)
      .map((post) => ({ url: `${site.url}/blog/${post.slug}`, lastModified: post.date })),
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      lastModified: project.date,
    })),
  ];
}
