// 'use client';

// import React, { useEffect, ReactNode, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks/hooks';
// import { checkInGuest, checkOutGuest, fetchActiveGuests } from '@/src/lib/store/occupancy/occupancy-slice';
// import Modal from './Modal'; // Using your custom Modal component
// import { StatusBadge } from './AdminShared';

// export default function OccupancyDashboard() {
//   const dispatch = useAppDispatch();
//   const { occupancyData } = useAppSelector((state) => state.occupancySlice);

//   // Modal States
//   const [showCheckIn, setShowCheckIn] = useState(false);
//   const [confirmingCheckoutId, setConfirmingCheckoutId] = useState<string | null>(null);
//   const [checkoutResult, setCheckoutResult] = useState<{ show: boolean, bill?: string, days?: number } | null>(null);

//   // Form State
//   const [file, setFile] = useState<File | null>(null);
//   const [formData, setFormData] = useState({
//     fullName: '', phone: '', address: '', roomNumber: '',
//     rateAmount: '', exitDate: '', billingCycle: 'monthly' as 'daily' | 'monthly',
//     securityDeposit: ''
//   });

//   useEffect(() => {
//     dispatch(fetchActiveGuests());
//   }, [dispatch]);

//   const handleCheckIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return alert("ID Document is mandatory!");

//     const data = new FormData();
//     Object.entries(formData).forEach(([key, value]) => data.append(key, value));
//     data.append('idDocumentImage', file);

//     const res = await dispatch(checkInGuest(data));
//     if (res?.success) {
//       setShowCheckIn(false);
//       setFile(null);
//       setFormData({ fullName: '', phone: '', address: '', roomNumber: '', rateAmount: '', exitDate: '', billingCycle: 'monthly', securityDeposit: '' });
//     }
//   };

//   const handleConfirmCheckOut = async () => {
//     if (!confirmingCheckoutId) return;

//     const res = await dispatch(checkOutGuest(confirmingCheckoutId));
//     setConfirmingCheckoutId(null); // Close the intermediate confirmation modal

//     if (res?.success) {
//       setCheckoutResult({
//         show: true,
//         bill: res.billDetails?.totalDue || "0.00",
//         days: res.billDetails?.daysStayed || 0
//       });
//     }
//   };

//   return (
//     <div className="space-y-5">
//       {/* Header Actions */}
//       <div className="flex justify-between items-center">
//         <h2 className="font-display font-bold text-primary text-xl tracking-tight">Live Occupancy</h2>
//         <button
//           onClick={() => setShowCheckIn(true)}
//           className="px-5 py-2 bg-primary text-cream text-xs font-bold rounded-full hover:bg-primary/90 transition-all shadow-sm uppercase tracking-widest"
//         >
//           + New Check-In
//         </button>
//       </div>

