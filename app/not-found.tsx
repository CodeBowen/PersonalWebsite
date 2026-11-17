import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-8">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted">
        That page doesn&apos;t exist.{" "}
        <Link href="/" className="text-accent hover:underline">
          Go home →
        </Link>
      </p>
    </div>
  );
}
