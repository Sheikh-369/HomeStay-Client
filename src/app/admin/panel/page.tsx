'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import OverviewTab from './components/OverviewTab';
import BookingsTab from './components/BookingsTab';
import MessagesTab from './components/MessagesTab';
import RoomsTab from './components/RoomsTab';
import SettingsTab from './components/SettingsTab';
import { mockBookings, mockMessages, mockRooms, Booking, Message, Room } from './components/AdminTypes';
import AppLogo from '@/src/components/ui/AppLogo';

// ─── Nav Items ────────────────────────────────────────────────────────────────

const navItems = [
  {
    id: 'overview', label: 'Overview',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
  },
  {
    id: 'bookings', label: 'Bookings',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  },
  {
    id: 'messages', label: 'Messages',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
  },
  {
    id: 'rooms', label: 'Rooms',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  },
  {
    id: 'settings', label: 'Settings',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Shared state lifted up so tabs can share data
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [rooms, setRooms] = useState<Room[]>(mockRooms);

  const unreadCount = messages.filter((m) => !m.read).length;

  // Booking handlers
  const handleUpdateBooking = (updated: Booking) => {
    setBookings((prev) => {
      const exists = prev.find((b) => b.id === updated.id);
      return exists ? prev.map((b) => b.id === updated.id ? updated : b) : [...prev, updated];
    });
  };
  const handleDeleteBooking = (id: string) => setBookings((prev) => prev.filter((b) => b.id !== id));

  // Message handlers
  const handleMarkRead = (id: string) => setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
  const handleDeleteMessage = (id: string) => setMessages((prev) => prev.filter((m) => m.id !== id));

  // Room handlers
  const handleUpdateRoom = (updated: Room) => setRooms((prev) => prev.map((r) => r.id === updated.id ? updated : r));
  const handleAddRoom = (room: Room) => setRooms((prev) => [...prev, room]);
  const handleDeleteRoom = (id: string) => setRooms((prev) => prev.filter((r) => r.id !== id));

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-primary/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-primary flex flex-col z-30 transition-transform duration-300 ease-out-expo ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        aria-label="Admin navigation"
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b border-cream/10 flex items-center gap-3">
          <AppLogo size={28} />
          <div>
            <p className="font-display font-semibold text-cream text-sm leading-none">PGStay</p>
            <p className="text-cream/40 text-xs mt-0.5 font-medium">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" aria-label="Admin sections">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                activeTab === item.id ? 'bg-accent text-cream' : 'text-cream/50 hover:text-cream hover:bg-cream/8'
              }`}
              aria-current={activeTab === item.id ? 'page' : undefined}
            >
              {item.icon}
              {item.label}
              {item.id === 'messages' && unreadCount > 0 && (
                <span className="ml-auto bg-accent text-cream text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-4 py-4 border-t border-cream/10">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-cream/40 hover:text-cream/70 transition-colors font-medium"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Back to website
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-bg/90 backdrop-blur-md border-b border-primary/8 px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden w-9 h-9 rounded-xl border border-primary/15 flex items-center justify-center text-primary/60 hover:text-primary transition-colors"
              aria-label="Open navigation"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div>
              <h1 className="font-display font-bold text-primary text-lg leading-none capitalize">{activeTab}</h1>
              <p className="text-xs text-primary/40 font-medium mt-0.5">PGStay Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
              <span className="text-xs font-bold text-accent">A</span>
            </div>
            <span className="text-sm font-semibold text-primary hidden sm:block">Admin</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'overview' && (
            <OverviewTab messages={messages} onTabChange={setActiveTab} />
          )}
          {activeTab === 'bookings' && (
            <BookingsTab
              bookings={bookings}
              onUpdateBooking={handleUpdateBooking}
              onDeleteBooking={handleDeleteBooking}
            />
          )}
          {activeTab === 'messages' && (
            <MessagesTab
              messages={messages}
              onMarkRead={handleMarkRead}
              onDeleteMessage={handleDeleteMessage}
            />
          )}
          {activeTab === 'rooms' && (
            <RoomsTab
              rooms={rooms}
              onUpdateRoom={handleUpdateRoom}
              onAddRoom={handleAddRoom}
              onDeleteRoom={handleDeleteRoom}
            />
          )}
          {activeTab === 'settings' && (
            <SettingsTab />
          )}
        </main>
      </div>
    </div>
  );
}
