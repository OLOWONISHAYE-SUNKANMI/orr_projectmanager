"use client";

import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from "recharts";
import { Download, Calendar, TrendingUp, Users, CheckSquare } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Modal } from "@/components/ui/Modal";
import { useToastStore } from "@/store/toastStore";
import { useState } from "react";

export default function ReportsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const addToast = useToastStore(state => state.addToast);

  const projectCompletionData = [
    { name: "Alpha", progress: 85, target: 100 },
    { name: "Beta", progress: 45, target: 100 },
    { name: "Delta", progress: 90, target: 100 },
    { name: "Gamma", progress: 20, target: 100 },
  ];

  const utilizationData = [
    { name: "Week 1", utilization: 65 },
    { name: "Week 2", utilization: 72 },
    { name: "Week 3", utilization: 85 },
    { name: "Week 4", utilization: 78 },
  ];

  const approvalStats = [
    { name: "Mon", approved: 4, rejected: 1 },
    { name: "Tue", approved: 3, rejected: 0 },
    { name: "Wed", approved: 7, rejected: 2 },
    { name: "Thu", approved: 5, rejected: 1 },
    { name: "Fri", approved: 8, rejected: 0 },
  ];

  const kpis = [
    { label: t('pmDashboard.reports.avgProjectCompletion'), value: "60%", change: "+5%", positive: true, icon: TrendingUp },
    { label: t('pmDashboard.reports.consultantUtilization'), value: "82%", change: "+12%", positive: true, icon: Users },
    { label: t('pmDashboard.reports.tasksCompleted'), value: "145", change: "-2%", positive: false, icon: CheckSquare },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">{t('pmDashboard.reports.title')}</h1>
          <p className="text-secondary mt-1">{t('pmDashboard.reports.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-colors flex items-center gap-2 text-xs font-bold">
            <Calendar className="w-4 h-4" />
            {t('pmDashboard.reports.last30Days')}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary hover:bg-lemon text-background rounded-xl transition-colors font-black text-xs shadow-lg shadow-primary/10 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {t('pmDashboard.reports.exportReport')}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="p-6 rounded-2xl bg-card border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors cursor-default">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-lg text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[9px] font-mono font-black uppercase tracking-wide border px-2 py-0.5 rounded ${kpi.positive ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {kpi.change}
                </span>
              </div>
              <h3 className="text-3xl font-black text-white mb-1 relative">{kpi.value}</h3>
              <p className="text-[10px] font-black uppercase tracking-wider font-mono text-slate-400 relative">{kpi.label}</p>
            </div>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Project Completion */}
        <div className="p-6 rounded-2xl bg-card border border-white/5">
          <h3 className="text-sm font-extrabold text-white mb-6">{t('pmDashboard.reports.projectCompletion')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectCompletionData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} width={60} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="progress" fill="#0EC277" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Consultant Utilization */}
        <div className="p-6 rounded-2xl bg-card border border-white/5">
          <h3 className="text-sm font-extrabold text-white mb-6">{t('pmDashboard.reports.consultantUtilization')}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={utilizationData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUtil" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="utilization" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUtil)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Document Approval Stats */}
        <div className="p-6 rounded-2xl bg-card border border-white/5 lg:col-span-2">
          <h3 className="text-sm font-extrabold text-white mb-6">{t('pmDashboard.reports.docApprovalStats')}</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={approvalStats} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dx={-10} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="approved" name="Approved" fill="#0EC277" radius={[4, 4, 0, 0]} stackId="a" barSize={40} />
                <Bar dataKey="rejected" name="Rejected" fill="#EF4444" radius={[4, 4, 0, 0]} stackId="a" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('pmDashboard.reports.modal.title')}>
        <form onSubmit={(e) => {
          e.preventDefault();
          addToast(t('pmDashboard.reports.modal.successToast'), 'success');
          setIsModalOpen(false);
        }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.reports.modal.formatLabel')}</label>
            <select className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="pdf">{t('pmDashboard.reports.modal.pdf')}</option>
              <option value="csv">{t('pmDashboard.reports.modal.csv')}</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-colors">
              {t('pmDashboard.reports.modal.cancel')}
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-primary hover:bg-lemon text-background rounded-xl text-sm font-black transition-colors shadow-lg shadow-primary/20">
              {t('pmDashboard.reports.modal.submit')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
