"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePmStore } from '@/store/pmStore';
import ProjectManagerOnboarding from '@/components/onboarding/ProjectManagerOnboarding';

export default function OnboardingPage() {
  const router = useRouter();
  const isAuthenticated = usePmStore(state => state.isAuthenticated);
  const isOnboardingComplete = usePmStore(state => state.isOnboardingComplete);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else if (isOnboardingComplete) {
        router.replace('/dashboard');
      }
    }
  }, [isAuthenticated, isOnboardingComplete, router, isMounted]);

  if (!isMounted || !isAuthenticated || isOnboardingComplete) {
    // Show nothing while checking state/redirecting
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#61FD51] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <ProjectManagerOnboarding />;
}
