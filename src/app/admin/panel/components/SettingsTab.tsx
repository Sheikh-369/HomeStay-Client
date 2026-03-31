// 'use client';

// import React, { useState } from 'react';
// import Modal from './Modal';
// import { SiteSettings, defaultSettings } from './AdminTypes';

// export default function SettingsTab() {
//   const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
//   const [editField, setEditField] = useState<{ key: keyof SiteSettings; label: string; type: string } | null>(null);
//   const [editValue, setEditValue] = useState('');
//   const [passwordModal, setPasswordModal] = useState(false);
//   const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
//   const [passwordSuccess, setPasswordSuccess] = useState(false);
//   const [saveSuccess, setSaveSuccess] = useState(false);

//   const FIELDS: { key: keyof SiteSettings; label: string; type: string }[] = [
//     { key: 'propertyName', label: 'Property Name', type: 'text' },
//     { key: 'phone', label: 'Contact Phone', type: 'tel' },
//     { key: 'email', label: 'Contact Email', type: 'email' },
//     { key: 'address', label: 'Address', type: 'textarea' },
//   ];

//   const openEdit = (field: { key: keyof SiteSettings; label: string; type: string }) => {
//     setEditField(field);
//     setEditValue(settings[field.key]);
//     setSaveSuccess(false);
//   };

//   const handleSaveField = () => {
//     if (editField) {
//       setSettings({ ...settings, [editField.key]: editValue });
//       setSaveSuccess(true);
//       setTimeout(() => { setEditField(null); setSaveSuccess(false); }, 1000);
//     }
//   };

//   const handlePasswordSave = () => {
//     setPasswordSuccess(true);
//     setTimeout(() => { setPasswordModal(false); setPasswords({ current: '', newPass: '', confirm: '' }); setPasswordSuccess(false); }, 1500);
//   };

//   return (
//     <div className="max-w-xl space-y-6">
//       {/* Site Information */}
//       <div className="bg-cream rounded-2xl border border-primary/8 overflow-hidden">
//         <div className="px-5 py-4 border-b border-primary/8">
//           <h2 className="font-display font-bold text-primary text-lg">Site Information</h2>
//         </div>
//         <div className="divide-y divide-primary/5">
//           {FIELDS.map((field) => (
//             <div key={field.key} className="px-5 py-4 flex items-center justify-between gap-4">
//               <div className="flex-1 min-w-0">
//                 <p className="text-xs text-primary/40 font-semibold uppercase tracking-wider mb-0.5">{field.label}</p>
//                 <p className="text-sm font-semibold text-primary truncate">{settings[field.key]}</p>
//               </div>
//               <button
//                 onClick={() => openEdit(field)}
//                 className="flex-shrink-0 px-3 py-1.5 border border-primary/15 text-primary/50 text-xs font-semibold rounded-lg hover:border-primary/30 hover:text-primary transition-all"
//               >
//                 Edit
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Security */}
//       <div className="bg-cream rounded-2xl border border-primary/8 p-5">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="font-display font-bold text-primary text-base">Password</h2>
//             <p className="text-xs text-primary/40 font-medium mt-0.5">Last changed: Never</p>
//           </div>
//           <button
//             onClick={() => { setPasswordModal(true); setPasswords({ current: '', newPass: '', confirm: '' }); setPasswordSuccess(false); }}
//             className="px-4 py-2 bg-primary text-cream text-xs font-semibold rounded-xl hover:bg-primary/85 transition-all"
//           >
//             Change Password
//           </button>
//         </div>
//       </div>

//       {/* Danger Zone */}
//       <div className="bg-red-50 rounded-2xl border border-red-100 p-5">
//         <h2 className="font-display font-bold text-red-600 text-base mb-1">Danger Zone</h2>
//         <p className="text-xs text-red-400 font-medium mb-4">These actions are irreversible. Proceed with caution.</p>
//         <button
//           onClick={() => {}}
//           className="px-4 py-2 border border-red-200 text-red-500 text-xs font-semibold rounded-xl hover:bg-red-100 transition-all"
//         >
//           Clear All Bookings
//         </button>
//       </div>

