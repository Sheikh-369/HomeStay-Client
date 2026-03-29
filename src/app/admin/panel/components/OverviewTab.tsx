'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import { StatCard, StatusBadge } from './AdminShared';
import { Booking, Message, mockBookings, mockRooms } from './AdminTypes';

interface OverviewTabProps {
  messages: Message[];
  onTabChange: (tab: string) => void;
}

export default function OverviewTab({ messages, onTabChange }: OverviewTabProps) {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Bookings"
          value={mockBookings.length}
          sub="All time"
          accent
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>}
        />
        <StatCard
          label="Active Tenants"
          value={mockBookings.filter(b => b.status === 'Active' || b.status === 'Confirmed').length}
          sub="Currently staying"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>}
        />
        <StatCard
          label="Vacant Rooms"
          value={mockRooms.filter(r => !r.occupied).length}
          sub={`of ${mockRooms.length} total`}
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>}
        />
        <StatCard
          label="Unread Messages"
          value={unreadCount}
          sub="Awaiting reply"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>}
        />
      </div>

      {/* Recent bookings */}
      <div className="bg-cream rounded-2xl border border-primary/8 overflow-hidden">
        <div className="px-5 py-4 border-b border-primary/8 flex items-center justify-between">
          <h2 className="font-display font-bold text-primary text-base">Recent Bookings</h2>
          <button onClick={() => onTabChange('bookings')} className="text-xs font-semibold text-accent hover:text-accent-light transition-colors">View all →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary/8">
                <th className="text-left px-5 py-3 text-xs font-semibold text-primary/40 uppercase tracking-wider">Tenant</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-primary/40 uppercase tracking-wider hidden md:table-cell">Room</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-primary/40 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-primary/40 uppercase tracking-wider hidden sm:table-cell">Rent</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-primary/40 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockBookings.slice(0, 3).map((b) => (
                <tr key={b.id} className="border-b border-primary/5 last:border-0 hover:bg-primary/3 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-semibold text-primary">{b.name}</p>
                    <p className="text-xs text-primary/40">{b.id}</p>
                  </td>
                  <td className="px-5 py-3.5 text-primary/60 hidden md:table-cell">{b.room}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={b.status} /></td>
                  <td className="px-5 py-3.5 font-semibold text-primary hidden sm:table-cell">{b.amount}</td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="text-xs font-semibold text-accent hover:text-accent-light transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent messages */}
      <div className="bg-cream rounded-2xl border border-primary/8 overflow-hidden">
        <div className="px-5 py-4 border-b border-primary/8 flex items-center justify-between">
          <h2 className="font-display font-bold text-primary text-base">Recent Messages</h2>
          <button onClick={() => onTabChange('messages')} className="text-xs font-semibold text-accent hover:text-accent-light transition-colors">View all →</button>
        </div>
        <div className="divide-y divide-primary/5">
          {messages.slice(0, 2).map((msg) => (
            <div
              key={msg.id}
              className={`px-5 py-4 flex items-start gap-3 cursor-pointer hover:bg-primary/3 transition-colors ${!msg.read ? 'bg-accent/3' : ''}`}
              onClick={() => setSelectedMessage(msg)}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">
                {msg.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-primary text-sm">{msg.name}</p>
                  {!msg.read && <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />}
                </div>
                <p className="text-xs text-primary/50 font-medium">{msg.subject}</p>
                <p className="text-xs text-primary/40 mt-0.5 truncate">{msg.message}</p>
              </div>
              <span className="text-xs text-primary/30 flex-shrink-0">{msg.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Detail Modal */}
      <Modal isOpen={!!selectedBooking} onClose={() => setSelectedBooking(null)} title="Booking Details" size="md">
        {selectedBooking && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display font-bold text-primary text-xl">{selectedBooking.name}</p>
                <p className="text-xs text-primary/40 font-mono mt-0.5">{selectedBooking.id}</p>
              </div>
              <StatusBadge status={selectedBooking.status} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Room', value: selectedBooking.room },
                { label: 'Rent', value: selectedBooking.amount },
                { label: 'Check-In', value: selectedBooking.checkIn },
                { label: 'Check-Out', value: selectedBooking.checkOut },
              ].map(({ label, value }) => (
                <div key={label} className="bg-primary/4 rounded-xl p-3">
                  <p className="text-xs text-primary/40 font-semibold uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-sm font-semibold text-primary">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <button className="flex-1 py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all">
                Edit Booking
              </button>
              <button className="flex-1 py-2.5 px-4 border border-red-200 text-red-500 text-sm font-semibold rounded-xl hover:bg-red-50 transition-all">
                Cancel Booking
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Message Detail Modal */}
      <Modal isOpen={!!selectedMessage} onClose={() => setSelectedMessage(null)} title="Message" size="md">
        {selectedMessage && (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">
                {selectedMessage.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-primary">{selectedMessage.name}</p>
                <p className="text-xs text-primary/50">{selectedMessage.email}</p>
                <p className="text-xs text-primary/30 mt-0.5">{selectedMessage.date}</p>
              </div>
            </div>
            <div className="bg-primary/4 rounded-xl p-4">
              <p className="text-sm font-semibold text-primary mb-2">{selectedMessage.subject}</p>
              <p className="text-sm text-primary/70 leading-relaxed">{selectedMessage.message}</p>
            </div>
            <button
              onClick={() => setSelectedMessage(null)}
              className="w-full py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all"
            >
              Reply via Email
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
