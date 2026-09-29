import { Suspense } from 'react';
import { Heart, Plane, Route, MapPin, Clock, ShieldCheck, Phone, Mail, Check, Briefcase, Repeat, ArrowRightLeft, Building2, Sparkles, Users, Target, Compass } from 'lucide-react';
import { cars, destinations, brand, telHref, mailHref, mapHref, mapEmbed, whatsappHref } from '@/data/site';
import { PageHero, Heading, Photo, ButtonLink, DestinationCard, FAQ, Gallery, HowItWorks, WhyChoose, CTA, FleetCarousel } from '@/components/site/shared';
import { CarCatalog, TourCatalog, FAQCatalog } from '@/components/site/catalog';
import { EnquiryForm } from '@/components/site/form';
import { WhatsAppIcon } from '@/components/site/layout';

type CardItem = { title: string; text: string; icon: React.ReactNode };

function ContentCards({ items, three = false }: { items: CardItem[]; three?: boolean }) {
  return (
    <div className={'contentcards' + (three ? ' three' : '')}>
      {items.map((x, i) => (
        <div className="contentcard" key={x.title} data-reveal style={{ '--d': `${i * 80}ms` } as React.CSSProperties}>
          <span className="iconcircle">{x.icon}</span>
          <h3>{x.title}</h3>
          <p>{x.text}</p>
        </div>
      ))}
    </div>
  );
}

export function CarsPage({ title }: { title: string }) {
  return (
    <>
      <PageHero title={title} label="OUR FLEET" image="fleet" text="Etios, Innova, Innova Crysta, Fortuner and Tempo Travellers — clean, comfortable and driven by professionals." />
      <section className="wrap section"><Suspense><CarCatalog /></Suspense></section>
      <HowItWorks />
      <CTA />
    </>
  );
}

export function ToursPage({ title }: { title: string }) {
  return (
    <>
      <PageHero title={title} label="CURATED NORTH INDIA JOURNEYS" image="ladakh" text="Travel at your own pace. Choose a suggested route and make it your own." />
      <section className="wrap section"><Suspense><TourCatalog /></Suspense></section>
      <WhyChoose />
      <CTA />
    </>
  );
}

export function DestinationsPage({ title }: { title: string }) {
  return (
    <>
      <PageHero title={title} label="DESTINATIONS" image="kashmir" text="From Punjab’s golden heart to the high Himalayas — follow your curiosity." />
      <section className="wrap section">
        <div className="destinationgrid">{destinations.map((d, i) => <DestinationCard key={d.slug} d={d} index={i} />)}</div>
      </section>
      <section className="section softbg">
        <div className="wrap splitcta" data-reveal>
          <div>
            <span className="eyebrow">TAKE THE SCENIC ROUTE</span>
            <h2>A Journey Built Around You</h2>
            <p>Shimla, Dalhousie, Dharamshala, Vaishno Devi, Kinnaur or Leh — tell us which places belong on your list.</p>
          </div>
          <ButtonLink href="/book?service=Tour%20Package">Create Your Itinerary</ButtonLink>
        </div>
      </section>
      <CTA />
    </>
  );
}

