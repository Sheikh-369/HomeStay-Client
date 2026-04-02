// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks/hooks';
// import { checkInGuest, checkOutGuest, fetchActiveGuests } from '@/src/lib/store/occupancy/occupancy-slice';
// import Modal from './Modal';
// import { fetchRooms } from '@/src/lib/store/room/room-slice';

// export default function OccupancyDashboard() {
//   const dispatch = useAppDispatch();
//   const { occupancyData } = useAppSelector((state) => state.occupancySlice);
//   //for fetching rooms in the dropdown
//   const { rooms } = useAppSelector((state) => state.roomSlice);

//   // Modal & Selection States
//   const [showCheckIn, setShowCheckIn] = useState(false);
//   const [confirmingCheckoutId, setConfirmingCheckoutId] = useState<string | null>(null);
  
//   // State for Checkout Date (Auto-filled to today)
//   const [checkoutDate, setCheckoutDate] = useState(new Date().toISOString().split('T')[0]);

//   const [checkoutResult, setCheckoutResult] = useState<{ 
//     bill: string, 
//     days: number, 
//     breakdown: string,
//     guestName: string,
//     roomNo: string,
//     exitDate: string
//   } | null>(null);

//   // Form State for Check-In
//   const [file, setFile] = useState<File | null>(null);
//   const [formData, setFormData] = useState({
//     fullName: '', phone: '', address: '', roomNumber: '',
//     rateAmount: '', exitDate: '', billingCycle: 'monthly' as 'daily' | 'monthly',
//     securityDeposit: '0'
//   });

//   useEffect(() => {
//     dispatch(fetchActiveGuests());
//     dispatch(fetchRooms());
//   }, [dispatch]);

//   // Filter for only Vacant rooms to display in the Check-in modal
//   const vacantRooms = rooms.filter(r => r.status === 'Vacant');
//   /**
//    * BILLING ENGINE
//    * Calculates the amount based on Daily or Monthly (Month + Pro-rated Days)
//    */
//   const calculateBill = (guest: any, manualExitDate: string) => {
//     const entry = new Date(guest.entryDate);
//     const exit = new Date(manualExitDate);
    
//     // Normalize time for accurate day counting
//     entry.setHours(0, 0, 0, 0);
//     exit.setHours(0, 0, 0, 0);

//     const diffTime = exit.getTime() - entry.getTime();
//     const totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))); 

//     let amount = 0;
//     let desc = "";

//     if (guest.billingCycle === 'daily') {
//       amount = totalDays * Number(guest.rateAmount);
//       desc = `${totalDays} Day(s) @ ₹${guest.rateAmount}/day`;
//     } else {
//       const months = Math.floor(totalDays / 30);
//       const extraDays = totalDays % 30;
//       const dayRate = Number(guest.rateAmount) / 30;

//       amount = (months * Number(guest.rateAmount)) + (extraDays * dayRate);
      
//       if (months > 0) {
//         desc = `${months} Month(s) ${extraDays > 0 ? `+ ${extraDays} Day(s)` : ''}`;
//       } else {
//         desc = `${extraDays} Day(s) (Pro-rated Monthly)`;
//       }
//     }

//     return { totalDays, finalAmount: amount.toFixed(2), breakdown: desc };
//   };

//   const handleCheckIn = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return alert("ID Document is mandatory!");

//     const data = new FormData();
//     data.append('fullName', formData.fullName);
//     data.append('phone', formData.phone);
//     data.append('address', formData.address);
//     data.append('roomNumber', formData.roomNumber);
//     data.append('rateAmount', formData.rateAmount);
//     data.append('billingCycle', formData.billingCycle);
//     data.append('securityDeposit', formData.securityDeposit);
//     data.append('exitDate', formData.exitDate);
//     data.append('idDocumentImage', file);

//     const res = await dispatch(checkInGuest(data)) as any;
    
//     if (res?.success || res?.payload?.success) { 
//       setShowCheckIn(false);
//       setFile(null);
//       setFormData({ fullName: '', phone: '', address: '', roomNumber: '', rateAmount: '', exitDate: '', billingCycle: 'monthly', securityDeposit: '0' });
//     } else {
//       alert("Check-in failed. Please verify fields.");
//     }
//   };

//   const handleConfirmCheckOut = async () => {
//     if (!confirmingCheckoutId) return;
    
