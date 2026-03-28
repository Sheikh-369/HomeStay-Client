'use client';

import AppImage from '@/src/components/ui/AppImage';
import React, { useEffect } from 'react';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  college: string;
  avatarSrc: string;
  avatarAlt: string;
  rating: number;
  duration: string;
}

const testimonials: Testimonial[] = [
{
  id: 1,
  quote: "PGStay completely changed my college experience. The room is clean, the WiFi never cuts out during online classes, and the caretaker uncle is genuinely helpful. I've stayed for 14 months and renewed without a second thought.",
  name: 'Priya Nair',
  role: 'B.Tech Student',
  college: 'MIT Pune',
  avatarSrc: "https://img.rocket.new/generatedImages/rocket_gen_img_10234deb1-1763301316285.png",
  avatarAlt: 'Priya Nair, B.Tech student at MIT Pune',
  rating: 5,
  duration: '14 months'
},
{
  id: 2,
  quote: "As a working professional new to Pune, finding safe accommodation was stressful. PGStay's gated entry and CCTV made me feel secure from day one. The food plan saves me so much time on weekdays.",
  name: 'Arjun Mehta',
  role: 'Software Engineer',
  college: 'Infosys, Hinjewadi',
  avatarSrc: "https://img.rocket.new/generatedImages/rocket_gen_img_148047a53-1773111724900.png",
  avatarAlt: 'Arjun Mehta, software engineer at Infosys',
  rating: 5,
  duration: '8 months'
},
{
  id: 3,
  quote: "The booking process was so straightforward — I filled the form, got a callback within 2 hours, and moved in within a week. The room had everything: a proper study desk, wardrobe, even a reading lamp. Worth every rupee.",
  name: 'Sneha Kulkarni',
  role: 'MBA Student',
  college: 'Symbiosis, Pune',
  avatarSrc: "https://img.rocket.new/generatedImages/rocket_gen_img_1e51a5c45-1771428636991.png",
  avatarAlt: 'Sneha Kulkarni, MBA student at Symbiosis',
  rating: 5,
  duration: '6 months'
}];


export default function TestimonialsSection() {
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
      id="testimonials"
      className="py-24 px-5"
      aria-labelledby="testimonials-heading">
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="reveal flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="section-tag block mb-3">Resident Stories</span>
            <h2 id="testimonials-heading" className="display-heading-sm text-primary font-semibold whitespace-nowrap">
              What our residents{' '}
              <span className="italic font-light text-accent/80">actually say.</span>
            </h2>
          </div>
          <p className="reveal reveal-delay-100 text-sm text-primary/40 font-medium">
            200+ residents · 4.9 avg rating
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="reveal mb-6">
          <div className="bg-primary rounded-4xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white/10">
              <AppImage
                src={testimonials[0].avatarSrc}
                alt={testimonials[0].avatarAlt}
                width={96}
                height={96}
                className="w-full h-full object-cover" />
              
            </div>
            <div className="flex-1">
              <div className="flex gap-1 mb-4" aria-label={`${testimonials[0].rating} out of 5 stars`}>
                {Array.from({ length: testimonials[0].rating }).map((_, i) =>
                <svg key={i} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
              </div>
              <blockquote>
                <p className="text-cream/80 text-lg md:text-xl leading-relaxed italic mb-6">
                  "{testimonials[0].quote}"
                </p>
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display font-semibold text-cream text-base">{testimonials[0].name}</p>
                  <p className="text-cream/40 text-xs uppercase tracking-widest font-bold mt-0.5">
                    {testimonials[0].role} · {testimonials[0].college}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold">
                  {testimonials[0].duration} stay
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Two smaller testimonials */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.slice(1).map((t, i) =>
          <div
            key={t.id}
            className={`reveal ${i === 0 ? 'reveal-delay-100' : 'reveal-delay-200'} bg-white border border-primary/5 rounded-4xl p-8 card-lift`}>
            
              <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, j) =>
              <svg key={j} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
              )}
              </div>
              <blockquote>
                <p className="text-primary/70 leading-relaxed italic mb-6">"{t.quote}"</p>
              </blockquote>
              <div className="flex items-center gap-4 pt-4 border-t border-primary/5">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <AppImage
                  src={t.avatarSrc}
                  alt={t.avatarAlt}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover" />
                
                </div>
                <div>
                  <p className="font-display font-semibold text-primary text-sm">{t.name}</p>
                  <p className="text-primary/40 text-xs uppercase tracking-widest font-bold mt-0.5">
                    {t.role} · {t.college}
                  </p>
                </div>
                <span className="ml-auto px-2.5 py-1 rounded-full bg-primary/5 text-primary/50 text-xs font-bold">
                  {t.duration}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}