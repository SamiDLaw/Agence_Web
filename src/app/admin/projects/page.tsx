'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Project, ProjectStatus, ProjectPriority } from '@/types/project';

export default function ProjectsPage() {
  const [activeView, setActiveView] = useState<'list' | 'board'>('list');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<ProjectPriority | 'all'>('all');

  // Données mockées pour l'exemple
  const projects: Project[] = [
    {
      id: '1',
      name: 'Site E-commerce Mode',
      description: 'Création d\'un site e-commerce pour une marque de vêtements',
      client: {
        id: '1',
        name: 'Fashion Brand',
        email: 'contact@fashionbrand.com',
        projects: ['1'],
        createdAt: '2024-01-01'
      },
      status: 'in_progress',
      priority: 'high',
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      budget: 15000,
      tasks: [],
      services: ['web_development', 'web_design'],
      team: [
        {
          id: '1',
          name: 'Sami',
          email: 'sami@lawgency.com',
          role: 'admin',
          skills: ['project_management', 'development']
        }
      ],
      documents: [],
      createdAt: '2024-01-15',
      updatedAt: '2024-01-28'
    }
  ];

  const getStatusColor = (status: ProjectStatus) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-blue-100 text-blue-800',
      review: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      archived: 'bg-purple-100 text-purple-800'
    };
    return colors[status];
  };

  const getPriorityColor = (priority: ProjectPriority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      normal: 'bg-gray-100 text-gray-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority];
  };

  const getStatusText = (status: ProjectStatus) => {
    const texts = {
      draft: 'Brouillon',
      in_progress: 'En cours',
      review: 'En révision',
      completed: 'Terminé',
      archived: 'Archivé'
    };
    return texts[status];
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* En-tête */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Projets</h1>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Nouveau Projet
            </button>
          </div>
        </div>
      </header>

      {/* Filtres et Vue */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ProjectStatus | 'all')}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="all">Tous les statuts</option>
              <option value="draft">Brouillon</option>
              <option value="in_progress">En cours</option>
              <option value="review">En révision</option>
              <option value="completed">Terminé</option>
              <option value="archived">Archivé</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as ProjectPriority | 'all')}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value="all">Toutes les priorités</option>
              <option value="high">Haute</option>
              <option value="normal">Normale</option>
              <option value="low">Basse</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveView('list')}
              className={`px-3 py-2 rounded-md ${
                activeView === 'list'
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Liste
            </button>
            <button
              onClick={() => setActiveView('board')}
              className={`px-3 py-2 rounded-md ${
                activeView === 'board'
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Tableau
            </button>
          </div>
        </div>

        {/* Vue Liste */}
        {activeView === 'list' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul role="list" className="divide-y divide-gray-200">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="px-4 py-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(project.status)}`}>
                          {getStatusText(project.status)}
                        </span>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(project.priority)}`}>
                          {project.priority === 'high' ? 'Urgent' : project.priority === 'normal' ? 'Normal' : 'Basse'}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-900">{project.name}</p>
                      <p className="mt-1 text-sm text-gray-500">{project.description}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <span className="mr-1">Client:</span>
                          <span className="font-medium text-gray-900">{project.client.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-1">Budget:</span>
                          <span className="font-medium text-gray-900">{project.budget}€</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-1">Échéance:</span>
                          <span className="font-medium text-gray-900">
                            {project.endDate ? format(new Date(project.endDate), 'dd MMM yyyy', { locale: fr }) : 'Non définie'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center space-x-4">
                      <div className="flex -space-x-2">
                        {project.team.map((member) => (
                          <div
                            key={member.id}
                            className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 border-2 border-white"
                            title={member.name}
                          >
                            {member.name[0]}
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Détails
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Vue Tableau */}
        {activeView === 'board' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(['draft', 'in_progress', 'review', 'completed'] as ProjectStatus[]).map((status) => (
              <div key={status} className="bg-white rounded-lg shadow">
                <div className="px-4 py-3 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">{getStatusText(status)}</h3>
                </div>
                <ul role="list" className="p-4 space-y-4">
                  {projects
                    .filter((p) => p.status === status)
                    .map((project) => (
                      <li
                        key={project.id}
                        className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow cursor-pointer"
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(project.priority)}`}>
                            {project.priority === 'high' ? 'Urgent' : project.priority === 'normal' ? 'Normal' : 'Basse'}
                          </span>
                        </div>
                        <p className="mt-2 text-sm font-medium text-gray-900">{project.name}</p>
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{project.description}</p>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex -space-x-2">
                            {project.team.map((member) => (
                              <div
                                key={member.id}
                                className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white"
                                title={member.name}
                              >
                                {member.name[0]}
                              </div>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {project.endDate ? format(new Date(project.endDate), 'dd MMM', { locale: fr }) : '-'}
                          </span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
