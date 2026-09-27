'use client';
import Link from '@/components/site/nav-link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, ArrowRight, MapPin, Phone, Mail, ChevronDown, Clock, MessageCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { brand, destinations, tours, telHref, mailHref, mapHref, whatsappHref, carCategories } from '@/data/site';

type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

const carMenu = [
  ...carCategories.map((c) => ({ label: c, href: c === 'All Cars' ? '/cars' : `/cars?category=${encodeURIComponent(c)}` })),
  { label: 'Taxi With Driver', href: '/taxi-with-driver' },
  { label: 'Airport Transfer', href: '/airport-transfer' },
];

const tourMenu = [
  { label: 'All Tour Packages', href: '/tours' },
  ...tours.map((t) => ({ label: t.title, href: `/tours/${t.slug}` })),
  { label: 'All Destinations', href: '/destinations' },
  { label: 'Custom Tour', href: '/book?service=Tour%20Package' },
];

const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Cars', href: '/cars', children: carMenu },
  { label: 'Wedding Cars', href: '/wedding-cars' },
  { label: 'Tours', href: '/tours', children: tourMenu },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

function isActive(path: string, href: string) {
  return href === '/' ? path === '/' : path.startsWith(href);
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 9.44 9.45c0 5.21-4.24 9.44-9.45 9.44m8.04-17.48A11.3 11.3 0 0 0 12.05.68C5.78.68.68 5.78.68 12.05c0 2 .52 3.96 1.52 5.68L.58 23.62l6.03-1.58a11.4 11.4 0 0 0 5.43 1.38h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.9-3.33-8.04" />
    </svg>
  );
}
export { WhatsAppIcon };

