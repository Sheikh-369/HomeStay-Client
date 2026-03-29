'use client';

import React, { ChangeEvent, useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/src/components/ui/AppLogo';
import { IUserData } from '@/src/lib/store/auth/auth-slice-type';
import { useAppDispatch } from '@/src/lib/store/hooks/hooks';
import { useRouter } from 'next/navigation';
import { forgotPassword } from '@/src/lib/store/auth/auth-slice';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
    const dispatch=useAppDispatch()
    const router=useRouter()

  const [email, setEmail] = useState<IUserData>({
    userEmail:""
  });

  const handleChange = (
          e: ChangeEvent<HTMLInputElement>
          ) => {
          setEmail({
              ...email,
              [e.target.name]: e.target.value,
          });
        };

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(forgotPassword(email));
        if (result.success) {
                toast.success(result.message)
                router.push("/admin/reset-password");
            } else {
                toast.error(result.message)
            }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sage/10 blur-[100px] -translate-x-1/4 translate-y-1/4" />
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
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold text-primary leading-tight">
            Reset your<br />
            <span className="text-accent italic">password</span>
          </h1>
          <p className="text-sm text-primary/50 mt-2 font-medium max-w-xs mx-auto">
            Enter your admin email and we'll send you a reset link
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-3xl p-8 shadow-xl shadow-primary/5">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="form-label">Admin Email Address</label>
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

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-primary text-cream font-semibold text-sm tracking-wide rounded-xl hover:bg-primary/85 active:scale-[0.98] transition-all duration-200"
              >
                Send Reset Link
              </button>

              <div className="text-center pt-1">
                <Link
                  href="/admin/login"
                  className="text-xs font-semibold text-primary/50 hover:text-primary transition-colors"
                >
                  ← Back to login
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-primary">Check your inbox</h2>
                <p className="text-sm text-primary/50 mt-1 font-medium">
                  We've sent an OTP to <span className="text-primary font-semibold">{email.userEmail}</span>
                </p>
              </div>
              <p className="text-xs text-primary/40 leading-relaxed">
                Didn't receive it? Check your spam folder or{' '}
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-accent hover:text-accent-light underline underline-offset-2 transition-colors"
                >
                  try again
                </button>
              </p>
              <Link
                href="/admin/login"
                className="inline-block mt-2 text-xs font-semibold text-primary/50 hover:text-primary transition-colors"
              >
                ← Back to login
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
