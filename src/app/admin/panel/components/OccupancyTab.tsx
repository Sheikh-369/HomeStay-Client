// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks/hooks';
// import { fetchActiveGuests, checkInGuest, setSelectedOccupancy } from '@/src/lib/store/occupancy/occupancy-slice';
// import { fetchAllBookings } from '@/src/lib/store/booking/booking-slice'; 
// import { Status } from '@/src/lib/global/type';

// export default function OccupancyTab() {
//   const dispatch = useAppDispatch();
  
//   // 1. Get Active Guests for the table
//   const { occupancyData = [], status: occupancyStatus } = useAppSelector((state) => state.occupancySlice || {});
  
//   // 2. Get Bookings from the bookingSlice (Property name: bookingData)
//   const { bookingData = [] } = useAppSelector((state) => state.bookingSlice || {});

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     bookingId: '',
//     roomNumber: '',
//     rateAmount: '',
//     billingCycle: 'monthly',
//     securityDeposit: '0'
//   });

//   useEffect(() => {
//     dispatch(fetchActiveGuests());
//     dispatch(fetchAllBookings()); // Fetch the list of people who booked
//   }, [dispatch]);

//   const handleCheckInSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.bookingId) {
//       alert("Please select a guest from the booking list.");
//       return;
//     }

//     // This matches your Backend Controller req.body structure exactly
//     const payload = {
//       bookingId: formData.bookingId,
//       roomNumber: formData.roomNumber,
//       rateAmount: Number(formData.rateAmount),
//       billingCycle: formData.billingCycle,
//       securityDeposit: Number(formData.securityDeposit)
//     };

//     // Dispatching the manual thunk
//     const result = await dispatch(checkInGuest(payload as any));

//     if (result && (result as any).success) {
//       setIsModalOpen(false);
//       setFormData({ 
//         bookingId: '', 
//         roomNumber: '', 
//         rateAmount: '', 
//         billingCycle: 'monthly', 
//         securityDeposit: '0' 
//       });
//       alert("Check-in successful!");
//     } else {
//       alert((result as any).message || "Check-in failed. Ensure all fields are correct.");
//     }
//   };

//   return (
//     <div className="space-y-6 p-4">
//       {/* --- HEADER --- */}
//       <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-primary/10 shadow-sm">
//         <div>
//           <h2 className="text-2xl font-black text-primary tracking-tight">Active Occupancy</h2>
//           <p className="text-xs text-primary/40 font-bold uppercase">Live PG Residents</p>
//         </div>
//         <button 
//           onClick={() => setIsModalOpen(true)}
//           className="bg-accent text-cream px-6 py-3 rounded-2xl text-sm font-bold hover:bg-primary transition-all active:scale-95 shadow-lg flex items-center gap-2"
//         >
//           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
//           Check-in Guest
//         </button>
//       </div>

//       {/* --- RESIDENTS TABLE --- */}
//       <div className="bg-white rounded-[2rem] border border-primary/10 shadow-sm overflow-hidden">
//         <table className="w-full text-left">
//           <thead className="bg-primary/5 text-primary/40 text-[10px] uppercase font-black tracking-widest border-b border-primary/5">
//             <tr>
//               <th className="px-8 py-5">Resident</th>
//               <th className="px-8 py-5">Room</th>
//               <th className="px-8 py-5">Joined</th>
//               <th className="px-8 py-5">Rent/Rate</th>
//               <th className="px-8 py-5 text-right">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-primary/5">
//             {occupancyData.length === 0 ? (
//               <tr><td colSpan={5} className="px-8 py-20 text-center text-primary/20 italic font-medium">No one is currently checked in.</td></tr>
//             ) : (
//               occupancyData.map((guest: any) => (
//                 <tr key={guest.id || guest._id} className="hover:bg-primary/[0.01] transition-colors group">
//                   <td className="px-8 py-5">
//                     <p className="font-bold text-primary text-sm">{guest.fullName}</p>
//                     <p className="text-[10px] font-bold text-primary/30 uppercase">{guest.phone}</p>
//                   </td>
//                   <td className="px-8 py-5 font-black text-accent">R-{guest.roomNumber}</td>
//                   <td className="px-8 py-5 text-sm font-medium text-primary/60">{new Date(guest.entryDate).toLocaleDateString()}</td>
//                   <td className="px-8 py-5 font-bold text-primary">₹{guest.rateAmount}</td>
//                   <td className="px-8 py-5 text-right">
//                     <button 
//                       onClick={() => dispatch(setSelectedOccupancy(guest))}
//                       className="text-[10px] font-black uppercase text-primary/20 hover:text-red-500 transition-colors"
//                     >
//                       Check-out →
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* --- CHECK-IN MODAL --- */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/90 backdrop-blur-md">
//           <div className="bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
//             <div className="absolute top-0 right-0 p-8">
//                <button onClick={() => setIsModalOpen(false)} className="text-primary/20 hover:text-primary text-xl font-bold transition-colors">✕</button>
//             </div>
            
//             <h3 className="text-2xl font-black text-primary mb-2">Guest Entry</h3>
//             <p className="text-xs text-primary/40 mb-8 font-bold uppercase tracking-wider italic">Select a booking to activate stay</p>
            
