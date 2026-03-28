'use client';

import AppImage from '@/src/components/ui/AppImage';
import React, { useEffect } from 'react';

interface ServiceCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  details: string[];
  colSpan: string;
  imageSrc?: string;
  imageAlt?: string;
  dark?: boolean;
  accent?: boolean;
  icon: React.ReactNode;
}

function BedIcon() {
  return (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12V7a1 1 0 011-1h16a1 1 0 011 1v5M3 12h18M3 12v5a1 1 0 001 1h16a1 1 0 001-1v-5M7 12V9h4v3M13 12V9h4v3" />
    </svg>);

}
function WifiIcon() {
  return (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
    </svg>);

}
function FoodIcon() {
  return (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>);

}
function LaundryIcon() {
  return (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <circle cx="12" cy="13" r="4" />
      <path strokeLinecap="round" d="M7 7h.01M10 7h4" />
    </svg>);

}
function ShieldIcon() {
  return (
    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>);

}

const services: ServiceCard[] = [
{
  id: 'rooms',
  tag: 'Accommodation',
  title: 'Fully Furnished Rooms',
  description: 'Move in with just your clothes. Every room includes a premium mattress, study desk, ergonomic chair, wardrobe, and storage shelves.',
  details: ['Single & double sharing options', 'Premium mattress & bedding', 'Study desk + ergonomic chair', 'Personal wardrobe & storage', 'Daily housekeeping'],
  colSpan: 'md:col-span-7',
  imageSrc: "https://img.rocket.new/generatedImages/rocket_gen_img_1fe894b99-1773160659932.png",
  imageAlt: 'Fully furnished PG room with bed, study desk, and wardrobe',
  icon: <BedIcon />
},
{
  id: 'wifi',
  tag: 'Connectivity',
  title: 'High-Speed WiFi',
  description: '100 Mbps fiber broadband across all floors. Dedicated bandwidth per room — no throttling during peak hours.',
  details: ['100 Mbps fiber', 'No data cap', 'All floors covered', 'Backup router per floor'],
  colSpan: 'md:col-span-5',
  dark: true,
  icon: <WifiIcon />
},
{
  id: 'food',
  tag: 'Optional Add-on',
  title: 'Home-Cooked Meals',
  description: 'Vegetarian meal plan available at ₹1,500/month extra. Breakfast at 8 AM, dinner at 8 PM — freshly prepared daily.',
  details: ['Breakfast + dinner daily', 'Vegetarian menu', '₹1,500/month add-on', 'Weekly menu rotation', 'Festival specials'],
  colSpan: 'md:col-span-4',
  accent: true,
  icon: <FoodIcon />
},
{
  id: 'laundry',
  tag: 'Utilities',
  title: 'Laundry Service',
  description: 'In-house washing machines and dryers available 24/7 at no extra cost. Dedicated laundry area on each floor.',
  details: ['24/7 machine access', 'No extra charges', 'Dryers available', 'Ironing board provided'],
  colSpan: 'md:col-span-4',
  imageSrc: "https://images.unsplash.com/photo-1638212152961-efa297032a57",
  imageAlt: 'Modern laundry room with washing machines',
  icon: <LaundryIcon />
},
{
  id: 'security',
  tag: 'Safety',
  title: '24/7 Security',
  description: 'Biometric entry gates, 32-camera CCTV system, on-site security guard, and a resident caretaker available round the clock.',
  details: ['Biometric entry', '32-camera CCTV', 'On-site security guard', 'Resident caretaker', 'Emergency response'],
  colSpan: 'md:col-span-4',
  icon: <ShieldIcon />
}];


export default function ServicesBentoGrid() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services-grid"
      className="py-16 px-5 bg-cream border-t border-primary/5"
      aria-labelledby="services-grid-heading">
      
      <div className="max-w-6xl mx-auto">
        <h2 id="services-grid-heading" className="sr-only">All Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {services.map((service, i) =>
          <article
            key={service.id}
            className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i * 100, 400)}` : ''} ${service.colSpan} relative overflow-hidden rounded-3xl card-lift group
                ${service.dark ? 'bg-primary text-cream' : service.accent ? 'bg-accent text-cream' : 'bg-white border border-primary/5'}
                ${service.imageSrc ? 'min-h-[320px]' : 'p-8 min-h-[220px]'}
              `}>
            
              {service.imageSrc &&
            <div className="absolute inset-0">
                  <AppImage
                src={service.imageSrc}
                alt={service.imageAlt || service.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw" />
              
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/40 to-primary/5" aria-hidden="true" />
                </div>
            }

              <div className={`relative z-10 flex flex-col justify-between h-full p-8 ${service.imageSrc ? 'min-h-[320px]' : ''}`}>
                {/* Top: tag + icon */}
                <div className="flex items-start justify-between">
                  <span
                  className={`section-tag ${service.dark || service.imageSrc ? 'text-white/40' : service.accent ? 'text-white/60' : ''}`}>
                  
                    {service.tag}
                  </span>
                  <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center
                      ${service.dark ? 'bg-white/10 text-cream' : service.accent ? 'bg-white/20 text-white' : service.imageSrc ? 'bg-white/10 text-white' : 'bg-primary/5 text-primary'}
                    `}>
                  
                    {service.icon}
                  </div>
                </div>

                {/* Bottom: title + desc + details */}
                <div className="mt-6">
                  <h3
                  className={`font-display text-2xl md:text-3xl font-semibold mb-3 ${
                  service.dark || service.imageSrc ? 'text-white' : service.accent ? 'text-white' : 'text-primary'}`
                  }>
                  
                    {service.title}
                  </h3>
                  <p
                  className={`text-sm leading-relaxed mb-5 ${
                  service.dark || service.imageSrc ? 'text-white/60' : service.accent ? 'text-white/80' : 'text-primary/55'}`
                  }>
                  
                    {service.description}
                  </p>

                  {/* Detail pills */}
                  <ul className="flex flex-wrap gap-2" aria-label={`${service.title} features`}>
                    {service.details.map((detail) =>
                  <li
                    key={detail}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                    service.dark || service.imageSrc ?
                    'bg-white/10 text-white/70' :
                    service.accent ?
                    'bg-white/20 text-white' : 'bg-primary/5 text-primary/60'}`
                    }>
                    
                        {detail}
                      </li>
                  )}
                  </ul>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>);

}