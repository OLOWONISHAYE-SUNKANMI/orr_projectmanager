"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePmStore } from '@/store/pmStore';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { GoogleButton } from '@/components/ui/GoogleButton';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTranslation } from '@/lib/i18n/useTranslation';

export default function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const isAuthenticated = usePmStore(state => state.isAuthenticated);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Automatic redirect if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      setError(t('auth.passwordsNotMatch'));
      return;
    }

    setError(null);
    setLoading(true);
    
    // Simulate registration
    setTimeout(async () => {
      // In a real app, you would call a register API here.
      // For now, we'll just redirect to login
      setLoading(false);
      router.push('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row-reverse bg-background text-white select-none">

      {/* RIGHT SIDE - Exact image cover + logo + taglines matching reference */}
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

      {/* LEFT SIDE - Authentication Form Panel */}
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
                {t('auth.joinPrefix')} <span className="text-[#61FD51]">{t('auth.joinHighlight')}</span>
              </h2>
              <p className="text-sm font-medium mb-10 text-[#FFFFFF] md:text-start">
                {t('auth.registerDesc')}
              </p>
            </div>

            {/* Language & Theme toggles matching position and size */}
            <div className="mb-8 flex items-center gap-4">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>

          {/* Error notifications */}
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-semibold flex gap-2.5 items-start">
              <AlertTriangle className="text-red-400 flex-shrink-0 mt-0.5" size={16} />
              <div className="space-y-0.5">
                <strong className="block text-red-400 uppercase tracking-wider text-[9px] font-mono">{t('auth.registerWarning')}</strong>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Registration Form */}
          <form className="space-y-7" onSubmit={handleRegisterSubmit}>

            {/* Name Fields */}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder={t('auth.firstName')}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full border-b border-gray-300 px-6 py-5 focus:outline-none text-white bg-transparent transition-colors focus:border-[#61FD51]"
                required
              />
              <input
                type="text"
                placeholder={t('auth.lastName')}
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full border-b border-gray-300 px-6 py-5 focus:outline-none text-white bg-transparent transition-colors focus:border-[#61FD51]"
                required
              />
            </div>

            {/* Email Entry */}
            <input
              type="email"
              placeholder={t('auth.emailPlaceholder')}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 px-6 py-5 focus:outline-none text-white bg-transparent transition-colors focus:border-[#61FD51]"
              required
            />

            {/* Password Entry */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t('auth.passwordPlaceholder')}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border-b border-gray-300 px-6 py-5 focus:outline-none text-white bg-transparent transition-colors focus:border-[#61FD51]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* Confirm Password Entry */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t('auth.confirmPassword')}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full border-b border-gray-300 px-6 py-5 focus:outline-none text-white bg-transparent transition-colors focus:border-[#61FD51]"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {/* Submit CTA button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#13BE77] hover:bg-[#11aa6a] py-5 rounded-lg cursor-pointer mt-8 transition disabled:opacity-50 text-white font-regular shadow-lg shadow-[#13BE77]/10 active:scale-[0.99]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                t('auth.register')
              )}
            </button>

            {/* Login footer link */}
            <div className="hidden md:flex items-end justify-end mt-4">
              <Link
                href="/login"
                className="px-6 font-extrabold text-md text-[#FFFFFF]"
              >
                {t('auth.alreadyHaveAccount')} <span className="text-[#61FD51] underline">{t('auth.loginLink')}</span>
              </Link>
            </div>
          </form>

          {/* Bottom custom divider & Google authentication matches reference */}
          <div className="mt-8">
            {/* Custom Separator divider */}
            <div className="relative flex items-center justify-center py-2">
              <div className="absolute w-full h-[1px] bg-gray-300/20" />
              <span className="relative px-4 text-xs font-black uppercase text-gray-500 bg-background tracking-widest font-mono">
                {t('auth.or')}
              </span>
            </div>

            {/* Custom Google authentication Button */}
            <div className="mt-6">
              <GoogleButton
                onClick={() => alert("Google OAuth2 registration simulation triggered for project manager account validation.")}
                isLoading={false}
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
