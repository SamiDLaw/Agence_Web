'use client';

import { useState, useEffect } from 'react';
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
  isWithinInterval,
  addDays
} from 'date-fns';
import { fr } from 'date-fns/locale';
import type { CalendarEvent, CalendarView } from '@/types/calendar';

export default function CalendarPage() {
  const [view, setView] = useState<CalendarView>({
    type: 'month',
    date: new Date().toISOString()
  });
  
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Livraison maquettes',
      description: 'Livraison des maquettes Figma pour la page d\'accueil',
      startDate: '2025-01-30T10:00:00.000Z',
      endDate: '2025-01-30T11:00:00.000Z',
      type: 'deadline',
      status: 'pending',
      projectId: '1',
      taskId: '1',
      color: '#3B82F6'
    },
    {
      id: '2',
      title: 'Point client hebdomadaire',
      description: 'Réunion de suivi avec le client',
      startDate: '2025-01-29T14:00:00.000Z',
      endDate: '2025-01-29T15:00:00.000Z',
      type: 'meeting',
      status: 'pending',
      projectId: '1',
      location: 'Google Meet',
      color: '#10B981'
    }
  ]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    type: 'task',
    status: 'pending'
  });

  const handlePreviousMonth = () => {
    setSelectedDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(prev => addMonths(prev, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowEventForm(true);
    setNewEvent(prev => ({
      ...prev,
      startDate: date.toISOString(),
      endDate: addDays(date, 1).toISOString()
    }));
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.startDate || !newEvent.endDate) return;

    const event: CalendarEvent = {
      id: (events.length + 1).toString(),
      title: newEvent.title,
      description: newEvent.description,
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      type: newEvent.type || 'task',
      status: newEvent.status || 'pending',
      projectId: newEvent.projectId,
      taskId: newEvent.taskId,
      color: getEventColor(newEvent.type || 'task')
    };

    setEvents([...events, event]);
    setShowEventForm(false);
    setNewEvent({
      title: '',
      description: '',
      type: 'task',
      status: 'pending'
    });
  };

  const getEventColor = (type: CalendarEvent['type']) => {
    const colors = {
      project: '#3B82F6',
      task: '#10B981',
      meeting: '#F59E0B',
      deadline: '#EF4444'
    };
    return colors[type];
  };

  const getDaysInMonth = () => {
    const start = startOfWeek(selectedDate, { locale: fr });
    const end = endOfWeek(selectedDate, { locale: fr });
    return eachDayOfInterval({ start, end });
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const start = parseISO(event.startDate);
      const end = parseISO(event.endDate);
      return isWithinInterval(date, { start, end });
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête du calendrier */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {format(selectedDate, 'MMMM yyyy', { locale: fr })}
              </h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePreviousMonth}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  <svg className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-full hover:bg-gray-200"
                >
                  <svg className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={view.type}
                onChange={(e) => setView({ ...view, type: e.target.value as CalendarView['type'] })}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="month">Mois</option>
                <option value="week">Semaine</option>
                <option value="day">Jour</option>
                <option value="agenda">Agenda</option>
              </select>
              <button
                onClick={() => setShowEventForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Nouvel événement
              </button>
            </div>
          </div>
        </div>

        {/* Grille du calendrier */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Jours de la semaine */}
          <div className="grid grid-cols-7 gap-px border-b border-gray-200">
            {getDaysInMonth().slice(0, 7).map((date, index) => (
              <div key={index} className="py-2">
                <span className="text-sm font-medium text-gray-900 text-center block">
                  {format(date, 'EEEE', { locale: fr })}
                </span>
              </div>
            ))}
          </div>

          {/* Jours du mois */}
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {getDaysInMonth().map((date, dateIdx) => {
              const dayEvents = getEventsForDate(date);
              return (
                <div
                  key={dateIdx}
                  onClick={() => handleDateClick(date)}
                  className={`min-h-32 bg-white ${
                    !isSameMonth(date, selectedDate)
                      ? 'bg-gray-50 text-gray-400'
                      : 'text-gray-900'
                  }`}
                >
                  <div className="px-2 py-1">
                    <span className={`text-sm ${
                      isSameDay(date, new Date())
                        ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                        : ''
                    }`}>
                      {format(date, 'd')}
                    </span>
                  </div>
                  <div className="px-1 space-y-1">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className="px-2 py-1 rounded text-xs font-medium text-white truncate"
                        style={{ backgroundColor: event.color }}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formulaire nouvel événement */}
        {showEventForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Nouvel événement
                </h2>
                <button
                  onClick={() => setShowEventForm(false)}
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
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                      Date de début
                    </label>
                    <input
                      type="datetime-local"
                      id="startDate"
                      value={newEvent.startDate?.slice(0, 16)}
                      onChange={(e) => setNewEvent({ ...newEvent, startDate: new Date(e.target.value).toISOString() })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                      Date de fin
                    </label>
                    <input
                      type="datetime-local"
                      id="endDate"
                      value={newEvent.endDate?.slice(0, 16)}
                      onChange={(e) => setNewEvent({ ...newEvent, endDate: new Date(e.target.value).toISOString() })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    id="type"
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as CalendarEvent['type'] })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="project">Projet</option>
                    <option value="task">Tâche</option>
                    <option value="meeting">Réunion</option>
                    <option value="deadline">Échéance</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowEventForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleCreateEvent}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Créer
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
