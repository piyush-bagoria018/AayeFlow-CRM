import { Container } from "./Container";

// scroll-mt-20 stops the sticky header covering the heading when a
// #section link is clicked.
export function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`scroll-mt-20 py-16 sm:py-24 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
