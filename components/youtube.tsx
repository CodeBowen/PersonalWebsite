"use client";

import { useState } from "react";

type YouTubeProps = {
  id: string;
  title: string;
};

/**
 * Click-to-load YouTube embed. Shows the video thumbnail first and only loads
 * YouTube's (heavy) iframe after a click, which keeps pages fast.
 */
export function YouTube({ id, title }: YouTubeProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="not-prose relative my-6 aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
          />
          <span className="absolute left-1/2 top-1/2 flex h-14 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg">
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