//       {/* Edit Field Modal */}
//       <Modal isOpen={!!editField} onClose={() => setEditField(null)} title={`Edit ${editField?.label}`} size="sm">
//         {editField && (
//           <div className="space-y-4">
//             <div>
//               <label className="form-label">{editField.label}</label>
//               {editField.type === 'textarea' ? (
//                 <textarea
//                   rows={4}
//                   value={editValue}
//                   onChange={(e) => setEditValue(e.target.value)}
//                   className="form-input resize-none"
//                 />
//               ) : (
//                 <input
//                   type={editField.type}
//                   value={editValue}
//                   onChange={(e) => setEditValue(e.target.value)}
//                   className="form-input"
//                 />
//               )}
//             </div>
//             {saveSuccess ? (
//               <div className="py-2 text-center text-sm font-semibold text-sage">✓ Saved!</div>
//             ) : (
//               <div className="flex gap-2">
//                 <button onClick={handleSaveField} className="flex-1 py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all">
//                   Save
//                 </button>
//                 <button onClick={() => setEditField(null)} className="flex-1 py-2.5 px-4 border border-primary/15 text-primary/60 text-sm font-semibold rounded-xl hover:border-primary/30 transition-all">
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </Modal>

//       {/* Change Password Modal */}
//       <Modal isOpen={passwordModal} onClose={() => setPasswordModal(false)} title="Change Password" size="sm">
//         <div className="space-y-4">
//           {[
//             { label: 'Current Password', key: 'current' },
//             { label: 'New Password', key: 'newPass' },
//             { label: 'Confirm New Password', key: 'confirm' },
//           ].map(({ label, key }) => (
//             <div key={key}>
//               <label className="form-label">{label}</label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 value={(passwords as Record<string, string>)[key]}
//                 onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
//                 className="form-input"
//               />
//             </div>
//           ))}
//           {passwordSuccess ? (
//             <div className="py-2 text-center text-sm font-semibold text-sage">✓ Password updated!</div>
//           ) : (
//             <div className="flex gap-2 pt-1">
//               <button
//                 onClick={handlePasswordSave}
//                 disabled={!passwords.current || !passwords.newPass || passwords.newPass !== passwords.confirm}
//                 className="flex-1 py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 Update Password
//               </button>
//               <button onClick={() => setPasswordModal(false)} className="flex-1 py-2.5 px-4 border border-primary/15 text-primary/60 text-sm font-semibold rounded-xl hover:border-primary/30 transition-all">
//                 Cancel
//               </button>
//             </div>
//           )}
//         </div>
//       </Modal>
//     </div>
//   );
// }


//dynamic
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Modal from './Modal';
import { useAppDispatch, useAppSelector } from '@/src/lib/store/hooks/hooks';
import { fetchUserById, updateUserProfile } from '@/src/lib/store/auth/auth-slice';
import { IUserData } from '@/src/lib/store/auth/auth-slice-type';

