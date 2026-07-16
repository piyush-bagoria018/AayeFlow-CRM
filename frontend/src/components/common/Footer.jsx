import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import { Container } from "./Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted">
              {siteConfig.description}
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
            >
              {siteConfig.contactEmail}
            </a>
          </div>

          {/* Link columns, built from site.js */}
          {siteConfig.footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-display text-sm font-semibold text-foreground">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-sm text-muted">
            &copy; {currentYear} {siteConfig.name}. Built by Piyush Bagoria as an
            assessment submission for HelloAaye.
          </p>
        </div>
      </Container>
    </footer>
  );
}
