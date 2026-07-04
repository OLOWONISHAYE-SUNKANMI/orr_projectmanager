"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Users, Building2, UserCircle, Briefcase, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Modal } from "@/components/ui/Modal";
import { useToastStore } from "@/store/toastStore";

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const addToast = useToastStore(state => state.addToast);

  const mockClients = [
    { id: "CLI-001", name: "Acme Corp", industry: "Manufacturing", activeProjects: 3, manager: "Marcus Vance", status: "Active" },
    { id: "CLI-002", name: "Globex Inc", industry: "Technology", activeProjects: 1, manager: "Sarah Connor", status: "Active" },
    { id: "CLI-003", name: "Stark Industries", industry: "Defense", activeProjects: 5, manager: "Tony Stark", status: "On Hold" },
    { id: "CLI-004", name: "Wayne Enterprises", industry: "Conglomerate", activeProjects: 2, manager: "Bruce Wayne", status: "Active" },
    { id: "CLI-005", name: "Cyberdyne Systems", industry: "Robotics", activeProjects: 4, manager: "Miles Dyson", status: "Active" },
    { id: "CLI-006", name: "Massive Dynamic", industry: "Biotech", activeProjects: 1, manager: "Nina Sharp", status: "Review" },
    { id: "CLI-007", name: "Umbrella Corp", industry: "Pharmaceuticals", activeProjects: 2, manager: "Albert Wesker", status: "Active" },
    { id: "CLI-008", name: "Tyrell Corporation", industry: "Bioengineering", activeProjects: 1, manager: "Eldon Tyrell", status: "Active" },
    { id: "CLI-009", name: "Oscorp", industry: "Genetics", activeProjects: 3, manager: "Norman Osborn", status: "Active" },
    { id: "CLI-010", name: "InGen", industry: "Genetics", activeProjects: 2, manager: "John Hammond", status: "On Hold" },
  ];

  const filteredClients = mockClients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">{t('pmDashboard.clients.title')}</h1>
          <p className="text-secondary mt-1">{t('pmDashboard.clients.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold border border-white/10 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            {t('pmDashboard.clients.filter')}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary hover:bg-lemon text-background rounded-xl transition-colors font-black text-xs"
          >
            {t('pmDashboard.clients.newClient')}
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
            placeholder={t('pmDashboard.clients.searchPlaceholder')}
          />
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client, idx) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-6 rounded-2xl bg-card border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer">
              <MoreVertical className="w-5 h-5" />
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-purple-500/10 rounded-lg text-purple-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white group-hover:text-purple-400 transition-colors">
                  {client.name}
                </h3>
                <span className="text-[9px] font-mono font-black text-purple-400 bg-purple-400/10 border border-purple-400/20 px-2 py-0.5 rounded uppercase tracking-wide mt-1 inline-block">
                  {client.id}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-2 pt-2 border-t border-white/5">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-500" />
                  {t('pmDashboard.clients.industry')}
                </div>
                <span>{client.industry}</span>
              </div>
              
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-slate-500" />
                  {t('pmDashboard.clients.accountManager')}
                </div>
                <span>{client.manager}</span>
              </div>

              <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-500" />
                  {t('pmDashboard.clients.activeProjects')}
                </div>
                <span className="font-mono text-white">{client.activeProjects}</span>
              </div>
              
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300 pt-2 border-t border-white/5">
                <span className="uppercase tracking-wide text-[10px] text-slate-400">{t('pmDashboard.clients.status')}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase tracking-wide border ${
                  client.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                  client.status === 'On Hold' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                  'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}>
                  {client.status}
                </span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5">
              <Link href={`/clients/${client.id}`} className="block text-center text-xs font-bold text-primary hover:text-lemon transition-colors">
                {t('pmDashboard.clients.viewDetails')} &rarr;
              </Link>
            </div>
          </motion.div>
        ))}
        
        {filteredClients.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-2xl">
            <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-1">No clients found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search query.</p>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('pmDashboard.clients.modal.title')}>
        <form onSubmit={(e) => {
          e.preventDefault();
          addToast(t('pmDashboard.clients.modal.successToast'), 'success');
          setIsModalOpen(false);
        }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.clients.modal.nameLabel')}</label>
            <input required type="text" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Wayne Enterprises" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.clients.modal.industryLabel')}</label>
            <input required type="text" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Conglomerate" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.clients.modal.managerLabel')}</label>
            <input required type="text" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Bruce Wayne" />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-colors">
              {t('pmDashboard.clients.modal.cancel')}
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-primary hover:bg-lemon text-background rounded-xl text-sm font-black transition-colors shadow-lg shadow-primary/20">
              {t('pmDashboard.clients.modal.submit')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
