"use client";

import React, { useState } from "react";
import PMSidebar from "@/components/PMSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function PMDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      <PMSidebar openNotifications={() => setNotificationsOpen(true)} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Main Content Area */}
        <div className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto w-full h-full">
            {children}
          </div>
        </div>
      </main>

      {/* Notifications Panel (mock implementation) */}
      <AnimatePresence>
        {notificationsOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setNotificationsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="relative w-full max-w-md bg-surface border-l border-white/10 h-full shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-card">
                <h2 className="text-xl font-bold text-white">{t('pmDashboard.sidebar.notifications')}</h2>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="text-slate-400 hover:text-white transition"
                >
                  {t('pmDashboard.sidebar.cancel')}
                </button>
              </div>
              <div className="flex-1 p-6 overflow-y-auto">
                <p className="text-slate-400">{t('pmDashboard.requests.noRequests')}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
