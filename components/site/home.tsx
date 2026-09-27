'use client';
import Link from '@/components/site/nav-link';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, MapPin, Phone, Pause, Play, Sparkles } from 'lucide-react';
import { destinations, telHref, brand } from '@/data/site';
import { Photo, ButtonLink } from './shared';

const SLIDE_MS = 6500;

const slides = [
  {
    image: 'hero',
    alt: 'Black Toyota Fortuner on a scenic Himalayan lakeside road',
    eyebrow: 'EXPLORE · DRIVE · TRAVEL',
    title: ['Drive Your', 'Journey.'],
    accent: 'Your Way.',
    text: 'Car rentals, chauffeur-driven taxis, luxury wedding cars and unforgettable North India tour packages — from Amritsar.',
    cta: { label: 'Explore Cars', href: '/cars' },
  },
  {
    image: 'hero-punjab',
    alt: 'White Innova Crysta driving through golden Punjab wheat fields at sunset',
    eyebrow: 'LOCAL · ONE-WAY · OUTSTATION',
    title: ['From Amritsar', 'To'],
    accent: 'Anywhere.',
    text: 'Airport pickups, Golden Temple darshan, Wagah Border or a long drive to the hills — with experienced local drivers.',
    cta: { label: 'Book a Taxi', href: '/taxi-with-driver' },
  },
  {
    image: 'tempo',
    alt: 'White Tempo Traveller driving on a Himalayan mountain highway',
    eyebrow: 'GROUP TOURS · TEMPO TRAVELLERS',
    title: ['Travel Together.', 'Travel'],
    accent: 'Better.',
    text: '12 to 17 seater Tempo Travellers with push-back seats for family holidays, pilgrimages and wedding guests.',
    cta: { label: 'View Tempo Traveller', href: '/cars/tempo-traveller' },
  },
];

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [index, paused]);

  const go = (dir: number) => setIndex((i) => (i + slides.length + dir) % slides.length);

  return (
    <section className={'hero' + (paused ? ' is-paused' : '')} aria-roledescription="carousel" aria-label="Sekhon Tour and Travel highlights">
      {slides.map((s, i) => (
        <div key={s.image} className={'heroslide' + (i === index ? ' active' : '')} aria-hidden={i !== index}>
          <Photo name={s.image} alt={s.alt} priority={i === 0} />
        </div>
      ))}
      <div className="heroshade" />
      <div className="wrap herocontent">
        {slides.map((s, i) => (
          <div key={s.image} className={'herocopy' + (i === index ? ' active' : '')} aria-hidden={i !== index}>
            <div className="heroeyebrow"><span />{s.eyebrow}</div>
            {i === 0 ? (
              <h1>{s.title[0]}<br />{s.title[1]}<br /><em>{s.accent}</em></h1>
            ) : (
              <p className="herotitle">{s.title[0]}<br />{s.title[1]} <em>{s.accent}</em></p>
            )}
            <p className="herotext">{s.text}</p>
            <div className="heroactions">
              <ButtonLink href={s.cta.href}>{s.cta.label}</ButtonLink>
              <ButtonLink href="/tours" variant="outline">Plan Your Trip</ButtonLink>
            </div>
          </div>
        ))}
      </div>

      <a className="herocard" href={telHref} aria-label={`Call ${brand.phoneDisplay}`}>
        <span className="herocard-icon"><Phone size={20} /></span>
        <span><small>Book instantly</small><strong>{brand.phoneDisplay}</strong></span>
        <span className="herocard-live"><span />Open for bookings</span>
      </a>

      <div className="wrap herobottom">
        <div className="herodots">
          {slides.map((s, i) => (
            <button type="button" key={s.image} className={i === index ? 'active' : ''} onClick={() => setIndex(i)} aria-label={`Show slide ${i + 1}`} aria-current={i === index}>
              <span className="dotnum">0{i + 1}</span>
              <span className="dotbar"><span style={{ animationDuration: `${SLIDE_MS}ms` }} /></span>
            </button>
          ))}
        </div>
        <div className="heroarrows">
          <button type="button" onClick={() => go(-1)} aria-label="Previous slide"><ChevronLeft size={20} /></button>
          <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>
          <button type="button" onClick={() => go(1)} aria-label="Next slide"><ChevronRight size={20} /></button>
        </div>
        <a href="#fleet" className="scrollcue"><span>Scroll to explore</span><ChevronDown size={16} /></a>
      </div>
    </section>
  );
}

const PIN_QUERY = '(prefers-reduced-motion: no-preference)';

