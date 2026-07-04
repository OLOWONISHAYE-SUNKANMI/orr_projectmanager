"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, FileText, CheckCircle, XCircle, Clock, RotateCcw, MessageSquare, Download, Calendar, Bell } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Modal } from "@/components/ui/Modal";
import { useToastStore } from "@/store/toastStore";
import { ApprovalRequest } from "@/types/approvals";

export default function ApprovalsQueue() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [roleFilter, setRoleFilter] = useState<"All" | "consultant" | "administrator" | "client">("All");
  const [modalType, setModalType] = useState<"approve" | "reject" | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  
  const { t } = useTranslation();
  const addToast = useToastStore(state => state.addToast);

  const mockDocs: ApprovalRequest[] = [
    {
      id: "DOC-102",
      title: "Q3 Strategy Presentation",
      project: "Alpha Migration",
      senderRole: "consultant",
      submittedBy: "John Doe",
      submittedAt: "2 hours ago",
      deadline: "2026-07-05",
      status: "Pending",
      version: "v2.1",
      comments: 1,
      reminders: [{ id: "r1", message: "Review required by tomorrow EOD", date: "2026-07-04", isRead: false }]
    },
    {
      id: "DOC-103",
      title: "Technical Requirements",
      project: "Beta System",
      senderRole: "administrator",
      submittedBy: "System Admin",
      submittedAt: "1 day ago",
      deadline: "2026-07-10",
      status: "Revision Requested",
      version: "v1.0",
      comments: 3,
      reminders: []
    },
    {
      id: "DOC-104",
      title: "Client Contract",
      project: "Delta Audit",
      senderRole: "client",
      submittedBy: "Mike Johnson",
      submittedAt: "2 days ago",
      deadline: "2026-07-15",
      status: "Approved",
      version: "v3.0",
      comments: 0,
      reminders: []
    }
  ];

  useEffect(() => {
    mockDocs.forEach(doc => {
      doc.reminders.forEach(reminder => {
        if (!reminder.isRead) {
          addToast(`${t('pmDashboard.approvals.reminders')}: ${doc.title} - ${reminder.message}`, "info");
        }
      });
    });
  }, [addToast, t]);

  const filteredDocs = mockDocs.filter(d => 
    (activeTab === "All" || 
     (activeTab === "Pending" && d.status === "Pending") ||
     (activeTab === "Needs Revision" && d.status === "Revision Requested") ||
     (activeTab === "Completed" && (d.status === "Approved" || d.status === "Rejected"))
    ) &&
    (roleFilter === "All" || d.senderRole === roleFilter)
  );

  const StatusIcon = ({ status }: { status: string }) => {
    switch(status) {
      case "Pending": return <Clock className="w-4 h-4 text-amber-400" />;
      case "Approved": return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "Rejected": return <XCircle className="w-4 h-4 text-red-400" />;
      case "Revision Requested": return <RotateCcw className="w-4 h-4 text-blue-400" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">{t('pmDashboard.approvals.title')}</h1>
          <p className="text-secondary mt-1">{t('pmDashboard.approvals.subtitle')}</p>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <div className="flex bg-card p-1 rounded-2xl border border-white/5 w-fit">
          {["Pending", "Needs Revision", "Completed", "All"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === tab 
                ? "bg-primary text-background shadow-lg shadow-primary/20" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab === 'Pending' ? t('pmDashboard.approvals.pendingTab') :
               tab === 'Completed' ? t('pmDashboard.approvals.approvedTab') :
               tab === 'Needs Revision' ? t('pmDashboard.approvals.rejectedTab') : tab}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="block w-40 pl-4 pr-10 py-2 border border-white/10 bg-input-bg rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm appearance-none"
            >
              <option value="All">{t('pmDashboard.approvals.allRoles')}</option>
              <option value="consultant">{t('pmDashboard.approvals.roleConsultant')}</option>
              <option value="administrator">{t('pmDashboard.approvals.roleAdministrator')}</option>
              <option value="client">{t('pmDashboard.approvals.roleClient')}</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Filter className="h-4 w-4 text-slate-400" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-64 pl-10 pr-3 py-2 border border-white/10 bg-input-bg rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-sm"
              placeholder={t('pmDashboard.approvals.searchPlaceholder')}
            />
          </div>
        </div>
      </div>

      {/* Approvals List */}
      <div className="space-y-4">
        {filteredDocs.map((doc, idx) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-5 rounded-2xl bg-card border border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group"
          >
            <div className="flex gap-4 items-start">
              <div className={`p-3 rounded-xl flex-shrink-0 ${
                doc.status === 'Pending' ? 'bg-amber-400/10 text-amber-400' :
                doc.status === 'Approved' ? 'bg-green-400/10 text-green-400' :
                doc.status === 'Revision Requested' ? 'bg-blue-400/10 text-blue-400' :
                'bg-red-400/10 text-red-400'
              }`}>
                <FileText className="w-6 h-6" />
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-sm font-extrabold text-white group-hover:text-primary transition-colors">{doc.title}</h3>
                  <span className="text-[9px] font-mono font-black text-slate-300 bg-slate-800 border border-white/5 px-2 py-0.5 rounded uppercase tracking-wide">{doc.version}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-black uppercase tracking-wider font-mono text-slate-400 mt-2">
                  <span className="text-primary">{doc.project}</span>
                  <span className="opacity-50">•</span>
                  <span className={`px-2 py-0.5 rounded-full border ${
                    doc.senderRole === 'consultant' ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' :
                    doc.senderRole === 'client' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' :
                    'border-blue-500/30 text-blue-400 bg-blue-500/10'
                  }`}>
                    {doc.senderRole === 'consultant' ? t('pmDashboard.approvals.roleConsultant') :
                     doc.senderRole === 'client' ? t('pmDashboard.approvals.roleClient') :
                     t('pmDashboard.approvals.roleAdministrator')}
                  </span>
                  <span className="opacity-50">•</span>
                  <span>{t('pmDashboard.approvals.submittedBy')} <span className="text-slate-300">{doc.submittedBy}</span></span>
                  <span className="opacity-50">•</span>
                  <span>{doc.submittedAt}</span>
                  <span className="opacity-50">•</span>
                  <span className="flex items-center gap-1 text-rose-400">
                    <Calendar className="w-3 h-3" />
                    {doc.deadline}
                  </span>
                  {doc.reminders && doc.reminders.length > 0 && (
                    <>
                      <span className="opacity-50">•</span>
                      <span className="flex items-center gap-1 text-amber-400">
                        <Bell className="w-3 h-3" />
                        {doc.reminders.length} {t('pmDashboard.approvals.reminders')}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-slate-900/40 text-[10px] font-black uppercase tracking-wider font-mono">
                <StatusIcon status={doc.status} />
                <span className={
                  doc.status === 'Pending' ? 'text-amber-400' :
                  doc.status === 'Approved' ? 'text-green-400' :
                  doc.status === 'Revision Requested' ? 'text-blue-400' :
                  'text-red-400'
                }>{doc.status}</span>
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors tooltip-trigger" title="Download">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors relative" title="Comments">
                  <MessageSquare className="w-5 h-5" />
                  {doc.comments > 0 && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full" />
                  )}
                </button>
                
                {doc.status === "Pending" && (
                  <>
                    <button 
                      onClick={() => { setModalType("approve"); setSelectedDocId(doc.id); }}
                      className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-xl text-xs font-bold transition-colors"
                    >
                      {t('pmDashboard.approvals.approve')}
                    </button>
                    <button 
                      onClick={() => { setModalType("reject"); setSelectedDocId(doc.id); }}
                      className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold transition-colors"
                    >
                      {t('pmDashboard.approvals.reject')}
                    </button>
                  </>
                )}
                {doc.status === "Revision Requested" && (
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-colors">
                    Review Update
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {filteredDocs.length === 0 && (
          <div className="text-center py-12 p-5 rounded-2xl bg-card border border-white/5">
            <CheckCircle className="w-12 h-12 text-primary/50 mx-auto mb-4" />
            <h3 className="text-sm font-extrabold text-white mb-2">You're all caught up!</h3>
            <p className="text-[10px] font-black uppercase tracking-wider font-mono text-slate-400">No documents in this queue.</p>
          </div>
        )}
      </div>

      <Modal 
        isOpen={modalType !== null} 
        onClose={() => { setModalType(null); setSelectedDocId(null); }} 
        title={modalType === 'approve' ? t('pmDashboard.approvals.modal.titleApprove') : t('pmDashboard.approvals.modal.titleReject')}
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          const isApprove = modalType === 'approve';
          addToast(
            isApprove ? t('pmDashboard.approvals.modal.successToastApprove') : t('pmDashboard.approvals.modal.successToastReject'), 
            isApprove ? 'success' : 'error'
          );
          setModalType(null);
          setSelectedDocId(null);
        }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.approvals.modal.notes')}</label>
            <textarea 
              rows={4}
              className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary custom-scrollbar" 
              placeholder="Add optional notes..." 
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => { setModalType(null); setSelectedDocId(null); }} className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-colors">
              {t('pmDashboard.approvals.modal.cancel')}
            </button>
            <button type="submit" className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-black transition-colors shadow-lg ${modalType === 'approve' ? 'bg-green-500 hover:bg-green-400 text-slate-900 shadow-green-500/20' : 'bg-red-500 hover:bg-red-400 text-white shadow-red-500/20'}`}>
              {modalType === 'approve' ? t('pmDashboard.approvals.modal.submitApprove') : t('pmDashboard.approvals.modal.submitReject')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
