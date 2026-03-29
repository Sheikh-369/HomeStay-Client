'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import { SiteSettings, defaultSettings } from './AdminTypes';

export default function SettingsTab() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [editField, setEditField] = useState<{ key: keyof SiteSettings; label: string; type: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [passwordModal, setPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const FIELDS: { key: keyof SiteSettings; label: string; type: string }[] = [
    { key: 'propertyName', label: 'Property Name', type: 'text' },
    { key: 'phone', label: 'Contact Phone', type: 'tel' },
    { key: 'email', label: 'Contact Email', type: 'email' },
    { key: 'address', label: 'Address', type: 'textarea' },
  ];

  const openEdit = (field: { key: keyof SiteSettings; label: string; type: string }) => {
    setEditField(field);
    setEditValue(settings[field.key]);
    setSaveSuccess(false);
  };

  const handleSaveField = () => {
    if (editField) {
      setSettings({ ...settings, [editField.key]: editValue });
      setSaveSuccess(true);
      setTimeout(() => { setEditField(null); setSaveSuccess(false); }, 1000);
    }
  };

  const handlePasswordSave = () => {
    setPasswordSuccess(true);
    setTimeout(() => { setPasswordModal(false); setPasswords({ current: '', newPass: '', confirm: '' }); setPasswordSuccess(false); }, 1500);
  };

  return (
    <div className="max-w-xl space-y-6">
      {/* Site Information */}
      <div className="bg-cream rounded-2xl border border-primary/8 overflow-hidden">
        <div className="px-5 py-4 border-b border-primary/8">
          <h2 className="font-display font-bold text-primary text-lg">Site Information</h2>
        </div>
        <div className="divide-y divide-primary/5">
          {FIELDS.map((field) => (
            <div key={field.key} className="px-5 py-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-primary/40 font-semibold uppercase tracking-wider mb-0.5">{field.label}</p>
                <p className="text-sm font-semibold text-primary truncate">{settings[field.key]}</p>
              </div>
              <button
                onClick={() => openEdit(field)}
                className="flex-shrink-0 px-3 py-1.5 border border-primary/15 text-primary/50 text-xs font-semibold rounded-lg hover:border-primary/30 hover:text-primary transition-all"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-cream rounded-2xl border border-primary/8 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-primary text-base">Password</h2>
            <p className="text-xs text-primary/40 font-medium mt-0.5">Last changed: Never</p>
          </div>
          <button
            onClick={() => { setPasswordModal(true); setPasswords({ current: '', newPass: '', confirm: '' }); setPasswordSuccess(false); }}
            className="px-4 py-2 bg-primary text-cream text-xs font-semibold rounded-xl hover:bg-primary/85 transition-all"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 rounded-2xl border border-red-100 p-5">
        <h2 className="font-display font-bold text-red-600 text-base mb-1">Danger Zone</h2>
        <p className="text-xs text-red-400 font-medium mb-4">These actions are irreversible. Proceed with caution.</p>
        <button
          onClick={() => {}}
          className="px-4 py-2 border border-red-200 text-red-500 text-xs font-semibold rounded-xl hover:bg-red-100 transition-all"
        >
          Clear All Bookings
        </button>
      </div>

      {/* Edit Field Modal */}
      <Modal isOpen={!!editField} onClose={() => setEditField(null)} title={`Edit ${editField?.label}`} size="sm">
        {editField && (
          <div className="space-y-4">
            <div>
              <label className="form-label">{editField.label}</label>
              {editField.type === 'textarea' ? (
                <textarea
                  rows={4}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="form-input resize-none"
                />
              ) : (
                <input
                  type={editField.type}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="form-input"
                />
              )}
            </div>
            {saveSuccess ? (
              <div className="py-2 text-center text-sm font-semibold text-sage">✓ Saved!</div>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleSaveField} className="flex-1 py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all">
                  Save
                </button>
                <button onClick={() => setEditField(null)} className="flex-1 py-2.5 px-4 border border-primary/15 text-primary/60 text-sm font-semibold rounded-xl hover:border-primary/30 transition-all">
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Change Password Modal */}
      <Modal isOpen={passwordModal} onClose={() => setPasswordModal(false)} title="Change Password" size="sm">
        <div className="space-y-4">
          {[
            { label: 'Current Password', key: 'current' },
            { label: 'New Password', key: 'newPass' },
            { label: 'Confirm New Password', key: 'confirm' },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="form-label">{label}</label>
              <input
                type="password"
                placeholder="••••••••"
                value={(passwords as Record<string, string>)[key]}
                onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                className="form-input"
              />
            </div>
          ))}
          {passwordSuccess ? (
            <div className="py-2 text-center text-sm font-semibold text-sage">✓ Password updated!</div>
          ) : (
            <div className="flex gap-2 pt-1">
              <button
                onClick={handlePasswordSave}
                disabled={!passwords.current || !passwords.newPass || passwords.newPass !== passwords.confirm}
                className="flex-1 py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Update Password
              </button>
              <button onClick={() => setPasswordModal(false)} className="flex-1 py-2.5 px-4 border border-primary/15 text-primary/60 text-sm font-semibold rounded-xl hover:border-primary/30 transition-all">
                Cancel
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
