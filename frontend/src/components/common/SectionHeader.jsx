export function SectionHeader({ eyebrow, title, subtitle, align = "center" }) {
  const isCentered = align === "center";

  return (
    <div className={isCentered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold tracking-wide text-accent uppercase">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
        {title}
      </h2>

      {subtitle ? <p className="mt-4 text-base text-muted">{subtitle}</p> : null}
    </div>
  );
}
