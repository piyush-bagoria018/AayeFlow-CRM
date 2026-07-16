import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { features } from "@/data/features";

export function Features() {
  return (
    <Section id="features">
      <SectionHeader
        eyebrow="Features"
        title="Everything you need to close more deals"
        subtitle="The tools your team uses every day, in one place, without the setup work most CRMs demand."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-border bg-surface p-6 transition hover:border-primary"
          >
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/15">
              <svg
                className="h-5 w-5 text-accent"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d={feature.iconPath} />
              </svg>
            </span>

            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-muted">{feature.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
