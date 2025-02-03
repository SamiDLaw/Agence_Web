import type { Report } from './report';

export type AutomationFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly';

export interface ReportAutomation {
  id: string;
  name: string;
  description?: string;
  frequency: AutomationFrequency;
  reportTemplate: Omit<Report, 'id' | 'createdAt' | 'lastUpdated'>;
  recipients: {
    userId: string;
    email: string;
    name: string;
  }[];
  lastRun?: string;
  nextRun: string;
  enabled: boolean;
  filters?: {
    projects?: string[];
    team?: string[];
    categories?: string[];
  };
}

export interface PredictiveAnalysis {
  id: string;
  projectId: string;
  createdAt: string;
  predictions: {
    completionDate: string;
    confidence: number;
    riskLevel: 'low' | 'medium' | 'high';
    budgetForecast: {
      expected: number;
      bestCase: number;
      worstCase: number;
    };
    resourceNeeds: {
      role: string;
      hours: number;
    }[];
    potentialRisks: {
      type: string;
      probability: number;
      impact: number;
      mitigation?: string;
    }[];
  };
  historicalData: {
    timeEstimationAccuracy: number;
    budgetAdherence: number;
    teamVelocity: number;
    taskCompletionRate: number;
  };
  recommendations: {
    type: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    potentialImpact: number;
  }[];
}
