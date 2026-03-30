'use client';

import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { StatCard, StatusBadge } from './AdminShared';
import { mockRooms } from './AdminTypes';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks/hooks';
import { IBookingData } from '@/src/lib/store/booking/booking-slice-type';
import { adminDeleteBooking, adminUpdateBooking, fetchAllBookings } from '@/src/lib/store/booking/booking-slice';
import { fetchMessages } from '@/src/lib/store/message/message-slice';
import { IMessageData } from '@/src/lib/store/message/message-slice-type';
import { BookingStatus, PaymentStatus } from '@/src/lib/global/type';

interface OverviewTabProps {
  onTabChange: (tab: string) => void;
}

export default function OverviewTab({ onTabChange }: OverviewTabProps) {
  const dispatch = useAppDispatch();
  
  const { messages } = useAppSelector((state) => state.messageSlice);
  const { bookingData } = useAppSelector((state) => state.bookingSlice);
  
  const [selectedBooking, setSelectedBooking] = useState<IBookingData | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<IMessageData | null>(null);

  useEffect(() => {
    dispatch(fetchAllBookings());
    dispatch(fetchMessages());
  }, [dispatch]);

  const stats = {
    total: bookingData.length,
    active: bookingData.filter(b => b.bookingStatus === BookingStatus.CONFIRMED).length,
    unreadMessages: messages.length,
  };

  const handleUpdateStatus = async (id: string, payStatus: PaymentStatus) => {
    const res = await dispatch(adminUpdateBooking(id, payStatus));
    if (res.success) setSelectedBooking(null);
  };

  const handleEmailReply = (email: string = '', subject: string = '') => {
    const safeSubject = encodeURIComponent(`RE: ${subject || 'Inquiry'}`);
    window.location.href = `mailto:${email}?subject=${safeSubject}`;
  };

  return (
    <div className="space-y-6 pb-10 max-w-full overflow-x-hidden px-1">
      {/* MOBILE FIX: Changed grid-cols-2 to grid-cols-1 on very small screens 
         and added gap-3 to prevent cards from touching.
      */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <StatCard 
          label="TOTAL" 
          value={stats.total} 
          sub="Bookings" 
          accent 
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>}
        />
        <StatCard 
          label="CONFIRMED" 
          value={stats.active} 
          sub="Active stays" 
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>}
        />
        <StatCard 
          label="VACANT" 
          value={mockRooms.filter(r => !r.occupied).length} 
          sub={`of ${mockRooms.length}`} 
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>}
        />
        <StatCard 
          label="MESSAGES" 
          value={stats.unreadMessages} 
          sub="Unread" 
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>}
        />
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-cream rounded-2xl border border-primary/8 overflow-hidden">
        <div className="px-4 py-4 border-b border-primary/8 flex items-center justify-between">
          <h2 className="font-display font-bold text-primary text-base">Recent Bookings</h2>
          <button onClick={() => onTabChange('bookings')} className="text-xs font-semibold text-accent">View all →</button>
        </div>
        {/* Added overflow-x-auto to prevent mobile horizontal stretching */}
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-sm text-left min-w-[450px]">
            <thead>
              <tr className="border-b border-primary/8 bg-primary/2">
                <th className="px-4 py-3 text-[10px] font-bold text-primary/40 uppercase tracking-widest">Tenant</th>
                <th className="px-4 py-3 text-[10px] font-bold text-primary/40 uppercase tracking-widest hidden md:table-cell">Stay</th>
                <th className="px-4 py-3 text-[10px] font-bold text-primary/40 uppercase tracking-widest">Status</th>
                <th className="px-4 py-3 text-[10px] font-bold text-primary/40 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {bookingData.slice(0, 5).map((b) => (
                <tr key={b.id} className="hover:bg-primary/3 transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="font-semibold text-primary truncate max-w-[120px]">{b.fullName}</p>
                    <p className="text-[9px] text-primary/40 font-mono hidden sm:block">{b.id?.substring(0, 8)}</p>
                  </td>
                  <td className="px-4 py-3.5 text-primary/60 hidden md:table-cell text-xs">{b.entryDate}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={b.bookingStatus} /></td>
                  <td className="px-4 py-3.5 text-right">
                    <button onClick={() => setSelectedBooking(b)} className="text-xs font-bold text-accent">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Messages Section */}
      <div className="bg-cream rounded-2xl border border-primary/8 overflow-hidden">
        <div className="px-4 py-4 border-b border-primary/8 flex items-center justify-between">
          <h2 className="font-display font-bold text-primary text-base">Recent Messages</h2>
          <button onClick={() => onTabChange('messages')} className="text-xs font-semibold text-accent">View all →</button>
        </div>
        <div className="divide-y divide-primary/5">
          {messages.length > 0 ? (
            messages.slice(0, 5).map((msg) => (
              <div key={msg.id} onClick={() => setSelectedMessage(msg)} className="px-4 py-4 flex items-start gap-3 cursor-pointer hover:bg-primary/3 transition-colors active:bg-primary/5">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary uppercase">{msg.name?.charAt(0) || '?'}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold text-primary text-sm truncate">{msg.name}</p>
                    <span className="text-[10px] text-primary/30 ml-2">{msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ''}</span>
                  </div>
                  <p className="text-xs text-primary/60 truncate font-medium">{msg.subject || 'No Subject'}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-primary/40 text-xs italic">No messages found.</div>
          )}
        </div>
      </div>

      {/* Message Detail Modal */}
      <Modal isOpen={!!selectedMessage} onClose={() => setSelectedMessage(null)} title="Message Details" size="md">
        {selectedMessage && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg uppercase flex-shrink-0">{selectedMessage.name?.charAt(0) || '?'}</div>
              <div className="min-w-0">
                <p className="font-semibold text-primary truncate text-base">{selectedMessage.name}</p>
                <p className="text-xs text-primary/50 truncate">{selectedMessage.email}</p>
              </div>
            </div>
            <div className="bg-primary/4 rounded-2xl p-4 border border-primary/5">
              <p className="text-[10px] font-bold text-primary/30 uppercase tracking-widest mb-1">{selectedMessage.subject || "NO SUBJECT"}</p>
              <p className="text-sm text-primary/80 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
            </div>
            <button 
              onClick={() => handleEmailReply(selectedMessage.email || '', selectedMessage.subject || '')}
              className="w-full py-3.5 bg-primary text-cream text-sm font-bold rounded-xl active:scale-95 transition-all shadow-md"
            >
              Reply via Email
            </button>
          </div>
        )}
      </Modal>

      {/* Booking Detail Modal */}
      <Modal isOpen={!!selectedBooking} onClose={() => setSelectedBooking(null)} title="Verify Booking" size="lg">
        {selectedBooking && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-primary/5 pb-4">
              <div>
                <p className="font-display font-bold text-primary text-xl leading-tight">{selectedBooking.fullName}</p>
                <p className="text-xs text-primary/50">{selectedBooking.email}</p>
              </div>
              <StatusBadge status={selectedBooking.bookingStatus} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">ID Document</p>
                <div className="aspect-[16/10] bg-primary/5 rounded-xl border border-primary/8 overflow-hidden">
                  <img src={typeof selectedBooking.idDocumentImage === 'string' ? selectedBooking.idDocumentImage : '/placeholder-id.png'} className="w-full h-full object-cover" alt="ID" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Payment Receipt</p>
                <div className="aspect-[16/10] bg-primary/5 rounded-xl border border-primary/8 overflow-hidden">
                  <img src={typeof selectedBooking.paymentProofImage === 'string' ? selectedBooking.paymentProofImage : '/placeholder-payment.png'} className="w-full h-full object-cover" alt="Payment" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {[
                { label: 'Room', value: selectedBooking.roomPreference },
                { label: 'Guests', value: selectedBooking.numberOfOccupants },
                { label: 'In', value: selectedBooking.entryDate },
                { label: 'Out', value: selectedBooking.exitDate },
              ].map(({ label, value }) => (
                <div key={label} className="bg-primary/4 rounded-lg p-3 border border-primary/2">
                  <p className="text-[9px] text-primary/40 font-bold uppercase mb-0.5">{label}</p>
                  <p className="text-xs font-bold text-primary truncate capitalize">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button onClick={() => handleUpdateStatus(selectedBooking.id!, PaymentStatus.VERIFIED)} className="flex-1 py-3.5 bg-accent text-cream text-sm font-bold rounded-xl active:scale-95 transition-all">Approve</button>
              <button onClick={() => dispatch(adminDeleteBooking(selectedBooking.id!)).then(() => setSelectedBooking(null))} className="flex-1 py-3.5 border border-red-100 text-red-500 text-sm font-bold rounded-xl active:scale-95 transition-all">Reject</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}