import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/ui/Button";

// Numbers shown under the buttons. Kept next to the component because
// they are only ever used here.
const stats = [
  { value: "2,400+", label: "Sales teams" },
  { value: "18M+", label: "Deals tracked" },
  { value: "99.9%", label: "Uptime" },
];

export function Hero() {
  return (
    <section className="border-b border-border bg-surface">
      <Container className="py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Trusted by 2,400+ sales teams
          </p>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            The CRM your sales team will{" "}
            <span className="text-accent">actually use</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-muted sm:text-lg">
            AayeFlow captures every lead, tracks every deal and tells you which
            ones are going quiet. No more spreadsheets, no more lost follow ups.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/#contact" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Contact Sales
              </Button>
            </Link>
            <Link href="/#pricing" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See pricing
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-xs text-muted">
            14 day free trial. No credit card required.
          </p>
        </div>

        {/* Stat row */}
        <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-4 border-t border-border pt-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
