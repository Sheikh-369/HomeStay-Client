'use client';

import Footer from '@/src/components/footer';
import Header from '@/src/components/header';
import React, { useEffect, useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const contactDetails = [
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: 'Phone',
    value: '+91 98765 43210',
    sub: 'Mon–Sat, 9 am – 7 pm',
    href: 'tel:+919876543210',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: 'Email',
    value: 'hello@pgstay.in',
    sub: 'We reply within 24 hours',
    href: 'mailto:hello@pgstay.in',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: 'Address',
    value: '42, Koregaon Park Annexe',
    sub: 'Pune, Maharashtra 411001',
    href: 'https://maps.google.com',
  },
  {
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Visiting Hours',
    value: 'Mon – Sat',
    sub: '10 am – 6 pm (by appointment)',
    href: null,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormData>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate async submit — wire to backend later
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    console.log('Contact form submitted:', form);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg pt-28 pb-20" aria-label="Contact PGStay">
        {/* Ambient blobs */}
        <div className="fixed top-32 left-0 w-80 h-80 bg-accent/8 rounded-full blur-[90px] pointer-events-none" aria-hidden="true" />
        <div className="fixed bottom-20 right-0 w-64 h-64 bg-sage/10 rounded-full blur-[70px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-5">

          {/* ── Page header ── */}
          <div className="reveal mb-16">
            <p className="section-tag mb-4">Get in Touch</p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-primary mb-5">
              We'd Love to<br />
              <span className="italic font-light text-accent/80">Hear From You.</span>
            </h1>
            <p className="max-w-lg text-lg text-primary/60 leading-relaxed">
              Have a question about availability, pricing, or facilities? Drop us a message and we'll get back to you within 24 hours.
            </p>
          </div>

          {/* ── Main grid: form + info ── */}
          <div className="reveal grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">

            {/* Contact Form — 3 cols */}
            <div className="lg:col-span-3 glass-card rounded-[2rem] p-8 md:p-10 border border-white/60 shadow-xl">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[360px] text-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center text-accent">
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-semibold text-primary mb-2">Message Sent!</h2>
                    <p className="text-sm text-primary/55 max-w-xs mx-auto">
                      Thanks for reaching out, {form.name.split(' ')[0]}. We'll reply to <strong>{form.email}</strong> within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
                    className="mt-2 px-6 py-2.5 bg-primary/8 text-primary rounded-full text-sm font-medium hover:bg-primary/15 transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                  <h2 className="font-display text-2xl font-semibold text-primary mb-7">Send a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="form-label">Full Name *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Priya Mehta"
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1.5 text-xs text-red-500 font-medium" role="alert">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="priya@example.com"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1.5 text-xs text-red-500 font-medium" role="alert">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone (optional) */}
                  <div className="mb-5">
                    <label htmlFor="phone" className="form-label">Phone Number <span className="normal-case opacity-50 font-normal">(optional)</span></label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="form-input"
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-7">
                    <label htmlFor="message" className="form-label">Your Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Hi, I'm looking for a single room from next month. Could you share availability and pricing details?"
                      className={`form-input resize-none ${errors.message ? 'error' : ''}`}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1.5 text-xs text-red-500 font-medium" role="alert">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary text-cream rounded-full text-sm font-semibold hover:bg-accent transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    aria-label="Send message"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact details — 2 cols */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {contactDetails.map((item) => (
                <div key={item.label} className="glass-card rounded-[1.5rem] p-5 border border-white/60 shadow-sm card-lift">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/12 flex items-center justify-center text-accent flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="section-tag mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="font-semibold text-primary hover:text-accent transition-colors text-sm block truncate"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-primary text-sm">{item.value}</p>
                      )}
                      <p className="text-xs text-primary/45 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-[1.5rem] p-5 border border-white/60 shadow-sm card-lift flex items-center gap-4 hover:border-accent/30 transition-colors group"
                aria-label="Chat on WhatsApp"
              >
                <div className="w-10 h-10 rounded-xl bg-green-500/12 flex items-center justify-center text-green-600 flex-shrink-0">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-primary text-sm group-hover:text-accent transition-colors">Chat on WhatsApp</p>
                  <p className="text-xs text-primary/45">Fastest response — usually within minutes</p>
                </div>
                <svg className="w-4 h-4 text-primary/30 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Google Maps placeholder ── */}
          <div className="reveal">
            <p className="section-tag mb-4">Find Us</p>
            <div className="w-full h-[380px] md:h-[460px] rounded-[2rem] overflow-hidden relative border border-white/60 shadow-xl bg-primary/5">
              {/* Map placeholder — replace iframe src with actual Google Maps embed URL */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center text-accent">
                  <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-display text-xl font-semibold text-primary mb-1">42, Koregaon Park Annexe</p>
                  <p className="text-sm text-primary/50">Pune, Maharashtra 411001</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Koregaon+Park+Annexe+Pune"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 px-6 py-3 bg-primary text-cream rounded-full text-sm font-semibold hover:bg-accent transition-all duration-300 hover:shadow-lg flex items-center gap-2"
                  aria-label="Open location in Google Maps"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open in Google Maps
                </a>
                <p className="text-xs text-primary/30 mt-1">
                  Replace this placeholder with a Google Maps embed iframe in the code
                </p>
              </div>
              {/* Decorative grid lines */}
              <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true"
                style={{
                  backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
