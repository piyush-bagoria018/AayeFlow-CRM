// Brand details and navigation in one place.
// The header, footer and metadata all read from here, so changing the
// product name or a nav link only needs an edit in this file.
export const siteConfig = {
  name: "AayeFlow",
  tagline: "CRM built for growing sales teams",
  description:
    "Capture every lead, track every deal, and close faster with a CRM your team will actually use.",

  // Links used by the header. They point to sections on the landing page.
  //
  // The leading "/" matters. "#features" means "a section on the page I am
  // already on", so it does nothing from /admin. "/#features" means
  // "go to the home page, then scroll to features", which works everywhere.
  navLinks: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "FAQ", href: "/#faq" },
  ],

  // Links used by the footer, grouped by column.
  footerLinks: [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/#pricing" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Contact Sales", href: "/#contact" },
        { label: "Admin Dashboard", href: "/admin" },
      ],
    },
  ],

  contactEmail: "sales@aayeflow.com",
};
