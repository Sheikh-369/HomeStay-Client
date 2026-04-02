'use client';

export default function ContactMap() {
  return (
    <div className="reveal mt-16">
      <p className="section-tag mb-4">Find Us</p>

      <div className="w-full h-[380px] md:h-[460px] rounded-[2rem] overflow-hidden relative border border-white/60 shadow-xl bg-primary/5">
        
        {/* ✅ MAP (added, sits in background) */}
        <iframe
          src="https://www.google.com/maps?q=Chabahil,Kathmandu&output=embed"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
        />

        {/* ✅ YOUR ORIGINAL UI (unchanged) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6 z-10">
          <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center text-accent">
            <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm">
  <p className="font-display text-xl font-semibold text-primary mb-1">
    Gopikrishna Nagar
  </p>
  <p className="text-sm text-primary/70">
    Chabehil, Kathmandu
  </p>
</div>

          <a
            href="https://maps.app.goo.gl/4r94AcPmqcUTGmW66"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary text-cream rounded-full text-sm font-semibold hover:bg-accent transition-all"
          >
            Open in Google Maps
          </a>
        </div>

        {/* ✅ GRID OVERLAY (unchanged) */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>
    </div>
  );
}