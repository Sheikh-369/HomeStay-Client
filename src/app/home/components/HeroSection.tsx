'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/src/components/ui/AppImage';

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef?.current) return;
      const scrollY = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.08}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-5"
      aria-label="Hero section">
      
      {/* Background ambient blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-32 right-10 w-56 h-56 bg-sage/15 rounded-full blur-[60px] pointer-events-none" aria-hidden="true" />
      {/* Hero text content */}
      <div className="max-w-5xl w-full text-center relative z-10">
        {/* Availability badge */}
        <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-white/50 backdrop-blur-sm text-sm text-accent mb-8">
          <span className="w-2 h-2 rounded-full bg-accent pulse-amber" aria-hidden="true" />
          <span className="font-medium">Rooms available from ₹9,999/month</span>
        </div>

        <h1 className="reveal font-display text-6xl md:text-8xl lg:text-9xl leading-[0.88] tracking-tight mb-7 text-primary">
          Your Home{' '}
          <span className="italic font-light text-accent/80">Away</span>
          <br />
          From{' '}
          <span className="italic font-light opacity-60">Home.</span>
        </h1>

        <p className="reveal reveal-delay-100 max-w-xl mx-auto text-lg md:text-xl text-primary/60 leading-relaxed mb-10">
          Safe, furnished, and affordable PG accommodation in Pune — with WiFi, optional meals, laundry, and 24/7 security. Built for students and working professionals.
        </p>

        <div className="reveal reveal-delay-200 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/book-a-seat"
            className="group px-8 py-4 bg-primary text-cream rounded-full text-base font-semibold flex items-center gap-3 hover:bg-accent transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
            aria-label="Book a seat now">
            
            Book a Seat
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true">
              
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/services"
            className="px-8 py-4 bg-white/60 border border-primary/10 rounded-full text-base font-medium hover:bg-white transition-colors duration-200"
            aria-label="View our services">
            
            View Services
          </Link>
        </div>
      </div>
      {/* Hero Image with parallax */}
      <div className="reveal reveal-delay-300 w-full max-w-6xl mx-auto mt-16 h-[420px] md:h-[600px] rounded-[2.5rem] overflow-hidden relative border border-white/60 shadow-2xl">
        {/* Parallax image layer */}
        <div
          ref={parallaxRef}
          className="parallax-bg absolute inset-0 w-full h-[120%] -top-[10%]">
          
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_1b90e473a-1772200816043.png"
            alt="Cozy furnished PG room with bed, study desk, and warm lighting"
            fill
            className="object-cover img-grayscale"
            priority
            sizes="(max-width: 768px) 100vw, 90vw" />
          
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent pointer-events-none" aria-hidden="true" />

        {/* Floating availability card */}
        <div className="absolute bottom-8 left-6 md:left-12 glass-card p-6 rounded-3xl shadow-2xl max-w-xs hidden sm:block">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="section-tag mb-1">Available Now</p>
              <h4 className="font-display text-lg font-semibold text-primary">Double Sharing Room</h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent flex-shrink-0">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-display font-bold text-primary">₹9,999</p>
              <p className="text-xs text-primary/40 font-medium">/month · all inclusive</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-bold uppercase tracking-wide">3 seats left</span>
          </div>
        </div>

        {/* Floating stat card top right */}
        <div className="absolute top-6 right-6 md:right-12 glass-card px-5 py-4 rounded-2xl shadow-xl hidden md:flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-primary">Verified & Safe</p>
            <p className="text-xs text-primary/40">CCTV · Gated Campus</p>
          </div>
        </div>
      </div>
      {/* Stats row */}
      <div className="reveal reveal-delay-400 w-full max-w-6xl mx-auto mt-10 grid grid-cols-3 gap-4 md:gap-8">
        {[
        { value: '200+', label: 'Happy Residents' },
        { value: '₹6K', label: 'Starting Monthly' },
        { value: '4.9★', label: 'Average Rating' }]?.
        map((stat) =>
        <div key={stat?.label} className="text-center py-4 px-3 rounded-2xl bg-white/50 border border-primary/5">
            <p className="font-display text-2xl md:text-3xl font-bold text-primary">{stat?.value}</p>
            <p className="section-tag mt-1">{stat?.label}</p>
          </div>
        )}
      </div>
    </section>);

}