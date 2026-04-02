'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Header from '@/src/components/header';
import AppImage from '@/src/components/ui/AppImage';
import Footer from '@/src/components/footer';

const facilities = [
{
  icon:
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>,

  title: 'High-Speed WiFi',
  desc: 'Dedicated 100 Mbps fibre connection across all floors'
},
{
  icon:
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>,

  title: 'Furnished Rooms',
  desc: 'Bed, wardrobe, study desk, and chair — move-in ready'
},
{
  icon:
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>,

  title: 'Optional Meals',
  desc: 'Home-cooked breakfast & dinner, customisable meal plan'
},
{
  icon:
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>,

  title: '24/7 Security',
  desc: 'CCTV surveillance, gated entry, and on-site caretaker'
},
{
  icon:
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>,

  title: 'Laundry Service',
  desc: 'Washing machines on every floor, weekly linen change'
},
{
  icon:
  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>,

  title: 'Community Lounge',
  desc: 'Shared common area for relaxing, studying, and socialising'
}];


export default function AboutPage() {
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
    <>
      <Header />
      <main className="min-h-screen bg-bg pt-28 pb-20" aria-label="About PGStay">
        {/* Ambient blobs */}
        <div className="fixed top-20 right-0 w-96 h-96 bg-accent/8 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
        <div className="fixed bottom-40 left-0 w-72 h-72 bg-sage/10 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-5">

          {/* ── Hero intro ── */}
          <div className="reveal mb-20">
            <p className="section-tag mb-4">About PGStay</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-primary mb-6">
              A Place You'll<br />
              <span className="italic font-light text-accent/80">Actually</span> Call Home.
            </h1>
            <p className="max-w-xl text-lg text-primary/60 leading-relaxed">
              PGStay was founded with one simple belief — that students and working professionals deserve more than just a bed. They deserve a community, comfort, and care.
            </p>
          </div>

          {/* ── Asymmetric image + owner info ── */}
          <div className="reveal grid grid-cols-1 md:grid-cols-5 gap-6 mb-20 items-start">
            {/* Owner image — spans 3 cols */}
            <div className="md:col-span-3 h-[420px] md:h-[520px] rounded-[2rem] overflow-hidden relative border border-white/60 shadow-xl">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_13d7ddfeb-1774715214314.png"
                alt="PGStay building exterior — a well-maintained residential property in Pune with clean corridors and greenery"
                fill
                className="object-cover img-grayscale"
                sizes="(max-width: 768px) 100vw, 60vw" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-6 left-6 glass-card px-5 py-4 rounded-2xl">
                <p className="font-display text-lg font-semibold text-primary">Est. 2018</p>
                <p className="text-xs text-primary/50 font-medium">Serving Pune residents</p>
              </div>
            </div>

            {/* Owner info — spans 2 cols */}
            <div className="md:col-span-2 flex flex-col gap-5">
              {/* Owner card */}
              <div className="glass-card rounded-[1.5rem] p-6 border border-white/60 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden relative flex-shrink-0 border border-primary/10">
                    <AppImage
                      src="https://img.rocket.new/generatedImages/rocket_gen_img_171e3bf4b-1763296052508.png"
                      alt="Portrait of Rajesh Sharma, founder and owner of PGStay Pune"
                      fill
                      className="object-cover object-top"
                      sizes="64px" />
                    
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-semibold text-primary">Rajesh Shrestha</h2>
                    <p className="text-sm text-accent font-medium">Founder & Owner</p>
                    <p className="text-xs text-primary/40 mt-0.5">Chabehil, Kathmandu</p>
                  </div>
                </div>
                <p className="text-sm text-primary/60 leading-relaxed">
                  With over 8 years in residential property management, Rajesh built PGStay to offer the kind of accommodation he wished existed when he moved to Pune — safe, affordable, and genuinely welcoming.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                { value: '200+', label: 'Happy Residents' },
                { value: '8 yrs', label: 'In Operation' },
                { value: '4.9★', label: 'Avg. Rating' },
                { value: '3', label: 'Properties' }]?.
                map((s) =>
                <div key={s?.label} className="glass-card rounded-2xl p-4 border border-white/60 text-center">
                    <p className="font-display text-2xl font-bold text-primary">{s?.value}</p>
                    <p className="section-tag mt-1">{s?.label}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Mission ── */}
          <div className="reveal mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="section-tag mb-3">Our Mission</p>
                <h2 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tight text-primary mb-5">
                  More Than<br />
                  <span className="italic font-light text-accent/80">Just a Room.</span>
                </h2>
                <p className="text-base text-primary/60 leading-relaxed mb-4">
                  We believe the quality of your living space directly shapes the quality of your work and study. That's why every detail at PGStay — from the mattress firmness to the WiFi speed — is chosen with intention.
                </p>
                <p className="text-base text-primary/60 leading-relaxed">
                  Our goal is simple: give every resident a clean, safe, and comfortable base so they can focus on what truly matters — their career, their education, and their growth.
                </p>
              </div>
              <div className="h-[340px] rounded-[2rem] overflow-hidden relative border border-white/60 shadow-xl">
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_111ea50ac-1767198735996.png"
                  alt="Bright and tidy common study area at PGStay with wooden desks, warm lighting, and plants"
                  fill
                  className="object-cover img-grayscale"
                  sizes="(max-width: 768px) 100vw, 50vw" />
                
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* ── Facilities ── */}
          <div className="reveal mb-20">
            <p className="section-tag mb-3">Facilities</p>
            <h2 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tight text-primary mb-10">
              Everything You<br />
              <span className="italic font-light text-accent/80">Need, Included.</span>
            </h2>

            {/* Bento-style facility grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {facilities?.map((f, i) =>
              <div
                key={f?.title}
                className={`glass-card rounded-[1.5rem] p-6 border border-white/60 shadow-sm card-lift ${
                i === 0 ? 'md:col-span-2' : ''}`
                }>
                
                  <div className="w-11 h-11 rounded-xl bg-accent/12 flex items-center justify-center text-accent mb-4">
                    {f?.icon}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-primary mb-1">{f?.title}</h3>
                  <p className="text-sm text-primary/55 leading-relaxed">{f?.desc}</p>
                </div>
              )}
            </div>
          </div>

          {/* ── Gallery strip ── */}
          <div className="reveal mb-20">
            <p className="section-tag mb-4">A Glimpse Inside</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
              'Cozy single-occupancy room with a wooden study desk and natural light streaming through curtains',
              'Shared dormitory room with neatly made bunk beds and personal storage lockers',
              'Clean shared bathroom with modern fittings, good ventilation, and tiled walls',
              'Communal dining area with long wooden tables and warm overhead lighting']?.
              map((altText, i) =>
              <div
                key={i}
                className={`rounded-2xl overflow-hidden relative border border-white/60 shadow-md ${
                i === 0 ? 'row-span-2 h-full min-h-[280px]' : 'h-[130px]'}`
                }>
                
                  <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1b90e473a-1772200816043.png"
                  alt={altText}
                  fill
                  className="object-cover img-grayscale"
                  sizes="(max-width: 768px) 50vw, 25vw" />
                
                </div>
              )}
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="reveal">
            <div className="glass-card rounded-[2rem] p-10 md:p-14 border border-white/60 shadow-xl text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[60px]" aria-hidden="true" />
              <p className="section-tag mb-3">Ready to Move In?</p>
              <h2 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tight text-primary mb-5">
                Your room is<br />
                <span className="italic font-light text-accent/80">waiting for you.</span>
              </h2>
              <p className="text-base text-primary/55 max-w-md mx-auto mb-8">
                Seats fill up fast. Book a viewing or reserve your spot today — no commitment required.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/book-a-seat"
                  className="px-8 py-4 bg-primary text-cream rounded-full text-sm font-semibold hover:bg-accent transition-all duration-300 hover:shadow-xl hover:shadow-primary/20">
                  
                  Book a Seat
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white/60 border border-primary/10 rounded-full text-sm font-medium hover:bg-white transition-colors duration-200">
                  
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>);

}