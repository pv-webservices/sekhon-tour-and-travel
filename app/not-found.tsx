import { ButtonLink } from '@/components/site/shared';

export default function NotFound() {
  return (
    <section className="wrap section notfound">
      <span className="eyebrow">A DIFFERENT ROAD</span>
      <h1>This page isn’t on the map.</h1>
      <p>Let’s get you back to planning your journey.</p>
      <div className="btnrow">
        <ButtonLink href="/">Back to Home</ButtonLink>
        <ButtonLink href="/cars" variant="ghost">Explore Cars</ButtonLink>
      </div>
    </section>
  );
}
