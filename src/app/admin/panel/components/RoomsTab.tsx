'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import { Room } from './AdminTypes';

interface RoomsTabProps {
  rooms: Room[];
  onUpdateRoom: (updated: Room) => void;
  onAddRoom: (room: Room) => void;
  onDeleteRoom: (id: string) => void;
}

const AMENITY_OPTIONS = ['AC', 'Fan', 'Attached Bath', 'Common Bath', 'WiFi', 'Geyser', 'Wardrobe', 'Study Table'];

export default function RoomsTab({ rooms, onUpdateRoom, onAddRoom, onDeleteRoom }: RoomsTabProps) {
  const [editRoom, setEditRoom] = useState<Room | null>(null);
  const [editForm, setEditForm] = useState<Room | null>(null);
  const [viewRoom, setViewRoom] = useState<Room | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Room | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newForm, setNewForm] = useState<Partial<Room>>({ amenities: [] });

  const openEdit = (r: Room) => { setEditRoom(r); setEditForm({ ...r, amenities: [...r.amenities] }); };

  const toggleAmenity = (amenity: string, form: Partial<Room>, setForm: (f: Partial<Room>) => void) => {
    const current = form.amenities || [];
    const updated = current.includes(amenity) ? current.filter((a) => a !== amenity) : [...current, amenity];
    setForm({ ...form, amenities: updated });
  };

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-cream rounded-2xl border border-primary/8 p-4 text-center">
          <p className="font-display text-3xl font-bold text-primary">{rooms.length}</p>
          <p className="text-xs text-primary/40 font-semibold uppercase tracking-wider mt-1">Total Rooms</p>
        </div>
        <div className="bg-cream rounded-2xl border border-primary/8 p-4 text-center">
          <p className="font-display text-3xl font-bold text-sage">{rooms.filter(r => r.occupied).length}</p>
          <p className="text-xs text-primary/40 font-semibold uppercase tracking-wider mt-1">Occupied</p>
        </div>
        <div className="bg-cream rounded-2xl border border-primary/8 p-4 text-center col-span-2 sm:col-span-1">
          <p className="font-display text-3xl font-bold text-accent">{rooms.filter(r => !r.occupied).length}</p>
          <p className="text-xs text-primary/40 font-semibold uppercase tracking-wider mt-1">Vacant</p>
        </div>
      </div>

      {/* Add Room button */}
      <div className="flex justify-end">
        <button
          onClick={() => { setAddOpen(true); setNewForm({ amenities: [] }); }}
          className="flex items-center gap-1.5 px-4 py-2 bg-accent text-cream text-xs font-semibold rounded-xl hover:bg-accent/85 transition-all"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add Room
        </button>
      </div>

      {/* Room cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <div key={room.id} className="bg-cream rounded-2xl border border-primary/8 p-5 card-lift">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-display font-bold text-primary text-lg leading-none">{room.id}</p>
                <p className="text-xs text-primary/50 font-medium mt-0.5">{room.floor} Floor</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${room.occupied ? 'bg-sage/15 text-sage' : 'bg-accent/15 text-accent'}`}>
                {room.occupied ? 'Occupied' : 'Vacant'}
              </span>
            </div>
            <p className="text-sm font-semibold text-primary">{room.type}</p>
            <p className="text-xs text-primary/40 font-medium mt-0.5">Capacity: {room.capacity} {room.capacity === 1 ? 'person' : 'persons'}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {room.amenities.map((a) => (
                <span key={a} className="px-2 py-0.5 rounded-md bg-primary/5 text-xs font-medium text-primary/60">{a}</span>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-primary/8 flex items-center justify-between">
              <p className="font-display font-bold text-accent">{room.rent}</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setViewRoom(room)} className="text-xs font-semibold text-accent hover:text-accent-light transition-colors">View</button>
                <button onClick={() => openEdit(room)} className="text-xs font-semibold text-primary/50 hover:text-primary transition-colors">Edit</button>
                <button onClick={() => setDeleteTarget(room)} className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Room Modal */}
      <Modal isOpen={!!viewRoom} onClose={() => setViewRoom(null)} title="Room Details" size="sm">
        {viewRoom && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-display font-bold text-primary text-2xl">{viewRoom.id}</p>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${viewRoom.occupied ? 'bg-sage/15 text-sage' : 'bg-accent/15 text-accent'}`}>
                {viewRoom.occupied ? 'Occupied' : 'Vacant'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Type', value: viewRoom.type },
                { label: 'Floor', value: viewRoom.floor },
                { label: 'Capacity', value: `${viewRoom.capacity} person${viewRoom.capacity > 1 ? 's' : ''}` },
                { label: 'Rent', value: viewRoom.rent },
              ].map(({ label, value }) => (
                <div key={label} className="bg-primary/4 rounded-xl p-3">
                  <p className="text-xs text-primary/40 font-semibold uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-sm font-semibold text-primary">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs text-primary/40 font-semibold uppercase tracking-wider mb-2">Amenities</p>
              <div className="flex flex-wrap gap-1.5">
                {viewRoom.amenities.map((a) => (
                  <span key={a} className="px-2.5 py-1 rounded-lg bg-primary/5 text-xs font-medium text-primary/70">{a}</span>
                ))}
              </div>
            </div>
            <button onClick={() => { setViewRoom(null); openEdit(viewRoom); }} className="w-full py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all">
              Edit Room
            </button>
          </div>
        )}
      </Modal>

      {/* Edit Room Modal */}
      <Modal isOpen={!!editRoom} onClose={() => { setEditRoom(null); setEditForm(null); }} title="Edit Room" size="md">
        {editForm && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Room ID</label>
                <input type="text" value={editForm.id} onChange={(e) => setEditForm({ ...editForm, id: e.target.value })} className="form-input" />
              </div>
              <div>
                <label className="form-label">Floor</label>
                <input type="text" value={editForm.floor} onChange={(e) => setEditForm({ ...editForm, floor: e.target.value })} className="form-input" />
              </div>
            </div>
            <div>
              <label className="form-label">Room Type</label>
              <input type="text" value={editForm.type} onChange={(e) => setEditForm({ ...editForm, type: e.target.value })} className="form-input" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Capacity</label>
                <input type="number" min={1} max={6} value={editForm.capacity} onChange={(e) => setEditForm({ ...editForm, capacity: parseInt(e.target.value) })} className="form-input" />
              </div>
              <div>
                <label className="form-label">Rent</label>
                <input type="text" value={editForm.rent} onChange={(e) => setEditForm({ ...editForm, rent: e.target.value })} className="form-input" />
              </div>
            </div>
            <div>
              <label className="form-label">Status</label>
              <select value={editForm.occupied ? 'occupied' : 'vacant'} onChange={(e) => setEditForm({ ...editForm, occupied: e.target.value === 'occupied' })} className="form-input">
                <option value="occupied">Occupied</option>
                <option value="vacant">Vacant</option>
              </select>
            </div>
            <div>
              <label className="form-label">Amenities</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {AMENITY_OPTIONS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAmenity(a, editForm, setEditForm as (f: Partial<Room>) => void)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${editForm.amenities.includes(a) ? 'bg-primary text-cream' : 'bg-primary/5 text-primary/60 hover:bg-primary/10'}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => { onUpdateRoom(editForm); setEditRoom(null); setEditForm(null); }} className="flex-1 py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all">
                Save Changes
              </button>
              <button onClick={() => { setEditRoom(null); setEditForm(null); }} className="flex-1 py-2.5 px-4 border border-primary/15 text-primary/60 text-sm font-semibold rounded-xl hover:border-primary/30 transition-all">
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Room Modal */}
      <Modal isOpen={addOpen} onClose={() => { setAddOpen(false); setNewForm({ amenities: [] }); }} title="Add New Room" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Room ID</label>
              <input type="text" placeholder="e.g. R401" value={newForm.id || ''} onChange={(e) => setNewForm({ ...newForm, id: e.target.value })} className="form-input" />
            </div>
            <div>
              <label className="form-label">Floor</label>
              <input type="text" placeholder="e.g. 4th" value={newForm.floor || ''} onChange={(e) => setNewForm({ ...newForm, floor: e.target.value })} className="form-input" />
            </div>
          </div>
          <div>
            <label className="form-label">Room Type</label>
            <input type="text" placeholder="e.g. Single AC" value={newForm.type || ''} onChange={(e) => setNewForm({ ...newForm, type: e.target.value })} className="form-input" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Capacity</label>
              <input type="number" min={1} max={6} placeholder="1" value={newForm.capacity || ''} onChange={(e) => setNewForm({ ...newForm, capacity: parseInt(e.target.value) })} className="form-input" />
            </div>
            <div>
              <label className="form-label">Rent</label>
              <input type="text" placeholder="₹12,000/mo" value={newForm.rent || ''} onChange={(e) => setNewForm({ ...newForm, rent: e.target.value })} className="form-input" />
            </div>
          </div>
          <div>
            <label className="form-label">Status</label>
            <select value={newForm.occupied ? 'occupied' : 'vacant'} onChange={(e) => setNewForm({ ...newForm, occupied: e.target.value === 'occupied' })} className="form-input">
              <option value="vacant">Vacant</option>
              <option value="occupied">Occupied</option>
            </select>
          </div>
          <div>
            <label className="form-label">Amenities</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {AMENITY_OPTIONS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAmenity(a, newForm, setNewForm)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${(newForm.amenities || []).includes(a) ? 'bg-primary text-cream' : 'bg-primary/5 text-primary/60 hover:bg-primary/10'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                const room: Room = {
                  id: newForm.id || '',
                  type: newForm.type || '',
                  floor: newForm.floor || '',
                  capacity: newForm.capacity || 1,
                  occupied: newForm.occupied || false,
                  rent: newForm.rent || '',
                  amenities: newForm.amenities || [],
                };
                onAddRoom(room);
                setAddOpen(false);
                setNewForm({ amenities: [] });
              }}
              className="flex-1 py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all"
            >
              Add Room
            </button>
            <button onClick={() => { setAddOpen(false); setNewForm({ amenities: [] }); }} className="flex-1 py-2.5 px-4 border border-primary/15 text-primary/60 text-sm font-semibold rounded-xl hover:border-primary/30 transition-all">
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Room" size="sm">
        {deleteTarget && (
          <div className="space-y-4">
            <p className="text-sm text-primary/70 leading-relaxed">
              Are you sure you want to delete <span className="font-semibold text-primary">{deleteTarget.id} — {deleteTarget.type}</span>? This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button onClick={() => { onDeleteRoom(deleteTarget.id); setDeleteTarget(null); }} className="flex-1 py-2.5 px-4 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition-all">
                Delete
              </button>
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 px-4 border border-primary/15 text-primary/60 text-sm font-semibold rounded-xl hover:border-primary/30 transition-all">
                Keep
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
