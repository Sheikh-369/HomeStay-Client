'use client'
import ServicesHero from './components/ServicesHero';
import ServicesBentoGrid from './components/ServicesBentoGrid';
import ServicesCtaStrip from './components/ServicesCtaStrip';
import { WebPage } from 'schema-dts';
import Header from '@/src/components/header';
import Footer from '@/src/components/footer';

const webPageSchema: WebPage = {
  '@type': 'WebPage',
  name: 'PGStay Services — Furnished Rooms, WiFi, Food & More',
  description: 'Explore PGStay services: furnished rooms, high-speed WiFi, optional food plan, laundry, and 24/7 security.',
  url: 'http://localhost:3000/services',
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ '@context': 'https://schema.org', ...webPageSchema }),
        }}
      />
      <Header />
      <main id="main-content">
        <ServicesHero />
        <ServicesBentoGrid />
        <ServicesCtaStrip />
      </main>
      <Footer />
    </>
  );
}