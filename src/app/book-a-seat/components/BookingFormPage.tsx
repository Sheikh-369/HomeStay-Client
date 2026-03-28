'use client';

import React, { useEffect } from 'react';
import BookingForm from './BookingForm';

export default function BookingFormPage() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    reveals?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section className="relative pt-36 pb-20 px-5 min-h-screen" aria-labelledby="booking-heading">
      {/* Ambient */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-accent/8 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-40 left-0 w-60 h-60 bg-sage/10 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Page header */}
        <div className="reveal text-center mb-12">
          <span className="section-tag block mb-3">Secure Your Spot</span>
          <h1 id="booking-heading" className="font-display text-4xl md:text-6xl font-bold text-primary leading-[0.92] tracking-tight mb-4">
            Book a Seat
          </h1>
          <p className="text-primary/55 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Fill in the details below and we'll confirm your seat within 2 business hours. No broker. No hidden fees.
          </p>
        </div>

        {/* Trust row */}
        <div className="reveal reveal-delay-100 flex flex-wrap justify-center gap-4 mb-10">
          {[
            'No broker fees',
            'Instant confirmation',
            'Secure form',
            'Cancel anytime',
          ]?.map((t) => (
            <span
              key={t}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 border border-primary/8 text-xs font-semibold text-primary/60"
            >
              <svg className="w-3 h-3 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {t}
            </span>
          ))}
        </div>

        {/* Form */}
        <div className="reveal reveal-delay-200">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}