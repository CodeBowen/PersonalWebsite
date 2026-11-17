import { getPost } from "@/lib/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Blog post";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return renderOgImage({ title: post?.title ?? "Blog", subtitle: post?.summary });
}
