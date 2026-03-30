'use client';

const contactDetails = [
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
    label: 'Phone',
    value: '+91 98765 43210',
    sub: 'Mon–Sat, 9 am – 7 pm',
    href: 'tel:+919876543210',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    label: 'Email',
    value: 'hello@pgstay.in',
    sub: 'We reply within 24 hours',
    href: 'mailto:hello@pgstay.in',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />,
    label: 'Address',
    value: '42, Koregaon Park Annexe',
    sub: 'Pune, Maharashtra 411001',
    href: 'https://maps.google.com',
  },
  {
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    label: 'Visiting Hours',
    value: 'Mon – Sat',
    sub: '10 am – 6 pm (by appointment)',
    href: null,
  }
];

export default function ContactDetails() {
  return (
    <div className="lg:col-span-2 flex flex-col gap-4">
      {contactDetails.map((item) => (
        <div key={item.label} className="glass-card rounded-[1.5rem] p-5 border border-white/60 shadow-sm card-lift">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent/12 flex items-center justify-center text-accent flex-shrink-0">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                {item.icon}
              </svg>
            </div>
            <div className="min-w-0">
              <p className="section-tag mb-0.5">{item.label}</p>
              {item.href ? (
                <a 
                  href={item.href} 
                  target={item.href.startsWith('http') ? "_blank" : undefined}
                  rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined}
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
        className="glass-card rounded-[1.5rem] p-5 border border-white/60 shadow-sm card-lift flex items-center gap-4 group hover:border-accent/30 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-green-500/12 flex items-center justify-center text-green-600 flex-shrink-0">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-primary text-sm group-hover:text-accent transition-colors">Chat on WhatsApp</p>
          <p className="text-xs text-primary/45">Fastest response — usually within minutes</p>
        </div>
        <svg className="w-4 h-4 text-primary/30 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}