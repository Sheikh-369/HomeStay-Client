'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import OverviewTab from './components/OverviewTab';
import BookingsTab from './components/BookingsTab';
import MessagesTab from './components/MessagesTab';
import RoomsTab from './components/RoomsTab';
import SettingsTab from './components/SettingsTab';
import OccupancyTab from './components/OccupancyTab'; // New Tab
import { mockBookings, mockRooms, Booking, Room } from './components/AdminTypes';
import AppLogo from '@/src/components/ui/AppLogo';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks/hooks';
import { fetchMessages } from '@/src/lib/store/message/message-slice';

// --- Navigation Config ---
const navItems = [
  { id: 'overview', label: 'Overview', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg> },
  { id: 'occupancy', label: 'In-House Guests', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg> },
  { id: 'bookings', label: 'Bookings', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
  { id: 'messages', label: 'Messages', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg> },
  { id: 'rooms', label: 'Rooms', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
  { id: 'settings', label: 'Settings', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg> },
];

export default function AdminPanelPage() {
  const dispatch = useAppDispatch();
  
  // SELECT FROM REDUX
  const { messages } = useAppSelector((state) => state.messageSlice);

  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // LOCAL STATE (Preserved for Rooms/Bookings as requested)
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [rooms, setRooms] = useState<Room[]>(mockRooms);

  // COMPUTED STATE
  const unreadCount = messages.filter((m) => !m.read).length;

  // FETCH ON MOUNT
  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  // HANDLERS
  const handleUpdateBooking = (updated: Booking) => {
    setBookings((prev) => prev.map((b) => b.id === updated.id ? updated : b));
  };
  const handleDeleteBooking = (id: string) => setBookings((prev) => prev.filter((b) => b.id !== id));

  const handleUpdateRoom = (updated: Room) => setRooms((prev) => prev.map((r) => r.id === updated.id ? updated : r));
  const handleAddRoom = (room: Room) => setRooms((prev) => [...prev, room]);
  const handleDeleteRoom = (id: string) => setRooms((prev) => prev.filter((r) => r.id !== id));

  const handleLogout = () => {
    console.log("Logging out...");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-primary/40 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-primary flex flex-col z-30 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="px-6 py-6 border-b border-cream/10 flex items-center gap-3">
          <AppLogo size={28} />
          <div>
            <p className="font-display font-semibold text-cream text-sm leading-none">PGStay</p>
            <p className="text-cream/40 text-xs mt-0.5 font-medium">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id ? 'bg-accent text-cream' : 'text-cream/50 hover:text-cream hover:bg-cream/8'
              }`}
            >
              {item.icon}
              {item.label}
              {item.id === 'messages' && unreadCount > 0 && (
                <span className="ml-auto bg-accent text-cream text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 border-t border-cream/10 space-y-1">
           <Link href="/" className="w-full flex items-center gap-3 px-3 py-2 text-cream/50 hover:text-cream text-sm font-medium transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
              Home Website
           </Link>
           <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-cream/50 hover:text-red-400 text-sm font-medium transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
              Logout
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-10 bg-bg/90 backdrop-blur-md border-b border-primary/8 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden w-9 h-9 rounded-xl border border-primary/15 flex items-center justify-center text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>
            <h1 className="font-display font-bold text-primary text-lg capitalize">{activeTab.replace('-', ' ')}</h1>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'overview' && <OverviewTab onTabChange={setActiveTab} />}
          
          {/* New Occupancy Tab */}
          {activeTab === 'occupancy' && <OccupancyTab />}
          
          {activeTab === 'bookings' && <BookingsTab />}
          
          {activeTab === 'messages' && <MessagesTab messages={messages} />}
          
          {activeTab === 'rooms' && (
            <RoomsTab 
              rooms={rooms} 
              onUpdateRoom={handleUpdateRoom} 
              onAddRoom={handleAddRoom} 
              onDeleteRoom={handleDeleteRoom} 
            />
          )}
          
          {activeTab === 'settings' && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}