//             <form onSubmit={handleCheckInSubmit} className="space-y-4">
//               <div className="space-y-2">
//                 <label className="text-[10px] font-black text-primary/30 uppercase ml-1">Choose from Bookings</label>
//                 <select 
//                   required
//                   className="w-full p-4 rounded-2xl border border-primary/10 text-sm focus:border-accent outline-none bg-primary/5 font-bold text-primary appearance-none"
//                   value={formData.bookingId}
//                   onChange={(e) => setFormData({...formData, bookingId: e.target.value})}
//                 >
//                   <option value="">-- Choose Resident --</option>
//                   {bookingData.map((b: any) => (
//                     <option key={b.id || b._id} value={b.id || b._id}>
//                       {b.fullName} ({b.phone})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-primary/30 uppercase ml-1">Room No.</label>
//                   <input 
//                     type="text" required placeholder="Ex: 101"
//                     className="w-full p-4 rounded-2xl border border-primary/10 text-sm bg-primary/5 outline-none focus:border-accent font-bold"
//                     onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-primary/30 uppercase ml-1">Rate (₹)</label>
//                   <input 
//                     type="number" required placeholder="Monthly Rate"
//                     className="w-full p-4 rounded-2xl border border-primary/10 text-sm bg-primary/5 outline-none focus:border-accent font-bold"
//                     onChange={(e) => setFormData({...formData, rateAmount: e.target.value})}
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-primary/30 uppercase ml-1">Deposit</label>
//                   <input 
//                     type="number" placeholder="Security"
//                     className="w-full p-4 rounded-2xl border border-primary/10 text-sm bg-primary/5 outline-none font-bold"
//                     onChange={(e) => setFormData({...formData, securityDeposit: e.target.value})}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <label className="text-[10px] font-black text-primary/30 uppercase ml-1">Cycle</label>
//                   <select 
//                     className="w-full p-4 rounded-2xl border border-primary/10 text-sm bg-primary/5 font-bold outline-none"
//                     onChange={(e) => setFormData({...formData, billingCycle: e.target.value})}
//                   >
//                     <option value="monthly">Monthly</option>
//                     <option value="daily">Daily</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="flex gap-4 pt-6">
//                 <button 
//                   type="button" 
//                   onClick={() => setIsModalOpen(false)}
//                   className="flex-1 py-4 text-sm font-black text-primary/20 uppercase tracking-widest hover:text-primary transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="submit" 
//                   disabled={occupancyStatus === Status.LOADING}
//                   className="flex-[2] bg-accent text-cream py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary shadow-xl shadow-accent/20 transition-all disabled:opacity-50"
//                 >
//                   {occupancyStatus === Status.LOADING ? 'Processing...' : 'Confirm Stay'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

//2nd
'use client';

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks/hooks';
import { fetchActiveGuests, checkInGuest, setSelectedOccupancy } from '@/src/lib/store/occupancy/occupancy-slice';
import { fetchAllBookings } from '@/src/lib/store/booking/booking-slice'; 
import { Status } from '@/src/lib/global/type';

