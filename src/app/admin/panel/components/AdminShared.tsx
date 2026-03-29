'use client';

import React from 'react';

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: 'bg-sage/15 text-sage',
    Confirmed: 'bg-accent/15 text-accent',
    Pending: 'bg-amber-100 text-amber-700',
    Cancelled: 'bg-red-50 text-red-500',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status] ?? 'bg-primary/10 text-primary'}`}>
      {status}
    </span>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  accent?: boolean;
}

export function StatCard({ label, value, sub, icon, accent }: StatCardProps) {
  return (
    <div className={`rounded-2xl p-5 border ${accent ? 'bg-primary border-primary/80' : 'bg-cream border-primary/10'} flex items-start justify-between gap-4`}>
      <div>
        <p className={`text-xs font-semibold tracking-widest uppercase mb-1 ${accent ? 'text-cream/50' : 'text-primary/40'}`}>{label}</p>
        <p className={`font-display text-3xl font-bold leading-none ${accent ? 'text-cream' : 'text-primary'}`}>{value}</p>
        {sub && <p className={`text-xs mt-1 font-medium ${accent ? 'text-cream/50' : 'text-primary/40'}`}>{sub}</p>}
      </div>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${accent ? 'bg-cream/10' : 'bg-accent/10'}`}>
        <span className={accent ? 'text-cream/70' : 'text-accent'}>{icon}</span>
      </div>
    </div>
  );
}
