export type SenderRole = 'consultant' | 'administrator' | 'client';

export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected' | 'Revision Requested';

export interface Reminder {
  id: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface ApprovalRequest {
  id: string;
  title: string;
  project: string;
  senderRole: SenderRole;
  submittedBy: string;
  submittedAt: string;
  deadline: string;
  status: ApprovalStatus;
  version: string;
  comments: number;
  reminders: Reminder[];
}