export function WeddingPage({ title }: { title: string }) {
  const weddingCars = cars.filter((c) => c.wedding);
  return (
    <>
      <PageHero title={title} label="WEDDING CARS BY SEKHON" image="wedding" text="For the little moments before the big moment — wedding travel planned around you." />
      <section className="wrap section aboutsplit">
        <div data-reveal>
          <span className="eyebrow">YOUR CELEBRATION, YOUR STYLE</span>
          <h2>More Than an Arrival. A Beautiful Beginning.</h2>
          <p>From the groom’s grand entry to the doli’s farewell, plan a seamless wedding journey with the car, decoration and chauffeur that suit your celebration. We also move your baraat and guests in comfortable Innovas and Tempo Travellers.</p>
          <ul className="ticklist">{['Fortuner & Innova Crysta for the couple', 'Fresh floral decoration to your theme', 'Tempo Travellers for baraat & guests', 'Punctual, well-dressed chauffeurs'].map((x) => <li key={x}><Check size={16} />{x}</li>)}</ul>
          <div className="btnrow">
            <ButtonLink href="/book?service=Wedding%20Car">Discuss Your Wedding</ButtonLink>
            <ButtonLink href={whatsappHref('Hello Sekhon Tour and Travel, I need wedding cars for my event.')} variant="ghost" icon={false}><WhatsAppIcon size={17} /> WhatsApp</ButtonLink>
          </div>
        </div>
        <div data-reveal="right"><Gallery images={['wedding', 'wedding-detail', 'chauffeur']} title="Wedding car inspiration" /></div>
      </section>
      <section className="section softbg">
        <div className="wrap">
          <Heading label="THE WEDDING FLEET" title="Arrive in Your Own Style" text="Choose the car for the couple and the right vehicles for your family and guests." />
          <FleetCarousel list={weddingCars} wedding />
        </div>
      </section>
      <section className="wrap section">
        <Heading label="THE PERSONAL TOUCHES" title="Every Detail, Considered" />
        <ContentCards three items={[
          { title: 'Decoration Choices', text: 'Fresh roses, marigold garlands, ribbons or a minimal finish — matched to your theme.', icon: <Sparkles /> },
          { title: 'Chauffeur Service', text: 'Arrival times, waiting periods and transfers between ceremony and reception, all planned.', icon: <Heart /> },
          { title: 'Guest Transfers', text: 'Innovas and Tempo Travellers to move family and guests between hotels and venues.', icon: <Users /> },
        ]} />
      </section>
      <section className="wrap section narrow">
        <Heading label="BEFORE THE BIG DAY" title="Wedding Travel Questions" center />
        <FAQ group="Wedding Cars" />
      </section>
      <CTA />
    </>
  );
}

const taxiCards: CardItem[] = [
  { title: 'Local Amritsar Taxi', text: 'Golden Temple, Wagah Border, shopping and sightseeing on hourly or full-day packages.', icon: <MapPin /> },
  { title: 'Outstation Trips', text: 'Chandigarh, Delhi, Jammu, Himachal and beyond — with stops you choose.', icon: <Route /> },
  { title: 'One-Way Drops', text: 'Pay only for the journey you need, with transparent point-to-point pricing.', icon: <ArrowRightLeft /> },
  { title: 'Round Trips', text: 'Keep the car and driver for the whole trip and travel back at your pace.', icon: <Repeat /> },
  { title: 'Corporate Travel', text: 'Reliable transport for meetings, guests and business schedules.', icon: <Briefcase /> },
  { title: 'Airport Connections', text: 'Pickups and drops at Amritsar, Chandigarh and Delhi airports.', icon: <Plane /> },
];

const airportCards: CardItem[] = [
  { title: 'Airport Pickup', text: 'Your driver waits at arrivals with a name board — share your flight number when booking.', icon: <Plane /> },
  { title: 'Airport Drop', text: 'Timely pickups planned with room for traffic and check-in.', icon: <Clock /> },
  { title: 'Intercity Transfers', text: 'Amritsar ⇄ Chandigarh, Delhi and Jammu airport transfers.', icon: <Building2 /> },
];

