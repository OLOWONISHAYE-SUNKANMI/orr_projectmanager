"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Folder, Users, Calendar, MoreVertical, Building2 } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Modal } from "@/components/ui/Modal";
import { useToastStore } from "@/store/toastStore";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const addToast = useToastStore(state => state.addToast);

  const mockProjects = [
    {
      id: "PRJ-001",
      name: "Alpha Migration Strategy",
      client: "Acme Corp",
      status: "In Progress",
      progress: 65,
      team: 4,
      dueDate: "2026-08-15"
    },
    {
      id: "PRJ-002",
      name: "Beta System Integration",
      client: "Globex Inc",
      status: "On Track",
      progress: 40,
      team: 3,
      dueDate: "2026-09-30"
    },
    {
      id: "PRJ-003",
      name: "Delta Infrastructure Audit",
      client: "Stark Industries",
      status: "At Risk",
      progress: 85,
      team: 6,
      dueDate: "2026-06-30"
    }
  ];

  const filteredProjects = mockProjects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">{t('pmDashboard.projects.title')}</h1>
          <p className="text-secondary mt-1">{t('pmDashboard.projects.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold border border-white/10 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            {t('pmDashboard.projects.filter')}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary hover:bg-lemon text-background rounded-xl transition-colors font-black text-xs"
          >
            {t('pmDashboard.projects.newProject')}
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="p-4 rounded-2xl bg-card border border-white/5">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-white/10 bg-input-bg rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder={t('pmDashboard.projects.searchPlaceholder')}
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-2xl bg-card border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer">
              <MoreVertical className="w-5 h-5" />
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-primary/10 rounded-lg text-primary">
                <Folder className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <span className="text-[9px] font-mono font-black text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded uppercase tracking-wide mt-1 inline-block">
                  {project.id}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-6 pt-2 border-t border-white/5">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-500" />
                  {project.client}
                </div>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  Due: <span className="font-mono">{project.dueDate}</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-500" />
                  {project.team} Team Members
                </div>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase tracking-wide border ${
                  project.status === 'On Track' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                  project.status === 'At Risk' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                  'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="pt-2 border-t border-white/5">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-wider font-mono text-slate-400 mb-1.5 mt-2">
                <span>{t('pmDashboard.projects.progress')}</span>
                <span className="text-white">{project.progress}%</span>
              </div>
              <div className="w-full bg-surface rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-primary h-1.5 rounded-full relative overflow-hidden" 
                  style={{ width: `${project.progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('pmDashboard.projects.modal.title')}>
        <form onSubmit={(e) => {
          e.preventDefault();
          addToast(t('pmDashboard.projects.modal.successToast'), 'success');
          setIsModalOpen(false);
        }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.projects.modal.nameLabel')}</label>
            <input required type="text" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Epsilon Initiative" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.projects.modal.clientLabel')}</label>
            <input required type="text" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Wayne Enterprises" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.projects.modal.budgetLabel')}</label>
            <input required type="number" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="50000" />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-colors">
              {t('pmDashboard.projects.modal.cancel')}
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-primary hover:bg-lemon text-background rounded-xl text-sm font-black transition-colors shadow-lg shadow-primary/20">
              {t('pmDashboard.projects.modal.submit')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
