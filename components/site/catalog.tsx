'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link, { withTrailingSlash } from '@/components/site/nav-link';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { cars, tours, faqGroups, carCategories, tourRegions, type Tour } from '@/data/site';
import { FleetCard, Photo, ButtonLink, FAQ } from './shared';

/** Filter state initialised from a query parameter and kept in sync with the URL without reloading. */
function useUrlFilter<T extends string>(param: string, options: readonly T[], fallback: T): [T, (value: T) => void] {
  const params = useSearchParams();
  const requested = params.get(param) ?? fallback;
  const [value, setValue] = useState<T>(options.includes(requested as T) ? (requested as T) : fallback);
  const update = (next: T) => {
    setValue(next);
    const url = new URL(window.location.href);
    if (next === fallback) url.searchParams.delete(param);
    else url.searchParams.set(param, next);
    window.history.replaceState(window.history.state, '', url);
  };
  return [value, update];
}

function FilterPills<T extends string>({ label, options, value, base, param, fallback, onSelect }: { label: string; options: readonly T[]; value: T; base: string; param: string; fallback: T; onSelect: (value: T) => void }) {
  return (
    <div className="filters" aria-label={label}>
      {options.map((c) => (
        <a
          key={c}
          className={'filter' + (value === c ? ' selected' : '')}
          href={withTrailingSlash(c === fallback ? base : `${base}?${param}=${encodeURIComponent(c)}`)}
          aria-current={value === c ? 'page' : undefined}
          onClick={(e) => { e.preventDefault(); onSelect(c); }}
        >
          {c}
        </a>
      ))}
    </div>
  );
}

export function CarCatalog() {
  const [filter, setFilter] = useUrlFilter('category', carCategories, 'All Cars');
  const wedding = filter === 'Wedding';
  const list = cars.filter((c) => filter === 'All Cars' || (wedding ? c.wedding : c.category === filter));
  return (
    <>
      <FilterPills label="Filter cars" options={carCategories} value={filter} base="/cars" param="category" fallback="All Cars" onSelect={setFilter} />
      <div className="fleetgrid catalog" key={filter}>
        {list.map((c, i) => <FleetCard key={c.slug} car={c} wedding={wedding} index={i} />)}
      </div>
      <p className="fineprint">Vehicle images are representative. Exact model year and variant are confirmed with your booking.</p>
    </>
  );
}

export function TourCatalog() {
  const [filter, setFilter] = useUrlFilter('region', tourRegions, 'All Tours');
  const list = tours.filter((t) => filter === 'All Tours' || filter === t.region);
  return (
    <>
      <FilterPills label="Filter tours" options={tourRegions} value={filter} base="/tours" param="region" fallback="All Tours" onSelect={setFilter} />
      <div className="contentcards" key={filter}>
        {list.map((t, i) => <TourCard key={t.slug} tour={t} index={i} />)}
        <div className="emptyresult" data-reveal>
          <h3>Have a different route in mind?</h3>
          <p>Vaishno Devi, Dalhousie, Shimla, Uttarakhand or a multi-city trip — we’ll build a custom itinerary for your dates.</p>
          <ButtonLink href="/book?service=Tour%20Package">Plan a Custom Tour</ButtonLink>
        </div>
      </div>
    </>
  );
}

export function TourCard({ tour: t, index = 0 }: { tour: Tour; index?: number }) {
  return (
    <article className="tourcard" data-reveal style={{ '--d': `${index * 90}ms` } as React.CSSProperties}>
      <Link href={'/tours/' + t.slug} className="tourphoto" aria-label={t.title}>
        <Photo name={t.image} alt={`${t.name} tour`} />
        <span className="badge">{t.duration}</span>
      </Link>
      <div className="tourcardbody">
        <div className="tourmeta"><MapPin size={14} />{t.region}<span>·</span><Clock size={14} />{t.days} Days</div>
        <Link href={'/tours/' + t.slug}><h3>{t.title}</h3></Link>
        <p>{t.desc}</p>
        <div className="tourfoot">
          <Link className="textlink" href={'/tours/' + t.slug}>View Itinerary <ArrowRight size={16} /></Link>
          <Link className="smallbtn" href={`/book?service=Tour%20Package&destination=${encodeURIComponent(t.name)}`}>Enquire</Link>
        </div>
      </div>
    </article>
  );
}

export function FAQCatalog() {
  const [group, setGroup] = useState(faqGroups[0]);
  return (
    <>
      <div className="filters" role="tablist" aria-label="FAQ topics">
        {faqGroups.map((x) => (
          <button type="button" role="tab" aria-selected={group === x} key={x} className={'filter' + (group === x ? ' selected' : '')} onClick={() => setGroup(x)}>
            {x}
          </button>
        ))}
      </div>
      <FAQ group={group} />
    </>
  );
}
