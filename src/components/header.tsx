'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl transition-all duration-500 ${
        scrolled ? 'top-3' : 'top-5'
      }`}
      role="banner"
    >
      <nav
        className="glass-card rounded-full px-4 py-2.5 flex items-center justify-between shadow-lg"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="PGStay home">
          <AppLogo size={34} />
          <span className="font-display font-semibold text-lg tracking-tight text-primary hidden sm:block">
            PGStay
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks?.map((link) => (
            <Link
              key={link?.href}
              href={link?.href}
              className="text-primary/60 hover:text-primary transition-colors duration-200"
            >
              {link?.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/book-a-seat"
            className="px-5 py-2.5 bg-primary text-cream rounded-full text-sm font-semibold hover:bg-accent transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Book a seat"
          >
            Book a Seat
          </Link>
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-primary/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              {menuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              ) : (
                <path fillRule="evenodd" clipRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              )}
            </svg>
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 glass-card rounded-3xl px-6 py-6 shadow-xl">
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {navLinks?.map((link) => (
              <Link
                key={link?.href}
                href={link?.href}
                className="text-primary/70 hover:text-primary font-medium text-base py-1 border-b border-primary/5 last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {link?.label}
              </Link>
            ))}
            <Link
              href="/book-a-seat"
              className="mt-2 px-5 py-3 bg-primary text-cream rounded-full text-sm font-semibold text-center hover:bg-accent transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Book a Seat
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}