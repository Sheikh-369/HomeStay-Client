'use client';

import React, { useState } from 'react';
import { StatusBadge } from './AdminShared';
import { Booking } from './AdminTypes';
import Modal from './Modal';

interface BookingsTabProps {
  bookings: Booking[];
  onUpdateBooking: (updated: Booking) => void;
  onDeleteBooking: (id: string) => void;
}

const STATUS_OPTIONS = ['Active', 'Confirmed', 'Pending', 'Cancelled'];

export default function BookingsTab({ bookings, onUpdateBooking, onDeleteBooking }: BookingsTabProps) {
  const [filter, setFilter] = useState('All');
  const [viewBooking, setViewBooking] = useState<Booking | null>(null);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Booking | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [editForm, setEditForm] = useState<Booking | null>(null);
  const [newForm, setNewForm] = useState<Partial<Booking>>({});

  const filtered = filter === 'All' ? bookings : bookings.filter((b) => b.status === filter);

  const openEdit = (b: Booking) => { setEditBooking(b); setEditForm({ ...b }); };

  const handleEditSave = () => {
    if (editForm) { onUpdateBooking(editForm); setEditBooking(null); setEditForm(null); }
  };

  const handleAddSave = () => {
    const newBooking: Booking = {
      id: `BK${String(Date.now()).slice(-3)}`,
      name: newForm.name || '',
      room: newForm.room || '',
      checkIn: newForm.checkIn || '',
      checkOut: newForm.checkOut || '',
      status: newForm.status || 'Pending',
      amount: newForm.amount || '',
    };
    onUpdateBooking(newBooking);
    setAddOpen(false);
    setNewForm({});
  };

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
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
        <button
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-accent text-cream text-xs font-semibold rounded-xl hover:bg-accent/85 transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add Booking
        </button>
      </div>

      {/* Table */}
      <div className="bg-cream rounded-2xl border border-primary/8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary/8 bg-primary/3">
                {['ID', 'Tenant', 'Room', 'Check-In', 'Check-Out', 'Status', 'Rent', 'Actions'].map((h) => (
                  <th key={h} className={`text-left px-5 py-3 text-xs font-semibold text-primary/40 uppercase tracking-wider ${['Room', 'Check-In', 'Check-Out'].includes(h) ? 'hidden md:table-cell' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id} className="border-b border-primary/5 last:border-0 hover:bg-primary/3 transition-colors">
                  <td className="px-5 py-3.5 text-xs text-primary/40 font-mono">{b.id}</td>
                  <td className="px-5 py-3.5 font-semibold text-primary">{b.name}</td>
                  <td className="px-5 py-3.5 text-primary/60 hidden md:table-cell">{b.room}</td>
                  <td className="px-5 py-3.5 text-primary/60 hidden md:table-cell">{b.checkIn}</td>
                  <td className="px-5 py-3.5 text-primary/60 hidden md:table-cell">{b.checkOut}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={b.status} /></td>
                  <td className="px-5 py-3.5 font-semibold text-primary">{b.amount}</td>
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
        {filtered.length === 0 && (
          <div className="text-center py-12 text-primary/30 text-sm font-medium">No bookings found for this filter.</div>
        )}
      </div>

      {/* View Modal */}
      <Modal isOpen={!!viewBooking} onClose={() => setViewBooking(null)} title="Booking Details" size="md">
        {viewBooking && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display font-bold text-primary text-xl">{viewBooking.name}</p>
                <p className="text-xs text-primary/40 font-mono mt-0.5">{viewBooking.id}</p>
              </div>
              <StatusBadge status={viewBooking.status} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Room', value: viewBooking.room },
                { label: 'Rent', value: viewBooking.amount },
                { label: 'Check-In', value: viewBooking.checkIn },
                { label: 'Check-Out', value: viewBooking.checkOut },
              ].map(({ label, value }) => (
                <div key={label} className="bg-primary/4 rounded-xl p-3">
                  <p className="text-xs text-primary/40 font-semibold uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-sm font-semibold text-primary">{value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => { setViewBooking(null); openEdit(viewBooking); }} className="flex-1 py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all">
                Edit Booking
              </button>
              <button onClick={() => { setViewBooking(null); setDeleteTarget(viewBooking); }} className="flex-1 py-2.5 px-4 border border-red-200 text-red-500 text-sm font-semibold rounded-xl hover:bg-red-50 transition-all">
                Cancel Booking
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editBooking} onClose={() => { setEditBooking(null); setEditForm(null); }} title="Edit Booking" size="md">
        {editForm && (
          <div className="space-y-4">
            {[
              { label: 'Tenant Name', key: 'name', type: 'text' },
              { label: 'Room', key: 'room', type: 'text' },
              { label: 'Check-In Date', key: 'checkIn', type: 'date' },
              { label: 'Check-Out Date', key: 'checkOut', type: 'date' },
              { label: 'Rent Amount', key: 'amount', type: 'text' },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="form-label">{label}</label>
                <input
                  type={type}
                //   value={(editForm as Record<string, string>)[key] || ''}
                  onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                  className="form-input"
                />
              </div>
            ))}
            <div>
              <label className="form-label">Status</label>
              <select
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                className="form-input"
              >
                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={handleEditSave} className="flex-1 py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all">
                Save Changes
              </button>
              <button onClick={() => { setEditBooking(null); setEditForm(null); }} className="flex-1 py-2.5 px-4 border border-primary/15 text-primary/60 text-sm font-semibold rounded-xl hover:border-primary/30 transition-all">
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Cancel Booking" size="sm">
        {deleteTarget && (
          <div className="space-y-4">
            <p className="text-sm text-primary/70 leading-relaxed">
              Are you sure you want to cancel the booking for <span className="font-semibold text-primary">{deleteTarget.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button onClick={() => { onDeleteBooking(deleteTarget.id); setDeleteTarget(null); }} className="flex-1 py-2.5 px-4 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition-all">
                Yes, Cancel
              </button>
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 px-4 border border-primary/15 text-primary/60 text-sm font-semibold rounded-xl hover:border-primary/30 transition-all">
                Keep Booking
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Booking Modal */}
      <Modal isOpen={addOpen} onClose={() => { setAddOpen(false); setNewForm({}); }} title="Add New Booking" size="md">
        <div className="space-y-4">
          {[
            { label: 'Tenant Name', key: 'name', type: 'text', placeholder: 'Full name' },
            { label: 'Room', key: 'room', type: 'text', placeholder: 'e.g. Room 101 — Single AC' },
            { label: 'Check-In Date', key: 'checkIn', type: 'date', placeholder: '' },
            { label: 'Check-Out Date', key: 'checkOut', type: 'date', placeholder: '' },
            { label: 'Rent Amount', key: 'amount', type: 'text', placeholder: 'e.g. ₹12,000/mo' },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label className="form-label">{label}</label>
              <input
                type={type}
                placeholder={placeholder}
                value={(newForm as Record<string, string>)[key] || ''}
                onChange={(e) => setNewForm({ ...newForm, [key]: e.target.value })}
                className="form-input"
              />
            </div>
          ))}
          <div>
            <label className="form-label">Status</label>
            <select
              value={newForm.status || 'Pending'}
              onChange={(e) => setNewForm({ ...newForm, status: e.target.value })}
              className="form-input"
            >
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={handleAddSave} className="flex-1 py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all">
              Add Booking
            </button>
            <button onClick={() => { setAddOpen(false); setNewForm({}); }} className="flex-1 py-2.5 px-4 border border-primary/15 text-primary/60 text-sm font-semibold rounded-xl hover:border-primary/30 transition-all">
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
