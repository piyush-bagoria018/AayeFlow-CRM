import Link from "next/link";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/Button";
import { pricingPlans } from "@/data/pricing";

// Small tick used in the feature list of each plan.
function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export function Pricing() {
  return (
    <Section id="pricing" className="bg-surface">
      <SectionHeader
        eyebrow="Pricing"
        title="Simple pricing that grows with you"
        subtitle="Start free for 14 days. Change plan or leave whenever you like, and your data always stays yours."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            // The popular plan gets a teal border so the eye lands on it first.
            className={`relative flex flex-col rounded-xl border bg-background p-6 ${
              plan.isPopular
                ? "border-primary shadow-lg lg:-mt-2 lg:mb-2"
                : "border-border"
            }`}
          >
            {plan.isPopular ? (
              <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-bold text-navy">
                Most popular
              </span>
            ) : null}

            <h3 className="font-display text-lg font-semibold text-foreground">
              {plan.name}
            </h3>
            <p className="mt-1 text-sm text-muted">{plan.description}</p>

            <div className="mt-5 flex items-baseline gap-1">
              {/* "Custom" has no rupee sign in front of it. */}
              {plan.price === "Custom" ? (
                <span className="font-display text-3xl font-bold text-foreground">
                  Custom
                </span>
              ) : (
                <>
                  <span className="font-display text-3xl font-bold text-foreground">
                    &#8377;{plan.price}
                  </span>
                </>
              )}
            </div>
            <p className="mt-1 text-xs text-muted">{plan.period}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-sm text-foreground">
                  <CheckIcon />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="#contact" className="mt-8 block">
              <Button
                variant={plan.isPopular ? "primary" : "outline"}
                className="w-full"
              >
                {plan.ctaLabel}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