//     const guest = occupancyData.find(g => g.id === confirmingCheckoutId);
//     if (!guest) return;

//     // Calculate bill based on the date selected in the modal
//     const billData = calculateBill(guest, checkoutDate);

//     const res = await dispatch(checkOutGuest(confirmingCheckoutId)) as any;
    
//     if (res?.success || res?.payload?.success) {
//       setConfirmingCheckoutId(null);
//       setCheckoutResult({
//         bill: billData.finalAmount,
//         days: billData.totalDays,
//         breakdown: billData.breakdown,
//         guestName: guest.fullName,
//         roomNo: guest.roomNumber,
//         exitDate: checkoutDate
//       });
//     }
//   };

//   return (
//     <div className="space-y-5">
//       <div className="flex justify-between items-center no-print">
//         <h2 className="font-display font-bold text-primary text-xl tracking-tight">Live Occupancy</h2>
//         <button
//           onClick={() => setShowCheckIn(true)}
//           className="px-5 py-2 bg-primary text-cream text-xs font-bold rounded-full hover:bg-primary/90 transition-all shadow-sm uppercase tracking-widest"
//         >
//           + New Check-In
//         </button>
//       </div>

//       {/* Main Table View */}
//       <div className="bg-cream rounded-2xl border border-primary/8 overflow-hidden no-print">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm border-collapse">
//             <thead>
//               <tr className="border-b border-primary/8 bg-primary/3">
//                 {['Tenant', 'Room', 'Entry Date', 'Deposit','Plan', 'Actions'].map((h) => (
//                   <th key={h} className="text-left px-5 py-3 text-[10px] font-bold text-primary/40 uppercase tracking-widest">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {occupancyData.length > 0 ? occupancyData.map((guest) => (
//                 <tr key={guest.id} className="border-b border-primary/5 hover:bg-primary/3 transition-colors">
//                   <td className="px-5 py-4">
//                     <div className="font-semibold text-primary">{guest.fullName}</div>
//                     <div className="text-[10px] text-primary/40 font-medium">{guest.phone}</div>
//                   </td>
//                   <td className="px-5 py-4">
//                     <span className="font-mono text-xs font-bold text-accent bg-accent/5 px-2 py-1 rounded-lg">
//                       {guest.roomNumber}
//                     </span>
//                   </td>
//                   <td className="px-5 py-4 text-primary/60 text-xs">{guest.entryDate}</td>
//                   <td className="px-5 py-4 text-primary/60 text-xs">{guest.securityDeposit}</td>
//                   <td className="px-5 py-4">
//                     <div className="text-xs font-bold text-primary/70">₹{guest.rateAmount}</div>
//                     <div className="text-[10px] text-primary/30 uppercase font-bold">{guest.billingCycle}</div>
//                   </td>
//                   <td className="px-5 py-4">
//                     <button
//                       onClick={() => {
//                         setCheckoutDate(new Date().toISOString().split('T')[0]);
//                         setConfirmingCheckoutId(guest.id!);
//                       }}
//                       className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-tighter"
//                     >
//                       Check Out
//                     </button>
//                   </td>
//                 </tr>
//               )) : (
//                 <tr>
//                   <td colSpan={5} className="p-10 text-center text-primary/30 text-xs italic">No active residents.</td>
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
//             {/* Name and Phone */}
//             <input type="text" placeholder="Full Name" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm" onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
//             <input type="text" placeholder="Phone" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm" onChange={e => setFormData({ ...formData, phone: e.target.value })} />

//             {/* Room Selection Grid */}
//             <div className="md:col-span-2 space-y-3">
//               <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">
//                 Select Available Room
//               </label>
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[280px] overflow-y-auto p-1 pr-2 custom-scrollbar border-t border-primary/5 pt-3">
//                 {vacantRooms.length > 0 ? (
//                   vacantRooms.map((room) => (
//                     <div 
//                       key={room.id}
//                       onClick={() => setFormData({ 
//                         ...formData, 
//                         roomNumber: room.roomNumber, 
//                         rateAmount: room.rent 
//                       })}
//                       className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer group ${
//                         formData.roomNumber === room.roomNumber 
//                         ? 'border-accent bg-accent/5 shadow-sm' 
//                         : 'border-primary/8 bg-cream hover:border-primary/20 hover:shadow-md'
//                       }`}
//                     >
//                       {formData.roomNumber === room.roomNumber && (
//                         <div className="absolute top-3 right-3 text-accent">
//                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
//                         </div>
//                       )}

