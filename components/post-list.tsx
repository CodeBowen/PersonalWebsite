import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Post } from "@/lib/types";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return <p className="text-muted">No posts yet.</p>;

  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`} className="group block">
            <time dateTime={post.date} className="text-sm text-muted">
              {formatDate(post.date)}
              {post.draft && " · draft"}
            </time>
            <h3 className="font-medium group-hover:text-accent">{post.title}</h3>
            <p className="text-muted">{post.summary}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
