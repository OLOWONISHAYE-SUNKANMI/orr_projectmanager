"use client";

import React, { useState } from "react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { useToastStore } from "@/store/toastStore";
import { Settings, Shield, Bell, Key, Globe, Layout, Clock, ToggleLeft, ToggleRight } from "lucide-react";

export default function SettingsPage() {
  const { t } = useTranslation();
  const addToast = useToastStore(state => state.addToast);
  
  const [activeTab, setActiveTab] = useState("account");
  
  const [settings, setSettings] = useState({
    language: "English",
    theme: "Dark",
    timezone: "UTC-5 (Eastern Time)",
    twoFactor: true,
    emailNotifs: true,
    pushNotifs: true,
    tasksNotifs: true,
    messagesNotifs: true,
    approvalsNotifs: false,
    meetingsNotifs: true
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(t('pmDashboard.settings.successToast'), 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">{t('pmDashboard.settings.title')}</h1>
        <p className="text-secondary mt-1">{t('pmDashboard.settings.subtitle')}</p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Tabs */}
        <div className="md:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab("account")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeTab === 'account' ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Settings className="w-4 h-4" />
            {t('pmDashboard.settings.tabs.account')}
          </button>
          <button 
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeTab === 'security' ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Shield className="w-4 h-4" />
            {t('pmDashboard.settings.tabs.security')}
          </button>
          <button 
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${activeTab === 'notifications' ? 'bg-primary text-background shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Bell className="w-4 h-4" />
            {t('pmDashboard.settings.tabs.notifications')}
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          <div className="p-6 rounded-3xl bg-card border border-white/5 min-h-[400px]">
            <form onSubmit={handleSave} className="space-y-8 h-full flex flex-col">
              
              {/* Account Settings */}
              {activeTab === "account" && (
                <div className="space-y-6 animate-in fade-in flex-1">
                  <h2 className="text-lg font-black text-white border-b border-white/5 pb-4">{t('pmDashboard.settings.tabs.account')}</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">{t('pmDashboard.settings.account.language')}</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <select className="w-full bg-input-bg border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                          <option>English</option>
                          <option>Italiano</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">{t('pmDashboard.settings.account.theme')}</label>
                      <div className="relative">
                        <Layout className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <select className="w-full bg-input-bg border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                          <option>Dark</option>
                          <option>Light</option>
                          <option>System Default</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">{t('pmDashboard.settings.account.timezone')}</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <select className="w-full bg-input-bg border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                          <option>UTC-5 (Eastern Time)</option>
                          <option>UTC+1 (Central European Time)</option>
                          <option>UTC+0 (Greenwich Mean Time)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <div className="space-y-6 animate-in fade-in flex-1">
                  <h2 className="text-lg font-black text-white border-b border-white/5 pb-4">{t('pmDashboard.settings.tabs.security')}</h2>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-300">{t('pmDashboard.settings.security.changePassword')}</h3>
                    <div className="space-y-3">
                      <div className="relative">
                        <Key className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input type="password" placeholder={t('pmDashboard.settings.security.currentPassword')} className="w-full bg-input-bg border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div className="relative">
                        <Key className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input type="password" placeholder={t('pmDashboard.settings.security.newPassword')} className="w-full bg-input-bg border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-300">{t('pmDashboard.settings.security.twoFactor')}</h3>
                        <p className="text-xs text-slate-500 mt-1">Add an extra layer of security to your account.</p>
                      </div>
                      <button type="button" onClick={() => handleToggle('twoFactor')} className="text-primary hover:text-lemon transition-colors">
                        {settings.twoFactor ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-slate-500" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <div className="space-y-6 animate-in fade-in flex-1">
                  <h2 className="text-lg font-black text-white border-b border-white/5 pb-4">{t('pmDashboard.settings.tabs.notifications')}</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-sm font-bold text-slate-300">{t('pmDashboard.settings.notifications.email')}</span>
                      <button type="button" onClick={() => handleToggle('emailNotifs')} className="text-primary hover:text-lemon transition-colors">
                        {settings.emailNotifs ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-slate-500" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-sm font-bold text-slate-300">{t('pmDashboard.settings.notifications.push')}</span>
                      <button type="button" onClick={() => handleToggle('pushNotifs')} className="text-primary hover:text-lemon transition-colors">
                        {settings.pushNotifs ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-slate-500" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-sm font-bold text-slate-300">{t('pmDashboard.settings.notifications.tasks')}</span>
                      <button type="button" onClick={() => handleToggle('tasksNotifs')} className="text-primary hover:text-lemon transition-colors">
                        {settings.tasksNotifs ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-slate-500" />}
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-sm font-bold text-slate-300">{t('pmDashboard.settings.notifications.messages')}</span>
                      <button type="button" onClick={() => handleToggle('messagesNotifs')} className="text-primary hover:text-lemon transition-colors">
                        {settings.messagesNotifs ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-slate-500" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4 mt-auto">
                <button type="submit" className="px-6 py-2.5 bg-primary hover:bg-lemon text-background rounded-xl font-black text-sm transition-colors shadow-lg shadow-primary/20">
                  {t('pmDashboard.settings.save')}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
