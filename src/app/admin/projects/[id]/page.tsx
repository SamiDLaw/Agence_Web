'use client';

import { useState } from 'react';
import type { Project, ServiceType, TeamMember } from '@/types/project';

interface ProjectFormData {
  name: string;
  description: string;
  clientName: string;
  clientEmail: string;
  startDate: string;
  endDate: string;
  budget: number;
  priority: Project['priority'];
  services: ServiceType[];
  team: string[];
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    clientName: '',
    clientEmail: '',
    startDate: '',
    endDate: '',
    budget: 0,
    priority: 'normal',
    services: [],
    team: []
  });

  const availableServices: { value: ServiceType; label: string }[] = [
    { value: 'web_development', label: 'Développement Web' },
    { value: 'web_design', label: 'Design Web' },
    { value: 'seo', label: 'SEO' },
    { value: 'marketing', label: 'Marketing Digital' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sami',
      email: 'sami@lawgency.com',
      role: 'admin',
      skills: ['development', 'project_management']
    },
    {
      id: '2',
      name: 'Alex',
      email: 'alex@lawgency.com',
      role: 'developer',
      skills: ['development', 'design']
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la sauvegarde
    console.log('Données du formulaire:', formData);
  };

  const handleServiceToggle = (service: ServiceType) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleTeamMemberToggle = (memberId: string) => {
    setFormData(prev => ({
      ...prev,
      team: prev.team.includes(memberId)
        ? prev.team.filter(id => id !== memberId)
        : [...prev.team, memberId]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {params.id === 'new' ? 'Nouveau Projet' : 'Modifier le Projet'}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                {/* Informations de base */}
                <div className="sm:col-span-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom du projet
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Informations client */}
                <div className="sm:col-span-3">
                  <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
                    Nom du client
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="clientName"
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700">
                    Email du client
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="clientEmail"
                      id="clientEmail"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Dates et budget */}
                <div className="sm:col-span-2">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Date de début
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    Date de fin
                  </label>
                  <div className="mt-1">
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                    Budget (€)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="budget"
                      id="budget"
                      min="0"
                      step="100"
                      value={formData.budget}
                      onChange={(e) => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Priorité */}
                <div className="sm:col-span-3">
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                    Priorité
                  </label>
                  <div className="mt-1">
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Project['priority'] }))}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="low">Basse</option>
                      <option value="normal">Normale</option>
                      <option value="high">Haute</option>
                    </select>
                  </div>
                </div>

                {/* Services */}
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Services
                  </label>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {availableServices.map((service) => (
                      <div
                        key={service.value}
                        className={`relative rounded-lg border p-4 flex cursor-pointer ${
                          formData.services.includes(service.value)
                            ? 'bg-blue-50 border-blue-200'
                            : 'border-gray-200'
                        }`}
                        onClick={() => handleServiceToggle(service.value)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-900">
                              {service.label}
                            </div>
                            {formData.services.includes(service.value) && (
                              <div className="h-5 w-5 text-blue-600">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Équipe */}
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Équipe
                  </label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className={`relative rounded-lg border p-4 flex cursor-pointer ${
                          formData.team.includes(member.id)
                            ? 'bg-blue-50 border-blue-200'
                            : 'border-gray-200'
                        }`}
                        onClick={() => handleTeamMemberToggle(member.id)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
                              <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                            {formData.team.includes(member.id) && (
                              <div className="h-5 w-5 text-blue-600">
                                <svg viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {member.skills.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
