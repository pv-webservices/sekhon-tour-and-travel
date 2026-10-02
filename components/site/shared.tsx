'use client';
import Link from '@/components/site/nav-link';
import { useRef, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Users, Fuel, Gauge, Car, Heart, MapPin, Check, ShieldCheck, Plane,
  Headphones, IndianRupee, CalendarDays, UserCheck, Route, KeyRound, Phone, Clock, Sparkles, Briefcase, Expand,
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { cars, faqs, brand, telHref, whatsappHref, type Car as CarType, type Destination } from '@/data/site';
import { WhatsAppIcon } from './layout';

export function Photo({ name, alt, className = '', priority = false }: { name: string; alt: string; className?: string; priority?: boolean }) {
  return (
    <img
      src={`/images/${name}.webp`}
      alt={alt}
      className={className}
      width={1376}
      height={768}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
    />
  );
}

type ButtonVariant = 'gold' | 'outline' | 'dark' | 'ghost';

export function ButtonLink({ href, children, variant = 'gold', external = false, icon = true }: { href: string; children: React.ReactNode; variant?: ButtonVariant; external?: boolean; icon?: boolean }) {
  const className = 'btn' + (variant === 'gold' ? '' : ` btn-${variant}`);
  const content = (
    <>
      <span className="btn-label">{children}</span>
      {icon && <ArrowRight size={17} className="btn-arrow" />}
    </>
  );
  if (external || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http')) {
    return <a className={className} href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{content}</a>;
  }
  return <Link className={className} href={href}>{content}</Link>;
}

export function Heading({ label, title, text, href, link = 'Explore more', center = false, light = false, children }: { label: string; title: React.ReactNode; text?: string; href?: string; link?: string; center?: boolean; light?: boolean; children?: React.ReactNode }) {
  return (
    <div className={'sectionhead' + (center ? ' center' : '') + (light ? ' light' : '')} data-reveal>
      <div>
        <span className="eyebrow">{label}</span>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {(href || children) && (
        <div className="sectionhead-actions">
          {href && <Link className="textlink" href={href}>{link}<ArrowRight size={16} /></Link>}
          {children}
        </div>
      )}
    </div>
  );
}

const weddingImage: Record<string, string> = { 'toyota-fortuner': 'wedding', 'innova-crysta': 'wedding-detail' };

export function FleetCard({ car, wedding = false, index = 0 }: { car: CarType; wedding?: boolean; index?: number }) {
  const base = wedding ? 'wedding-cars' : 'cars';
  const detail = `/${base}/${car.slug}`;
  const service = wedding ? 'Wedding Car' : car.category === 'Tempo Traveller' ? 'Tempo Traveller' : 'Car Rental';
  const book = `/book?service=${encodeURIComponent(service)}&vehicle=${encodeURIComponent(car.name)}`;
  return (
    <article className="fleetcard" data-reveal style={{ '--d': `${index * 90}ms` } as React.CSSProperties}>
      <Link className="carphoto" href={detail} aria-label={`View ${car.name}`}>
        <Photo name={wedding ? weddingImage[car.slug] ?? car.image : car.image} alt={`${car.name} ${wedding ? 'decorated for a wedding' : 'available for rent in Amritsar'}`} />
        <span className="badge">{wedding ? 'Wedding Ready' : car.tag}</span>
        <span className="photoarrow"><ArrowUpRight size={18} /></span>
      </Link>
      <div className="carbody">
        <span className="carcat">{car.category}</span>
        <Link href={detail}><h3>{car.name}</h3></Link>
        <div className="specs">
          <span><Users />{car.seats} Seats</span>
          <span><Gauge />{car.transmission}</span>
          <span><Fuel />{car.fuel}</span>
        </div>
        <div className="carfoot">
          <span className="carprice">Best Rates<small>Quote in minutes</small></span>
          <Link className="smallbtn" href={book}>Book Now <ArrowRight size={15} /></Link>
        </div>
      </div>
    </article>
  );
}

export function FleetCarousel({ list = cars, wedding = false }: { list?: CarType[]; wedding?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.fleetcard');
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 24), behavior: 'smooth' });
  };
  return (
    <div className="carousel">
      <div className="carouselcontrols">
        <button type="button" aria-label="Previous cars" onClick={() => scroll(-1)}><ChevronLeft /></button>
        <button type="button" aria-label="Next cars" onClick={() => scroll(1)}><ChevronRight /></button>
      </div>
      <div ref={ref} className="fleettrack">
        {list.map((c, i) => <FleetCard key={c.slug} car={c} wedding={wedding} index={i} />)}
      </div>
    </div>
  );
}

