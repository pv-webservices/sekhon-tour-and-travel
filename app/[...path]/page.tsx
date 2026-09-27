import { notFound } from 'next/navigation';
import { cars, tours, destinations, pageTitles, brand, faqs } from '@/data/site';
import { CarDetail, TourDetail, DestinationDetail } from '@/components/pages/details';
import { CarsPage, ToursPage, DestinationsPage, WeddingPage, TaxiPage, AboutPage, BookPage, FaqPage, LegalPage } from '@/components/pages/sections';

type Props = { params: Promise<{ path: string[] }> };

function findCar(base: string, slug: string) {
  const car = cars.find((c) => c.slug === slug);
  if (!car || (base === 'wedding-cars' && !car.wedding)) return undefined;
  return car;
}

function getTitle(path: string[]) {
  if (path.length === 1) return pageTitles[path[0]];
  if (path.length !== 2) return undefined;
  const [base, slug] = path;
  if (base === 'cars' || base === 'wedding-cars') {
    const car = findCar(base, slug);
    return car && (base === 'wedding-cars' ? `${car.name} for Weddings` : car.name);
  }
  if (base === 'tours') return tours.find((t) => t.slug === slug)?.title;
  if (base === 'destinations') return destinations.find((d) => d.slug === slug)?.name;
  return undefined;
}

export async function generateMetadata({ params }: Props) {
  const { path } = await params;
  const title = getTitle(path) || 'Page Not Found';
  const url = '/' + path.join('/');
  const description = `${title} — Sekhon Tour and Travel, Amritsar. Car rentals, taxis, wedding cars and North India tours. Call ${brand.phoneDisplay} for a quick quote.`;
  return { title, description, alternates: { canonical: url }, openGraph: { title: `${title} | Sekhon Tour and Travel`, description, url } };
}

function renderPage(path: string[], title: string) {
  const [base, slug] = path;
  if (slug) {
    if (base === 'cars' || base === 'wedding-cars') return <CarDetail car={findCar(base, slug)!} wedding={base === 'wedding-cars'} />;
    if (base === 'tours') return <TourDetail tour={tours.find((t) => t.slug === slug)!} />;
    return <DestinationDetail destination={destinations.find((d) => d.slug === slug)!} />;
  }
  switch (base) {
    case 'cars': return <CarsPage title={title} />;
    case 'tours': return <ToursPage title={title} />;
    case 'destinations': return <DestinationsPage title={title} />;
    case 'wedding-cars': return <WeddingPage title={title} />;
    case 'taxi-with-driver':
    case 'airport-transfer': return <TaxiPage title={title} airport={base === 'airport-transfer'} />;
    case 'about': return <AboutPage title={title} />;
    case 'book':
    case 'contact': return <BookPage title={title} book={base === 'book'} />;
    case 'faq': return <FaqPage title={title} />;
    default: return <LegalPage title={title} privacy={base === 'privacy-policy'} />;
  }
}

export default async function Page({ params }: Props) {
  const { path } = await params;
  const title = getTitle(path);
  if (!title) notFound();
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: brand.origin },
      { '@type': 'ListItem', position: 2, name: title, item: `${brand.origin}/${path.join('/')}` },
    ],
  };
  const faqLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
  return (
    <>
      {path[0] === 'faq' && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {renderPage(path, title)}
    </>
  );
}
