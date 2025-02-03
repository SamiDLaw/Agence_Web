export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  type: 'project' | 'task' | 'meeting' | 'deadline';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  projectId?: string;
  taskId?: string;
  participants?: {
    id: string;
    name: string;
    role: string;
  }[];
  location?: string;
  color?: string;
  reminders?: {
    id: string;
    time: string;
    type: 'email' | 'notification';
    sent: boolean;
  }[];
}

export interface CalendarView {
  type: 'month' | 'week' | 'day' | 'agenda';
  date: string;
}