export default function SettingsTab() {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.authSlice);

  // 1. Logic to get the user object from the Redux state
  const user = useMemo(() => {
    return Array.isArray(userData) ? userData[0] : (userData as unknown as IUserData);
  }, [userData]);

  // 2. FETCH FROM THUNK: On mount, get the ID from localStorage and fetch fresh data
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.id) {
        dispatch(fetchUserById(parsed.id));
      }
    }
  }, [dispatch]);

  // --- UI State ---
  const [editField, setEditField] = useState<{ key: string; label: string; type: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [passwordModal, setPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const FIELDS = [
    { key: 'userName', label: 'Property Name', type: 'text' },
    { key: 'phoneNumber', label: 'Contact Phone', type: 'tel' },
    { key: 'userEmail', label: 'Contact Email', type: 'email' },
    { key: 'address_combined', label: 'Address', type: 'textarea' },
  ];

  const getDisplayValue = (key: string) => {
    if (!user) return "Loading...";
    if (key === 'address_combined') {
      // Added explicit string type to filter parameter
      const parts = [user.city, user.district, user.country].filter((p: string | undefined): p is string => !!p);
      return parts.length > 0 ? parts.join(', ') : 'No address set';
    }
    return (user as any)[key] || 'Not Set';
  };

  const handleSaveField = async () => {
    if (!editField || !user?.id) return;

    const formData = new FormData();

    if (editField.key === 'address_combined') {
      try {
        const addr = JSON.parse(editValue);
        formData.append('city', addr.city || '');
        // Combine District and Country for current backend structure
        const combinedCountry = addr.district 
          ? `${addr.district}, ${addr.country}` 
          : addr.country;
        formData.append('country', combinedCountry || '');
      } catch (e) {
        formData.append('city', editValue);
      }
    } else {
      formData.append(editField.key, editValue);
    }

    const result = await dispatch(updateUserProfile(user.id, formData));
    if (result.success) {
      setSaveSuccess(true);
      setTimeout(() => { setEditField(null); setSaveSuccess(false); }, 1000);
    }
  };

  const openEdit = (field: { key: string; label: string; type: string }) => {
    setEditField(field);
    if (field.key === 'address_combined') {
      const addrObj = {
        city: user?.city || '',
        district: '',
        country: user?.country || ''
      };
      
      if (user?.country?.includes(',')) {
        // Added explicit string type to map parameter
        const parts = user.country.split(',').map((p: string) => p.trim());
        addrObj.district = parts[0];
        addrObj.country = parts.slice(1).join(', ');
      }
      
      setEditValue(JSON.stringify(addrObj));
    } else {
      setEditValue((user as any)[field.key] || '');
    }
    setSaveSuccess(false);
  };

  const handlePasswordSave = async () => {
    if (!user?.id) return;

    const formData = new FormData();
    formData.append('oldPassword', passwords.current); 
    formData.append('newPassword', passwords.newPass);
    formData.append('confirmPassword', passwords.confirm);

    const result = await dispatch(updateUserProfile(user.id, formData));
    
    if (result.success) {
      setPasswordSuccess(true);
      setTimeout(() => {
        setPasswordModal(false);
        setPasswords({ current: '', newPass: '', confirm: '' });
        setPasswordSuccess(false);
      }, 1500);
    } else {
      alert(result.message); 
    }
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
                <p className="text-sm font-semibold text-primary truncate">{getDisplayValue(field.key)}</p>
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
            <p className="text-xs text-primary/40 font-medium mt-0.5">Manage account security</p>
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
            {editField.key === 'address_combined' ? (
              <div className="space-y-3">
                {[
                  { label: 'City', k: 'city' },
                  { label: 'District', k: 'district' },
                  { label: 'Country', k: 'country' }
                ].map((item) => (
                  <div key={item.k}>
                    <label className="form-label">{item.label}</label>
                    <input
                      type="text"
                      className="form-input"
                      value={JSON.parse(editValue)[item.k]}
                      onChange={(e) => {
                        const current = JSON.parse(editValue);
                        setEditValue(JSON.stringify({ ...current, [item.k]: e.target.value }));
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <label className="form-label">{editField.label}</label>
                <input
                  type={editField.type}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="form-input"
                />
              </div>
            )}

            {saveSuccess ? (
              <div className="py-2 text-center text-sm font-semibold text-green-600">✓ Saved!</div>
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
                value={(passwords as any)[key]}
                onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })}
                className="form-input"
              />
            </div>
          ))}
          {passwordSuccess ? (
            <div className="py-2 text-center text-sm font-semibold text-green-600">✓ Password updated!</div>
          ) : (
            <div className="flex gap-2 pt-1">
              <button
                onClick={handlePasswordSave}
                disabled={!passwords.current || !passwords.newPass || passwords.newPass !== passwords.confirm}
                className="flex-1 py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all disabled:opacity-40"
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