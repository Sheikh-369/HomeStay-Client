'use client';

import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/src/components/ui/AppLogo';
import { IUserData } from '@/src/lib/store/auth/auth-slice-type';
import { useAppDispatch } from '@/src/lib/store/hooks/hooks';
import { useRouter } from 'next/navigation';
import { resetPassword } from '@/src/lib/store/auth/auth-slice';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
    const dispatch=useAppDispatch()
    const router=useRouter()

  const [password, setPassword] = useState<IUserData>({
    userEmail:"",
    OTP:"",
    newPassword:"",
    confirmNewPassword:""
  });

    const handleChange = (
              e: ChangeEvent<HTMLInputElement>
              ) => {
              setPassword({
                  ...password,
                  [e.target.name]: e.target.value,
              });
            };  
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(resetPassword(password));
        if (result.success) {
                toast.success(result.message)
                router.push("/admin/login");
            } else {
                toast.error(result.message)
            }
  };

  const getStrength = (pwd: string): { label: string; color: string; width: string } => {
    if (pwd.length === 0) return { label: '', color: 'bg-primary/10', width: 'w-0' };
    if (pwd.length < 6) return { label: 'Weak', color: 'bg-red-400', width: 'w-1/4' };
    if (pwd.length < 10) return { label: 'Fair', color: 'bg-amber-400', width: 'w-1/2' };
    if (pwd.length < 14) return { label: 'Good', color: 'bg-accent', width: 'w-3/4' };
    return { label: 'Strong', color: 'bg-sage', width: 'w-full' };
  };

  const strength = getStrength(password.newPassword || "");

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-sage/10 blur-[100px] translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/homepage" className="inline-flex items-center gap-2 mb-8 group">
            <AppLogo size={32} />
            <span className="font-display font-semibold text-lg tracking-tight text-primary group-hover:text-accent transition-colors">
              PGStay
            </span>
          </Link>
          <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-primary leading-tight">
            Create new<br />
            <span className="text-accent italic">password</span>
          </h1>
          <p className="text-sm text-primary/50 mt-2 font-medium">
            Choose a strong password for your admin account
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-3xl p-8 shadow-xl shadow-primary/5">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* New Password */}
              <div>
                {/* Email */}
                <label htmlFor="password" className="form-label">Email</label>
                <div className="relative">
                  <input
                    id="email"
                    name='userEmail'
                    onChange={handleChange}
                    placeholder="john@abc.com"
                    className="form-input pr-12"
                    required
                    autoComplete="email"
                  />
                </div>
                <br/>
                {/* OTP */}
                <label htmlFor="password" className="form-label">OTP</label>
                <div className="relative">
                  <input
                    id="OTP"
                    name='OTP'
                    onChange={handleChange}
                    placeholder="Enter the OTP sent to your Email."
                    className="form-input pr-12"
                    required
                    autoComplete="email"
                  />
                </div>
                <br/>
                {/*  New password */}
                <label htmlFor="password" className="form-label">New Password</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name='newPassword'
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    className="form-input pr-12"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary/70 transition-colors p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {/* Strength bar */}
                {(password.newPassword || "").length > 0 && (
                  <div className="mt-2">
                    <div className="h-1 w-full bg-primary/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${strength.color} ${strength.width}`} />
                    </div>
                    <p className="text-xs text-primary/40 mt-1 font-medium">{strength.label}</p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    name='confirmNewPassword'
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className={`form-input pr-12 ${error && error.includes('match') ? 'error' : ''}`}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary/70 transition-colors p-1"
                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  >
                    {showConfirm ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-xs text-red-500 font-medium flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-primary text-cream font-semibold text-sm tracking-wide rounded-xl hover:bg-primary/85 active:scale-[0.98] transition-all duration-200"
              >
                Update Password
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-primary">Password updated!</h2>
                <p className="text-sm text-primary/50 mt-1 font-medium">
                  Your admin password has been changed successfully.
                </p>
              </div>
              <Link
                href="/admin/login"
                className="inline-block w-full py-3.5 px-6 bg-primary text-cream font-semibold text-sm tracking-wide rounded-xl hover:bg-primary/85 active:scale-[0.98] transition-all duration-200 text-center mt-2"
              >
                Sign In Now
              </Link>
            </div>
          )}
        </div>

        <p className="text-center mt-6 text-xs text-primary/40">
          <Link href="/" className="hover:text-primary/70 transition-colors underline underline-offset-2">
            ← Back to PGStay website
          </Link>
        </p>
      </div>
    </div>
  );
}