//                       <div className="flex flex-col h-full">
//                         <div className="mb-2">
//                           <p className="font-display font-bold text-primary text-lg leading-none">{room.roomNumber}</p>
//                           <p className="text-[10px] text-primary/40 font-semibold uppercase mt-1">{room.floor} Floor • {room.roomType}</p>
//                         </div>

//                         <div className="flex flex-wrap gap-1 mb-3">
//                           {(room.features || []).slice(0, 3).map((feature: string) => (
//                             <span key={feature} className="px-1.5 py-0.5 rounded bg-primary/5 text-[9px] font-medium text-primary/60">{feature}</span>
//                           ))}
//                         </div>

//                         <div className="mt-auto pt-2 border-t border-primary/5 flex justify-between items-center">
//                           <p className="text-[10px] text-primary/40 font-bold uppercase tracking-tighter">Rent</p>
//                           <p className="font-display font-bold text-accent">₹{room.rent}</p>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="col-span-full py-10 text-center bg-primary/5 rounded-2xl border border-dashed border-primary/20">
//                     <p className="text-xs text-primary/40 font-medium">No vacant rooms available.</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Rate and Billing Cycle - Wrapped in a sub-grid for PC responsiveness */}
//             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">Daily/Monthly Rate (₹)</label>
//                 <input type="number" placeholder="Rate (₹)" required value={formData.rateAmount} className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm" onChange={e => setFormData({ ...formData, rateAmount: e.target.value })} />
//               </div>
//               <div className="space-y-1.5">
//                 <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">Billing Cycle</label>
//                 <select className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm" value={formData.billingCycle} onChange={e => setFormData({ ...formData, billingCycle: e.target.value as 'daily' | 'monthly' })}>
//                   <option value="monthly">Monthly Plan</option>
//                   <option value="daily">Daily Plan</option>
//                 </select>
//               </div>
//             </div>

//             {/* Security Deposit and Exit Date */}
//             <div className="space-y-1.5">
//               <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">Security Deposit / Advance (₹)</label>
//               <div className="relative">
//                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 text-sm font-bold">₹</span>
//                 <input 
//                   type="number" 
//                   placeholder="0.00"
//                   value={formData.securityDeposit}
//                   onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
//                   className="form-input pl-8 w-full bg-primary/5 border border-primary/10 rounded-xl text-sm font-semibold focus:border-accent/30 transition-all"
//                 />
//               </div>
//             </div>
//             <div className="space-y-1.5">
//               <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">Anticipated Exit Date</label>
//               <input type="date" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm" onChange={e => setFormData({ ...formData, exitDate: e.target.value })} />
//             </div>

//             {/* Address */}
//             <textarea placeholder="Permanent Address" required className="md:col-span-2 form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm h-20 resize-none" onChange={e => setFormData({ ...formData, address: e.target.value })} />
            
//             {/* Custom Styled Identity Proof Photo Upload */}
//             <div className="md:col-span-2">
//               <label className="relative flex flex-col items-center justify-center p-6 bg-accent/5 border border-dashed border-accent/20 rounded-2xl cursor-pointer hover:bg-accent/10 transition-all group">
//                 <input 
//                   type="file" 
//                   required 
//                   className="hidden" 
//                   onChange={e => setFile(e.target.files?.[0] || null)} 
//                 />
//                 <div className="flex flex-col items-center text-center">
//                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent mb-2 group-hover:scale-110 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
//                   <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Upload Identity Proof</span>
//                   <span className="text-[9px] text-primary/40 mt-1">{file ? file.name : "Select Image/PDF (Max 5MB)"}</span>
//                 </div>
//               </label>
//             </div>
//           </div>

//           <button type="submit" className="w-full py-3.5 bg-primary text-cream text-[10px] font-bold rounded-xl uppercase tracking-[0.2em] shadow-lg shadow-primary/10 hover:bg-primary/90 transition-all mt-2">
//             Register Guest
//           </button>
//         </form>
//       </Modal>

