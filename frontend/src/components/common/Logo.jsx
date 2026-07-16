import Link from "next/link";
import { siteConfig } from "@/config/site";

// The brand mark. Used by both the header and the footer, so it lives
// in its own file instead of being written twice.
export function Logo({ className = "" }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-md bg-primary font-display text-base font-bold text-navy">
        A
      </span>
      <span className="font-display text-lg font-bold text-foreground">
        {siteConfig.name}
      </span>
    </Link>
  );
}
