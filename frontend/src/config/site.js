export const siteConfig = {
  name: "AayeFlow",
  tagline: "CRM built for growing sales teams",
  description:
    "Capture every lead, track every deal, and close faster with a CRM your team will actually use.",

  // The leading "/" matters. "#features" means a section on the page you are
  // already on, so it does nothing from /admin.
  navLinks: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "FAQ", href: "/#faq" },
  ],

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
