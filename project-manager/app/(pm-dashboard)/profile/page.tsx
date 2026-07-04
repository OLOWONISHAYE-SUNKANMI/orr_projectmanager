"use client";

import React, { useState } from "react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { useToastStore } from "@/store/toastStore";
import { User, Mail, Phone, FileText, CheckCircle, Briefcase, Activity } from "lucide-react";

export default function ProfilePage() {
  const { t } = useTranslation();
  const addToast = useToastStore(state => state.addToast);

  const [formData, setFormData] = useState({
    name: "Alex Mercer",
    email: "alex.mercer@orr.com",
    phone: "+1 (555) 123-4567",
    bio: "Senior Operations Manager with 10+ years of experience in managing high-stakes enterprise projects and global consultant teams."
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(t('pmDashboard.profile.form.successToast'), 'success');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">{t('pmDashboard.profile.title')}</h1>
        <p className="text-secondary mt-1">{t('pmDashboard.profile.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile Card & Metrics */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-3xl bg-card border border-white/5 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-surface flex items-center justify-center mb-4 relative shadow-xl">
              <User size={40} className="text-slate-400" />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-surface rounded-full"></div>
            </div>
            <h2 className="text-xl font-black text-white">{formData.name}</h2>
            <p className="text-sm font-medium text-primary mt-1">Senior Operations Manager</p>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-white/5 space-y-4">
            <h3 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Overview
            </h3>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-slate-300 font-medium">{t('pmDashboard.profile.metrics.projects')}</span>
              </div>
              <span className="text-lg font-black text-white">12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm text-slate-300 font-medium">{t('pmDashboard.profile.metrics.tasks')}</span>
              </div>
              <span className="text-lg font-black text-white">348</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-slate-300 font-medium">{t('pmDashboard.profile.metrics.consultants')}</span>
              </div>
              <span className="text-lg font-black text-white">28</span>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Form & Activity */}
        <div className="lg:col-span-2 space-y-8">
          <div className="p-6 rounded-3xl bg-card border border-white/5">
            <h3 className="text-lg font-black text-white mb-6">{t('pmDashboard.profile.personalInfo')}</h3>
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">{t('pmDashboard.profile.form.name')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-white/10 bg-input-bg rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">{t('pmDashboard.profile.form.email')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-white/10 bg-input-bg rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm" 
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">{t('pmDashboard.profile.form.phone')}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-4 w-4 text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-white/10 bg-input-bg rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5">{t('pmDashboard.profile.form.bio')}</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <FileText className="h-4 w-4 text-slate-400" />
                  </div>
                  <textarea 
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-white/10 bg-input-bg rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary text-sm min-h-[100px]" 
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="px-6 py-2.5 bg-primary hover:bg-lemon text-background rounded-xl font-black text-sm transition-colors shadow-lg shadow-primary/20">
                  {t('pmDashboard.profile.form.save')}
                </button>
              </div>
            </form>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-white/5">
            <h3 className="text-lg font-black text-white mb-6">{t('pmDashboard.profile.recentActivity')}</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
              {/* Activity Item 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-surface bg-primary text-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <CheckCircle className="w-3 h-3" />
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-white">Approved Consultant Request</h4>
                    <span className="text-[10px] text-slate-400">2 hrs ago</span>
                  </div>
                  <p className="text-xs text-slate-400">Approved request REQ-004 for Gamma Compliance.</p>
                </div>
              </div>
              {/* Activity Item 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border-4 border-surface bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <Briefcase className="w-3 h-3" />
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-sm text-white">Created New Project</h4>
                    <span className="text-[10px] text-slate-400">Yesterday</span>
                  </div>
                  <p className="text-xs text-slate-400">Initialized Delta Audit project with Acme Corp.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
