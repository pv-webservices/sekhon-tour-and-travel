import { Check, Users, Fuel, Gauge, Briefcase, Snowflake, Car as CarIcon, Clock, MapPin, CalendarDays, Sun } from 'lucide-react';
import { cars, tours, destinations, type Car, type Tour, type Destination } from '@/data/site';
import { PageHero, Heading, FleetCard, Gallery, FAQ, QuotePanel, CTA, DestinationCard } from '@/components/site/shared';
import { TourCard } from '@/components/site/catalog';

function Stats({ items }: { items: [string, string, React.ReactNode][] }) {
  return (
    <div className="statsgrid">
      {items.map(([label, value, icon]) => (
        <div className="stat" key={label}>
          <span className="staticon">{icon}</span>
          <div><small>{label}</small><strong>{value}</strong></div>
        </div>
      ))}
    </div>
  );
}

export function CarDetail({ car, wedding }: { car: Car; wedding: boolean }) {
  const images = wedding ? ['wedding', 'wedding-detail', ...car.gallery] : car.gallery;
  const perks = wedding
    ? ['Fresh floral or ribbon decoration to match your theme', 'Well-dressed, punctual chauffeur', 'Ceremony, reception and guest transfer planning', 'Available across Amritsar and Punjab']
    : ['Fully air-conditioned, clean and sanitised', 'Experienced, courteous driver', 'Local, one-way, round-trip and outstation plans', 'Transparent quote with tolls, parking and taxes listed'];
  return (
    <>
      <PageHero
        title={wedding ? `${car.name} for Weddings` : car.name}
        label={wedding ? 'WEDDING CARS' : `${car.category.toUpperCase()} · ${car.tag.toUpperCase()}`}
        image={wedding ? 'wedding' : car.image}
        text={car.description}
        crumb={wedding ? { label: 'Wedding Cars', href: '/wedding-cars' } : { label: 'Cars', href: '/cars' }}
      />
      <section className="wrap section detailgrid">
        <div className="detailcontent">
          <Gallery images={[...new Set(images)]} title={car.name} />
          <h2>{wedding ? 'Your Grand Arrival, Thoughtfully Arranged' : `Meet the ${car.name}`}</h2>
          <p>{car.description}</p>
          <Stats items={[
            ['Seats', car.seats, <Users key="u" />],
            ['Fuel', car.fuel, <Fuel key="f" />],
            ['Transmission', car.transmission, <Gauge key="g" />],
            ['Air conditioning', 'Yes', <Snowflake key="s" />],
            ['Vehicle class', car.category, <CarIcon key="c" />],
            ['Luggage', car.luggage, <Briefcase key="b" />],
          ]} />
          <h2>Perfect For</h2>
          <div className="chips">{car.bestFor.map((b) => <span key={b}>{b}</span>)}</div>
          <h2>{wedding ? 'What’s Included' : 'Comfort for Every Kilometre'}</h2>
          <ul className="ticklist">{perks.map((x) => <li key={x}><Check size={16} />{x}</li>)}</ul>
          <div className="twocol">
            <div className="infobox">
              <h3>{wedding ? 'Package Options' : 'Your Quote Covers'}</h3>
              <p>{wedding ? 'Choose a single arrival, ceremony-and-reception travel, or a full-day schedule with guest transfers.' : 'A written breakdown of the hire period, route, vehicle, driver allowance and agreed services.'}</p>
            </div>
            <div className="infobox">
              <h3>{wedding ? 'Decoration Choices' : 'Good to Know'}</h3>
              <p>{wedding ? 'Share your theme, colours and flower preferences — decoration is quoted separately and transparently.' : 'Fuel, tolls, parking, state taxes and night charges are listed upfront, so there are no surprises.'}</p>
            </div>
          </div>
          <h2>Frequently Asked Questions</h2>
          <FAQ group={wedding ? 'Wedding Cars' : 'Car Rental'} />
        </div>
        <QuotePanel service={wedding ? 'Wedding Car' : car.category === 'Tempo Traveller' ? 'Tempo Traveller' : 'Car Rental'} vehicle={car.name} />
      </section>
      <section className="section softbg">
        <div className="wrap">
          <Heading label="MORE POSSIBILITIES" title="Another Road. Another Ride." href="/cars" link="View All Cars" />
          <div className="fleetgrid">
            {cars.filter((x) => x.slug !== car.slug && (!wedding || x.wedding)).slice(0, 4).map((x, i) => <FleetCard key={x.slug} car={x} wedding={wedding} index={i} />)}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}

export function TourDetail({ tour }: { tour: Tour }) {
  const itinerary = itineraries[tour.slug] ?? [];
  const destination = destinations.find((d) => d.slug === tour.destinationSlug)!;
  return (
    <>
      <PageHero title={tour.title} label={`${tour.region.toUpperCase()} · ${tour.duration}`} image={tour.image} text={tour.desc} crumb={{ label: 'Tours', href: '/tours' }} />
      <section className="wrap section detailgrid">
        <div className="detailcontent">
          <Gallery images={[tour.image, 'story-road', 'innova']} title={tour.title} />
          <h2>A Journey Worth Taking</h2>
          <p>{tour.desc} This {tour.days}-day route is a starting point — share your dates, interests and preferred pace, and we’ll shape every detail around you.</p>
          <Stats items={[
            ['Duration', tour.duration, <Clock key="c" />],
            ['Start point', 'Amritsar or your city', <MapPin key="m" />],
            ['Travel style', 'Private & customised', <CarIcon key="v" />],
            ['Best season', tour.season.split(/[,;.]/)[0], <Sun key="s" />],
          ]} />
          <h2>Trip Highlights</h2>
          <div className="chips">{tour.attractions.map((x) => <span key={x}>{x}</span>)}</div>
          <h2>Day-by-Day Itinerary</h2>
          <ol className="itinerary">
            {itinerary.map(([title, text], i) => (
              <li key={title} data-reveal style={{ '--d': `${i * 60}ms` } as React.CSSProperties}>
                <span className="itinday">Day {i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
          <div className="twocol">
            <div className="infobox">
              <h3>Included</h3>
              <ul className="ticklist">{['Private AC vehicle with driver', 'Pickup & drop as agreed', 'Sightseeing as per itinerary', 'Tolls, parking & driver allowance'].map((x) => <li key={x}><Check size={16} />{x}</li>)}</ul>
            </div>
            <div className="infobox">
              <h3>On Request</h3>
              <ul className="ticklist">{['Hotel stays & meal plans', 'Flights or train tickets', 'Activity fees & entry tickets', 'Permits for restricted areas'].map((x) => <li key={x}><Check size={16} />{x}</li>)}</ul>
            </div>
          </div>
          <h2>Travel Notes</h2>
          <p>{tour.season} Allow buffer time for road and weather delays on mountain routes, and plan a gradual ascent for high-altitude destinations.</p>
          <h2>Before You Book</h2>
          <FAQ group="Tour Packages" />
        </div>
        <QuotePanel service="Tour Package" destination={destination.name} title="Make This Journey Yours" />
      </section>
      <section className="section softbg">
        <div className="wrap">
          <Heading label="KEEP EXPLORING" title="More Places to Fall For" href="/tours" link="All Tours" />
          <div className="contentcards">{tours.filter((x) => x.slug !== tour.slug).slice(0, 3).map((x, i) => <TourCard key={x.slug} tour={x} index={i} />)}</div>
        </div>
      </section>
      <CTA />
    </>
  );
}

export function DestinationDetail({ destination: d }: { destination: Destination }) {
  const tour = tours.find((t) => t.destinationSlug === d.slug);
  return (
    <>
      <PageHero title={d.name} label="DESTINATION GUIDE" image={d.image} text={d.desc} crumb={{ label: 'Destinations', href: '/destinations' }} />
      <section className="wrap section detailgrid">
        <div className="detailcontent">
          <Gallery images={[d.image, 'story-road']} title={d.name} />
          <h2>Discover {d.name}</h2>
          <p>{d.desc} Take time for the sights you love, leave space for unplanned stops, and let our drivers handle the road.</p>
          <Stats items={[
            ['Region', d.region, <MapPin key="m" />],
            ['Suggested stay', d.duration, <CalendarDays key="c" />],
            ['Best time', d.season.split(/[,;.]/)[0], <Sun key="s" />],
          ]} />
          <h2>Places to Explore</h2>
          <div className="contentcards three">
            {d.attractions.map((x, i) => (
              <div className="contentcard" key={x} data-reveal style={{ '--d': `${i * 80}ms` } as React.CSSProperties}>
                <span className="cardnum">0{i + 1}</span>
                <h3>{x}</h3>
              </div>
            ))}
          </div>
          <h2>Travel Thoughtfully</h2>
          <ul className="ticklist">{['Check weather and road access before departure.', 'Allow flexible travel time on mountain routes.', 'Respect local customs and dress codes at religious sites.', 'Confirm permits and vehicle restrictions in advance.'].map((x) => <li key={x}><Check size={16} />{x}</li>)}</ul>
          {tour && (<><h2>Our {d.name} Tour</h2><div className="contentcards"><TourCard tour={tour} /></div></>)}
        </div>
        <QuotePanel service="Tour Package" destination={d.name} />
      </section>
      <section className="section softbg">
        <div className="wrap">
          <Heading label="MORE DESTINATIONS" title="Where to Next?" href="/destinations" link="All Destinations" />
          <div className="destinationgrid">{destinations.filter((x) => x.slug !== d.slug).slice(0, 4).map((x, i) => <DestinationCard key={x.slug} d={x} index={i} />)}</div>
        </div>
      </section>
      <CTA />
    </>
  );
}

const itineraries: Record<string, [string, string][]> = {
  'amritsar-heritage': [
    ['Arrive & Golden Temple Evening', 'Pickup from Amritsar airport or railway station. Settle in, then witness the Golden Temple lit up at night and the Palki Sahib ceremony.'],
    ['Heritage & Wagah Border', 'Morning at Jallianwala Bagh and the heritage street, lunch at a famous dhaba, then the Beating Retreat ceremony at the Wagah Border.'],
    ['Last Look & Departure', 'An early Golden Temple visit, local shopping for phulkari and papad-wadiyan, then drop at your onward point.'],
  ],
  'himachal-tour': [
    ['Amritsar to Dharamshala', 'Scenic drive into the Kangra valley. Evening at McLeod Ganj.'],
    ['Dharamshala to Manali', 'A long mountain drive through Mandi and the Beas valley.'],
    ['Explore Manali', 'Hadimba Temple, Old Manali cafés and the Mall Road.'],
    ['Solang / Atal Tunnel Day', 'Snow points and adventure activities, subject to weather and access.'],
    ['Return Journey', 'Drive back with comfortable breaks and drop at Amritsar or your city.'],
  ],
  'spiti-valley': [
    ['Towards Shimla / Narkanda', 'Begin the journey with an overnight halt in the hills.'],
    ['Into Kinnaur', 'Follow the Sutlej river to Sangla or Kalpa.'],
    ['Arrive in Kaza', 'Reach the high valley and rest to acclimatise.'],
    ['Key Monastery & Villages', 'Key Monastery, Kibber and Langza, respecting local customs.'],
    ['Chandratal Excursion', 'A day for the moon lake, subject to road opening.'],
    ['Begin the Return', 'Retrace an open route with an overnight halt.'],
    ['Onward Journey', 'Complete the return with planned rest breaks.'],
  ],
  'kashmir-tour': [
    ['Arrive in Srinagar', 'Pickup and check-in to a houseboat or hotel. Evening shikara ride on Dal Lake.'],
    ['Srinagar Gardens', 'Mughal gardens — Nishat, Shalimar and Chashme Shahi.'],
    ['Gulmarg Day', 'Meadows and the Gondola ride (tickets separate).'],
    ['Pahalgam', 'Drive through saffron fields to the Lidder valley.'],
    ['Explore & Return', 'A relaxed morning and return towards Srinagar.'],
    ['Departure', 'Transfer to the airport or onward drive.'],
  ],
  'ladakh-road-trip': [
    ['Arrive in Leh', 'Rest and acclimatise — keep the first day light.'],
    ['Leh Local', 'Shanti Stupa, Leh Palace and the market.'],
    ['To Nubra via Khardung La', 'Cross the high pass to the valley of sand dunes.'],
    ['Nubra to Pangong', 'Drive to the famous turquoise lake.'],
    ['Pangong to Leh', 'Sunrise at the lake, then return via Chang La.'],
    ['Monasteries Day', 'Thiksey and Hemis monasteries at an easy pace.'],
    ['Departure', 'Transfer to Leh airport.'],
  ],
};
