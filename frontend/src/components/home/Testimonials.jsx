import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { testimonials } from "@/data/testimonials";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeader
        eyebrow="Testimonials"
        title="Teams that stopped losing deals"
        subtitle="What sales leaders say after moving their pipeline to AayeFlow."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="flex flex-col rounded-xl border border-border bg-surface p-6"
          >
            <blockquote className="flex-1 text-sm text-foreground">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/20 font-display text-sm font-bold text-accent">
                {getInitials(testimonial.name)}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
