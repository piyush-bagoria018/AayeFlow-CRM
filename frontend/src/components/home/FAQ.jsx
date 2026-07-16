"use client";

import { useState } from "react";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { faqs } from "@/data/faq";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <Section id="faq" className="bg-surface">
      <SectionHeader
        eyebrow="FAQ"
        title="Questions, answered"
        subtitle="Still unsure about something? Send us a message and our team will get back to you."
      />

      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              className="rounded-lg border border-border bg-background"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-foreground">
                  {faq.question}
                </span>

                <svg
                  className={`h-4 w-4 shrink-0 text-muted transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {isOpen ? (
                <p className="px-5 pb-4 text-sm text-muted">{faq.answer}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
