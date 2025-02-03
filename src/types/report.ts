export interface TimeEntry {
  id: string;
  userId: string;
  projectId: string;
  taskId?: string;
  duration: number; // en minutes
  date: string;
  description?: string;
}

export interface ProjectMetrics {
  totalTasks: number;
  completedTasks: number;
  totalTimeSpent: number; // en minutes
  budget: number;
  timeSpentByType: Record<string, number>;
  tasksByStatus: Record<string, number>;
  teamPerformance: {
    userId: string;
    name: string;
    tasksCompleted: number;
    timeSpent: number;
  }[];
}

export interface TeamMetrics {
  userId: string;
  name: string;
  role: string;
  projectsCount: number;
  tasksCount: number;
  completedTasks: number;
  totalTimeSpent: number;
  efficiency: number; // temps moyen par tâche
  currentWorkload: number; // tâches actives
}

export interface FinancialMetrics {
  projectId: string;
  budget: number;
  costs: number;
  revenue: number;
  profitMargin: number;
  hourlyRate: number;
  timeSpentCost: number;
  additionalCosts: {
    category: string;
    amount: number;
  }[];
}

export interface Report {
  id: string;
  type: 'project' | 'team' | 'financial' | 'custom';
  title: string;
  description?: string;
  dateRange: {
    start: string;
    end: string;
  };
  metrics: {
    projects?: ProjectMetrics[];
    team?: TeamMetrics[];
    financial?: FinancialMetrics[];
  };
  createdAt: string;
  createdBy: string;
  lastUpdated: string;
  filters?: {
    projects?: string[];
    team?: string[];
    categories?: string[];
  };
}
