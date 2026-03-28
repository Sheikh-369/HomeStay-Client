'use client';

import React, { useEffect } from 'react';

export default function ServicesHero() {
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
    reveals?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      className="relative pt-36 pb-20 px-5 overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* Ambient blobs */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-sage/10 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
      <div className="max-w-6xl mx-auto">
        <div className="max-w-4xl">
          <span className="reveal section-tag block mb-4">What We Offer</span>
          <h1
            id="services-heading"
            className="reveal display-heading text-primary mb-6"
          >
            Services built{' '}
            <span className="italic font-light text-accent/80">for residents,</span>
            <br />
            not landlords.
          </h1>
          <p className="reveal reveal-delay-100 text-lg md:text-xl text-primary/55 max-w-2xl leading-relaxed">
            Every service at PGStay is designed to make your stay comfortable, productive, and worry-free — from the day you move in to the day you move on.
          </p>
        </div>

        {/* Service count row */}
        <div className="reveal reveal-delay-200 grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
          {[
            { value: '5+', label: 'Core Services' },
            { value: '100%', label: 'Utility Included' },
            { value: '24/7', label: 'Security & Support' },
            { value: '₹6K', label: 'Starting Price' },
          ]?.map((s) => (
            <div
              key={s?.label}
              className="bg-white/60 border border-primary/5 rounded-2xl px-5 py-5 text-center"
            >
              <p className="font-display text-2xl font-bold text-primary">{s?.value}</p>
              <p className="section-tag mt-1">{s?.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}