export function DestinationCard({ d, index = 0 }: { d: Destination; index?: number }) {
  return (
    <Link href={'/destinations/' + d.slug} className="destination" data-reveal style={{ '--d': `${index * 80}ms` } as React.CSSProperties}>
      <Photo name={d.image} alt={`${d.name} travel scenery`} />
      <div className="destinationbody">
        <span className="destinationregion"><MapPin size={13} />{d.region}</span>
        <h3>{d.name}</h3>
        <p>{d.desc}</p>
        <span className="duration">{d.duration}</span>
      </div>
      <span className="destarrow"><ArrowUpRight size={20} /></span>
    </Link>
  );
}

export function FAQ({ group, limit }: { group?: string; limit?: number }) {
  const list = faqs.filter((f) => !group || f.group === group).slice(0, limit);
  return (
    <Accordion type="single" collapsible className="faq">
      {list.map((f, i) => (
        <AccordionItem value={String(i)} key={f.q}>
          <AccordionTrigger>{f.q}</AccordionTrigger>
          <AccordionContent>{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function Gallery({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const step = (dir: number) => setIndex((index + images.length + dir) % images.length);
  return (
    <>
      <button type="button" className="gallerymain" aria-label={`Open ${title} gallery`} onClick={() => setOpen(true)}>
        <Photo name={images[index]} alt={title} priority />
        <span><Expand size={16} /> View gallery</span>
      </button>
      {images.length > 1 && (
        <div className="thumbnails">
          {images.map((x, i) => (
            <button type="button" key={x} aria-label={`View image ${i + 1}`} aria-pressed={index === i} onClick={() => setIndex(i)}>
              <Photo name={x} alt="" />
            </button>
          ))}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gallerymodal">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Image {index + 1} of {images.length}</DialogDescription>
          <Photo name={images[index]} alt={title} />
          {images.length > 1 && (
            <div className="gallerybuttons">
              <button type="button" onClick={() => step(-1)} aria-label="Previous image"><ChevronLeft /></button>
              <button type="button" onClick={() => step(1)} aria-label="Next image"><ChevronRight /></button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

const steps = [
  { title: 'Choose Your Car', text: 'Pick from sedans, SUVs, MPVs and Tempo Travellers.', icon: Car },
  { title: 'Share Trip Details', text: 'Tell us your dates, pickup point and route.', icon: CalendarDays },
  { title: 'Confirm & Travel', text: 'Get a clear quote, confirm, and enjoy the ride.', icon: KeyRound },
];

export function HowItWorks() {
  return (
    <section className="section howitworks">
      <div className="wrap">
        <Heading label="SIMPLE & QUICK" title="How It Works" text="Get on the road in just a few easy steps." center />
        <div className="steps" data-reveal>
          <div className="stepline" aria-hidden="true"><span /></div>
          {steps.map(({ title, text, icon: Icon }, i) => (
            <div className="step" key={title} style={{ '--d': `${200 + i * 180}ms` } as React.CSSProperties}>
              <div className="stepicon"><Icon /><span className="stepnumber">0{i + 1}</span></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const trustItems = [
  { icon: Headphones, title: 'Quick Support', text: 'Call or WhatsApp — we respond fast' },
  { icon: ShieldCheck, title: 'Clean & Verified Cars', text: 'Well-maintained, sanitised vehicles' },
  { icon: Plane, title: 'Airport Pickup', text: 'On-time airport pickups & drops' },
  { icon: IndianRupee, title: 'Transparent Pricing', text: 'Clear quotes, no hidden charges' },
];

export function Trust() {
  return (
    <div className="trust">
      <div className="wrap trustgrid">
        {trustItems.map(({ icon: Icon, title, text }, i) => (
          <div key={title} className="trustitem" data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
            <span className="trusticon"><Icon /></span>
            <div><strong>{title}</strong><span>{text}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

const whyItems = [
  { icon: Car, title: 'Reliable Fleet', text: 'Urbania, Crysta, Carens, Tempo Travellers, Fortuner, Etios & Innova' },
  { icon: UserCheck, title: 'Professional Drivers', text: 'Experienced, courteous and route-savvy' },
  { icon: CalendarDays, title: 'Flexible Booking', text: 'Hourly, daily, one-way or long tours' },
  { icon: Plane, title: 'Airport Service', text: 'Amritsar, Chandigarh & Delhi airports' },
  { icon: Heart, title: 'Wedding Specialists', text: 'Decorated cars & guest transfers' },
  { icon: Route, title: 'Local Tour Expertise', text: 'Best routes across North India' },
];

export function WhyChoose() {
  return (
    <section className="section why">
      <div className="wrap">
        <Heading label="WHY CHOOSE US" title="Your Trusted Travel Partner" text="We go the extra mile to make your journey safe, comfortable and memorable." />
        <div className="whygrid">
          {whyItems.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="whycard" data-reveal style={{ '--d': `${i * 70}ms` } as React.CSSProperties}>
              <span className="iconcircle"><Icon /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="finalcta">
      <div className="finalcta-bg" data-parallax="0.12"><Photo name="story-road" alt="" /></div>
      <div className="wrap finalcta-inner" data-reveal>
        <div>
          <span className="eyebrow">THE ROAD IS CALLING</span>
          <h2>Ready for Your Next Journey?</h2>
          <p>Book your car, plan your tour or get in touch with our team today.</p>
        </div>
        <div className="finalcta-actions">
          <ButtonLink href="/book">Book a Car</ButtonLink>
          <ButtonLink href={telHref} variant="outline" icon={false}><Phone size={17} /> Call Now</ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function StoryBand() {
  return (
    <section className="story">
      <div className="story-bg" data-zoom><Photo name="story-road" alt="Family enjoying a Himalayan viewpoint during a road trip" /></div>
      <div className="wrap storyinner" data-reveal>
        <span className="eyebrow">OUR STORY</span>
        <h2>Journeys Made Simple</h2>
        <p>Real roads. Real experiences. From the lanes of Amritsar to the lakes of Ladakh, we plan the ride so you can enjoy the view.</p>
        <div className="storyactions">
          <ButtonLink href="/about">Discover Sekhon</ButtonLink>
          <ButtonLink href={whatsappHref()} variant="outline" icon={false}><WhatsAppIcon size={17} /> WhatsApp Us</ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function PageHero({ title, label = 'SEKHON TOUR AND TRAVEL', text, image = 'manali', crumb }: { title: string; label?: string; text?: string; image?: string; crumb?: { label: string; href: string } }) {
  return (
    <section className="pagehero">
      <div className="pagehero-bg"><Photo name={image} alt="" priority /></div>
      <div className="wrap pagehero-inner">
        <nav className="crumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {crumb && (<><ChevronRight size={13} /><Link href={crumb.href}>{crumb.label}</Link></>)}
          <ChevronRight size={13} />
          <span>{title}</span>
        </nav>
        <span className="eyebrow">{label}</span>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}

export function QuotePanel({ service, vehicle = '', destination = '', title = 'Let’s Plan Your Journey' }: { service: string; vehicle?: string; destination?: string; title?: string }) {
  const params = new URLSearchParams({ service });
  if (vehicle) params.set('vehicle', vehicle);
  if (destination) params.set('destination', destination);
  const message = `Hello Sekhon Tour and Travel, I’m interested in ${vehicle || destination || service}. Please share details.`;
  return (
    <aside className="enquirypanel">
      <span className="eyebrow">GET A QUOTE</span>
      <h3>{title}</h3>
      <p>Share your dates and route — we’ll send a clear, all-inclusive quote.</p>
      <ul className="panelpoints">
        <li><Check size={16} /> No hidden charges</li>
        <li><Clock size={16} /> Quick response</li>
        <li><Sparkles size={16} /> Clean, sanitised vehicles</li>
      </ul>
      <ButtonLink href={`/book?${params.toString()}`}>Book Now</ButtonLink>
      <ButtonLink href={whatsappHref(message)} variant="dark" icon={false}><WhatsAppIcon size={17} /> WhatsApp</ButtonLink>
      <a className="panelcall" href={telHref}><Phone size={16} /> {brand.phoneDisplay}</a>
    </aside>
  );
}

export function ServiceIcon({ name }: { name: string }) {
  const icons: Record<string, typeof Car> = { 'Car Rental': Car, 'Taxi With Driver': UserCheck, 'Luxury Wedding Cars': Heart, 'Tour Packages': MapPin, 'Airport Transfer': Plane, Corporate: Briefcase };
  const Icon = icons[name] ?? Car;
  return <Icon />;
}
