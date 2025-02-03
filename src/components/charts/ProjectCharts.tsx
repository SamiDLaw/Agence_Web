import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import type { ProjectMetrics } from '@/types/report';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ProjectChartsProps {
  metrics: ProjectMetrics;
}

const commonOptions: ChartOptions<any> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

export function ProjectCharts({ metrics }: ProjectChartsProps) {
  // Données pour le graphique en beignet de la répartition du temps
  const timeDistributionData: ChartData<'doughnut'> = {
    labels: Object.keys(metrics.timeSpentByType).map(
      type => type.charAt(0).toUpperCase() + type.slice(1)
    ),
    datasets: [
      {
        data: Object.values(metrics.timeSpentByType),
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Données pour le graphique en barres des tâches par statut
  const taskStatusData: ChartData<'bar'> = {
    labels: Object.keys(metrics.tasksByStatus).map(
      status => status.charAt(0).toUpperCase() + status.slice(1)
    ),
    datasets: [
      {
        label: 'Nombre de tâches',
        data: Object.values(metrics.tasksByStatus),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Données pour le graphique en ligne de la performance de l'équipe
  const teamPerformanceData: ChartData<'line'> = {
    labels: metrics.teamPerformance.map(member => member.name),
    datasets: [
      {
        label: 'Tâches complétées',
        data: metrics.teamPerformance.map(member => member.tasksCompleted),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Temps passé (heures)',
        data: metrics.teamPerformance.map(member => member.timeSpent / 60),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Répartition du temps */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Répartition du temps
        </h3>
        <div className="aspect-square">
          <Doughnut
            data={timeDistributionData}
            options={{
              ...commonOptions,
              plugins: {
                ...commonOptions.plugins,
                title: {
                  display: true,
                  text: 'Répartition du temps par type'
                }
              }
            }}
          />
        </div>
      </div>

      {/* Tâches par statut */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Tâches par statut
        </h3>
        <Bar
          data={taskStatusData}
          options={{
            ...commonOptions,
            plugins: {
              ...commonOptions.plugins,
              title: {
                display: true,
                text: 'Distribution des tâches par statut'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            }
          }}
        />
      </div>

      {/* Performance de l'équipe */}
      <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Performance de l'équipe
        </h3>
        <Line
          data={teamPerformanceData}
          options={{
            ...commonOptions,
            plugins: {
              ...commonOptions.plugins,
              title: {
                display: true,
                text: 'Performance par membre'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
}