/** Pinned section: vertical scrolling moves the destination cards horizontally on every screen size. */
export function DestinationScroller() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const sticky = section?.firstElementChild as HTMLElement | null;
    if (!section || !track || !sticky) return;
    const media = window.matchMedia(PIN_QUERY);
    let distance = 0;
    let stickyTop = 0;
    let frame = 0;

    // Section height = pinned panel height + horizontal travel, so the pin releases exactly when the last card arrives.
    const measure = () => {
      if (!media.matches) {
        section.style.height = '';
        track.style.transform = '';
        section.classList.remove('pinned');
        return;
      }
      section.classList.add('pinned');
      stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
      distance = Math.max(0, track.scrollWidth - track.parentElement!.clientWidth);
      section.style.height = `${sticky.offsetHeight + distance}px`;
      update();
    };
    const update = () => {
      frame = 0;
      if (!media.matches) return;
      const travelled = stickyTop - section.getBoundingClientRect().top;
      const progress = distance ? Math.min(1, Math.max(0, travelled / distance)) : 0;
      track.style.transform = `translate3d(${(-progress * distance).toFixed(1)}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress.toFixed(3)})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    media.addEventListener('change', measure);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      media.removeEventListener('change', measure);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="destscroller" aria-labelledby="dest-title">
      <div className="deststicky">
        <div className="wrap destscroller-head">
          <div>
            <span className="eyebrow">TOP DESTINATIONS</span>
            <h2 id="dest-title">Explore North India With Us</h2>
            <p>Discover breathtaking destinations with our curated tour packages.</p>
          </div>
          <div className="destscroller-meta">
            <Link className="textlink" href="/destinations">View All Destinations <ArrowRight size={16} /></Link>
            <span className="destprogress" aria-hidden="true"><span ref={barRef} /></span>
          </div>
        </div>
        <div className="destviewport">
          <div className="desttrack" ref={trackRef}>
            {destinations.map((d, i) => (
              <Link key={d.slug} href={`/destinations/${d.slug}`} className="destpanel">
                <Photo name={d.image} alt={`${d.name} travel scenery`} />
                <span className="destpanel-num">0{i + 1}</span>
                <div className="destpanel-body">
                  <span className="destinationregion"><MapPin size={13} />{d.region}</span>
                  <h3>{d.name}</h3>
                  <p>{d.desc}</p>
                  <div className="destpanel-foot">
                    <span className="duration">{d.duration}</span>
                    <span className="destarrow"><ArrowUpRight size={18} /></span>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/book?service=Tour%20Package" className="destpanel destpanel-custom">
              <Sparkles size={34} />
              <h3>Your Own Route</h3>
              <p>Vaishno Devi, Dalhousie, Dharamshala or somewhere new — we’ll plan a custom itinerary around you.</p>
              <span className="btn btn-sm"><span className="btn-label">Plan a Custom Tour</span><ArrowRight size={16} className="btn-arrow" /></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const galleryRows = [
  [
    { image: 'fleet', label: 'Our Fleet', href: '/cars' },
    { image: 'crysta-interior', label: 'Crysta Captain Seats', href: '/cars/innova-crysta' },
    { image: 'wedding-detail', label: 'Wedding Decoration', href: '/wedding-cars' },
    { image: 'airport', label: 'Airport Pickup', href: '/airport-transfer' },
    { image: 'amritsar', label: 'Golden Temple Tours', href: '/tours/amritsar-heritage' },
  ],
  [
    { image: 'tempo-interior', label: 'Tempo Traveller Interior', href: '/cars/tempo-traveller' },
    { image: 'chauffeur', label: 'Professional Chauffeurs', href: '/taxi-with-driver' },
    { image: 'etios', label: 'Toyota Etios', href: '/cars/toyota-etios' },
    { image: 'kashmir', label: 'Kashmir Tours', href: '/tours/kashmir-tour' },
    { image: 'ladakh', label: 'Ladakh Road Trips', href: '/tours/ladakh-road-trip' },
  ],
];

export function GalleryMarquee() {
  return (
    <div className="marquee" aria-label="Photo gallery">
      {galleryRows.map((row, r) => (
        <div key={r} className={'marqueerow' + (r % 2 ? ' reverse' : '')}>
          <div className="marqueetrack">
            {[...row, ...row].map((item, i) => (
              <Link key={i} href={item.href} className="marqueeitem" tabIndex={i >= row.length ? -1 : undefined} aria-hidden={i >= row.length}>
                <Photo name={item.image} alt={item.label} />
                <span>{item.label}<ArrowUpRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