export default function OccupancyTab() {
  const dispatch = useAppDispatch();
  
  const { occupancyData = [], status: occStatus } = useAppSelector((state) => state.occupancySlice || {});
  const { bookingData = [] } = useAppSelector((state) => state.bookingSlice || {});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalkIn, setIsWalkIn] = useState(false); // Toggle for Walk-in vs Online

  const [formData, setFormData] = useState({
    bookingId: '',
    fullName: '', // for walk-ins
    phone: '',    // for walk-ins
    roomNumber: '',
    rateAmount: '',
    billingCycle: 'monthly',
    securityDeposit: '0'
  });

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchActiveGuests());
    dispatch(fetchAllBookings());
  }, [dispatch]);

  const handleCheckInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If your backend ONLY supports bookingId, walk-ins must be handled 
    // by creating a booking first. For now, we follow your controller logic:
    const payload = {
      bookingId: isWalkIn ? 'WALK-IN' : formData.bookingId, 
      roomNumber: formData.roomNumber,
      rateAmount: Number(formData.rateAmount),
      billingCycle: formData.billingCycle,
      securityDeposit: Number(formData.securityDeposit),
      // If walk-in, we'd normally send name/phone to a different endpoint
      ...(isWalkIn && { fullName: formData.fullName, phone: formData.phone })
    };

    const result = await dispatch(checkInGuest(payload as any));

    if (result && (result as any).success) {
      setIsModalOpen(false);
      dispatch(fetchActiveGuests()); // Force refresh table
      setFormData({ bookingId: '', fullName: '', phone: '', roomNumber: '', rateAmount: '', billingCycle: 'monthly', securityDeposit: '0' });
    } else {
      alert((result as any).message || "Check-in failed");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-2 md:p-6 space-y-4 md:space-y-6">
      
      {/* --- RESPONSIVE HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 md:p-6 rounded-2xl border border-primary/10 shadow-sm gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-primary tracking-tight">Resident Register</h2>
          <p className="text-[10px] md:text-xs text-primary/40 font-bold uppercase tracking-widest">Live Occupancy Status</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto bg-accent text-cream px-6 py-3 rounded-xl text-sm font-bold hover:bg-primary transition-all shadow-lg flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
          Check-in Guest
        </button>
      </div>

      {/* --- RESPONSIVE TABLE / MOBILE CARDS --- */}
      <div className="bg-white rounded-2xl border border-primary/10 shadow-sm overflow-hidden">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-primary/5 text-primary/40 text-[10px] uppercase font-black tracking-widest border-b border-primary/5">
              <tr>
                <th className="px-6 py-5">Guest</th>
                <th className="px-6 py-5">Room</th>
                <th className="px-6 py-5">Joined</th>
                <th className="px-6 py-5">Rent</th>
                <th className="px-6 py-5">Paid</th>
                <th className="px-6 py-5 text-right">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5 text-sm font-medium">
              {occupancyData.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-20 text-center text-primary/20 italic">No active residents.</td></tr>
              ) : (
                occupancyData.map((guest: any) => (
                  <tr key={guest.id} className="hover:bg-primary/[0.01] transition-colors">
                    <td className="px-6 py-5">
                      <p className="font-bold text-primary">{guest.fullName}</p>
                      <p className="text-[10px] text-primary/40 uppercase">{guest.phone}</p>
                    </td>
                    <td className="px-6 py-5 font-black text-accent">#{guest.roomNumber}</td>
                    <td className="px-6 py-5 text-primary/60">{new Date(guest.entryDate).toLocaleDateString()}</td>
                    <td className="px-6 py-5">₹{guest.rateAmount}</td>
                    <td className="px-6 py-5 text-green-600 font-bold">₹{guest.totalPaid}</td>
                    <td className="px-6 py-5 text-right">
                      <button onClick={() => dispatch(setSelectedOccupancy(guest))} className="text-[10px] font-black uppercase text-primary/20 hover:text-red-500">Check-out</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden divide-y divide-primary/5">
          {occupancyData.map((guest: any) => (
            <div key={guest.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-bold text-primary text-sm">{guest.fullName}</p>
                <p className="text-[10px] text-primary/40">Room #{guest.roomNumber} • Joined {new Date(guest.entryDate).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-accent text-sm">₹{guest.rateAmount}</p>
                <button onClick={() => dispatch(setSelectedOccupancy(guest))} className="text-[10px] font-black uppercase text-red-400">Exit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- DUAL-MODE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-primary/90 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-t-[2.5rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]">
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl md:text-2xl font-black text-primary">Guest Check-in</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-primary/20 hover:text-primary text-xl font-bold">✕</button>
            </div>

            {/* Toggle Switch */}
            <div className="flex bg-primary/5 p-1 rounded-xl mb-6">
              <button 
                onClick={() => setIsWalkIn(false)}
                className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${!isWalkIn ? 'bg-white shadow-sm text-accent' : 'text-primary/40'}`}
              >Online Booker</button>
              <button 
                onClick={() => setIsWalkIn(true)}
                className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${isWalkIn ? 'bg-white shadow-sm text-accent' : 'text-primary/40'}`}
              >Direct Walk-in</button>
            </div>
            
            <form onSubmit={handleCheckInSubmit} className="space-y-4">
              {isWalkIn ? (
                <>
                  <input type="text" placeholder="Full Name" required className="w-full p-4 rounded-xl border border-primary/10 bg-primary/5 text-sm" onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                  <input type="text" placeholder="Phone Number" required className="w-full p-4 rounded-xl border border-primary/10 bg-primary/5 text-sm" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </>
              ) : (
                <select 
                  required
                  className="w-full p-4 rounded-xl border border-primary/10 bg-primary/5 text-sm font-bold appearance-none"
                  value={formData.bookingId}
                  onChange={(e) => setFormData({...formData, bookingId: e.target.value})}
                >
                  <option value="">-- Select Guest --</option>
                  {bookingData.map((b: any) => (
                    <option key={b.id} value={b.id}>{b.fullName} ({b.phone})</option>
                  ))}
                </select>
              )}

              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Room #" required className="w-full p-4 rounded-xl border border-primary/10 bg-primary/5 text-sm font-bold" 
                  onChange={(e) => setFormData({...formData, roomNumber: e.target.value})} />
                <input type="number" placeholder="Rent" required className="w-full p-4 rounded-xl border border-primary/10 bg-primary/5 text-sm font-bold" 
                  onChange={(e) => setFormData({...formData, rateAmount: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Deposit" className="w-full p-4 rounded-xl border border-primary/10 bg-primary/5 text-sm" 
                  onChange={(e) => setFormData({...formData, securityDeposit: e.target.value})} />
                <select className="w-full p-4 rounded-xl border border-primary/10 bg-primary/5 text-sm font-bold"
                  onChange={(e) => setFormData({...formData, billingCycle: e.target.value})}>
                  <option value="monthly">Monthly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>

              <button type="submit" className="w-full bg-accent text-cream py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-primary transition-all">
                {occStatus === Status.LOADING ? 'Saving...' : 'Confirm Stay'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}