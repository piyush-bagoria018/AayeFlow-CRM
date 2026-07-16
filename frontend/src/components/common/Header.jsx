"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { Button } from "@/components/ui/Button";

export function Header() {
  // Tracks whether the mobile menu is open. This is why the file needs
  // "use client" - useState only works in a client component.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />

          {/* Desktop navigation. Hidden below the md breakpoint. */}
          <nav className="hidden items-center gap-8 md:flex">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted transition hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="#contact">
              <Button variant="primary">Contact Sales</Button>
            </Link>
          </div>

          {/* Mobile menu button. Hidden from md upwards. */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6 text-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu. Only in the page when it is open. */}
        {isMenuOpen ? (
          <nav className="flex flex-col gap-1 border-t border-border py-4 md:hidden">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-md px-2 py-2 text-sm font-medium text-muted transition hover:bg-surface hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link href="#contact" onClick={closeMenu} className="mt-2">
              <Button variant="primary" className="w-full">
                Contact Sales
              </Button>
            </Link>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
