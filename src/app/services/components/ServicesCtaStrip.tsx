'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function ServicesCtaStrip() {
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
    <section className="py-16 px-5 mb-8" aria-label="Book a seat call to action">
      <div className="max-w-6xl mx-auto">
        <div className="reveal bg-white border border-primary/8 rounded-4xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
              All services included in one price.
            </h2>
            <p className="text-primary/55 text-base">
              Starting at ₹9,999/month — utilities, WiFi, security, and laundry included.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              href="/book-a-seat"
              className="px-7 py-3.5 bg-primary text-cream rounded-full text-sm font-bold hover:bg-accent transition-all duration-300 hover:scale-105 text-center"
              aria-label="Book a seat at PGStay"
            >
              Book a Seat
            </Link>
            <Link
              href="/"
              className="px-7 py-3.5 border border-primary/15 text-primary rounded-full text-sm font-medium hover:bg-primary/5 transition-colors text-center"
              aria-label="Go back to homepage"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}