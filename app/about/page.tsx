import type { Metadata } from "next";
import { Prose } from "@/components/prose";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}.`,
  alternates: { canonical: "/about" },
};

// TODO(content): put a redacted CV (no phone number or home address) at
// public/cv.pdf, then set this to "/cv.pdf".
const CV_PATH: string | null = null;

export default function AboutPage() {
  return (
    <article className="pt-8">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>

      {/* TODO(content): add a photo, e.g. public/me.jpg, with next/image:
          <Image src="/me.jpg" alt="Bowen Zhang" width={160} height={160} className="rounded-full" priority /> */}

      <div className="mt-6">
        <Prose>
          {/* TODO(content): replace with your bio. */}
          <p>
            I&apos;m {site.name}, a software engineer. Write a few paragraphs here: what you work
            on, what you care about, and what you do outside work.
          </p>
          <h2>Get in touch</h2>
          <p>
            Email me at <a href={`mailto:${site.email}`}>{site.email}</a>, or find me on{" "}
            <a href={site.links.github}>GitHub</a> and <a href={site.links.linkedin}>LinkedIn</a>.
          </p>
          {CV_PATH && (
            <p>
              <a href={CV_PATH}>Download my CV (PDF)</a>
            </p>
          )}
        </Prose>
      </div>
    </article>
  );
}
