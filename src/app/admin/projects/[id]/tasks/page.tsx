'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Task, TaskStatus } from '@/types/project';

interface TaskFormData {
  title: string;
  description: string;
  assignedTo?: string;
  dueDate?: string;
}

export default function ProjectTasks({ params }: { params: { id: string } }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Maquette page d\'accueil',
      description: 'Créer la maquette Figma de la page d\'accueil',
      status: 'in_progress',
      assignedTo: '1',
      dueDate: '2024-02-15',
      createdAt: '2024-01-28',
      updatedAt: '2024-01-28',
      timeSpent: 120,
      comments: [],
      attachments: []
    },
    {
      id: '2',
      title: 'Configuration serveur',
      description: 'Mettre en place l\'environnement de production',
      status: 'todo',
      assignedTo: '2',
      dueDate: '2024-02-20',
      createdAt: '2024-01-28',
      updatedAt: '2024-01-28',
      timeSpent: 0,
      comments: [],
      attachments: []
    }
  ]);

  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState<TaskFormData>({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: ''
  });
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  const teamMembers = [
    { id: '1', name: 'Sami', role: 'admin' },
    { id: '2', name: 'Alex', role: 'developer' }
  ];

  const getStatusColor = (status: TaskStatus) => {
    const colors = {
      todo: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-blue-100 text-blue-800',
      blocked: 'bg-red-100 text-red-800',
      review: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors[status];
  };

  const getStatusText = (status: TaskStatus) => {
    const texts = {
      todo: 'À faire',
      in_progress: 'En cours',
      blocked: 'Bloquée',
      review: 'En révision',
      completed: 'Terminée'
    };
    return texts[status];
  };

  const handleCreateTask = () => {
    const task: Task = {
      id: (tasks.length + 1).toString(),
      title: newTask.title,
      description: newTask.description,
      status: 'todo',
      assignedTo: newTask.assignedTo,
      dueDate: newTask.dueDate,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeSpent: 0,
      comments: [],
      attachments: []
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', assignedTo: '', dueDate: '' });
    setShowNewTaskForm(false);
  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const startTimeTracking = (task: Task) => {
    setActiveTask(task);
    setIsTracking(true);
    const timerInterval = setInterval(() => {
      setTasks(prevTasks => 
        prevTasks.map(t => 
          t.id === task.id ? { ...t, timeSpent: t.timeSpent + 1 } : t
        )
      );
    }, 60000); // Incrémente toutes les minutes
    setTimer(timerInterval);
  };

  const stopTimeTracking = () => {
    if (timer) {
      clearInterval(timer);
    }
    setTimer(null);
    setIsTracking(false);
    setActiveTask(null);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h${mins.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Tâches du Projet</h1>
          <button
            onClick={() => setShowNewTaskForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Nouvelle Tâche
          </button>
        </div>

        {/* Formulaire nouvelle tâche */}
        {showNewTaskForm && (
          <div className="mb-6 bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Nouvelle Tâche</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Titre
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                    Assignée à
                  </label>
                  <select
                    id="assignedTo"
                    name="assignedTo"
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Non assignée</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                    Date d'échéance
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="mt-5 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewTaskForm(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleCreateTask}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Créer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Liste des tâches */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul role="list" className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <li key={task.id} className="px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                          {getStatusText(task.status)}
                        </span>
                        <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
                      </div>
                      <div className="flex items-center space-x-4">
                        <select
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value as TaskStatus)}
                          className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="todo">À faire</option>
                          <option value="in_progress">En cours</option>
                          <option value="blocked">Bloquée</option>
                          <option value="review">En révision</option>
                          <option value="completed">Terminée</option>
                        </select>
                        {isTracking && activeTask?.id === task.id ? (
                          <button
                            onClick={() => stopTimeTracking()}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500"
                          >
                            Stop
                          </button>
                        ) : (
                          <button
                            onClick={() => startTimeTracking(task)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-500"
                          >
                            Start
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{task.description}</p>
                    <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div>
                          <span className="font-medium">Assignée à:</span>{' '}
                          {teamMembers.find(m => m.id === task.assignedTo)?.name || 'Non assignée'}
                        </div>
                        {task.dueDate && (
                          <div>
                            <span className="font-medium">Échéance:</span>{' '}
                            {format(new Date(task.dueDate), 'dd MMM yyyy', { locale: fr })}
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Temps passé:</span>{' '}
                          {formatTime(task.timeSpent)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
