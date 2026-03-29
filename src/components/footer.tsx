import React from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';

const footerLinks = [
  { label: 'Home', href: '/homepage' },
  { label: 'Services', href: '/services' },
  { label: 'Book a Seat', href: '/book-a-seat' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 py-10 px-6" role="contentinfo">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo + tagline */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <AppLogo size={28} />
            <span className="font-display font-semibold text-base tracking-tight text-primary">
              PGStay
            </span>
          </div>
          <p className="footer-tagline text-sm mt-1">Your home away from home.</p>
        </div>

        {/* Center: Links */}
        <nav className="flex flex-wrap justify-center gap-x-7 gap-y-2" aria-label="Footer navigation">
        {footerLinks?.map((link, index) => (
            <Link
            key={`${link?.href}-${index}`} // <- unique key now
            href={link?.href}
            className="text-sm font-medium text-primary/50 hover:text-primary transition-colors duration-200"
            >
            {link?.label}
            </Link>
        ))}
        </nav>

        {/* Right: Social + copyright */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-primary/15 flex items-center justify-center text-primary/50 hover:text-primary hover:border-primary/40 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full border border-primary/15 flex items-center justify-center text-primary/50 hover:text-primary hover:border-primary/40 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
              </svg>
            </a>
          </div>
          <p className="text-xs text-primary/30 font-medium">© 2026 PGStay. All rights reserved.</p>
          {/* Admin entry point */}
          <Link
            href="/admin/login"
            className="text-xs text-primary/20 hover:text-primary/50 transition-colors duration-200 font-medium"
            aria-label="Admin login"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}