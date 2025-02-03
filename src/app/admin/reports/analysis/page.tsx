'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { PredictiveAnalysis } from '@/types/automation';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalysisPage() {
  const [analyses, setAnalyses] = useState<PredictiveAnalysis[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<PredictiveAnalysis | null>(null);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    const response = await fetch('/api/automation/reports?type=analysis');
    if (response.ok) {
      const data = await response.json();
      setAnalyses(data);
    }
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const renderRiskMatrix = (risks: PredictiveAnalysis['predictions']['potentialRisks']) => {
    return (
      <div className="mt-4">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Matrice des risques</h4>
        <div className="grid grid-cols-1 gap-4">
          {risks.map((risk, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{risk.type}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  risk.probability * risk.impact > 0.6
                    ? 'bg-red-100 text-red-800'
                    : risk.probability * risk.impact > 0.3
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  Score: {Math.round(risk.probability * risk.impact * 100)}%
                </span>
              </div>
              <div className="mt-2">
                <div className="text-sm text-gray-500">
                  Probabilité: {Math.round(risk.probability * 100)}%
                </div>
                <div className="text-sm text-gray-500">
                  Impact: {Math.round(risk.impact * 100)}%
                </div>
                {risk.mitigation && (
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Mitigation:</span> {risk.mitigation}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderResourceNeeds = (needs: PredictiveAnalysis['predictions']['resourceNeeds']) => {
    const data: ChartData<'bar'> = {
      labels: needs.map(n => n.role),
      datasets: [
        {
          label: 'Heures estimées',
          data: needs.map(n => n.hours),
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    return (
      <div className="mt-4">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Besoins en ressources</h4>
        <div className="h-64">
          <Bar
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
                title: {
                  display: true,
                  text: 'Heures estimées par rôle'
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    );
  };

  const renderHistoricalData = (data: PredictiveAnalysis['historicalData']) => {
    const chartData: ChartData<'line'> = {
      labels: ['Estimation temps', 'Budget', 'Vélocité', 'Complétion'],
      datasets: [
        {
          label: 'Métriques (%)',
          data: [
            data.timeEstimationAccuracy,
            data.budgetAdherence,
            data.teamVelocity,
            data.taskCompletionRate,
          ],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
        },
      ],
    };

    return (
      <div className="mt-4">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Données historiques</h4>
        <div className="h-64">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                },
              },
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Analyses prédictives
          </h1>
        </div>

        {/* Liste des analyses */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {analyses.map((analysis) => (
            <div
              key={analysis.id}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => setSelectedAnalysis(analysis)}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      analysis.predictions.riskLevel === 'high'
                        ? 'bg-red-100 text-red-800'
                        : analysis.predictions.riskLevel === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {analysis.predictions.riskLevel.toUpperCase()}
                    </span>
                    <p className="mt-2 text-sm text-gray-500">
                      Créé le {format(new Date(analysis.createdAt), 'dd MMM yyyy', { locale: fr })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      Confiance
                    </p>
                    <p className="text-2xl font-semibold text-blue-600">
                      {Math.round(analysis.predictions.confidence)}%
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Date de fin estimée
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    {format(new Date(analysis.predictions.completionDate), 'dd MMM yyyy', { locale: fr })}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Budget prévu
                  </p>
                  <p className="text-lg font-medium text-gray-900">
                    {formatMoney(analysis.predictions.budgetForecast.expected)}
                  </p>
                  <p className="text-sm text-gray-500">
                    ({formatMoney(analysis.predictions.budgetForecast.bestCase)} - {formatMoney(analysis.predictions.budgetForecast.worstCase)})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Détails de l'analyse */}
        {selectedAnalysis && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl p-6 m-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-medium text-gray-900">
                    Analyse détaillée
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Créée le {format(new Date(selectedAnalysis.createdAt), 'dd MMM yyyy', { locale: fr })}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedAnalysis(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Fermer</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 space-y-8">
                {/* Matrice des risques */}
                {renderRiskMatrix(selectedAnalysis.predictions.potentialRisks)}

                {/* Besoins en ressources */}
                {renderResourceNeeds(selectedAnalysis.predictions.resourceNeeds)}

                {/* Données historiques */}
                {renderHistoricalData(selectedAnalysis.historicalData)}

                {/* Recommandations */}
                <div className="mt-4">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Recommandations</h4>
                  <div className="space-y-4">
                    {selectedAnalysis.recommendations.map((rec, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{rec.type}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            rec.priority === 'high'
                              ? 'bg-red-100 text-red-800'
                              : rec.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {rec.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">{rec.description}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          Impact potentiel: {Math.round(rec.potentialImpact * 100)}%
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