export function TaxiPage({ title, airport }: { title: string; airport: boolean }) {
  return (
    <>
      <PageHero
        title={title}
        label={airport ? 'AIRPORT TRANSFERS' : 'CHAUFFEUR-DRIVEN TRAVEL'}
        image={airport ? 'airport' : 'chauffeur'}
        text={airport ? 'Comfortable pickups and drops at Sri Guru Ram Dass Jee International Airport, Amritsar — and beyond.' : 'Leave the driving to our experienced drivers and make more of the journey.'}
      />
      <section className="wrap section">
        <Heading label="TRAVEL MADE EASIER" title={airport ? 'From Touchdown to Your Door' : 'A Driver for Every Kind of Day'} />
        <ContentCards items={airport ? airportCards : taxiCards} three={airport} />
        <div className="btnrow" style={{ marginTop: 34 }}>
          <ButtonLink href={'/book?service=' + encodeURIComponent(airport ? 'Airport Transfer' : 'Taxi With Driver')}>Request a Quote</ButtonLink>
          <ButtonLink href={telHref} variant="ghost" icon={false}><Phone size={17} /> {brand.phoneDisplay}</ButtonLink>
        </div>
      </section>
      <section className="section softbg">
        <div className="wrap">
          <Heading label="CHOOSE YOUR COMFORT" title="Cars for Every Group Size" text="From a sedan for two to a Tempo Traveller for the whole family." href="/cars" link="View All Cars" />
          <FleetCarousel />
        </div>
      </section>
      <HowItWorks />
      <section className="wrap section narrow">
        <Heading label="A LITTLE CLARITY" title="Before You Travel" center />
        <FAQ group={airport ? 'Airport Transfer' : 'Taxi'} />
      </section>
      <CTA />
    </>
  );
}

export function AboutPage({ title }: { title: string }) {
  return (
    <>
      <PageHero title={title} label="THE SEKHON STORY" image="fleet" text="A love of the open road — and a thoughtful approach to getting you there." />
      <section className="wrap section aboutsplit">
        <div className="aboutimage" data-reveal="zoom"><Photo name="fleet" alt="Sekhon Tour and Travel fleet lined up at sunrise" /><span className="aboutbadge"><Compass size={20} /> Based in Amritsar</span></div>
        <div data-reveal>
          <span className="eyebrow">WHO WE ARE</span>
          <h2>Good Travel Starts With Understanding You.</h2>
          <p>Sekhon Tour and Travel is an Amritsar-based travel company bringing car rentals, chauffeur-driven taxis, wedding cars and North India tour packages together in one place.</p>
          <p>Our approach is simple: listen to your plans, suggest the right vehicle, give you a clear quote and make sure the journey feels effortless — whether it’s an airport pickup or a two-week mountain road trip.</p>
          <div className="btnrow"><ButtonLink href="/contact">Let’s Talk Travel</ButtonLink><ButtonLink href="/cars" variant="ghost">Our Fleet</ButtonLink></div>
        </div>
      </section>
      <section className="section softbg">
        <div className="wrap">
          <ContentCards three items={[
            { title: 'Our Mission', text: 'Make travel planning clear and personal, with honest pricing and dependable vehicles.', icon: <Target /> },
            { title: 'Our Fleet & Drivers', text: 'Etios, Innova, Innova Crysta, Fortuner and Tempo Travellers with experienced, courteous drivers.', icon: <ShieldCheck /> },
            { title: 'Our North India Focus', text: 'From Punjab and Himachal to Kashmir and Ladakh — routes we know and love.', icon: <MapPin /> },
          ]} />
        </div>
      </section>
      <WhyChoose />
      <CTA />
    </>
  );
}