function NavDropdown({ item, path }: { item: NavItem; path: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={'navdrop' + (open ? ' open' : '')} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className={'navlink' + (isActive(path, item.href) ? ' active' : '')}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
      >
        {item.label}
        <ChevronDown size={14} />
      </button>
      <div className="navmenu" role="menu">
        {item.children!.map((c) => (
          <Link role="menuitem" key={c.href} href={c.href} onClick={() => setOpen(false)}>
            {c.label}
            <ArrowRight size={14} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <>
      <div className="topbar">
        <div className="wrap topinner">
          <div className="topleft">
            <a href={telHref}><Phone size={13} /> {brand.phoneDisplay}</a>
            <a href={mailHref} className="hide-sm"><Mail size={13} /> {brand.email}</a>
          </div>
          <div className="topright">
            <a href={mapHref} target="_blank" rel="noopener noreferrer" className="hide-md"><MapPin size={13} /> {brand.city} (Our Base)</a>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Sekhon Tour and Travel" className="topwa"><WhatsAppIcon size={14} /> WhatsApp</a>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="wrap nav">
          <Link href="/" aria-label="Sekhon Tour and Travel home" className="logolink">
            <img className="logo" src="/images/logo.webp" alt="Sekhon Tour and Travel" width="210" height="64" />
          </Link>
          <nav className="desktopnav" aria-label="Main navigation">
            {nav.map((item) =>
              item.children ? (
                <NavDropdown key={item.label} item={item} path={path} />
              ) : (
                <Link key={item.label} className={'navlink' + (isActive(path, item.href) ? ' active' : '')} href={item.href}>
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <a className="navcall hide-md" href={telHref} aria-label={`Call ${brand.phoneDisplay}`}>
            <span className="navcallicon"><Phone size={17} /></span>
            <span><small>Call us</small>{brand.phoneDisplay}</span>
          </a>
          <Link className="btn btn-sm navbook" href="/book">Book Now <ArrowRight size={16} /></Link>
          <div className="mobilenav">
            <a href={telHref} className="iconbtn" aria-label="Call Sekhon Tour and Travel"><Phone size={19} /></a>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger aria-label="Open menu" className="iconbtn"><Menu size={21} /></SheetTrigger>
              <SheetContent className="drawerpanel">
                <SheetHeader>
                  <SheetTitle>Sekhon Tour and Travel</SheetTitle>
                  <SheetDescription>Where shall we go next?</SheetDescription>
                </SheetHeader>
                <nav className="drawer">
                  {[...nav, { label: 'Taxi With Driver', href: '/taxi-with-driver' }, { label: 'Airport Transfer', href: '/airport-transfer' }, { label: 'Destinations', href: '/destinations' }, { label: 'FAQ', href: '/faq' }].map((item) => (
                    <Link onClick={() => setOpen(false)} key={item.href} href={item.href} className={isActive(path, item.href) ? 'active' : ''}>
                      {item.label}
                      <ArrowRight size={17} />
                    </Link>
                  ))}
                </nav>
                <div className="drawerfoot">
                  <Link className="btn" onClick={() => setOpen(false)} href="/book">Book Your Ride <ArrowRight size={17} /></Link>
                  <a className="btn btn-outline-dark" href={telHref}><Phone size={17} /> {brand.phoneDisplay}</a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}

const footerServices = [
  ['Car Rental', '/cars'],
  ['Taxi With Driver', '/taxi-with-driver'],
  ['Luxury Wedding Cars', '/wedding-cars'],
  ['Tour Packages', '/tours'],
  ['Airport Transfer', '/airport-transfer'],
  ['Tempo Traveller', '/cars/tempo-traveller'],
];

export function SiteFooter() {
  return (
    <>
      <footer className="footer">
        <div className="footerglow" aria-hidden="true" />
        <div className="wrap footergrid">
          <div className="footerbrand">
            <Link href="/" className="footerlogo"><img src="/images/logo.webp" width="220" height="67" alt="Sekhon Tour and Travel" /></Link>
            <p>Your trusted partner in Amritsar for car rentals, chauffeur-driven taxis, wedding cars and North India tour packages.</p>
            <div className="footersocial">
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a>
              <a href={telHref} aria-label="Call"><Phone size={18} /></a>
              <a href={mailHref} aria-label="Email"><Mail size={18} /></a>
              <a href={mapHref} target="_blank" rel="noopener noreferrer" aria-label="Location on Google Maps"><MapPin size={18} /></a>
            </div>
          </div>
          <div>
            <h3>Quick Links</h3>
            {nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
            <Link href="/faq">FAQ</Link>
          </div>
          <div>
            <h3>Our Services</h3>
            {footerServices.map(([l, h]) => <Link key={l} href={h}>{l}</Link>)}
          </div>
          <div>
            <h3>Popular Destinations</h3>
            {destinations.map((d) => <Link key={d.slug} href={'/destinations/' + d.slug}>{d.name}</Link>)}
            <Link href="/destinations">All Destinations</Link>
          </div>
          <div className="footercontact">
            <h3>Contact Us</h3>
            <a href={mapHref} target="_blank" rel="noopener noreferrer"><MapPin size={17} /><span>{brand.address}</span></a>
            <a href={telHref}><Phone size={17} /><span>{brand.phoneDisplay}</span></a>
            <a href={mailHref}><Mail size={17} /><span className="break">{brand.email}</span></a>
            <p><Clock size={17} /><span>Mon – Sun · Bookings open all week</span></p>
          </div>
        </div>
        <div className="wrap footerbottom">
          <span>© {new Date().getFullYear()} Sekhon Tour and Travel. All rights reserved.</span>
          <div>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
          <span>Journeys made simple · Amritsar</span>
        </div>
      </footer>
      <a className="floatingwa" href={whatsappHref()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <WhatsAppIcon size={28} />
        <span className="floatingwa-tip">Chat with us</span>
      </a>
      <div className="mobilecontact">
        <a href={telHref}><Phone size={18} />Call</a>
        <a href={whatsappHref()} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />WhatsApp</a>
        <Link href="/book" className="mc-primary"><ArrowRight size={18} />Book Now</Link>
      </div>
    </>
  );
}
