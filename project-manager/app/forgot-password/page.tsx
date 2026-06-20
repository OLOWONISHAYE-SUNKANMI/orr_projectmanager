"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setSuccessMessage(null);
    
    // Simulate sending reset link
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage("If an account exists for this email, you will receive a password reset link shortly.");
      // Optional: router.push('/login') after a delay
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-white select-none">

      {/* LEFT SIDE - Exact image cover + logo + taglines matching reference */}
      <div
        className="hidden md:flex flex-1 bg-cover m-3 rounded-lg bg-center relative text-white flex-col justify-between"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/depeqzb6z/image/upload/v1764168892/side-image_1_jwpnup.png')",
        }}
      >
        {/* Top logo & back to homepage header */}
        <div className="justify-between flex flex-row w-full relative z-10">
          <div className="justify-start flex items-start">
            <Link href="/">
              <img
                src="https://res.cloudinary.com/depeqzb6z/image/upload/v1764395173/logo_qqpk6j.svg"
                alt="ORR Solutions Logo"
                className="w-32 h-32 mt-5 ml-10 cursor-pointer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </Link>
          </div>
        </div>

        {/* Tagline block at the bottom */}
        <div className="absolute bottom-10 w-full px-6 text-start relative z-10">
          <p className="font-poppins font-extrabold text-[32px] md:text-[48px] lg:text-[48px] xl:text-[40px] ml-5 mx-auto leading-tight">
            <span className="text-[#86FF22]">ORR Solutions</span>  <br />
            Listen.  Solve. Optimise.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Authentication Form Panel */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-16 py-12 relative overflow-hidden">
        {/* Soft atmospheric background lights */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-3xl w-full relative z-10">

          {/* Mobile logo (hidden on desktop) */}
          <div className="flex md:hidden flex-col items-center justify-center mb-8">
            <Link href="/">
              <img
                src="https://res.cloudinary.com/depeqzb6z/image/upload/v1764395173/logo_qqpk6j.svg"
                alt="ORR Solutions Logo"
                className="w-16 h-16 mb-4"
              />
            </Link>
          </div>

          {/* Form Header panel */}
          <div className="flex justify-between items-center mb-6">
            <div className="mt-0 text-left">
              <h2 className="text-2xl font-extrabold mb-2 md:text-start text-[#FFFFFF]">
                <span className="text-[#61FD51]">{t('auth.forgotPasswordTitle')}</span>
              </h2>
              <p className="text-sm font-medium mb-10 text-[#FFFFFF] md:text-start">
                {t('auth.forgotPasswordDesc')}
              </p>
            </div>

            {/* Language & Theme toggles matching position and size */}
            <div className="mb-8 flex items-center gap-4">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>

          {/* Success notifications */}
          {successMessage && (
            <div className="mb-6 p-4 bg-[#13BE77]/10 border border-[#13BE77]/20 rounded-lg text-[#61FD51] text-xs font-semibold flex gap-2.5 items-start">
              <AlertTriangle className="text-[#61FD51] flex-shrink-0 mt-0.5" size={16} />
              <div className="space-y-0.5">
                <strong className="block text-[#61FD51] uppercase tracking-wider text-[9px] font-mono">Reset Requested</strong>
                <span>{successMessage}</span>
              </div>
            </div>
          )}

          {/* Reset Form */}
          <form className="space-y-7" onSubmit={handleResetSubmit}>

            {/* Email Entry */}
            <input
              type="email"
              placeholder={t('auth.emailPlaceholder')}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 px-6 py-5 focus:outline-none text-white bg-transparent transition-colors focus:border-[#61FD51]"
              required
            />

            {/* Submit CTA button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#13BE77] hover:bg-[#11aa6a] py-5 rounded-lg cursor-pointer mt-8 transition disabled:opacity-50 text-white font-regular shadow-lg shadow-[#13BE77]/10 active:scale-[0.99]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                t('auth.sendResetLink')
              )}
            </button>

            {/* Login footer link */}
            <div className="flex items-center justify-center mt-6">
              <Link
                href="/login"
                className="px-6 font-extrabold text-md text-[#61FD51] hover:text-[#52d743] transition underline"
              >
                &larr; {t('auth.backToLogin')}
              </Link>
            </div>
          </form>

        </div>
      </div>

    </div>
  );
}
