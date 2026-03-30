'use client';

import React, { useState, useEffect } from 'react';
import { StatusBadge } from './AdminShared';
import Modal from './Modal';
import { BookingStatus, Status } from '@/src/lib/global/type';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks/hooks';
import { IBookingData } from '@/src/lib/store/booking/booking-slice-type';
import { adminDeleteBooking, adminUpdateBooking, fetchAllBookings } from '@/src/lib/store/booking/booking-slice';

const STATUS_OPTIONS = Object.values(BookingStatus);

export default function BookingsTab() {
  const dispatch = useAppDispatch();
  const { bookingData, status } = useAppSelector((state) => state.bookingSlice);

  const [filter, setFilter] = useState('All');
  const [viewBooking, setViewBooking] = useState<IBookingData | null>(null);
  const [editBooking, setEditBooking] = useState<IBookingData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IBookingData | null>(null);
  const [editForm, setEditForm] = useState<IBookingData | null>(null);

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  const filtered = filter === 'All' 
    ? bookingData 
    : bookingData.filter((b) => b.bookingStatus === filter);

  const openEdit = (b: IBookingData) => { 
    setEditBooking(b); 
    setEditForm({ ...b }); 
  };

  const handleEditSave = async () => {
    if (editForm && editForm.id) {
      // FIX: Passing the ID and the specific Status required by your Thunk
      // If your Thunk is expecting (id, paymentStatus), ensure the second arg matches that type
      const res = await dispatch(adminUpdateBooking(editForm.id, editForm.bookingStatus as any));
      
      if (res.success) {
        setEditBooking(null);
        setEditForm(null);
      }
    }
  };

  const handleDelete = async (id: string) => {
    const res = await dispatch(adminDeleteBooking(id));
    if (res.success) setDeleteTarget(null);
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2">
        {['All', ...STATUS_OPTIONS].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === f ? 'bg-primary text-cream' : 'bg-cream border border-primary/15 text-primary/60 hover:text-primary hover:border-primary/30'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-cream rounded-2xl border border-primary/8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary/8 bg-primary/3">
                {['ID', 'Tenant', 'Room Pref', 'Entry', 'Exit', 'Status', 'Actions'].map((h) => (
                  <th key={h} className={`text-left px-5 py-3 text-xs font-semibold text-primary/40 uppercase tracking-wider ${['Room Pref', 'Entry', 'Exit'].includes(h) ? 'hidden md:table-cell' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-primary/5 last:border-0 hover:bg-primary/3 transition-colors">
                  <td className="px-5 py-3.5 text-xs text-primary/40 font-mono">{b.id?.slice(-6)}</td>
                  <td className="px-5 py-3.5 font-semibold text-primary">{b.fullName}</td>
                  <td className="px-5 py-3.5 text-primary/60 hidden md:table-cell capitalize">{b.roomPreference}</td>
                  <td className="px-5 py-3.5 text-primary/60 hidden md:table-cell">{b.entryDate}</td>
                  <td className="px-5 py-3.5 text-primary/60 hidden md:table-cell">{b.exitDate}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={b.bookingStatus} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setViewBooking(b)} className="text-xs font-semibold text-accent hover:text-accent-light transition-colors">View</button>
                      <button onClick={() => openEdit(b)} className="text-xs font-semibold text-primary/50 hover:text-primary transition-colors">Edit</button>
                      <button onClick={() => setDeleteTarget(b)} className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <Modal isOpen={!!viewBooking} onClose={() => setViewBooking(null)} title="Booking Details" size="md">
        {viewBooking && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display font-bold text-primary text-xl">{viewBooking.fullName}</p>
                <p className="text-xs text-primary/40 font-mono mt-0.5">{viewBooking.id}</p>
              </div>
              <StatusBadge status={viewBooking.bookingStatus} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Room Preference', value: viewBooking.roomPreference },
                { label: 'Occupants', value: viewBooking.numberOfOccupants },
                { label: 'Check-In', value: viewBooking.entryDate },
                { label: 'Check-Out', value: viewBooking.exitDate },
                { label: 'Phone', value: viewBooking.phone },
                { label: 'Email', value: viewBooking.email },
              ].map(({ label, value }) => (
                <div key={label} className="bg-primary/4 rounded-xl p-3">
                  <p className="text-xs text-primary/40 font-semibold uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-sm font-semibold text-primary">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => { setViewBooking(null); openEdit(viewBooking); }} className="flex-1 py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all">Edit Booking</button>
              <button onClick={() => { setViewBooking(null); setDeleteTarget(viewBooking); }} className="flex-1 py-2.5 px-4 border border-red-200 text-red-500 text-sm font-semibold rounded-xl hover:bg-red-50 transition-all">Delete Booking</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editBooking} onClose={() => { setEditBooking(null); setEditForm(null); }} title="Update Status" size="md">
        {editForm && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-primary/40 uppercase mb-1">Full Name</label>
              <input
                type="text"
                value={editForm.fullName}
                onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                className="w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-primary/40 uppercase mb-1">Booking Status</label>
              <select
                value={editForm.bookingStatus}
                onChange={(e) => setEditForm({ ...editForm, bookingStatus: e.target.value as BookingStatus })}
                className="w-full px-4 py-2.5 bg-primary/5 border border-primary/10 rounded-xl text-sm focus:outline-none focus:border-accent"
              >
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={handleEditSave} className="flex-1 py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all">Save Changes</button>
              <button onClick={() => { setEditBooking(null); setEditForm(null); }} className="flex-1 py-2.5 px-4 border border-primary/15 text-primary/60 text-sm font-semibold rounded-xl hover:border-primary/30 transition-all">Cancel</button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Booking" size="sm">
        {deleteTarget && (
          <div className="space-y-4">
            <p className="text-sm text-primary/70">Are you sure you want to delete <span className="font-semibold text-primary">{deleteTarget.fullName}</span>?</p>
            <div className="flex gap-2">
              <button onClick={() => deleteTarget.id && handleDelete(deleteTarget.id)} className="flex-1 py-2.5 px-4 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition-all">Yes, Delete</button>
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 px-4 border border-primary/15 text-primary/60 text-sm font-semibold rounded-xl hover:border-primary/30 transition-all">Keep</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}