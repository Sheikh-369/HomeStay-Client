'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function CtaBanner() {
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
      className="py-10 px-5 mb-10"
      aria-labelledby="cta-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="reveal relative overflow-hidden bg-primary rounded-[2.5rem] px-8 md:px-16 py-16 md:py-20 text-center">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/15 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sage/10 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3 pointer-events-none" aria-hidden="true" />

          <div className="relative z-10">
            <span className="section-tag text-white/40 block mb-4">Limited Seats Available</span>
            <h2 id="cta-heading" className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-cream leading-[0.92] tracking-tight mb-6">
              Ready to move in?{' '}
              <span className="italic font-light text-accent">Book today.</span>
            </h2>
            <p className="text-cream/55 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              Seats fill up fast every semester. Secure yours now with a simple online booking form.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/book-a-seat"
                className="group px-9 py-4 bg-accent text-white rounded-full text-base font-bold flex items-center gap-3 hover:bg-accent-light transition-all duration-300 hover:shadow-2xl hover:shadow-accent/30"
                aria-label="Book a seat at PGStay"
              >
                Book a Seat Now
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:+919876543210"
                className="px-9 py-4 border border-white/20 text-cream rounded-full text-base font-medium hover:bg-white/10 transition-colors"
                aria-label="Call PGStay at +91 98765 43210"
              >
                Call +91 98765 43210
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 mt-12 text-cream/40 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No broker fees
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Instant confirmation
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Flexible exit policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}