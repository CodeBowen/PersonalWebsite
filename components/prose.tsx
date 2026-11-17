/** Typography styles for MDX content (Tailwind typography plugin). */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert prose-a:text-accent prose-pre:rounded-lg prose-pre:text-sm prose-img:rounded-lg prose-code:before:content-none prose-code:after:content-none">
      {children}
    </div>
  );
}
