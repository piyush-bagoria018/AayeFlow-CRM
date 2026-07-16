// Temporary page - replaced by the real landing page in a later step.
// For now it only proves the fonts and colour tokens are wired up.
export default function Home() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-foreground">
        AayeFlow
      </h1>
      <p className="mt-3 text-muted">
        Design tokens and fonts are working. Landing page comes next.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <span className="rounded-md bg-primary px-4 py-2 font-semibold text-navy">
          Primary teal
        </span>
        <span className="rounded-md bg-navy px-4 py-2 font-semibold text-white">
          Navy
        </span>
        <span className="rounded-md bg-accent px-4 py-2 font-semibold text-white">
          Accent blue
        </span>
        <span className="rounded-md border border-border bg-surface px-4 py-2 font-semibold text-foreground">
          Surface
        </span>
      </div>
    </main>
  );
}
