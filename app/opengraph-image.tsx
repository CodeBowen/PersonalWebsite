import { site } from "@/lib/config";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = site.name;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: site.name, subtitle: site.description });
}
