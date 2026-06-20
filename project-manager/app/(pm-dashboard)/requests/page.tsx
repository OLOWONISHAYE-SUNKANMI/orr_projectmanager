"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Briefcase, ChevronRight, UserPlus, FileText, CheckCircle, Clock } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Modal } from "@/components/ui/Modal";
import { useToastStore } from "@/store/toastStore";

export default function RequestsPage() {
  const [activeTab, setActiveTab] = useState("All Requests");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const addToast = useToastStore(state => state.addToast);

  const mockRequests = [
    {
      id: "REQ-001",
      title: "Senior UI/UX Designer",
      project: "Alpha Migration",
      specialty: "Design",
      status: "Under Review",
      priority: "High",
      date: "Jun 18, 2026",
    },
    {
      id: "REQ-002",
      title: "Cloud Infrastructure Expert",
      project: "Beta System",
      specialty: "DevOps",
      status: "Assigned",
      priority: "Critical",
      date: "Jun 15, 2026",
    },
    {
      id: "REQ-003",
      title: "Data Analyst",
      project: "Delta Audit",
      specialty: "Data Science",
      status: "Draft",
      priority: "Medium",
      date: "Jun 19, 2026",
    },
    {
      id: "REQ-004",
      title: "Security Consultant",
      project: "Gamma Compliance",
      specialty: "Cybersecurity",
      status: "Approved",
      priority: "High",
      date: "Jun 17, 2026",
    }
  ];

  const filteredRequests = activeTab === "All Requests" 
    ? mockRequests 
    : mockRequests.filter(r => r.status === activeTab);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Draft': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      case 'Submitted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Under Review': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Approved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Assigned': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-white/10 text-white';
    }
  };

  const tabs = ["All Requests", "Draft", "Submitted", "Under Review", "Approved", "Assigned"];

  const getTranslatedTab = (tab: string) => {
    switch (tab) {
      case "All Requests": return t('pmDashboard.requests.allRequests');
      case "Draft": return t('pmDashboard.requests.draft');
      case "Submitted": return t('pmDashboard.requests.submitted');
      case "Under Review": return t('pmDashboard.requests.underReview');
      case "Approved": return t('pmDashboard.requests.approved');
      case "Assigned": return t('pmDashboard.requests.assigned');
      default: return tab;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">{t('pmDashboard.requests.title')}</h1>
          <p className="text-secondary mt-1">{t('pmDashboard.requests.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary hover:bg-lemon text-background rounded-xl transition-colors font-black text-xs shadow-lg shadow-primary/10 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t('pmDashboard.requests.newRequest')}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 custom-scrollbar">
        <div className="flex bg-card p-1 rounded-2xl border border-white/5 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                activeTab === tab 
                ? "bg-primary text-background shadow-lg shadow-primary/20" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {getTranslatedTab(tab)}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-white/10 bg-input-bg rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
            placeholder={t('pmDashboard.requests.searchPlaceholder')}
          />
        </div>
        <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold border border-white/10 transition-colors flex items-center gap-2">
          <Filter className="w-4 h-4" />
          {t('pmDashboard.requests.filter')}
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((req, idx) => (
          <motion.div
            key={req.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-5 rounded-2xl bg-card border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group cursor-pointer"
          >
            <div className="flex gap-4 items-start w-full md:w-auto flex-1">
              <div className="p-3 bg-white/5 rounded-lg flex-shrink-0 group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-sm font-extrabold text-white group-hover:text-primary transition-colors">{req.title}</h3>
                  <span className={`text-[9px] font-mono font-black border px-2 py-0.5 rounded uppercase tracking-wide ${
                    req.priority === 'Critical' ? 'text-red-400 bg-red-400/10 border border-red-400/20' :
                    req.priority === 'High' ? 'text-orange-400 bg-orange-400/10 border border-orange-400/20' :
                    'text-blue-400 bg-blue-400/10 border border-blue-400/20'
                  }`}>
                    {req.priority}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-black uppercase tracking-wider font-mono text-slate-400">
                  <span className="font-medium text-slate-300">{req.id}</span>
                  <span>•</span>
                  <span>{t('pmDashboard.requests.project')}: <span className="text-primary">{req.project}</span></span>
                  <span>•</span>
                  <span>{t('pmDashboard.requests.specialty')}: <span className="text-slate-300">{req.specialty}</span></span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {req.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between w-full md:w-auto gap-6 mt-4 md:mt-0">
              <div className="flex flex-col items-end">
                <span className="text-xs text-slate-500 mb-1">{t('pmDashboard.requests.status')}</span>
                <span className={`text-[9px] font-mono font-black border px-2 py-0.5 rounded uppercase tracking-wide ${getStatusColor(req.status)}`}>
                  {getTranslatedTab(req.status)}
                </span>
              </div>
              
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
            </div>
          </motion.div>
        ))}

        {filteredRequests.length === 0 && (
          <div className="text-center py-12 p-5 rounded-2xl bg-card border border-white/5">
            <UserPlus className="w-12 h-12 text-primary/50 mx-auto mb-4" />
            <h3 className="text-sm font-extrabold text-white mb-2">{t('pmDashboard.requests.noRequests')}</h3>
            <p className="text-[10px] font-black uppercase tracking-wider font-mono text-slate-400">{t('pmDashboard.requests.noRequestsSub')}</p>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('pmDashboard.requests.modal.title')}>
        <form onSubmit={(e) => {
          e.preventDefault();
          addToast(t('pmDashboard.requests.modal.successToast'), 'success');
          setIsModalOpen(false);
        }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.requests.modal.roleTitle')}</label>
            <input required type="text" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Senior Backend Developer" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.requests.modal.projectLabel')}</label>
            <input required type="text" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Gamma Initialization" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.requests.modal.specialtyLabel')}</label>
            <input required type="text" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Database Architecture" />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-colors">
              {t('pmDashboard.requests.modal.cancel')}
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-primary hover:bg-lemon text-background rounded-xl text-sm font-black transition-colors shadow-lg shadow-primary/20">
              {t('pmDashboard.requests.modal.submit')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
