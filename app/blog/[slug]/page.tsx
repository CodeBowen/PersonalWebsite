import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Prose } from "@/components/prose";
import { getPost, getPostBody, getPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", publishedTime: post.date, url: `/blog/${slug}` },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const Body = await getPostBody(slug);

  return (
    <article className="pt-8">
      <header className="mb-8">
        <time dateTime={post.date} className="text-sm text-muted">
          {formatDate(post.date)}
        </time>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{post.title}</h1>
        <p className="mt-2 text-lg text-muted">{post.summary}</p>
      </header>
      <Prose>
        <Body />
      </Prose>
    </article>
  );
}
