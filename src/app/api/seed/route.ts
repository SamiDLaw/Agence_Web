import { NextResponse } from 'next/server';
import { addDays } from 'date-fns';

// Données de test pour les projets
const projects = [
  {
    id: '1',
    name: 'Site E-commerce',
    totalTasks: 24,
    completedTasks: 18,
    totalTimeSpent: 4800,
    budget: 15000,
    timeSpentByType: {
      development: 2400,
      design: 1200,
      meetings: 600,
      planning: 600
    },
    tasksByStatus: {
      completed: 18,
      in_progress: 4,
      todo: 2
    },
    teamPerformance: [
      {
        userId: '1',
        name: 'Sami',
        tasksCompleted: 10,
        timeSpent: 2400
      },
      {
        userId: '2',
        name: 'Alex',
        tasksCompleted: 8,
        timeSpent: 2400
      }
    ]
  },
  {
    id: '2',
    name: 'Application Mobile',
    totalTasks: 32,
    completedTasks: 12,
    totalTimeSpent: 3600,
    budget: 20000,
    timeSpentByType: {
      development: 2000,
      design: 800,
      meetings: 400,
      planning: 400
    },
    tasksByStatus: {
      completed: 12,
      in_progress: 8,
      todo: 12
    },
    teamPerformance: [
      {
        userId: '1',
        name: 'Sami',
        tasksCompleted: 6,
        timeSpent: 1800
      },
      {
        userId: '3',
        name: 'Marie',
        tasksCompleted: 6,
        timeSpent: 1800
      }
    ]
  }
];

// Données de test pour les rapports automatiques
const automations = [
  {
    id: '1',
    name: 'Rapport hebdomadaire des projets',
    frequency: 'weekly',
    reportTemplate: {
      type: 'project',
      title: 'État des projets - Semaine',
      dateRange: {
        start: new Date().toISOString(),
        end: addDays(new Date(), 7).toISOString()
      },
      metrics: {}
    },
    recipients: [
      {
        userId: '1',
        email: 'sami@example.com',
        name: 'Sami'
      }
    ],
    nextRun: addDays(new Date(), 7).toISOString(),
    enabled: true
  },
  {
    id: '2',
    name: 'Rapport mensuel financier',
    frequency: 'monthly',
    reportTemplate: {
      type: 'financial',
      title: 'Rapport financier mensuel',
      dateRange: {
        start: new Date().toISOString(),
        end: addDays(new Date(), 30).toISOString()
      },
      metrics: {}
    },
    recipients: [
      {
        userId: '1',
        email: 'sami@example.com',
        name: 'Sami'
      },
      {
        userId: '4',
        email: 'comptabilite@example.com',
        name: 'Comptabilité'
      }
    ],
    nextRun: addDays(new Date(), 30).toISOString(),
    enabled: true
  }
];

// Route pour initialiser les données de test
export async function GET() {
  try {
    // Créer les rapports automatiques
    await fetch('/api/automation/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(automations[0])
    });
    await fetch('/api/automation/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(automations[1])
    });

    // Créer les analyses prédictives pour chaque projet
    for (const project of projects) {
      await fetch('/api/automation/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'analysis',
          projectId: project.id,
          predictions: {
            completionDate: addDays(new Date(), 30).toISOString(),
            confidence: 75,
            riskLevel: project.completedTasks / project.totalTasks < 0.5 ? 'high' : 'medium',
            budgetForecast: {
              expected: project.budget,
              bestCase: project.budget * 0.9,
              worstCase: project.budget * 1.2
            },
            resourceNeeds: Object.entries(project.timeSpentByType).map(([role, hours]) => ({
              role,
              hours: Math.ceil(hours / 60)
            })),
            potentialRisks: [
              {
                type: 'Retard potentiel',
                probability: 0.7,
                impact: 0.8,
                mitigation: 'Augmenter les ressources ou ajuster le planning'
              },
              {
                type: 'Dépassement de budget',
                probability: 0.5,
                impact: 0.9,
                mitigation: 'Réviser l'allocation des ressources'
              }
            ]
          },
          historicalData: {
            timeEstimationAccuracy: 85,
            budgetAdherence: 95,
            teamVelocity: project.completedTasks / (project.totalTimeSpent / (8 * 60)),
            taskCompletionRate: (project.completedTasks / project.totalTasks) * 100
          },
          recommendations: [
            {
              type: 'Performance',
              description: 'Augmenter la vélocité de l'équipe',
              priority: 'high',
              potentialImpact: 0.8
            },
            {
              type: 'Budget',
              description: 'Optimiser l'allocation des ressources',
              priority: 'medium',
              potentialImpact: 0.6
            }
          ]
        })
      });
    }

    return NextResponse.json({ success: true, message: 'Données de test créées avec succès' });
  } catch (error) {
    console.error('Erreur lors de la création des données de test:', error);
    return NextResponse.json({ success: false, error: 'Erreur lors de la création des données de test' }, { status: 500 });
  }
}
