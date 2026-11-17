import { ImageResponse } from "next/og";
import { site } from "./config";

export const ogSize = { width: 1200, height: 630 };

/** Shared design for social preview images (the card shown on LinkedIn etc.). */
export function renderOgImage({ title, subtitle }: { title: string; subtitle?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0b0b0c",
          color: "#ededed",
        }}
      >
        <div style={{ fontSize: 32, color: "#60a5fa" }}>{site.url.replace(/^https?:\/\//, "")}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 34, color: "#a1a1aa" }}>{subtitle}</div>}
        </div>
        <div style={{ fontSize: 30 }}>{site.name}</div>
      </div>
    ),
    ogSize,
  );
}
