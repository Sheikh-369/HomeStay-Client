'use client';

import AppImage from '@/src/components/ui/AppImage';
import React, { useEffect } from 'react';

interface BentoCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  colSpan: string;
  rowSpan?: string;
  imageSrc?: string;
  imageAlt?: string;
  accent?: boolean;
  dark?: boolean;
}

const bentoCards: BentoCard[] = [
{
  id: 'affordable',
  tag: 'Pricing',
  title: 'Genuinely Affordable',
  description: 'Rooms starting at ₹6,000/month with all utilities included. No hidden charges, no deposit surprises.',
  colSpan: 'md:col-span-5',
  imageSrc: "https://img.rocket.new/generatedImages/rocket_gen_img_1e1c09fb1-1773147665919.png",
  imageAlt: 'Clean budget-friendly furnished PG room with natural light'
},
{
  id: 'safe',
  tag: 'Security',
  title: '24/7 Safety',
  description: 'Biometric entry, CCTV surveillance, on-site caretaker, and gated premises.',
  colSpan: 'md:col-span-4',
  dark: true
},
{
  id: 'furnished',
  tag: 'Amenities',
  title: 'Fully Furnished',
  description: 'Bed, mattress, study desk, wardrobe, and storage — move in with just your bag.',
  colSpan: 'md:col-span-3',
  accent: true
},
{
  id: 'wifi',
  tag: 'Connectivity',
  title: 'High-Speed WiFi',
  description: '100 Mbps fiber broadband included. Seamless streaming and video calls.',
  colSpan: 'md:col-span-4',
  imageSrc: "https://img.rocket.new/generatedImages/rocket_gen_img_14d66710f-1774678897057.png",
  imageAlt: 'Laptop on desk showing fast internet connection in PG room'
},
{
  id: 'food',
  tag: 'Meals',
  title: 'Optional Food Plan',
  description: 'Home-cooked vegetarian meals available at ₹1,500/month extra. Breakfast + dinner.',
  colSpan: 'md:col-span-4'
},
{
  id: 'laundry',
  tag: 'Services',
  title: 'Laundry Included',
  description: 'In-house washing machines available 24/7. No extra cost for residents.',
  colSpan: 'md:col-span-4'
}];


export default function HighlightsBento() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="highlights"
      className="py-24 px-5 bg-cream border-t border-primary/5"
      aria-labelledby="highlights-heading">
      
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div className="reveal">
            <span className="section-tag block mb-3">Why PGStay</span>
            <h2 id="highlights-heading" className="display-heading-sm text-primary">
              Everything you need,{' '}
              <span className="italic font-light text-accent/80">nothing you don't.</span>
            </h2>
          </div>
          <p className="reveal reveal-delay-100 text-base text-primary/55 max-w-xs leading-relaxed">
            We designed PGStay so you can focus on your studies or career — not on daily logistics.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {bentoCards.map((card, i) =>
          <div
            key={card.id}
            className={`reveal ${i > 0 ? `reveal-delay-${Math.min(i * 100, 400)}` : ''} ${card.colSpan} relative overflow-hidden rounded-3xl card-lift
                ${card.dark ? 'bg-primary text-cream' : card.accent ? 'bg-accent text-cream' : 'bg-white border border-primary/5'}
                ${card.imageSrc ? 'min-h-[280px]' : 'p-8 min-h-[180px]'}
              `}>
            
              {card.imageSrc &&
            <div className="absolute inset-0">
                  <AppImage
                src={card.imageSrc}
                alt={card.imageAlt || card.title}
                fill
                className="object-cover img-grayscale"
                sizes="(max-width: 768px) 100vw, 50vw" />
              
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" aria-hidden="true" />
                </div>
            }
              <div className={`relative z-10 flex flex-col justify-between h-full p-8 ${card.imageSrc ? 'min-h-[280px]' : ''}`}>
                <span
                className={`section-tag ${card.dark || card.imageSrc ? 'text-white/50' : card.accent ? 'text-white/60' : ''}`}>
                
                  {card.tag}
                </span>
                <div className="mt-auto">
                  <h3
                  className={`font-display text-2xl md:text-3xl font-semibold mb-2 ${
                  card.dark || card.imageSrc ? 'text-white' : card.accent ? 'text-white' : 'text-primary'}`
                  }>
                  
                    {card.title}
                  </h3>
                  <p
                  className={`text-sm leading-relaxed ${
                  card.dark || card.imageSrc ? 'text-white/60' : card.accent ? 'text-white/75' : 'text-primary/55'}`
                  }>
                  
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}