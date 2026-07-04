"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Video, Users, Clock, Calendar as CalendarIcon, Plus, Paperclip } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Modal } from "@/components/ui/Modal";
import { useToastStore } from "@/store/toastStore";
import { useMeetingStore } from "@/store/meetingStore";

export default function CalendarPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const addToast = useToastStore(state => state.addToast);
  
  const meetings = useMeetingStore(state => state.meetings);
  const addMeeting = useMeetingStore(state => state.addMeeting);

  const [formData, setFormData] = useState({
    subject: '',
    name: '',
    date: '',
    time: '',
    attendees: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    addMeeting({
      id: `m-${Date.now()}`,
      subject: formData.subject,
      name: formData.name,
      date: formData.date,
      time: formData.time,
      attendees: formData.attendees,
      notes: formData.notes,
      attachments: 0, // Mock visual attachment
      status: 'approved',
      project: 'General',
      color: 'bg-primary/20 text-primary border-primary/20'
    });
    
    addToast(t('pmDashboard.calendar.modal.successToast'), 'success');
    setIsModalOpen(false);
    setFormData({ subject: '', name: '', date: '', time: '', attendees: '', notes: '' });
  };

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
              {meetings.map((meeting, i) => (
                <div key={meeting.id} className="relative pl-4 border-l-2 border-primary">
                  <div className="absolute w-2 h-2 rounded-full bg-primary -left-[5px] top-1.5" />
                  <h4 className="font-extrabold text-white text-xs">{meeting.subject}</h4>
                  <p className="text-xs text-primary mt-0.5">{meeting.project || "General"}</p>
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
            {meetings.map((meeting, idx) => {
              // Extremely simple mock positioning for the demo based on index to spread them out
              const topPos = 160 + (idx * 120);
              return (
                <div key={meeting.id} style={{ top: `${topPos}px` }} className={`absolute left-24 right-8 h-[100px] ${meeting.color || 'bg-blue-500/10 text-blue-400 border-blue-500/20'} border rounded-xl p-3 flex flex-col hover:opacity-80 transition-opacity cursor-pointer group`}>
                  <h4 className="font-bold transition-colors">{meeting.subject}</h4>
                  <p className="text-xs mt-1 flex items-center gap-1 opacity-80"><Clock className="w-3 h-3" /> {meeting.time}</p>
                  <div className="mt-auto flex items-center gap-3 text-xs opacity-70">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {meeting.attendees || 0} Participants</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('pmDashboard.calendar.modal.title')}>
        <form onSubmit={handleSchedule} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.calendar.modal.meetingSubject')}</label>
            <input name="subject" value={formData.subject} onChange={handleChange} required type="text" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Kickoff Sync" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.calendar.modal.nameLabel')}</label>
            <input name="name" value={formData.name} onChange={handleChange} required type="text" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Organizer/Requester Name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.calendar.modal.date')}</label>
              <input name="date" value={formData.date} onChange={handleChange} required type="date" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.calendar.modal.time')}</label>
              <input name="time" value={formData.time} onChange={handleChange} required type="text" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. 10:00 AM - 11:30 AM" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.calendar.modal.attendeesLabel')}</label>
            <input name="attendees" value={formData.attendees} onChange={handleChange} required type="text" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Number of attendees or emails" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.calendar.modal.notesLabel')}</label>
            <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Meeting agenda or notes..." />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.calendar.modal.attachmentsLabel')}</label>
            <div className="w-full border border-dashed border-white/20 rounded-xl p-4 text-center text-slate-400 hover:text-white hover:bg-white/5 transition cursor-pointer flex flex-col items-center gap-2">
              <Paperclip className="w-5 h-5" />
              <span className="text-xs">Click to upload files</span>
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