export function BookPage({ title, book }: { title: string; book: boolean }) {
  return (
    <>
      <PageHero title={title} label={book ? 'BOOKING ENQUIRY' : 'CONTACT SEKHON'} image={book ? 'hero-punjab' : 'amritsar'} text="Tell us about your plans — we’ll work out the perfect journey together." />
      <section className="wrap section contactgrid">
        <div className="contactintro" data-reveal>
          <span className="eyebrow">EVERY GREAT TRIP STARTS WITH A CONVERSATION</span>
          <h2>Where Would You Like to Go?</h2>
          <p>Call, WhatsApp or send the form — we usually reply quickly with availability and a clear quote.</p>
          <a className="contactrow" href={telHref}><span className="iconcircle"><Phone /></span><span><small>Call us</small>{brand.phoneDisplay}</span></a>
          <a className="contactrow" href={whatsappHref()} target="_blank" rel="noopener noreferrer"><span className="iconcircle"><WhatsAppIcon size={20} /></span><span><small>WhatsApp</small>Chat with our team</span></a>
          <a className="contactrow" href={mailHref}><span className="iconcircle"><Mail /></span><span><small>Email</small><span className="break">{brand.email}</span></span></a>
          <a className="contactrow" href={mapHref} target="_blank" rel="noopener noreferrer"><span className="iconcircle"><MapPin /></span><span><small>Office</small>{brand.address}</span></a>
          <div className="contactrow static"><span className="iconcircle"><Clock /></span><span><small>Bookings</small>Open all week, Monday to Sunday</span></div>
        </div>
        <Suspense fallback={<p>Loading enquiry form…</p>}><EnquiryForm /></Suspense>
      </section>
      <section className="wrap mapsection" data-reveal>
        <iframe title="Sekhon Tour and Travel location on Google Maps" src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <a className="btn mapbtn" href={mapHref} target="_blank" rel="noopener noreferrer"><MapPin size={17} /> Get Directions</a>
      </section>
    </>
  );
}

export function FaqPage({ title }: { title: string }) {
  return (
    <>
      <PageHero title={title} label="FREQUENTLY ASKED QUESTIONS" image="innova" text="A clearer plan makes for a better journey." />
      <section className="wrap section narrow"><FAQCatalog /></section>
      <CTA />
    </>
  );
}

export function LegalPage({ title, privacy }: { title: string; privacy: boolean }) {
  return (
    <>
      <PageHero title={title} label="INFORMATION" image="spiti" />
      <section className="wrap section prosepage">
        {privacy ? (
          <>
            <p>This page describes how Sekhon Tour and Travel handles information shared through this website.</p>
            <h2>Information You Share</h2>
            <p>The enquiry form collects your name, phone number, email address, travel dates, pickup and destination, passenger count, preferred vehicle and any requirements you choose to provide. Please do not submit payment card details or identity documents through this form.</p>
            <h2>How It Is Used</h2>
            <p>Your information is used only to respond to your enquiry, prepare a quotation and arrange your travel. Submitting an enquiry does not confirm a booking or authorise any payment.</p>
            <h2>Storage & Access</h2>
            <p>Enquiry details are emailed to our team through FormSubmit (formsubmit.co), an email-forwarding service, and a backup copy is kept securely in our website host’s (Netlify) form records. They are never displayed publicly or sold to third parties.</p>
            <h2>Your Requests</h2>
            <p>To correct or delete an enquiry, contact us at {brand.email} or {brand.phoneDisplay} with your enquiry reference.</p>
            <h2>External Services</h2>
            <p>Telephone, WhatsApp and Google Maps links open separate services governed by their own privacy policies.</p>
          </>
        ) : (
          <>
            <p>This website provides travel information and accepts enquiries. Bookings are confirmed only after the details are agreed with our team.</p>
            <h2>Enquiries & Confirmation</h2>
            <p>Submitting the form sends a booking request. A vehicle or tour is reserved only when the service, dates, price and conditions are agreed in writing.</p>
            <h2>Images</h2>
            <p>Vehicle and destination images are representative. The exact model year, variant and decoration are confirmed with your booking.</p>
            <h2>Prices & Inclusions</h2>
            <p>Prices are provided on request as an itemised quote listing distance, fuel, driver allowance, tolls, parking, state taxes and permits where applicable.</p>
            <h2>Changes & Cancellation</h2>
            <p>Cancellation, refund, waiting-time and rescheduling conditions are shared with your quotation and accepted before payment.</p>
            <h2>Travel Conditions</h2>
            <p>Routes and schedules may depend on weather, road access, permits and local regulations. Our drivers may adjust routes for safety.</p>
            <h2>Contact</h2>
            <p>{brand.name}, {brand.address}. Phone {brand.phoneDisplay}, email {brand.email}.</p>
          </>
        )}
      </section>
    </>
  );
}
