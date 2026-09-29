import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteHeader, SiteFooter } from '@/components/site/layout';
import { Motion } from '@/components/site/motion';
import { brand } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(brand.origin),
  title: { default: 'Sekhon Tour and Travel | Journeys Made Simple', template: '%s | Sekhon Tour and Travel' },
  description: 'Car rentals, taxi with driver, luxury wedding cars and North India tour packages from Amritsar, Punjab. Innova, Crysta, Etios, Fortuner and Tempo Traveller. Call +91 80542 02500.',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = { themeColor: '#0e1b26' };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Motion />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
