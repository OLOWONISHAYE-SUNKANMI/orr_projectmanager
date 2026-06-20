"use client";

import React, { useState } from "react";
import { Search, Send, Paperclip, MoreVertical, CheckCheck, Plus } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Modal } from "@/components/ui/Modal";
import { useToastStore } from "@/store/toastStore";

export default function MessagesPage() {
  const [activeContact, setActiveContact] = useState(1);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { t } = useTranslation();
  const addToast = useToastStore(state => state.addToast);

  const contacts = [
    { id: 1, name: "Consultant Sarah", role: "Frontend Dev", project: "Alpha Migration", unread: 2, online: true, time: "10:30 AM" },
    { id: 2, name: "Client: Stark Industries", role: "Stakeholders", project: "Delta Audit", unread: 0, online: false, time: "Yesterday" },
    { id: 3, name: "Admin Team", role: "Internal", project: "General", unread: 0, online: true, time: "Monday" },
  ];

  const mockChat = [
    { id: 1, sender: "Consultant Sarah", time: "10:15 AM", text: "I've uploaded the new designs for the dashboard.", isMe: false },
    { id: 2, sender: "Consultant Sarah", time: "10:16 AM", text: "Can you review them when you have a moment?", isMe: false },
    { id: 3, sender: "You", time: "10:20 AM", text: "Thanks Sarah, I will take a look after my 11AM meeting.", isMe: true },
    { id: 4, sender: "Consultant Sarah", time: "10:30 AM", text: "Perfect, let me know if you need any changes.", isMe: false },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    // mock send
    setMessage("");
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">{t('pmDashboard.messages.title')}</h1>
          <p className="text-secondary mt-1">{t('pmDashboard.messages.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary hover:bg-lemon text-background rounded-xl transition-colors font-black text-xs shadow-lg shadow-primary/10 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t('pmDashboard.messages.newMessage')}
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden rounded-2xl border border-white/5 bg-card">
        {/* Contacts Sidebar */}
        <div className="w-80 border-r border-white/5 flex flex-col bg-card/30">
          <div className="p-4 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={t('pmDashboard.messages.searchPlaceholder')} 
                className="w-full bg-input-bg border border-white/5 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {contacts.map(contact => (
              <div 
                key={contact.id}
                onClick={() => setActiveContact(contact.id)}
                className={`p-4 border-b border-white/5 cursor-pointer transition-colors flex gap-3 ${activeContact === contact.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
              >
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                    {contact.name.charAt(0)}
                  </div>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-surface rounded-full" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className="text-sm font-extrabold text-white truncate">{contact.name}</h4>
                    <span className="text-[9px] font-mono font-black uppercase tracking-wide text-slate-500 shrink-0">{contact.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-400 truncate">{contact.project}</p>
                    {contact.unread > 0 && (
                      <span className="w-4 h-4 bg-primary rounded-full text-background text-[10px] flex items-center justify-center font-bold shrink-0">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 border-b border-white/5 flex justify-between items-center px-6 shrink-0 bg-card/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                C
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">Consultant Sarah</h3>
                <p className="text-xs text-primary">{t('pmDashboard.messages.online')} • Alpha Migration</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="text-center text-[10px] font-black uppercase tracking-wider font-mono text-slate-500 my-4">Today</div>
            
            {mockChat.map((msg, i) => (
              <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                <div className="flex items-end gap-2 max-w-[70%]">
                  {!msg.isMe && i === 0 && (
                    <div className="w-6 h-6 rounded-full bg-primary/20 shrink-0 mb-1" />
                  )}
                  {!msg.isMe && i !== 0 && <div className="w-6 shrink-0" />}
                  
                  <div className={`p-3 rounded-2xl ${
                    msg.isMe 
                      ? 'bg-primary text-background rounded-tr-sm' 
                      : 'bg-white/10 text-white rounded-tl-sm border border-white/5'
                  }`}>
                    <p className="text-xs font-semibold">{msg.text}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1 px-8 text-[9px] font-mono font-black uppercase tracking-wide text-slate-500">
                  <span>{msg.time}</span>
                  {msg.isMe && <CheckCheck className="w-3 h-3 text-primary" />}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5 bg-card/30 shrink-0">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <button type="button" className="p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('pmDashboard.messages.typeMessage')}
                className="flex-1 bg-input-bg border border-white/5 rounded-xl px-4 text-white focus:outline-none focus:border-primary transition-colors"
              />
              <button 
                type="submit"
                disabled={!message.trim()}
                className="p-3 bg-primary text-background rounded-xl hover:bg-lemon transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('pmDashboard.messages.modal.title')}>
        <form onSubmit={(e) => {
          e.preventDefault();
          addToast(t('pmDashboard.messages.modal.successToast'), 'success');
          setIsModalOpen(false);
        }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.messages.modal.selectContact')}</label>
            <select className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">-- Select Contact --</option>
              {contacts.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.messages.modal.messageLabel')}</label>
            <textarea 
              required
              rows={4}
              className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary custom-scrollbar" 
              placeholder={t('pmDashboard.messages.typeMessage')} 
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-colors">
              {t('pmDashboard.messages.modal.cancel')}
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-primary hover:bg-lemon text-background rounded-xl text-sm font-black transition-colors shadow-lg shadow-primary/20">
              {t('pmDashboard.messages.modal.submit')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
