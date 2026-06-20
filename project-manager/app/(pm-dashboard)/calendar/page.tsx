"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Video, Users, Clock, Calendar as CalendarIcon, Plus } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Modal } from "@/components/ui/Modal";
import { useToastStore } from "@/store/toastStore";
import { useState } from "react";

export default function CalendarPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const addToast = useToastStore(state => state.addToast);

  const mockMeetings = [
    {
      id: 1,
      title: "Alpha Kickoff Meeting",
      time: "10:00 AM - 11:30 AM",
      type: "Video Call",
      participants: 5,
      project: "Alpha Migration",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/20"
    },
    {
      id: 2,
      title: "Weekly Sync: Beta Team",
      time: "1:00 PM - 2:00 PM",
      type: "Video Call",
      participants: 3,
      project: "Beta Integration",
      color: "bg-green-500/20 text-green-400 border-green-500/20"
    },
    {
      id: 3,
      title: "Delta Client Review",
      time: "3:30 PM - 4:30 PM",
      type: "In-Person",
      participants: 4,
      project: "Delta Audit",
      color: "bg-purple-500/20 text-purple-400 border-purple-500/20"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">{t('pmDashboard.calendar.title')}</h1>
          <p className="text-secondary mt-1">{t('pmDashboard.calendar.subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-card p-1 rounded-2xl border border-white/5 mr-4">
            <button className="px-3 py-1.5 rounded-xl text-xs font-bold bg-primary text-background shadow-lg shadow-primary/20">{t('pmDashboard.calendar.day')}</button>
            <button className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 transition">{t('pmDashboard.calendar.week')}</button>
            <button className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-white/5 transition">{t('pmDashboard.calendar.month')}</button>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-primary hover:bg-lemon text-background rounded-xl transition-colors font-black text-xs shadow-lg shadow-primary/10 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {t('pmDashboard.calendar.schedule')}
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        
        {/* Sidebar / Agenda */}
        <div className="lg:col-span-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
          {/* Mini Calendar placeholder */}
          <div className="p-5 rounded-2xl bg-card border border-white/5">
            <div className="flex justify-between items-center mb-4">
              <button className="p-1 hover:bg-white/10 rounded-xl"><ChevronLeft className="w-4 h-4 text-slate-300" /></button>
              <h3 className="text-sm font-extrabold text-white">June 2026</h3>
              <button className="p-1 hover:bg-white/10 rounded-xl"><ChevronRight className="w-4 h-4 text-slate-300" /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black uppercase tracking-wider font-mono text-slate-400 mb-2">
              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {Array.from({length: 30}).map((_, i) => (
                <div key={i} className={`p-1.5 rounded-lg cursor-pointer ${i+1 === 19 ? 'bg-primary text-white font-bold' : 'text-slate-300 hover:bg-white/5'}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-white/5 flex-1">
            <h3 className="text-sm font-extrabold text-white mb-4">{t('pmDashboard.calendar.upcomingSyncs')}</h3>
            <div className="space-y-4">
              {mockMeetings.map(meeting => (
                <div key={meeting.id} className="relative pl-4 border-l-2 border-primary">
                  <div className="absolute w-2 h-2 rounded-full bg-primary -left-[5px] top-1.5" />
                  <h4 className="font-extrabold text-white text-xs">{meeting.title}</h4>
                  <p className="text-xs text-primary mt-0.5">{meeting.project}</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {meeting.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Calendar Area (Daily View Mockup) */}
        <div className="lg:col-span-3 rounded-2xl bg-card border border-white/5 overflow-y-auto relative custom-scrollbar">
          <div className="sticky top-0 bg-slate-900/40 backdrop-blur-md border-b border-white/5 p-4 z-10 flex justify-between items-center">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              Friday, June 19, 2026
            </h2>
            <div className="flex items-center gap-2">
              <button className="p-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 transition-colors text-xs font-bold">
                {t('pmDashboard.calendar.today')}
              </button>
              <button className="p-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative min-h-[800px] p-4">
            {/* Time markers */}
            {Array.from({length: 10}).map((_, i) => (
              <div key={i} className="flex relative h-20 border-b border-white/5">
                <div className="w-16 text-xs text-slate-500 font-medium -mt-2">
                  {i + 8}:00 {i+8 >= 12 ? 'PM' : 'AM'}
                </div>
                <div className="flex-1" />
              </div>
            ))}
            
            {/* Current time line */}
            <div className="absolute left-20 right-4 top-[240px] border-t border-primary z-10 pointer-events-none">
              <div className="absolute -left-2 -top-1.5 w-3 h-3 rounded-full bg-primary" />
            </div>

            {/* Meetings blocks */}
            <div className="absolute top-[160px] left-24 right-8 h-[120px] bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex flex-col hover:bg-blue-500/20 transition-colors cursor-pointer group">
              <h4 className="font-bold text-blue-400 group-hover:text-blue-300 transition-colors">Alpha Kickoff Meeting</h4>
              <p className="text-xs text-blue-400/80 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> 10:00 AM - 11:30 AM</p>
              <div className="mt-auto flex items-center gap-3 text-xs text-blue-400/70">
                <span className="flex items-center gap-1"><Video className="w-3 h-3" /> Video Call</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 5 Participants</span>
              </div>
            </div>

            <div className="absolute top-[400px] left-24 right-8 h-[80px] bg-green-500/10 border border-green-500/20 rounded-xl p-3 flex flex-col hover:bg-green-500/20 transition-colors cursor-pointer group">
              <h4 className="font-bold text-green-400 group-hover:text-green-300 transition-colors">Weekly Sync: Beta Team</h4>
              <p className="text-xs text-green-400/80 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> 1:00 PM - 2:00 PM</p>
            </div>
            
            <div className="absolute top-[600px] left-24 right-8 h-[80px] bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 flex flex-col hover:bg-purple-500/20 transition-colors cursor-pointer group">
              <h4 className="font-bold text-purple-400 group-hover:text-purple-300 transition-colors">Delta Client Review</h4>
              <p className="text-xs text-purple-400/80 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" /> 3:30 PM - 4:30 PM</p>
              <div className="mt-auto flex items-center gap-3 text-xs text-purple-400/70">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> In-Person</span>
              </div>
            </div>
            
          </div>
        </div>

      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('pmDashboard.calendar.modal.title')}>
        <form onSubmit={(e) => {
          e.preventDefault();
          addToast(t('pmDashboard.calendar.modal.successToast'), 'success');
          setIsModalOpen(false);
        }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.calendar.modal.meetingSubject')}</label>
            <input required type="text" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Kickoff Sync" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.calendar.modal.date')}</label>
              <input required type="date" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.calendar.modal.time')}</label>
              <input required type="time" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-colors">
              {t('pmDashboard.calendar.modal.cancel')}
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-primary hover:bg-lemon text-background rounded-xl text-sm font-black transition-colors shadow-lg shadow-primary/20">
              {t('pmDashboard.calendar.modal.submit')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
