"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, Calendar, Folder, MoreVertical, Search, Filter, Users, Briefcase, UserCircle } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Modal } from "@/components/ui/Modal";
import { useToastStore } from "@/store/toastStore";

export default function ClientProfilePage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addToast = useToastStore(state => state.addToast);

  // Mock clients
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

  const client = mockClients.find(c => c.id === clientId);

  const mockProjects = [
    {
      id: "PRJ-001",
      name: "Alpha Migration Strategy",
      client: "Acme Corp",
      clientId: "CLI-001",
      status: "In Progress",
      progress: 65,
      team: 4,
      dueDate: "2026-08-15"
    },
    {
      id: "PRJ-002",
      name: "Beta System Integration",
      client: "Globex Inc",
      clientId: "CLI-002",
      status: "On Track",
      progress: 40,
      team: 3,
      dueDate: "2026-09-30"
    },
    {
      id: "PRJ-003",
      name: "Delta Infrastructure Audit",
      client: "Stark Industries",
      clientId: "CLI-003",
      status: "At Risk",
      progress: 85,
      team: 6,
      dueDate: "2026-06-30"
    },
    {
      id: "PRJ-004",
      name: "Acme Logistics Expansion",
      client: "Acme Corp",
      clientId: "CLI-001",
      status: "On Track",
      progress: 15,
      team: 2,
      dueDate: "2026-11-20"
    }
  ];

  const clientProjects = mockProjects.filter(p => p.clientId === clientId);

  const filteredProjects = clientProjects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in">
        <Building2 className="w-16 h-16 text-slate-600 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Client Not Found</h2>
        <p className="text-slate-400 mb-6">We couldn't locate the client you're looking for.</p>
        <button onClick={() => router.push('/clients')} className="px-6 py-2 bg-primary text-background font-bold rounded-xl hover:bg-lemon transition">
          Return to Clients
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header with Back Button */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <button 
            onClick={() => router.push('/clients')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Clients
          </button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">{client.name}</h1>
              <div className="flex items-center gap-4 mt-1 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {client.industry}</span>
                <span className="flex items-center gap-1.5"><UserCircle className="w-3.5 h-3.5" /> {client.manager}</span>
                <span className="font-mono text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded tracking-wide">{client.id}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 self-start md:self-auto mt-4 md:mt-0">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 bg-primary hover:bg-lemon text-background rounded-xl transition-colors font-black text-xs"
          >
            {t('pmDashboard.projects.newProject')}
          </button>
        </div>
      </div>

      {/* Overview Stats for this Client (Optional, adds nice touch) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-white/5">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono block">Active Projects</span>
          <h3 className="text-2xl font-black text-white mt-2">{clientProjects.length}</h3>
        </div>
        <div className="p-5 rounded-2xl bg-card border border-white/5">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono block">Status</span>
          <h3 className={`text-xl font-black mt-2 ${
            client.status === 'Active' ? 'text-green-400' : 
            client.status === 'On Hold' ? 'text-amber-400' : 'text-blue-400'
          }`}>{client.status}</h3>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <h2 className="text-xl font-bold text-white">Client Projects</h2>
        <div className="relative w-full max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-9 pr-3 py-2 border border-white/10 bg-input-bg rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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

        {filteredProjects.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-white/10 rounded-2xl">
            <Folder className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-1">No projects found</h3>
            <p className="text-sm text-slate-400">This client doesn't have any projects matching your search.</p>
          </div>
        )}
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
            <input 
              readOnly 
              type="text" 
              defaultValue={client.name} 
              className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none opacity-70 cursor-not-allowed" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.projects.modal.budgetLabel')}</label>
            <input type="number" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="50000 (Optional)" />
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
