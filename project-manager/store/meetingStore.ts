import { create } from 'zustand';
import { Meeting } from '@/types/meetings';

interface MeetingState {
  meetings: Meeting[];
  meetingRequests: Meeting[];
  addMeeting: (meeting: Meeting) => void;
  addMeetingRequest: (request: Meeting) => void;
  approveRequest: (id: string) => void;
  rejectRequest: (id: string) => void;
}

// Initial mock data
const initialMeetings: Meeting[] = [
  {
    id: "m-1",
    subject: "Alpha Kickoff Meeting",
    name: "John Doe",
    date: "2026-06-25",
    time: "10:00 AM - 11:30 AM",
    attendees: "5",
    notes: "Initial kickoff with stakeholders",
    attachments: 0,
    project: "Alpha Migration",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/20",
    status: 'approved'
  },
  {
    id: "m-2",
    subject: "Weekly Sync: Beta Team",
    name: "Jane Smith",
    date: "2026-06-26",
    time: "1:00 PM - 2:00 PM",
    attendees: "3",
    notes: "Review progress on beta integration",
    attachments: 1,
    project: "Beta Integration",
    color: "bg-green-500/20 text-green-400 border-green-500/20",
    status: 'approved'
  }
];

const initialMeetingRequests: Meeting[] = [
  {
    id: "mr-1",
    subject: "Client Roadmap Discussion",
    name: "Pawlu (Client)",
    date: "2026-07-02",
    time: "3:00 PM - 4:00 PM",
    attendees: "4",
    notes: "Discuss Q4 roadmap",
    attachments: 2,
    project: "Delta Audit",
    status: 'pending'
  }
];

export const useMeetingStore = create<MeetingState>((set) => ({
  meetings: initialMeetings,
  meetingRequests: initialMeetingRequests,
  
  addMeeting: (meeting) => set((state) => ({ 
    meetings: [...state.meetings, { ...meeting, status: 'approved' }] 
  })),
  
  addMeetingRequest: (request) => set((state) => ({ 
    meetingRequests: [...state.meetingRequests, { ...request, status: 'pending' }] 
  })),
  
  approveRequest: (id) => set((state) => {
    const request = state.meetingRequests.find(r => r.id === id);
    if (!request) return state;
    
    return {
      meetingRequests: state.meetingRequests.filter(r => r.id !== id),
      meetings: [...state.meetings, { 
        ...request, 
        status: 'approved',
        color: 'bg-purple-500/20 text-purple-400 border-purple-500/20' // Default color for newly approved
      }]
    };
  }),
  
  rejectRequest: (id) => set((state) => ({
    meetingRequests: state.meetingRequests.filter(r => r.id !== id)
  })),
}));
