import Link from '@/components/site/nav-link';
import { ArrowRight, Check, Phone, MessageCircle, Heart, Users, Sparkles } from 'lucide-react';
import { Photo, ButtonLink, Heading, FleetCarousel, StoryBand, HowItWorks, WhyChoose, Trust, CTA, FAQ, ServiceIcon } from '@/components/site/shared';
import { HeroSlideshow, DestinationScroller, GalleryMarquee } from '@/components/site/home';
import { services, brand, telHref, whatsappHref } from '@/data/site';

export const metadata = {
  title: 'Sekhon Tour and Travel | Car Rental, Taxi & Tour Packages in Amritsar',
  description: 'Car rental and taxi service in Amritsar — Force Urbania, Innova Crysta, Kia Carens, Tempo Traveller, Fortuner, Etios and Innova with driver. Luxury wedding cars, airport transfers and North India tour packages. Call +91 80542 02500.',
  alternates: { canonical: '/' },
  openGraph: { title: 'Sekhon Tour and Travel', description: 'Drive your journey. Your way. Car rentals, wedding cars and tours from Amritsar.', url: '/', images: ['/images/hero.webp'] },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: brand.name,
  url: brand.origin,
  image: `${brand.origin}/images/hero.webp`,
  telephone: brand.phone,
  email: brand.email,
  address: { '@type': 'PostalAddress', streetAddress: '2227, Street No. 3, Old Jawahar Nagar', addressLocality: 'Amritsar', addressRegion: 'Punjab', addressCountry: 'IN' },
  areaServed: ['Amritsar', 'Punjab', 'Himachal Pradesh', 'Jammu & Kashmir', 'Ladakh'],
};

const weddingPoints = ['Premium & decorated cars', 'Professional, well-dressed chauffeurs', 'Baraat & guest transfers with Tempo Travellers', 'Custom packages for every budget'];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroSlideshow />
      <Trust />

      <section className="section fleetsection" id="fleet">
        <div className="wrap">
          <Heading label="OUR FLEET" title="Choose Your Ride" text="Well-maintained, comfortable and reliable cars for every journey." href="/cars" link="View All Cars" />
          <FleetCarousel />
        </div>
      </section>

      <section className="section servicessection">
        <div className="wrap">
          <Heading label="OUR SERVICES" title="Services Built Around Your Journey" text="From city rides and airport runs to grand weddings and curated tours — we’ve got every journey covered." />
          <div className="servicegrid">
            {services.map((s, i) => (
              <Link href={s.href} className="servicecard" key={s.title} data-reveal style={{ '--d': `${i * 100}ms` } as React.CSSProperties}>
                <Photo name={s.image} alt={s.title} />
                <span className="serviceindex">0{i + 1}</span>
                <div className="servicecontent">
                  <span className="serviceicon"><ServiceIcon name={s.title} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <span className="servicelink">{s.cta} <ArrowRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="weddingfeature">
        <div className="wrap weddinggrid">
          <div className="weddingcopy">
            <div data-reveal>
              <span className="eyebrow">MAKE EVERY MOMENT SPECIAL</span>
              <h2>Luxury Wedding Cars</h2>
              <p>Arrive in style with our premium wedding cars. From an elegant Innova Crysta to a commanding Fortuner, we add grace and comfort to your special day — decoration, chauffeur and guest transfers included.</p>
              <ul className="checklist">
                {weddingPoints.map((t) => <li key={t}><span><Check size={14} /></span>{t}</li>)}
              </ul>
              <div className="weddingactions">
                <ButtonLink href="/wedding-cars">View Wedding Fleet</ButtonLink>
                <ButtonLink href="/book?service=Wedding%20Car" variant="ghost">Get Wedding Quote</ButtonLink>
              </div>
            </div>
          </div>
          <div className="weddingstack">
            <figure className="weddingshot big" data-reveal="zoom">
              <Photo name="wedding" alt="Floral decorated Toyota Fortuner at an elegant wedding venue" />
              <figcaption><Heart size={15} /> Grand wedding entries</figcaption>
            </figure>
            <figure className="weddingshot" data-reveal="zoom">
              <Photo name="wedding-detail" alt="Wedding car bonnet decorated with roses and marigold garlands" />
              <figcaption><Sparkles size={15} /> Custom floral decoration</figcaption>
            </figure>
            <figure className="weddingshot" data-reveal="zoom">
              <Photo name="tempo" alt="Tempo Traveller for wedding guest transfers" />
              <figcaption><Users size={15} /> Guest transfers</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <DestinationScroller />
      <StoryBand />
      <HowItWorks />
      <WhyChoose />

      <section className="section gallerysection">
        <div className="wrap">
          <Heading label="INSIDE SEKHON" title="A Glimpse of Every Journey" text="Clean cabins, professional drivers and places worth the drive." center />
        </div>
        <GalleryMarquee />
      </section>

      <section className="section wrap faqsection">
        <div>
          <Heading label="GOOD TO KNOW" title="Frequently Asked Questions" href="/faq" link="All FAQs" />
          <div data-reveal><FAQ limit={5} /></div>
        </div>
        <aside className="helpcard" data-reveal="right">
          <Photo name="chauffeur" alt="Sekhon chauffeur welcoming a guest" />
          <div className="helpcard-body">
            <span className="eyebrow">WE’RE HERE TO HELP</span>
            <h3>Talk to Our Travel Team</h3>
            <p>Need a quick quote or help choosing a car? Call or WhatsApp — we’ll plan it with you.</p>
            <a className="helpline" href={telHref}><Phone size={18} /> {brand.phoneDisplay}</a>
            <a className="helpline" href={whatsappHref()} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Chat on WhatsApp</a>
            <p className="fineprint">Travelled with us? We’d love to hear your story — <a href={whatsappHref('Hello Sekhon Tour and Travel, I would like to share feedback about my journey.')} target="_blank" rel="noopener noreferrer">share your feedback</a>.</p>
          </div>
        </aside>
      </section>

      <CTA />
    </>
  );
}
