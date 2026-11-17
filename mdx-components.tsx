import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { YouTube } from "@/components/youtube";

// Components available in every MDX file without importing them.
const components: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  // Markdown images (![alt](/photos/x.jpg)) have no known size, so they stay
  // plain lazy <img>s. For optimized photos, import the file in the MDX and
  // use <Image src={photo} alt="..." /> instead.
  img: ({ alt = "", ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} loading="lazy" decoding="async" {...props} />
  ),
  Image: ({ alt, ...props }: ImageProps) => (
    <Image
      alt={alt}
      sizes="(max-width: 768px) 100vw, 720px"
      style={{ width: "100%", height: "auto" }}
      {...props}
    />
  ),
  YouTube,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
