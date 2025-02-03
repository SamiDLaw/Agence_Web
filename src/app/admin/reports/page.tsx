'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Report, ProjectMetrics, TeamMetrics, FinancialMetrics } from '@/types/report';
import { ProjectCharts } from '@/components/charts/ProjectCharts';
import { exportToPDF, exportToExcel } from '@/utils/exportReports';

export default function ReportsPage() {
  const [reports] = useState<Report[]>([
    {
      id: '1',
      type: 'project',
      title: 'Rapport mensuel des projets',
      description: 'Rapport détaillé des activités et performances des projets',
      dateRange: {
        start: '2025-01-01',
        end: '2025-01-31'
      },
      metrics: {
        projects: [{
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
        }],
        team: [],
        financial: []
      },
      createdAt: new Date().toISOString(),
      createdBy: 'system',
      lastUpdated: new Date().toISOString(),
      filters: {
        projects: ['1'],
        team: ['1', '2'],
        categories: ['development', 'design']
      }
    }
  ]);

  const [activeReport, setActiveReport] = useState<Report | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: format(new Date(), 'yyyy-MM-dd'),
    end: format(new Date(), 'yyyy-MM-dd')
  });

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins.toString().padStart(2, '0')}`;
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const renderProjectMetrics = (metrics: ProjectMetrics) => (
    <div className="space-y-6">
      {/* Vue d'ensemble */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Tâches complétées
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {metrics.completedTasks}/{metrics.totalTasks}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Temps total
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {formatDuration(metrics.totalTimeSpent)}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Budget
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {formatMoney(metrics.budget)}
            </dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Progression
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {Math.round((metrics.completedTasks / metrics.totalTasks) * 100)}%
            </dd>
          </div>
        </div>
      </div>

      {/* Répartition du temps */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">
            Répartition du temps par type
          </h3>
          <div className="mt-4">
            {Object.entries(metrics.timeSpentByType).map(([type, time]) => (
              <div key={type} className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {formatDuration(time)}
                  </div>
                </div>
                <div className="mt-2 relative">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                    <div
                      style={{
                        width: `${(time / metrics.totalTimeSpent) * 100}%`
                      }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance de l'équipe */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium text-gray-900">
            Performance de l'équipe
          </h3>
          <div className="mt-4">
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Membre
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tâches complétées
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Temps passé
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {metrics.teamPerformance.map((member) => (
                          <tr key={member.userId}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {member.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {member.tasksCompleted}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {formatDuration(member.timeSpent)}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Rapports</h1>
            <button
              onClick={() => setShowReportForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Nouveau rapport
            </button>
          </div>
        </div>

        {/* Liste des rapports */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {reports.map((report) => (
              <li key={report.id}>
                <div
                  onClick={() => setActiveReport(report)}
                  className="block hover:bg-gray-50"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {report.title}
                        </p>
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {report.type}
                        </span>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="text-sm text-gray-500">
                          {format(new Date(report.createdAt), 'dd MMM yyyy', { locale: fr })}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {format(new Date(report.dateRange.start), 'dd MMM yyyy', { locale: fr })}
                          {' → '}
                          {format(new Date(report.dateRange.end), 'dd MMM yyyy', { locale: fr })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Détails du rapport */}
        {activeReport && (
          <div className="mt-6">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-medium text-gray-900">
                    {activeReport.title}
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => exportToPDF(activeReport)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Exporter PDF
                    </button>
                    <button
                      onClick={() => exportToExcel(activeReport)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Exporter Excel
                    </button>
                    <button
                      onClick={() => setActiveReport(null)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Fermer</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {activeReport.metrics.projects?.map((metrics, index) => (
                  <div key={index} className="space-y-6">
                    {/* Graphiques */}
                    <ProjectCharts metrics={metrics} />
                    
                    {/* Métriques détaillées */}
                    {renderProjectMetrics(metrics)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Formulaire nouveau rapport */}
        {showReportForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Nouveau rapport
                </h2>
                <button
                  onClick={() => setShowReportForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Titre
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    id="type"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="project">Projet</option>
                    <option value="team">Équipe</option>
                    <option value="financial">Financier</option>
                    <option value="custom">Personnalisé</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                      Date de début
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                      Date de fin
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowReportForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Générer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
