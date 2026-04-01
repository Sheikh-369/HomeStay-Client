'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks/hooks';
import { checkInGuest, checkOutGuest, fetchActiveGuests } from '@/src/lib/store/occupancy/occupancy-slice';
import Modal from './Modal'; // Using your custom Modal component
import { StatusBadge } from './AdminShared';

export default function OccupancyDashboard() {
  const dispatch = useAppDispatch();
  const { occupancyData } = useAppSelector((state) => state.occupancySlice);

  // Modal States
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState<{ show: boolean, bill?: string, days?: number } | null>(null);

  // Form State
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: '', phone: '', address: '', roomNumber: '',
    rateAmount: '', exitDate: '', billingCycle: 'monthly' as 'daily' | 'monthly',
    securityDeposit: ''
  });

  useEffect(() => {
    dispatch(fetchActiveGuests());
  }, [dispatch]);

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("ID Document is mandatory!");

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append('idDocumentImage', file);

    const res = await dispatch(checkInGuest(data));
    if (res?.success) {
      setShowCheckIn(false);
      setFile(null);
      setFormData({ fullName: '', phone: '', address: '', roomNumber: '', rateAmount: '', exitDate: '', billingCycle: 'monthly', securityDeposit: '' });
    }
  };

  const handleCheckOut = async (id: string) => {
    const res = await dispatch(checkOutGuest(id));
    if (res?.success) {
      setCheckoutResult({
        show: true,
        bill: res.billDetails?.totalDue || "0.00",
        days: res.billDetails?.daysStayed || 0
      });
    }
  };

  return (
    <div className="space-y-5">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <h2 className="font-display font-bold text-primary text-xl tracking-tight">Live Occupancy</h2>
        <button
          onClick={() => setShowCheckIn(true)}
          className="px-5 py-2 bg-primary text-cream text-xs font-bold rounded-full hover:bg-primary/90 transition-all shadow-sm uppercase tracking-widest"
        >
          + New Check-In
        </button>
      </div>

      {/* Responsive Table */}
      <div className="bg-cream rounded-2xl border border-primary/8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary/8 bg-primary/3">
                {['Tenant', 'Room', 'Entry Date', 'Rate Plan', 'Actions'].map((h) => (
                  <th key={h} className={`text-left px-5 py-3 text-[10px] font-bold text-primary/40 uppercase tracking-widest ${['Entry Date'].includes(h) ? 'hidden md:table-cell' : ''}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {occupancyData.length > 0 ? occupancyData.map((guest) => (
                <tr key={guest.id} className="border-b border-primary/5 last:border-0 hover:bg-primary/3 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-primary">{guest.fullName}</div>
                    <div className="text-[10px] text-primary/40 font-medium">{guest.phone}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-xs font-bold text-accent bg-accent/5 px-2 py-1 rounded-lg">
                      {guest.roomNumber}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-primary/60 hidden md:table-cell text-xs">{guest.entryDate}</td>
                  <td className="px-5 py-4">
                    <div className="text-xs font-bold text-primary/70">₹{guest.rateAmount}</div>
                    <div className="text-[10px] text-primary/30 uppercase font-bold">{guest.billingCycle}</div>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleCheckOut(guest.id!)}
                      className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-tighter transition-colors"
                    >
                      Check Out
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-primary/30 text-xs italic">No active residents in the building.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Check-In Modal */}
      <Modal isOpen={showCheckIn} onClose={() => setShowCheckIn(false)} title="New Resident Entry" size="md">
        <form onSubmit={handleCheckIn} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-primary/40 uppercase mb-1 px-1">Full Name</label>
              <input type="text" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm outline-none focus:border-primary/30" onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-primary/40 uppercase mb-1 px-1">Phone</label>
              <input type="text" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm outline-none" onChange={e => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-primary/40 uppercase mb-1 px-1">Room No.</label>
              <input type="text" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm outline-none" onChange={e => setFormData({ ...formData, roomNumber: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-primary/40 uppercase mb-1 px-1">Address</label>
              <textarea required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm outline-none h-20 resize-none" onChange={e => setFormData({ ...formData, address: e.target.value })} />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-primary/40 uppercase mb-1 px-1">Rate (₹)</label>
              <input type="number" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm outline-none" onChange={e => setFormData({ ...formData, rateAmount: e.target.value })} />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-primary/40 uppercase mb-1 px-1">Planned Exit</label>
              <input type="date" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm outline-none" onChange={e => setFormData({ ...formData, exitDate: e.target.value })} />
            </div>
          </div>

          <div className="p-4 bg-accent/5 border border-accent/10 rounded-2xl">
            <label className="text-[10px] font-bold text-accent uppercase block mb-2 tracking-widest">Identity Proof (Mandatory)</label>
            <input type="file" required className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-primary file:text-cream cursor-pointer" onChange={e => setFile(e.target.files?.[0] || null)} />
          </div>

          <div className="flex gap-2 pt-2">
            <button type="submit" className="flex-1 py-3 px-4 bg-primary text-cream text-xs font-bold rounded-xl hover:bg-primary/85 transition-all uppercase tracking-widest">Register Guest</button>
            <button type="button" onClick={() => setShowCheckIn(false)} className="flex-1 py-3 px-4 border border-primary/15 text-primary/60 text-xs font-bold rounded-xl hover:border-primary/30 transition-all uppercase tracking-widest">Cancel</button>
          </div>
        </form>
      </Modal>

      {/* Checkout/Bill Modal */}
      <Modal isOpen={!!checkoutResult} onClose={() => setCheckoutResult(null)} title="Check-Out Summary" size="sm">
        {checkoutResult && (
          <div className="text-center space-y-6 py-2">
             <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-2">
                <span className="text-2xl">🧾</span>
             </div>
             
             <div className="space-y-1">
                <p className="text-xs text-primary/40 font-bold uppercase tracking-widest">Total Stay Duration</p>
                <p className="text-2xl font-display font-bold text-primary">{checkoutResult.days} Days</p>
             </div>

             <div className="bg-primary/5 rounded-2xl p-5 border border-primary/5">
                <p className="text-[10px] text-primary/40 font-bold uppercase tracking-widest mb-1">Final Amount Due</p>
                <p className="text-3xl font-display font-black text-primary">₹{checkoutResult.bill}</p>
             </div>

             <div className="flex flex-col gap-2">
                <button 
                  onClick={() => { window.print(); setCheckoutResult(null); }} 
                  className="w-full py-3.5 bg-primary text-cream text-xs font-bold rounded-xl hover:bg-primary/85 transition-all shadow-lg uppercase tracking-widest"
                >
                  Print Bill & Finalize
                </button>
                <button 
                  onClick={() => setCheckoutResult(null)} 
                  className="w-full py-2 text-[10px] font-bold text-primary/30 hover:text-primary transition-colors uppercase tracking-widest"
                >
                  Close
                </button>
             </div>
          </div>
        )}
      </Modal>
    </div>
  );
}