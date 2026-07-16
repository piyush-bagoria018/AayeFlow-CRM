import { Section } from "@/components/common/Section";
import { SectionHeader } from "@/components/common/SectionHeader";
import { InquiryForm } from "./InquiryForm";

export function ContactSection() {
  return (
    <Section id="contact">
      <SectionHeader
        eyebrow="Contact Sales"
        title="Talk to our team"
        subtitle="Tell us about your team and we will show you how AayeFlow fits the way you already sell."
      />

      <div className="mx-auto mt-12 max-w-3xl">
        <InquiryForm />
      </div>
    </Section>
  );
}
