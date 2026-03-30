'use client';

export default function ContactHero() {
  return (
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
  );
}