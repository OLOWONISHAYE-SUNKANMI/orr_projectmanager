export interface Meeting {
  id: string;
  subject: string;
  name: string;
  date: string;
  time: string;
  attendees: string;
  notes: string;
  attachments: number;
  status: 'pending' | 'approved' | 'rejected';
  project?: string;
  color?: string;
}
