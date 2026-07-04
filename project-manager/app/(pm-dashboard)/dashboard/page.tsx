"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Folder, 
  Users, 
  FileCheck, 
  Calendar, 
  MessageSquare, 
  TrendingUp,
  Activity,
  ArrowUpRight,
  CheckSquare
} from "lucide-react";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function PMDashboard() {
  const { t } = useTranslation();

  const statCards = [
    { label: t('pmDashboard.dashboard.assignedClients'), value: "8", icon: Users, color: "text-purple-400", bg: "bg-purple-400/10", link: "/clients" },
    { label: t('pmDashboard.dashboard.activeProjects'), value: "12", icon: Folder, color: "text-blue-400", bg: "bg-blue-400/10", link: "/projects" },
    { label: t('pmDashboard.dashboard.pendingApprovals'), value: "5", icon: FileCheck, color: "text-amber-400", bg: "bg-amber-400/10", link: "/approvals" },
    { label: t('pmDashboard.dashboard.openRequests'), value: "3", icon: Activity, color: "text-pink-400", bg: "bg-pink-400/10", link: "/requests" },
  ];

  const projectStatusData = [
    { name: "On Track", value: 8, color: "#0EC277" },
    { name: "At Risk", value: 3, color: "#F59E0B" },
    { name: "Delayed", value: 1, color: "#EF4444" },
  ];

  const recentActivity = [
    { id: 1, text: t('pmDashboard.dashboard.mockActivity.doc'), time: t('pmDashboard.dashboard.mockActivity.time1'), type: "doc" },
    { id: 2, text: t('pmDashboard.dashboard.mockActivity.request'), time: t('pmDashboard.dashboard.mockActivity.time2'), type: "request" },
    { id: 3, text: t('pmDashboard.dashboard.mockActivity.meeting'), time: t('pmDashboard.dashboard.mockActivity.time3'), type: "meeting" },
    { id: 4, text: t('pmDashboard.dashboard.mockActivity.task'), time: t('pmDashboard.dashboard.mockActivity.time3'), type: "task" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">{t('pmDashboard.dashboard.title')}</h1>
          <p className="text-secondary mt-1">{t('pmDashboard.dashboard.subtitle')}</p>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link key={idx} href={stat.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-card border border-white/5 relative overflow-hidden group cursor-pointer h-full flex flex-col justify-between hover:border-white/10 transition-colors"
              >
                <div className={`absolute -right-6 -bottom-6 w-16 h-16 ${stat.bg.replace('10', '5')} rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider font-mono block">{stat.label}</span>
                <h3 className="text-2xl font-black text-white mt-2">{stat.value}</h3>
                
                <div className="flex items-center gap-1.5 mt-4 text-[10px] font-bold text-slate-400 group-hover:text-white transition-colors">
                  <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                  {t('pmDashboard.dashboard.viewDetails')} <ArrowUpRight size={12} />
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Project Health Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-white/5 p-6 rounded-2xl lg:col-span-1"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              {t('pmDashboard.dashboard.projectHealth')}
            </h2>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4 text-[10px] font-black uppercase tracking-wider font-mono">
            {projectStatusData.map((status, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: status.color }} />
                <span className="text-slate-300">{status.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-white/5 p-6 rounded-2xl lg:col-span-1"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-extrabold text-white">{t('pmDashboard.dashboard.recentActivity')}</h2>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-3 items-start">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-primary shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-slate-200">{activity.text}</p>
                  <p className="text-[10px] font-mono text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/projects" className="mt-6 block text-[10px] font-black uppercase tracking-wider font-mono text-primary hover:text-lemon transition-colors">
            {t('pmDashboard.dashboard.viewAllActivity')} &rarr;
          </Link>
        </motion.div>

        {/* Quick Links / Widgets */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 lg:col-span-1"
        >
          <Link href="/calendar" className="block">
            <div className="p-5 rounded-2xl bg-card border border-white/5 flex items-center gap-4 hover:border-white/10 transition-colors">
              <div className="p-3 bg-indigo-500/10 rounded-lg">
                <Calendar className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">{t('pmDashboard.dashboard.upcomingMeetings')}</h3>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-mono font-black">{t('pmDashboard.dashboard.meetingsToday')}</p>
              </div>
            </div>
          </Link>
          
          <Link href="/messages" className="block">
            <div className="p-5 rounded-2xl bg-card border border-white/5 flex items-center gap-4 hover:border-white/10 transition-colors relative">
              <div className="p-3 bg-teal-500/10 rounded-lg">
                <MessageSquare className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">{t('pmDashboard.dashboard.unreadMessages')}</h3>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-mono font-black">{t('pmDashboard.dashboard.newMessages')}</p>
              </div>
              <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
            </div>
          </Link>

          <Link href="/tasks" className="block">
            <div className="p-5 rounded-2xl bg-card border border-white/5 flex items-center gap-4 hover:border-white/10 transition-colors">
              <div className="p-3 bg-rose-500/10 rounded-lg">
                <CheckSquare className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">{t('pmDashboard.dashboard.taskManagement')}</h3>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-mono font-black">{t('pmDashboard.dashboard.tasksPending')}</p>
              </div>
            </div>
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
