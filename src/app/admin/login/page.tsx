'use client';

import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/src/components/ui/AppLogo';
import { IUserData } from '@/src/lib/store/auth/auth-slice-type';
import { useAppDispatch } from '@/src/lib/store/hooks/hooks';
import { userLogin } from '@/src/lib/store/auth/auth-slice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {

    const dispatch=useAppDispatch()
    const router=useRouter()

    const [email, setEmail] = useState<IUserData>({
        userEmail:"",
        userPassword:""
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>
        ) => {
        setEmail({
            ...email,
            [e.target.name]: e.target.value,
        });
        };
  
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(userLogin(email));
        if (result.success) {
                toast.success(result.message)
                router.push("/admin/panel");
            } else {
                toast.error(result.message)
            }
    };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] translate-x-1/3 translate-y-1/3" />
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent pulse-amber" />
            <span className="text-xs font-semibold tracking-widest uppercase text-accent">Admin Access</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-primary mt-2 leading-tight">
            Welcome back,<br />
            <span className="text-accent italic">Administrator</span>
          </h1>
          <p className="text-sm text-primary/50 mt-2 font-medium">Sign in to manage your PGStay property</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-3xl p-8 shadow-xl shadow-primary/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                type="email"
                name='userEmail'
                onChange={handleChange}
                placeholder="admin@pgstay.com"
                className="form-input"
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="form-label">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name='userPassword'
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="form-input pr-12"
                  required
                  autoComplete="current-password"
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
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <Link
                href="/admin/forgot-password"
                className="text-xs font-semibold text-accent hover:text-accent-light transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-primary text-cream font-semibold text-sm tracking-wide rounded-xl hover:bg-primary/85 active:scale-[0.98] transition-all duration-200 mt-2"
            >
              Sign In to Dashboard
            </button>
          </form>
        </div>

        {/* Back to site */}
        <p className="text-center mt-6 text-xs text-primary/40">
          <Link href="/" className="hover:text-primary/70 transition-colors underline underline-offset-2">
            ← Back to PGStay website
          </Link>
        </p>
      </div>
    </div>
  );
}
