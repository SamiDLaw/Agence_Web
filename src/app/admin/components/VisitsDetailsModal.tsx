'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface PageVisit {
  path: string;
  title: string;
  visits: number;
  uniqueVisitors: number;
  averageTime: number;
  bounceRate: number;
}

interface VisitsDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyStats: {
    totalVisits: number;
    uniqueVisitors: number;
    pageViews: PageVisit[];
    peakHours: { hour: number; visits: number }[];
    sources: { name: string; visits: number }[];
    devices: { type: string; count: number }[];
  };
}

export default function VisitsDetailsModal({ isOpen, onClose, dailyStats }: VisitsDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'pages' | 'sources' | 'devices'>('pages');

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
            <div className="absolute right-0 top-0 pr-4 pt-4">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                onClick={onClose}
              >
                <span className="sr-only">Fermer</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="sm:flex sm:items-start">
              <div className="w-full">
                <h3 className="text-2xl font-semibold leading-6 text-gray-900 mb-8">
                  Détails des visites
                </h3>

                {/* Vue d'ensemble */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500">Visites totales</h4>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">{dailyStats.totalVisits}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500">Visiteurs uniques</h4>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">{dailyStats.uniqueVisitors}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-500">Pages par visite</h4>
                    <p className="mt-1 text-3xl font-semibold text-gray-900">
                      {(dailyStats.totalVisits / dailyStats.uniqueVisitors).toFixed(1)}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    <button
                      onClick={() => setActiveTab('pages')}
                      className={`${
                        activeTab === 'pages'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                    >
                      Pages visitées
                    </button>
                    <button
                      onClick={() => setActiveTab('sources')}
                      className={`${
                        activeTab === 'sources'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                    >
                      Sources de trafic
                    </button>
                    <button
                      onClick={() => setActiveTab('devices')}
                      className={`${
                        activeTab === 'devices'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm`}
                    >
                      Appareils
                    </button>
                  </nav>
                </div>

                {/* Contenu des onglets */}
                <div className="mt-8">
                  {activeTab === 'pages' && (
                    <div className="flow-root">
                      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                              <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                  Page
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Visites
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Visiteurs uniques
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Temps moyen
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Taux de rebond
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {dailyStats.pageViews.map((page) => (
                                <tr key={page.path}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                                    <div className="font-medium text-gray-900">{page.title}</div>
                                    <div className="text-gray-500">{page.path}</div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {page.visits}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {page.uniqueVisitors}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {formatTime(page.averageTime)}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {page.bounceRate}%
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'sources' && (
                    <div className="grid grid-cols-1 gap-4">
                      {dailyStats.sources.map((source) => (
                        <div key={source.name} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{source.name}</h4>
                              <p className="text-sm text-gray-500">{source.visits} visites</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">
                                {((source.visits / dailyStats.totalVisits) * 100).toFixed(1)}%
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(source.visits / dailyStats.totalVisits) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'devices' && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {dailyStats.devices.map((device) => (
                        <div key={device.type} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{device.type}</h4>
                              <p className="text-sm text-gray-500">{device.count} visiteurs</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">
                                {((device.count / dailyStats.uniqueVisitors) * 100).toFixed(1)}%
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