//       {/* Confirmation Modal with Date Input */}
//       <Modal isOpen={!!confirmingCheckoutId} onClose={() => setConfirmingCheckoutId(null)} title="Confirm Check-Out" size="sm">
//         <div className="space-y-4 py-2">
//           <div className="bg-primary/5 p-4 rounded-xl space-y-3 border border-primary/5">
//             <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest block">Actual Check-Out Date</label>
//             <input 
//               type="date" 
//               value={checkoutDate}
//               onChange={(e) => setCheckoutDate(e.target.value)}
//               className="w-full bg-white border border-primary/10 px-3 py-2 rounded-lg text-sm font-bold text-primary outline-none focus:border-primary"
//             />
//           </div>
//           <p className="text-sm text-center text-primary/60">Finalize stay and generate invoice?</p>
//           <div className="flex gap-2">
//             <button onClick={handleConfirmCheckOut} className="flex-1 py-3 bg-red-500 text-white text-xs font-bold rounded-xl uppercase shadow-lg shadow-red-500/20 hover:bg-red-600">Confirm</button>
//             <button onClick={() => setConfirmingCheckoutId(null)} className="flex-1 py-3 border border-primary/10 text-xs font-bold rounded-xl uppercase tracking-tighter hover:bg-primary/5">Cancel</button>
//           </div>
//         </div>
//       </Modal>

//       {/* Final Invoice Modal (Fixed Table Structure) */}
//       <Modal isOpen={!!checkoutResult} onClose={() => setCheckoutResult(null)} title="Official Receipt" size="md">
//         {checkoutResult && (
//           <div className="p-2 bg-white text-primary">
//             <div id="printable-bill" className="border-2 border-primary/10 p-6 rounded-lg">
//               <div className="flex justify-between border-b-2 border-primary pb-4 mb-6">
//                 <h1 className="text-xl font-black uppercase tracking-tighter">Homestay PG</h1>
//                 <div className="text-right text-[10px] font-bold uppercase text-primary/40">
//                   <p>Settled On: {checkoutResult.exitDate}</p>
//                   <p>Invoice: #REC-{Math.floor(Math.random() * 10000)}</p>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <p className="text-[9px] font-bold text-primary/30 uppercase tracking-widest mb-1">Guest Details</p>
//                 <p className="font-bold text-lg leading-tight">{checkoutResult.guestName}</p>
//                 <p className="text-xs font-medium">Room Assigned: {checkoutResult.roomNo}</p>
//               </div>

//               <table className="w-full text-xs mb-8 border-collapse">
//                 <thead>
//                   <tr className="border-b border-primary/10 text-[9px] font-bold text-primary/40 uppercase text-left">
//                     <th className="py-2">Stay Description</th>
//                     <th className="py-2 text-right">Amount</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td className="py-5">
//                       <p className="font-bold text-primary">Accommodation Charges</p>
//                       <p className="text-[10px] italic text-primary/50">{checkoutResult.breakdown}</p>
//                     </td>
//                     <td className="py-5 text-right font-bold text-lg text-primary">₹{checkoutResult.bill}</td>
//                   </tr>
//                 </tbody>
//               </table>

//               <div className="border-t-2 border-primary pt-4 flex justify-between items-end">
//                 <p className="text-[9px] font-bold text-primary/30 uppercase italic">Paid in Full</p>
//                 <div className="text-right">
//                   <p className="text-[10px] font-bold text-primary/40 uppercase">Grand Total</p>
//                   <p className="text-4xl font-black text-primary leading-none">₹{checkoutResult.bill}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-8 flex gap-3 no-print">
//               <button 
//                 onClick={() => { window.print(); setCheckoutResult(null); }} 
//                 className="flex-1 py-3.5 bg-primary text-white text-[10px] font-bold rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20"
//               >
//                 Print Official Invoice
//               </button>
//               <button 
//                 onClick={() => setCheckoutResult(null)} 
//                 className="px-8 py-3.5 border border-primary/10 text-[10px] font-bold rounded-xl uppercase tracking-widest"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>

//       {/* Print Styles */}
//       <style jsx global>{`
//         @media print {
//           .no-print, button, .modal-header { display: none !important; }
//           body { background: white !important; }
//           #printable-bill { border: 1px solid #ddd !important; width: 100% !important; margin: 0 !important; box-shadow: none !important; padding: 20px !important; }
//         }
//       `}</style>
//     </div>
//   );
// }

