import type { Metadata } from "next";
import { PostList } from "@/components/post-list";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about software, projects and things I'm learning.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <div className="pt-8">
      <h1 className="mb-8 text-3xl font-semibold tracking-tight">Blog</h1>
      <PostList posts={posts} />
    </div>
  );
}