//       {/* Responsive Table */}
//       <div className="bg-cream rounded-2xl border border-primary/8 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="border-b border-primary/8 bg-primary/3">
//                 {['Tenant', 'Room', 'Entry Date', 'Rate Plan', 'Actions'].map((h) => (
//                   <th key={h} className={`text-left px-5 py-3 text-[10px] font-bold text-primary/40 uppercase tracking-widest ${['Entry Date'].includes(h) ? 'hidden md:table-cell' : ''}`}>
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {occupancyData.length > 0 ? occupancyData.map((guest) => (
//                 <tr key={guest.id} className="border-b border-primary/5 last:border-0 hover:bg-primary/3 transition-colors">
//                   <td className="px-5 py-4">
//                     <div className="font-semibold text-primary">{guest.fullName}</div>
//                     <div className="text-[10px] text-primary/40 font-medium">{guest.phone}</div>
//                   </td>
//                   <td className="px-5 py-4">
//                     <span className="font-mono text-xs font-bold text-accent bg-accent/5 px-2 py-1 rounded-lg">
//                       {guest.roomNumber}
//                     </span>
//                   </td>
//                   <td className="px-5 py-4 text-primary/60 hidden md:table-cell text-xs">{guest.entryDate}</td>
//                   <td className="px-5 py-4">
//                     <div className="text-xs font-bold text-primary/70">₹{guest.rateAmount}</div>
//                     <div className="text-[10px] text-primary/30 uppercase font-bold">{guest.billingCycle}</div>
//                   </td>
//                   <td className="px-5 py-4">
//                     <button
//                       onClick={() => setConfirmingCheckoutId(guest.id!)}
//                       className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-tighter transition-colors"
//                     >
//                       Check Out
//                     </button>
//                   </td>
//                 </tr>
//               )) : (
//                 <tr>
//                   <td colSpan={5} className="p-10 text-center text-primary/30 text-xs italic">No active residents in the building.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Check-In Modal */}
//       <Modal isOpen={showCheckIn} onClose={() => setShowCheckIn(false)} title="New Resident Entry" size="md">
//         <form onSubmit={handleCheckIn} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="md:col-span-2">
//               <label className="block text-[10px] font-bold text-primary/40 uppercase mb-1 px-1">Full Name</label>
//               <input type="text" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm outline-none focus:border-primary/30" onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
//             </div>
//             <div>
//               <label className="block text-[10px] font-bold text-primary/40 uppercase mb-1 px-1">Phone</label>
//               <input type="text" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm outline-none" onChange={e => setFormData({ ...formData, phone: e.target.value })} />
//             </div>
//             <div>
//               <label className="block text-[10px] font-bold text-primary/40 uppercase mb-1 px-1">Room No.</label>
//               <input type="text" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm outline-none" onChange={e => setFormData({ ...formData, roomNumber: e.target.value })} />
//             </div>
//             <div className="md:col-span-2">
//               <label className="block text-[10px] font-bold text-primary/40 uppercase mb-1 px-1">Address</label>
//               <textarea required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm outline-none h-20 resize-none" onChange={e => setFormData({ ...formData, address: e.target.value })} />
//             </div>
//             <div>
//               <label className="block text-[10px] font-bold text-primary/40 uppercase mb-1 px-1">Rate (₹)</label>
//               <input type="number" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm outline-none" onChange={e => setFormData({ ...formData, rateAmount: e.target.value })} />
//             </div>
//             <div>
//               <label className="block text-[10px] font-bold text-primary/40 uppercase mb-1 px-1">Planned Exit</label>
//               <input type="date" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm outline-none" onChange={e => setFormData({ ...formData, exitDate: e.target.value })} />
//             </div>
//           </div>

//           <div className="p-4 bg-accent/5 border border-accent/10 rounded-2xl">
//             <label className="text-[10px] font-bold text-accent uppercase block mb-2 tracking-widest">Identity Proof (Mandatory)</label>
//             <input type="file" required className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-primary file:text-cream cursor-pointer" onChange={e => setFile(e.target.files?.[0] || null)} />
//           </div>

//           <div className="flex gap-2 pt-2">
//             <button type="submit" className="flex-1 py-3 px-4 bg-primary text-cream text-xs font-bold rounded-xl hover:bg-primary/85 transition-all uppercase tracking-widest">Register Guest</button>
//             <button type="button" onClick={() => setShowCheckIn(false)} className="flex-1 py-3 px-4 border border-primary/15 text-primary/60 text-xs font-bold rounded-xl hover:border-primary/30 transition-all uppercase tracking-widest">Cancel</button>
//           </div>
//         </form>
//       </Modal>

//       {/* Confirmation Modal */}
//       <Modal 
//         isOpen={!!confirmingCheckoutId} 
//         onClose={() => setConfirmingCheckoutId(null)} 
//         title="Confirm Check-Out" 
//         size="sm"
//       >
//         <div className="text-center space-y-6 py-4">
//           <p className="text-sm text-primary/60 font-medium">
//             Are you sure you want to check out this resident? This action will finalize their bill.
//           </p>
//           <div className="flex gap-3">
//             <button 
//               onClick={handleConfirmCheckOut} 
//               className="flex-1 py-3 bg-red-500 text-white text-xs font-bold rounded-xl hover:bg-red-600 transition-all uppercase tracking-widest"
//             >
//               Confirm
//             </button>
//             <button 
//               onClick={() => setConfirmingCheckoutId(null)} 
//               className="flex-1 py-3 border border-primary/10 text-primary/40 text-xs font-bold rounded-xl hover:bg-primary/5 transition-all uppercase tracking-widest"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* Checkout Summary Modal */}
//       <Modal isOpen={!!checkoutResult} onClose={() => setCheckoutResult(null)} title="Check-Out Summary" size="sm">
//         {checkoutResult && (
//           <div className="text-center space-y-6 py-2">
//              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-2">
//                 <span className="text-2xl">🧾</span>
//              </div>
             
//              <div className="space-y-1">
//                 <p className="text-xs text-primary/40 font-bold uppercase tracking-widest">Total Stay Duration</p>
//                 <p className="text-2xl font-display font-bold text-primary">{checkoutResult.days} Days</p>
//              </div>

//              <div className="bg-primary/5 rounded-2xl p-5 border border-primary/5">
//                 <p className="text-[10px] text-primary/40 font-bold uppercase tracking-widest mb-1">Final Amount Due</p>
//                 <p className="text-3xl font-display font-black text-primary">₹{checkoutResult.bill}</p>
//              </div>

//              <div className="flex flex-col gap-2">
//                 <button 
//                   onClick={() => { window.print(); setCheckoutResult(null); }} 
//                   className="w-full py-3.5 bg-primary text-cream text-xs font-bold rounded-xl hover:bg-primary/85 transition-all shadow-lg uppercase tracking-widest"
//                 >
//                   Print Bill & Finalize
//                 </button>
//                 <button 
//                   onClick={() => setCheckoutResult(null)} 
//                   className="w-full py-2 text-[10px] font-bold text-primary/30 hover:text-primary transition-colors uppercase tracking-widest"
//                 >
//                   Close
//                 </button>
//              </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }

//2nd
'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks/hooks';
import { checkInGuest, checkOutGuest, fetchActiveGuests } from '@/src/lib/store/occupancy/occupancy-slice';
import Modal from './Modal';

export default function OccupancyDashboard() {
  const dispatch = useAppDispatch();
  const { occupancyData } = useAppSelector((state) => state.occupancySlice);

  // Modal & Selection States
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [confirmingCheckoutId, setConfirmingCheckoutId] = useState<string | null>(null);
  
  // State for Checkout Date (Auto-filled to today)
  const [checkoutDate, setCheckoutDate] = useState(new Date().toISOString().split('T')[0]);

  const [checkoutResult, setCheckoutResult] = useState<{ 
    bill: string, 
    days: number, 
    breakdown: string,
    guestName: string,
    roomNo: string,
    exitDate: string
  } | null>(null);

  // Form State for Check-In
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: '', phone: '', address: '', roomNumber: '',
    rateAmount: '', exitDate: '', billingCycle: 'monthly' as 'daily' | 'monthly',
    securityDeposit: '0'
  });

  useEffect(() => {
    dispatch(fetchActiveGuests());
  }, [dispatch]);

  /**
   * BILLING ENGINE
   * Calculates the amount based on Daily or Monthly (Month + Pro-rated Days)
   */
  const calculateBill = (guest: any, manualExitDate: string) => {
    const entry = new Date(guest.entryDate);
    const exit = new Date(manualExitDate);
    
    // Normalize time for accurate day counting
    entry.setHours(0, 0, 0, 0);
    exit.setHours(0, 0, 0, 0);

    const diffTime = exit.getTime() - entry.getTime();
    const totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))); 

    let amount = 0;
    let desc = "";

    if (guest.billingCycle === 'daily') {
      amount = totalDays * Number(guest.rateAmount);
      desc = `${totalDays} Day(s) @ ₹${guest.rateAmount}/day`;
    } else {
      const months = Math.floor(totalDays / 30);
      const extraDays = totalDays % 30;
      const dayRate = Number(guest.rateAmount) / 30;

      amount = (months * Number(guest.rateAmount)) + (extraDays * dayRate);
      
      if (months > 0) {
        desc = `${months} Month(s) ${extraDays > 0 ? `+ ${extraDays} Day(s)` : ''}`;
      } else {
        desc = `${extraDays} Day(s) (Pro-rated Monthly)`;
      }
    }

    return { totalDays, finalAmount: amount.toFixed(2), breakdown: desc };
  };

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("ID Document is mandatory!");

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('phone', formData.phone);
    data.append('address', formData.address);
    data.append('roomNumber', formData.roomNumber);
    data.append('rateAmount', formData.rateAmount);
    data.append('billingCycle', formData.billingCycle);
    data.append('securityDeposit', formData.securityDeposit);
    data.append('exitDate', formData.exitDate);
    data.append('idDocumentImage', file);

    const res = await dispatch(checkInGuest(data)) as any;
    
    if (res?.success || res?.payload?.success) { 
      setShowCheckIn(false);
      setFile(null);
      setFormData({ fullName: '', phone: '', address: '', roomNumber: '', rateAmount: '', exitDate: '', billingCycle: 'monthly', securityDeposit: '0' });
    } else {
      alert("Check-in failed. Please verify fields.");
    }
  };

  const handleConfirmCheckOut = async () => {
    if (!confirmingCheckoutId) return;
    
    const guest = occupancyData.find(g => g.id === confirmingCheckoutId);
    if (!guest) return;

    // Calculate bill based on the date selected in the modal
    const billData = calculateBill(guest, checkoutDate);

    const res = await dispatch(checkOutGuest(confirmingCheckoutId)) as any;
    
    if (res?.success || res?.payload?.success) {
      setConfirmingCheckoutId(null);
      setCheckoutResult({
        bill: billData.finalAmount,
        days: billData.totalDays,
        breakdown: billData.breakdown,
        guestName: guest.fullName,
        roomNo: guest.roomNumber,
        exitDate: checkoutDate
      });
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center no-print">
        <h2 className="font-display font-bold text-primary text-xl tracking-tight">Live Occupancy</h2>
        <button
          onClick={() => setShowCheckIn(true)}
          className="px-5 py-2 bg-primary text-cream text-xs font-bold rounded-full hover:bg-primary/90 transition-all shadow-sm uppercase tracking-widest"
        >
          + New Check-In
        </button>
      </div>

      {/* Main Table View */}
      <div className="bg-cream rounded-2xl border border-primary/8 overflow-hidden no-print">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-primary/8 bg-primary/3">
                {['Tenant', 'Room', 'Entry Date', 'Plan', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-bold text-primary/40 uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {occupancyData.length > 0 ? occupancyData.map((guest) => (
                <tr key={guest.id} className="border-b border-primary/5 hover:bg-primary/3 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-primary">{guest.fullName}</div>
                    <div className="text-[10px] text-primary/40 font-medium">{guest.phone}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-xs font-bold text-accent bg-accent/5 px-2 py-1 rounded-lg">
                      {guest.roomNumber}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-primary/60 text-xs">{guest.entryDate}</td>
                  <td className="px-5 py-4">
                    <div className="text-xs font-bold text-primary/70">₹{guest.rateAmount}</div>
                    <div className="text-[10px] text-primary/30 uppercase font-bold">{guest.billingCycle}</div>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => {
                        setCheckoutDate(new Date().toISOString().split('T')[0]);
                        setConfirmingCheckoutId(guest.id!);
                      }}
                      className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-tighter"
                    >
                      Check Out
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-primary/30 text-xs italic">No active residents.</td>
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
            <input type="text" placeholder="Full Name" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm" onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
            <input type="text" placeholder="Phone" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm" onChange={e => setFormData({ ...formData, phone: e.target.value })} />
            <input type="text" placeholder="Room Number" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm" onChange={e => setFormData({ ...formData, roomNumber: e.target.value })} />
            <input type="number" placeholder="Rate (₹)" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm" onChange={e => setFormData({ ...formData, rateAmount: e.target.value })} />
            <select className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm" value={formData.billingCycle} onChange={e => setFormData({ ...formData, billingCycle: e.target.value as 'daily' | 'monthly' })}>
              <option value="monthly">Monthly Plan</option>
              <option value="daily">Daily Plan</option>
            </select>
            <input type="date" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm" onChange={e => setFormData({ ...formData, exitDate: e.target.value })} />
            <textarea placeholder="Address" required className="md:col-span-2 form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm h-20" onChange={e => setFormData({ ...formData, address: e.target.value })} />
          </div>
          <div className="p-4 bg-accent/5 border border-accent/10 rounded-2xl">
            <label className="text-[10px] font-bold text-accent uppercase block mb-2 tracking-widest">Identity Proof Photo</label>
            <input type="file" required className="text-xs" onChange={e => setFile(e.target.files?.[0] || null)} />
          </div>
          <button type="submit" className="w-full py-3 bg-primary text-cream text-xs font-bold rounded-xl uppercase tracking-widest">Register Guest</button>
        </form>
      </Modal>

      {/* Confirmation Modal with Date Input */}
      <Modal isOpen={!!confirmingCheckoutId} onClose={() => setConfirmingCheckoutId(null)} title="Confirm Check-Out" size="sm">
        <div className="space-y-4 py-2">
          <div className="bg-primary/5 p-4 rounded-xl space-y-3 border border-primary/5">
            <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest block">Actual Check-Out Date</label>
            <input 
              type="date" 
              value={checkoutDate}
              onChange={(e) => setCheckoutDate(e.target.value)}
              className="w-full bg-white border border-primary/10 px-3 py-2 rounded-lg text-sm font-bold text-primary outline-none focus:border-primary"
            />
          </div>
          <p className="text-sm text-center text-primary/60">Finalize stay and generate invoice?</p>
          <div className="flex gap-2">
            <button onClick={handleConfirmCheckOut} className="flex-1 py-3 bg-red-500 text-white text-xs font-bold rounded-xl uppercase shadow-lg shadow-red-500/20 hover:bg-red-600">Confirm</button>
            <button onClick={() => setConfirmingCheckoutId(null)} className="flex-1 py-3 border border-primary/10 text-xs font-bold rounded-xl uppercase tracking-tighter hover:bg-primary/5">Cancel</button>
          </div>
        </div>
      </Modal>

      {/* Final Invoice Modal (Fixed Table Structure) */}
      <Modal isOpen={!!checkoutResult} onClose={() => setCheckoutResult(null)} title="Official Receipt" size="md">
        {checkoutResult && (
          <div className="p-2 bg-white text-primary">
            <div id="printable-bill" className="border-2 border-primary/10 p-6 rounded-lg">
              <div className="flex justify-between border-b-2 border-primary pb-4 mb-6">
                <h1 className="text-xl font-black uppercase tracking-tighter">Homestay PG</h1>
                <div className="text-right text-[10px] font-bold uppercase text-primary/40">
                  <p>Settled On: {checkoutResult.exitDate}</p>
                  <p>Invoice: #REC-{Math.floor(Math.random() * 10000)}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-[9px] font-bold text-primary/30 uppercase tracking-widest mb-1">Guest Details</p>
                <p className="font-bold text-lg leading-tight">{checkoutResult.guestName}</p>
                <p className="text-xs font-medium">Room Assigned: {checkoutResult.roomNo}</p>
              </div>

              <table className="w-full text-xs mb-8 border-collapse">
                <thead>
                  <tr className="border-b border-primary/10 text-[9px] font-bold text-primary/40 uppercase text-left">
                    <th className="py-2">Stay Description</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-5">
                      <p className="font-bold text-primary">Accommodation Charges</p>
                      <p className="text-[10px] italic text-primary/50">{checkoutResult.breakdown}</p>
                    </td>
                    <td className="py-5 text-right font-bold text-lg text-primary">₹{checkoutResult.bill}</td>
                  </tr>
                </tbody>
              </table>

              <div className="border-t-2 border-primary pt-4 flex justify-between items-end">
                <p className="text-[9px] font-bold text-primary/30 uppercase italic">Paid in Full</p>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-primary/40 uppercase">Grand Total</p>
                  <p className="text-4xl font-black text-primary leading-none">₹{checkoutResult.bill}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex gap-3 no-print">
              <button 
                onClick={() => { window.print(); setCheckoutResult(null); }} 
                className="flex-1 py-3.5 bg-primary text-white text-[10px] font-bold rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                Print Official Invoice
              </button>
              <button 
                onClick={() => setCheckoutResult(null)} 
                className="px-8 py-3.5 border border-primary/10 text-[10px] font-bold rounded-xl uppercase tracking-widest"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print, button, .modal-header { display: none !important; }
          body { background: white !important; }
          #printable-bill { border: 1px solid #ddd !important; width: 100% !important; margin: 0 !important; box-shadow: none !important; padding: 20px !important; }
        }
      `}</style>
    </div>
  );
}