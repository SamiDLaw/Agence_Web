import type { ProjectMetrics } from '@/types/report';
import type { PredictiveAnalysis } from '@/types/automation';

// Calcul de la date de fin prévue
function predictCompletionDate(metrics: ProjectMetrics): { date: Date; confidence: number } {
  const tasksRemaining = metrics.totalTasks - metrics.completedTasks;
  const avgTaskCompletionTime = metrics.totalTimeSpent / metrics.completedTasks;
  const estimatedRemainingTime = tasksRemaining * avgTaskCompletionTime;
  
  const now = new Date();
  const completionDate = new Date(now.getTime() + estimatedRemainingTime * 60 * 1000);
  
  // Calcul de la confiance basé sur la variance historique
  const confidence = Math.min(
    (metrics.completedTasks / metrics.totalTasks) * 100,
    85 // Plafond de confiance à 85%
  );
  
  return { date: completionDate, confidence };
}

// Analyse des risques potentiels
function analyzeRisks(metrics: ProjectMetrics): PredictiveAnalysis['predictions']['potentialRisks'] {
  const risks = [];
  
  // Risque de dépassement de délai
  const completionRate = metrics.completedTasks / metrics.totalTasks;
  if (completionRate < 0.3) {
    risks.push({
      type: "Dépassement de délai",
      probability: 0.7,
      impact: 0.8,
      mitigation: "Augmenter les ressources ou ajuster le planning"
    });
    risks.push({
      type: "Dépassement de délai",
      probability: 0.6,
      impact: 0.9,
      mitigation: "Réviser l'allocation des ressources et optimiser les coûts"
    });
  }
  
  // Risque de dépassement de budget
  const avgCostPerTask = metrics.budget / metrics.totalTasks;
  const estimatedFinalCost = avgCostPerTask * metrics.totalTasks;
  if (estimatedFinalCost > metrics.budget) {
    risks.push({
      type: "Dépassement de budget",
      probability: 0.6,
      impact: 0.9,
      mitigation: "Réviser l'allocation des ressources et optimiser les coûts"
    });
  }
  
  // Risque de qualité
  const taskCompletionSpeed = metrics.totalTimeSpent / metrics.completedTasks;
  if (taskCompletionSpeed < 120) { // moins de 2h par tâche
    risks.push({
      type: "Risque de qualité",
      probability: 0.5,
      impact: 0.7,
      mitigation: "Renforcer les revues de code et les tests"
    });
  }
  
  return risks;
}

// Prévision des besoins en ressources
function predictResourceNeeds(metrics: ProjectMetrics): PredictiveAnalysis['predictions']['resourceNeeds'] {
  const resourceNeeds = [];
  const timePerType = metrics.timeSpentByType;
  
  for (const [type, time] of Object.entries(timePerType)) {
    const remainingTasks = metrics.totalTasks - metrics.completedTasks;
    const avgTimePerTask = time / metrics.completedTasks;
    const estimatedHours = (remainingTasks * avgTimePerTask) / 60;
    
    resourceNeeds.push({
      role: type,
      hours: Math.ceil(estimatedHours)
    });
  }
  
  return resourceNeeds;
}

// Génération des recommandations
function generateRecommendations(metrics: ProjectMetrics, risks: PredictiveAnalysis['predictions']['potentialRisks']): PredictiveAnalysis['recommendations'] {
  const recommendations = [];
  
  // Recommandations basées sur la performance
  const completionRate = metrics.completedTasks / metrics.totalTasks;
  if (completionRate < 0.3) {
    recommendations.push({
      type: "Performance",
      description: "Augmenter la vélocité de l'équipe en ajoutant des ressources ou en optimisant les processus",
      priority: "high",
      potentialImpact: 0.8
    });
  }
  
  // Recommandations basées sur le budget
  const avgCostPerTask = metrics.budget / metrics.totalTasks;
  const estimatedFinalCost = avgCostPerTask * metrics.totalTasks;
  if (estimatedFinalCost > metrics.budget) {
    recommendations.push({
      type: "Budget",
      description: "Optimiser l'allocation des ressources et revoir les estimations des tâches restantes",
      priority: "high",
      potentialImpact: 0.9
    });
  }
  
  // Recommandations basées sur la qualité
  const taskCompletionSpeed = metrics.totalTimeSpent / metrics.completedTasks;
  if (taskCompletionSpeed < 120) {
    recommendations.push({
      type: "Qualité",
      description: "Mettre en place des revues de code plus strictes et augmenter la couverture des tests",
      priority: "medium",
      potentialImpact: 0.7
    });
  }
  
  return recommendations;
}

// Analyse prédictive complète
export function generatePredictiveAnalysis(metrics: ProjectMetrics): PredictiveAnalysis {
  const { date: completionDate, confidence } = predictCompletionDate(metrics);
  const potentialRisks = analyzeRisks(metrics);
  const resourceNeeds = predictResourceNeeds(metrics);
  const recommendations = generateRecommendations(metrics, potentialRisks);
  
  const riskLevel = potentialRisks.length > 2 ? "high" : potentialRisks.length > 0 ? "medium" : "low";
  
  const avgCostPerTask = metrics.budget / metrics.totalTasks;
  const budgetForecast = {
    expected: avgCostPerTask * metrics.totalTasks,
    bestCase: avgCostPerTask * metrics.totalTasks * 0.9,
    worstCase: avgCostPerTask * metrics.totalTasks * 1.2
  };
  
  return {
    id: "", // sera défini par l'API
    projectId: "", // sera défini par l'appelant
    createdAt: new Date().toISOString(),
    predictions: {
      completionDate: completionDate.toISOString(),
      confidence,
      riskLevel,
      budgetForecast,
      resourceNeeds,
      potentialRisks
    },
    historicalData: {
      timeEstimationAccuracy: (metrics.completedTasks / metrics.totalTasks) * 100,
      budgetAdherence: (metrics.budget / budgetForecast.expected) * 100,
      teamVelocity: metrics.completedTasks / (metrics.totalTimeSpent / (8 * 60)), // tâches par jour
      taskCompletionRate: (metrics.completedTasks / metrics.totalTasks) * 100
    },
    recommendations
  };
}

import { Project } from '@/types/reports';

interface Risk {
  type: string;
  probability: number;
  impact: number;
  mitigation: string;
}

export function analyzeProjectRisks(project: Project): Risk[] {
  const risks: Risk[] = [];

  // Analyse du budget
  if (project.budget > 10000) {
    risks.push({
      type: "Budget élevé",
      probability: 0.7,
      impact: 0.8,
      mitigation: "Mettre en place un suivi budgétaire rigoureux"
    });
  }

  // Analyse du temps passé
  if (project.timeSpent > 100) {
    risks.push({
      type: "Durée prolongée",
      probability: 0.6,
      impact: 0.7,
      mitigation: "Optimiser la gestion du temps et revoir les priorités"
    });
  }

  // Analyse du statut
  if (project.status === "En retard") {
    risks.push({
      type: "Retard de livraison",
      probability: 0.8,
      impact: 0.9,
      mitigation: "Accélérer le développement ou ajuster les délais"
    });
  }

  // Analyse des ressources
  if (project.timeSpent > project.budget / 100) {
    risks.push({
      type: "Dépassement de ressources",
      probability: 0.6,
      impact: 0.9,
      mitigation: "Réviser l'allocation des ressources et optimiser les coûts"
    });
  }

  return risks;
}
