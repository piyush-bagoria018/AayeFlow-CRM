// The three pricing plans. isPopular highlights the middle card,
// which is the plan we want most visitors to pick.
export const pricingPlans = [
  {
    name: "Starter",
    price: "999",
    period: "per user / month",
    description: "For small teams closing their first deals.",
    isPopular: false,
    ctaLabel: "Start free trial",
    features: [
      "Up to 3 users",
      "1,000 contacts",
      "Deal pipeline",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "2,499",
    period: "per user / month",
    description: "For teams that need reporting and automation.",
    isPopular: true,
    ctaLabel: "Start free trial",
    features: [
      "Up to 25 users",
      "Unlimited contacts",
      "Workflow automation",
      "Reports & analytics",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "billed annually",
    description: "For large teams with security and scale needs.",
    isPopular: false,
    ctaLabel: "Contact sales",
    features: [
      "Unlimited users",
      "Custom integrations",
      "Dedicated account manager",
      "99.9% uptime SLA",
      "Onboarding & training",
    ],
  },
];
