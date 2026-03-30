'use client';

import { useAppDispatch } from '@/src/lib/store/hooks/hooks';
import { createMessage } from '@/src/lib/store/message/message-slice';
import { IMessageData } from '@/src/lib/store/message/message-slice-type';
import React, { useState } from 'react';

export default function ContactForm() {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<IMessageData>({ 
    name: '', 
    email: '', 
    phone: '', 
    subject: '', // Added subject
    message: '' 
  });
  const [errors, setErrors] = useState<Partial<Record<keyof IMessageData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!form.subject?.trim()) newErrors.subject = 'Subject is required'; // Validate subject
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof IMessageData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    
    const result = await dispatch(createMessage(form));
    
    setLoading(false);
    if (result?.success) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="lg:col-span-3 glass-card rounded-[2rem] p-8 md:p-10 border border-white/60 shadow-xl flex flex-col items-center justify-center h-full min-h-[360px] text-center gap-5">
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
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
          className="mt-2 px-6 py-2.5 bg-primary/8 text-primary rounded-full text-sm font-medium hover:bg-primary/15 transition-colors"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <div className="lg:col-span-3 glass-card rounded-[2rem] p-8 md:p-10 border border-white/60 shadow-xl">
      <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
        <h2 className="font-display text-2xl font-semibold text-primary mb-7">Send a Message</h2>

        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
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
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name}</p>}
          </div>

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
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>}
          </div>
        </div>

        {/* Row 2: Phone & Subject (keeps form height compact) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div>
            <label htmlFor="phone" className="form-label">Phone <span className="normal-case opacity-50 font-normal">(optional)</span></label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone || ''}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="subject" className="form-label">Subject *</label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              placeholder="Booking Inquiry"
              className={`form-input ${errors.subject ? 'error' : ''}`}
            />
            {errors.subject && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.subject}</p>}
          </div>
        </div>

        <div className="mb-7">
          <label htmlFor="message" className="form-label">Your Message *</label>
          <textarea
            id="message"
            name="message"
            rows={4} // Reduced from 5 to 4 to maintain total form height
            value={form.message}
            onChange={handleChange}
            placeholder="How can we help?"
            className={`form-input resize-none ${errors.message ? 'error' : ''}`}
          />
          {errors.message && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-primary text-cream rounded-full text-sm font-semibold hover:bg-accent transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}