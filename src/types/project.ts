export type ProjectStatus = 'draft' | 'in_progress' | 'review' | 'completed' | 'archived';
export type ProjectPriority = 'high' | 'normal' | 'low';
export type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'review' | 'completed';
export type ServiceType = 'web_development' | 'web_design' | 'seo' | 'marketing' | 'maintenance';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedTo?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  timeSpent: number; // en minutes
  comments: Comment[];
  attachments: Attachment[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  client: Client;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate: string;
  endDate?: string;
  budget: number;
  tasks: Task[];
  services: ServiceType[];
  team: TeamMember[];
  documents: Document[];
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  projects: string[]; // IDs des projets
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'developer' | 'designer';
  skills: string[];
  avatar?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: TeamMember;
  createdAt: string;
  updatedAt?: string;
  attachments?: Attachment[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  createdAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  createdAt: string;
}

export interface ProjectStats {
  totalTasks: number;
  completedTasks: number;
  timeSpent: number;
  remainingBudget: number;
  deadlineStatus: 'on_track' | 'at_risk' | 'delayed';
}