//2nd
'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks/hooks';
import { checkInGuest, checkOutGuest, fetchActiveGuests } from '@/src/lib/store/occupancy/occupancy-slice';
import Modal from './Modal';
import { fetchRooms } from '@/src/lib/store/room/room-slice';

export default function OccupancyDashboard() {
  const dispatch = useAppDispatch();
  const { occupancyData } = useAppSelector((state) => state.occupancySlice);
  const { rooms } = useAppSelector((state) => state.roomSlice);

  const [showCheckIn, setShowCheckIn] = useState(false);
  const [confirmingCheckoutId, setConfirmingCheckoutId] = useState<string | null>(null);
  const [checkoutDate, setCheckoutDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Updated state type to include subtotal and deposit
  const [checkoutResult, setCheckoutResult] = useState<{ 
    bill: string, 
    subtotal: string,
    deposit: string,
    days: number, 
    breakdown: string,
    guestName: string,
    roomNo: string,
    exitDate: string
  } | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: '', phone: '', address: '', roomNumber: '',
    rateAmount: '', exitDate: '', billingCycle: 'monthly' as 'daily' | 'monthly',
    securityDeposit: '0'
  });

  useEffect(() => {
    dispatch(fetchActiveGuests());
    dispatch(fetchRooms());
  }, [dispatch]);

  const vacantRooms = rooms.filter(r => r.status === 'Vacant');

  /**
   * BILLING ENGINE - Updated to handle deposit subtraction
   */
  const calculateBill = (guest: any, manualExitDate: string) => {
    const entry = new Date(guest.entryDate);
    const exit = new Date(manualExitDate);
    
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

    const subtotal = amount;
    const deposit = Number(guest.securityDeposit || 0);
    const finalPayable = Math.max(0, subtotal - deposit);

    return { 
      totalDays, 
      subtotal: subtotal.toFixed(2),
      deposit: deposit.toFixed(2),
      finalAmount: finalPayable.toFixed(2), 
      breakdown: desc 
    };
  };

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("ID Document is mandatory!");

    setIsSubmitting(true); // Start loading

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

    try {
      const res = await dispatch(checkInGuest(data)) as any;
      if (res?.success || res?.payload?.success) { 
        setShowCheckIn(false);
        setFile(null);
        setFormData({ fullName: '', phone: '', address: '', roomNumber: '', rateAmount: '', exitDate: '', billingCycle: 'monthly', securityDeposit: '0' });
      } else {
        alert("Check-in failed. Please verify fields.");
      }
    } catch (err) {
      alert("An error occurred during registration.");
    } finally {
      setIsSubmitting(false); // End loading
    }
  };

  const handleConfirmCheckOut = async () => {
    if (!confirmingCheckoutId) return;
    
    const guest = occupancyData.find(g => g.id === confirmingCheckoutId);
    if (!guest) return;

    const billData = calculateBill(guest, checkoutDate);

    const res = await dispatch(checkOutGuest(confirmingCheckoutId)) as any;
    
    if (res?.success || res?.payload?.success) {
      setConfirmingCheckoutId(null);
      setCheckoutResult({
        bill: billData.finalAmount,
        subtotal: billData.subtotal,
        deposit: billData.deposit,
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

      <div className="bg-cream rounded-2xl border border-primary/8 overflow-hidden no-print">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-primary/8 bg-primary/3">
                {['Tenant', 'Room', 'Entry Date', 'Deposit','Plan', 'Actions'].map((h) => (
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
                  <td className="px-5 py-4 text-primary/60 text-xs">{guest.securityDeposit}</td>
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
                  <td colSpan={6} className="p-10 text-center text-primary/30 text-xs italic">No active residents.</td>
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

            <div className="md:col-span-2 space-y-3">
              <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">
                Select Available Room
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[280px] overflow-y-auto p-1 pr-2 custom-scrollbar border-t border-primary/5 pt-3">
                {vacantRooms.length > 0 ? (
                  vacantRooms.map((room) => (
                    <div 
                      key={room.id}
                      onClick={() => setFormData({ 
                        ...formData, 
                        roomNumber: room.roomNumber, 
                        rateAmount: room.rent 
                      })}
                      className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer group ${
                        formData.roomNumber === room.roomNumber 
                        ? 'border-accent bg-accent/5 shadow-sm' 
                        : 'border-primary/8 bg-cream hover:border-primary/20 hover:shadow-md'
                      }`}
                    >
                      {formData.roomNumber === room.roomNumber && (
                        <div className="absolute top-3 right-3 text-accent">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                      )}
                      <div className="flex flex-col h-full">
                        <div className="mb-2">
                          <p className="font-display font-bold text-primary text-lg leading-none">{room.roomNumber}</p>
                          <p className="text-[10px] text-primary/40 font-semibold uppercase mt-1">{room.floor} Floor • {room.roomType}</p>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {(room.features || []).slice(0, 3).map((feature: string) => (
                            <span key={feature} className="px-1.5 py-0.5 rounded bg-primary/5 text-[9px] font-medium text-primary/60">{feature}</span>
                          ))}
                        </div>
                        <div className="mt-auto pt-2 border-t border-primary/5 flex justify-between items-center">
                          <p className="text-[10px] text-primary/40 font-bold uppercase tracking-tighter">Rent</p>
                          <p className="font-display font-bold text-accent">₹{room.rent}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-10 text-center bg-primary/5 rounded-2xl border border-dashed border-primary/20">
                    <p className="text-xs text-primary/40 font-medium">No vacant rooms available.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">Daily/Monthly Rate (₹)</label>
                <input type="number" placeholder="Rate (₹)" required value={formData.rateAmount} className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm" onChange={e => setFormData({ ...formData, rateAmount: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">Billing Cycle</label>
                <select className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm" value={formData.billingCycle} onChange={e => setFormData({ ...formData, billingCycle: e.target.value as 'daily' | 'monthly' })}>
                  <option value="monthly">Monthly Plan</option>
                  <option value="daily">Daily Plan</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">Security Deposit / Advance (₹)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 text-sm font-bold">₹</span>
                <input 
                  type="number" 
                  placeholder="0.00"
                  value={formData.securityDeposit}
                  onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                  className="form-input pl-8 w-full bg-primary/5 border border-primary/10 rounded-xl text-sm font-semibold focus:border-accent/30 transition-all"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest ml-1">Anticipated Exit Date</label>
              <input type="date" required className="form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm" onChange={e => setFormData({ ...formData, exitDate: e.target.value })} />
            </div>

            <textarea placeholder="Permanent Address" required className="md:col-span-2 form-input w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm h-20 resize-none" onChange={e => setFormData({ ...formData, address: e.target.value })} />
            
            <div className="md:col-span-2">
              <label className="relative flex flex-col items-center justify-center p-6 bg-accent/5 border border-dashed border-accent/20 rounded-2xl cursor-pointer hover:bg-accent/10 transition-all group">
                <input 
                  type="file" 
                  required 
                  className="hidden" 
                  onChange={e => setFile(e.target.files?.[0] || null)} 
                />
                <div className="flex flex-col items-center text-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent mb-2 group-hover:scale-110 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Upload Identity Proof</span>
                  <span className="text-[9px] text-primary/40 mt-1">{file ? file.name : "Select Image/PDF (Max 5MB)"}</span>
                </div>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-3.5 text-cream text-[10px] font-bold rounded-xl uppercase tracking-[0.2em] transition-all mt-2 flex items-center justify-center gap-2 ${
              isSubmitting ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin h-3 w-3 border-2 border-cream border-t-transparent rounded-full" />
                Processing...
              </>
            ) : "Register Guest"}
          </button>
        </form>
      </Modal>

      {/* Confirmation Modal */}
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

      {/* Final Invoice Modal - Updated Table Body and Total Section */}
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
                    <td className="py-4">
                      <p className="font-bold text-primary">Accommodation Charges</p>
                      <p className="text-[10px] italic text-primary/50">{checkoutResult.breakdown}</p>
                    </td>
                    <td className="py-4 text-right font-bold text-primary">₹{checkoutResult.subtotal}</td>
                  </tr>
                  <tr className="border-t border-primary/5">
                    <td className="py-3">
                      <p className="font-bold text-red-500">Less: Security Deposit</p>
                    </td>
                    <td className="py-3 text-right font-bold text-red-500">-₹{checkoutResult.deposit}</td>
                  </tr>
                </tbody>
              </table>

              <div className="border-t-2 border-primary pt-4 flex justify-between items-end">
                <p className="text-[9px] font-bold text-primary/30 uppercase italic">Final Settlement</p>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-primary/40 uppercase">Amount to Collect</p>
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