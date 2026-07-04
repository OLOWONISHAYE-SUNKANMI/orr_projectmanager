"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, MoreHorizontal, Calendar, MessageSquare, Paperclip, CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Modal } from "@/components/ui/Modal";
import { useToastStore } from "@/store/toastStore";
import { useMeetingStore } from "@/store/meetingStore";

// Mock Data
const initialColumns = ["Backlog", "To Do", "In Progress", "Review", "Completed"];
const initialTasks = [
  { id: "task-1", column: "To Do", title: "Setup Project Infrastructure", priority: "High", comments: 2, attachments: 1, dueDate: "Jun 22" },
  { id: "task-2", column: "In Progress", title: "Design Review Meetings", priority: "Medium", comments: 5, attachments: 0, dueDate: "Jun 20" },
  { id: "task-3", column: "Review", title: "Client Onboarding Docs", priority: "Low", comments: 1, attachments: 3, dueDate: "Jun 19" },
  { id: "task-4", column: "Backlog", title: "Future Integration Scope", priority: "Medium", comments: 0, attachments: 0, dueDate: "Jul 05" },
];

function SortableTaskItem({ task }: { task: any }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColor = 
    task.priority === "High" ? "text-red-400 bg-red-400/10 border-red-500/20" : 
    task.priority === "Medium" ? "text-amber-400 bg-amber-400/10 border-amber-500/20" : 
    "text-blue-400 bg-blue-400/10 border-blue-500/20";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 rounded-2xl bg-card border border-white/5 hover:border-white/20 transition-all cursor-grab active:cursor-grabbing mb-3 group relative z-10"
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[9px] font-mono font-black border px-2 py-0.5 rounded uppercase tracking-wide ${priorityColor}`}>
          {task.priority}
        </span>
        <button className="text-slate-400 hover:text-white"><MoreHorizontal className="w-4 h-4" /></button>
      </div>
      <h4 className="text-sm font-extrabold text-white mb-3 group-hover:text-primary transition-colors">{task.title}</h4>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          {task.comments > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{task.comments}</span>
            </div>
          )}
          {task.attachments > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip className="w-3.5 h-3.5" />
              <span>{task.attachments}</span>
            </div>
          )}
        </div>
        {task.dueDate && (
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{task.dueDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function MeetingRequestCard({ request, onApprove, onReject, t, addToast }: any) {
  return (
    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 mb-3 group relative overflow-hidden shrink-0 shadow-lg shadow-purple-500/5 transition-transform hover:-translate-y-1">
      <div className="absolute top-2 right-2 flex gap-1 z-20">
        <button onClick={() => { onApprove(request.id); addToast('Meeting Approved', 'success'); }} className="p-1.5 text-green-400 hover:bg-green-400/20 rounded-lg transition-colors tooltip-trigger" title={t('pmDashboard.tasks.approveMeeting')}>
          <CheckCircle className="w-4 h-4" />
        </button>
        <button onClick={() => { onReject(request.id); addToast('Meeting Rejected', 'error'); }} className="p-1.5 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors tooltip-trigger" title={t('pmDashboard.tasks.rejectMeeting')}>
          <XCircle className="w-4 h-4" />
        </button>
      </div>
      <div className="flex justify-between items-start mb-2 pr-12 relative z-10">
        <span className="text-[9px] font-mono font-black border px-2 py-0.5 rounded uppercase tracking-wide text-purple-400 bg-purple-400/10 border-purple-500/20">
          {t('pmDashboard.tasks.meetingRequest')}
        </span>
      </div>
      <h4 className="text-sm font-extrabold text-white mb-1 group-hover:text-purple-300 transition-colors relative z-10">{request.subject}</h4>
      <p className="text-xs text-purple-300/70 mb-3 font-medium relative z-10">Req by: {request.name}</p>
      <div className="flex items-center justify-between text-xs text-purple-200/50 relative z-10">
        <div className="flex items-center gap-1 font-mono">
          <Calendar className="w-3.5 h-3.5 text-purple-400/70" />
          <span>{request.date} @ {request.time}</span>
        </div>
      </div>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500/20 blur-2xl rounded-full z-0 pointer-events-none" />
    </div>
  );
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { t } = useTranslation();
  const addToast = useToastStore(state => state.addToast);
  
  const meetingRequests = useMeetingStore(state => state.meetingRequests);
  const approveRequest = useMeetingStore(state => state.approveRequest);
  const rejectRequest = useMeetingStore(state => state.rejectRequest);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    const activeTask = tasks.find(t => t.id === active.id);
    const overId = over.id as string;

    if (!activeTask) return;

    // Is the drop target a column?
    const isOverColumn = initialColumns.includes(overId);
    
    setTasks((prevTasks) => {
      const activeIndex = prevTasks.findIndex(t => t.id === active.id);
      
      if (isOverColumn) {
        // Dropped directly onto a column empty space
        if (activeTask.column !== overId) {
          const updatedTasks = [...prevTasks];
          updatedTasks[activeIndex].column = overId;
          return updatedTasks;
        }
        return prevTasks;
      } else {
        // Dropped over another task
        const overIndex = prevTasks.findIndex(t => t.id === overId);
        if (overIndex >= 0) {
          const overTask = prevTasks[overIndex];
          if (activeTask.column !== overTask.column) {
            // Moved to a different column
            const updatedTasks = [...prevTasks];
            updatedTasks[activeIndex].column = overTask.column;
            return arrayMove(updatedTasks, activeIndex, overIndex);
          } else {
            // Reordering within the same column
            return arrayMove(prevTasks, activeIndex, overIndex);
          }
        }
      }
      return prevTasks;
    });
  };

  const activeTask = activeId ? tasks.find(t => t.id === activeId) : null;

  if (!isMounted) return null;

  return (
    <div className="h-full flex flex-col space-y-8 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white">{t('pmDashboard.tasks.title')}</h1>
          <p className="text-secondary mt-1">{t('pmDashboard.tasks.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-primary hover:bg-lemon text-background rounded-xl transition-colors font-black text-xs shadow-lg shadow-primary/10 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t('pmDashboard.tasks.addTask')}
        </button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 h-full min-w-max">
            {initialColumns.map((col) => {
              const columnTasks = tasks.filter(t => t.column === col);
              return (
                <div key={col} className="w-80 flex flex-col bg-surface/50 border border-white/5 rounded-2xl h-full max-h-[calc(100vh-200px)]">
                  <div className="p-4 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                      {col === 'Backlog' ? t('pmDashboard.tasks.backlog') : 
                       col === 'In Progress' ? t('pmDashboard.tasks.inProgress') : 
                       col === 'Review' ? t('pmDashboard.tasks.inReview') : 
                       col === 'Completed' ? t('pmDashboard.tasks.done') : col}
                      <span className="text-[9px] font-mono font-black text-slate-300 bg-slate-800 border border-white/5 px-2 py-0.5 rounded">
                        {columnTasks.length + (col === 'Review' ? meetingRequests.length : 0)}
                      </span>
                    </h3>
                    <button className="text-slate-400 hover:text-white transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex-1 p-3 overflow-y-auto custom-scrollbar flex flex-col">
                    {col === 'Review' && meetingRequests.length > 0 && (
                      <div className="mb-2">
                        {meetingRequests.map(mr => (
                          <MeetingRequestCard 
                            key={mr.id} 
                            request={mr} 
                            onApprove={approveRequest} 
                            onReject={rejectRequest} 
                            t={t} 
                            addToast={addToast} 
                          />
                        ))}
                      </div>
                    )}
                    <SortableContext id={col} items={columnTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                      <div className="min-h-[150px] flex-1">
                        {columnTasks.map((task) => (
                          <SortableTaskItem key={task.id} task={task} />
                        ))}
                      </div>
                    </SortableContext>
                  </div>
                </div>
              );
            })}
          </div>

          <DragOverlay>
            {activeTask ? <SortableTaskItem task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('pmDashboard.tasks.modal.title')}>
        <form onSubmit={(e) => {
          e.preventDefault();
          addToast(t('pmDashboard.tasks.modal.successToast'), 'success');
          setIsModalOpen(false);
        }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.tasks.modal.taskTitle')}</label>
            <input required type="text" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Implement API endpoint" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.tasks.modal.assignee')}</label>
            <input required type="text" className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Sarah Jenkins" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t('pmDashboard.tasks.modal.priorityLabel')}</label>
            <select className="w-full bg-input-bg border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-colors">
              {t('pmDashboard.tasks.modal.cancel')}
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-primary hover:bg-lemon text-background rounded-xl text-sm font-black transition-colors shadow-lg shadow-primary/20">
              {t('pmDashboard.tasks.modal.submit')}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
