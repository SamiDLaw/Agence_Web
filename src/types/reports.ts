export interface ProjectMetrics {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
}

export interface TeamMetrics {
  totalMembers: number;
  activeMembers: number;
  totalTimeSpent: number;
}

export interface FinancialMetrics {
  totalBudget: number;
  totalRevenue: number;
  totalExpenses: number;
}

export interface ReportMetrics {
  projects: ProjectMetrics;
  team?: TeamMetrics;
  financial?: FinancialMetrics;
}

export interface Project {
  id: string;
  name: string;
  status: string;
  budget: number;
  timeSpent: number;
}

export interface Report {
  id: string;
  title: string;
  metrics: ReportMetrics;
  projects: Project[];
  createdAt: Date;
  updatedAt: Date;
}
