'use client';

import React, { useEffect } from 'react';
import Header from '@/src/components/header';
import Footer from '@/src/components/footer';
import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import ContactDetails from './components/ContactDetails';
import ContactMap from './components/ContactMap';

export default function ContactPage() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg pt-28 pb-20 relative overflow-hidden">
        {/* Ambient blobs */}
        <div className="fixed top-32 left-0 w-80 h-80 bg-accent/8 rounded-full blur-[90px] pointer-events-none" />
        <div className="fixed bottom-20 right-0 w-64 h-64 bg-sage/10 rounded-full blur-[70px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5">
          <ContactHero />
          
          <div className="reveal grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
            <ContactForm />
            <ContactDetails />
          </div>

          <ContactMap />
        </div>
      </main>
      <Footer />
    </>
  );
}