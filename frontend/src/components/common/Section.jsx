import { Container } from "./Container";

// A page section with an id, so the header links (#features, #pricing)
// can scroll to it, and with the vertical spacing every section shares.
export function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`scroll-mt-20 py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
