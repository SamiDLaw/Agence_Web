'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { ReportAutomation, AutomationFrequency } from '@/types/automation';

interface Report {
  id: string;
  type: 'project' | 'financial' | 'performance';
  title: string;
  createdAt: string;
  createdBy: string;
  lastUpdated: string;
  dateRange: {
    start: string;
    end: string;
  };
  metrics: Record<string, any>;
}

interface AutomationRule {
  id?: string;
  name: string;
  description: string;
  frequency: AutomationFrequency;
  recipients: string[];
  enabled: boolean;
  reportTemplate: Omit<Report, 'id' | 'createdAt' | 'lastUpdated'>;
}

export default function AutomationPage() {
  const [automations, setAutomations] = useState<ReportAutomation[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Omit<ReportAutomation, 'id' | 'lastRun' | 'nextRun'>>({
    name: '',
    description: '',
    frequency: 'weekly',
    recipients: [],
    enabled: true,
    reportTemplate: {
      type: 'project',
      title: '',
      createdBy: 'system',
      dateRange: {
        start: '',
        end: ''
      },
      metrics: {}
    }
  });

  useEffect(() => {
    fetchAutomations();
  }, []);

  const fetchAutomations = async () => {
    const response = await fetch('/api/automation/reports');
    if (response.ok) {
      const data = await response.json();
      setAutomations(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/automations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          nextRun: calculateNextRun(formData.frequency)
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'automatisation');
      }

      const newAutomation = await response.json();
      setAutomations([...automations, newAutomation]);
      setShowForm(false);
      setFormData({
        name: '',
        description: '',
        frequency: 'weekly',
        recipients: [],
        enabled: true,
        reportTemplate: {
          type: 'project',
          title: '',
          createdBy: 'system',
          dateRange: {
            start: '',
            end: ''
          },
          metrics: {}
        }
      });
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const calculateNextRun = (frequency: AutomationFrequency): string => {
    const now = new Date();
    switch (frequency) {
      case 'daily':
        now.setDate(now.getDate() + 1);
        break;
      case 'weekly':
        now.setDate(now.getDate() + 7);
        break;
      case 'monthly':
        now.setMonth(now.getMonth() + 1);
        break;
      case 'quarterly':
        now.setMonth(now.getMonth() + 3);
        break;
    }
    return now.toISOString();
  };

  const toggleAutomation = async (id: string, enabled: boolean) => {
    const response = await fetch('/api/automation/reports', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, enabled }),
    });
    
    if (response.ok) {
      await fetchAutomations();
    }
  };

  const deleteAutomation = async (id: string) => {
    const response = await fetch(`/api/automation/reports?id=${id}`, {
      method: 'DELETE',
    });
    
    if (response.ok) {
      await fetchAutomations();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Rapports automatiques
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Nouvelle automatisation
            </button>
          </div>
        </div>

        {/* Liste des automatisations */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {automations.map((automation) => (
              <li key={automation.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {automation.name}
                      </p>
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        automation.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {automation.frequency}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleAutomation(automation.id, !automation.enabled)}
                        className={`px-3 py-1 rounded-md text-sm font-medium ${
                          automation.enabled
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {automation.enabled ? 'Désactiver' : 'Activer'}
                      </button>
                      <button
                        onClick={() => deleteAutomation(automation.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Prochaine exécution : {format(new Date(automation.nextRun), 'dd MMM yyyy HH:mm', { locale: fr })}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      {automation.recipients.length} destinataire{automation.recipients.length > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Formulaire */}
        {showForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Nouvelle automatisation
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                    Fréquence
                  </label>
                  <select
                    id="frequency"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value as AutomationFrequency })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="daily">Quotidien</option>
                    <option value="weekly">Hebdomadaire</option>
                    <option value="monthly">Mensuel</option>
                    <option value="quarterly">Trimestriel</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="reportTitle" className="block text-sm font-medium text-gray-700">
                    Titre du rapport
                  </label>
                  <input
                    type="text"
                    id="reportTitle"
                    value={formData.reportTemplate?.title}
                    onChange={(e) => setFormData({
                      ...formData,
                      reportTemplate: {
                        ...formData.reportTemplate!,
                        title: e.target.value
                      }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Créer
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
