import { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import type { CalendarEvent, CalendarView } from '@/types/calendar';

interface UseCalendarOptions {
  view?: CalendarView;
  projectId?: string;
}

export function useCalendar(options: UseCalendarOptions = {}) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [view, setView] = useState<CalendarView>(options.view || {
    type: 'month',
    date: new Date().toISOString()
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvents = async () => {
    try {
      const currentDate = new Date(view.date);
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);

      const queryParams = new URLSearchParams({
        startDate: start.toISOString(),
        endDate: end.toISOString()
      });

      if (options.projectId) {
        queryParams.append('projectId', options.projectId);
      }

      const response = await fetch(`/api/calendar/events?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (event: Omit<CalendarEvent, 'id'>) => {
    try {
      const response = await fetch('/api/calendar/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });
      if (!response.ok) throw new Error('Failed to create event');
      const newEvent = await response.json();
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    }
  };

  const updateEvent = async (id: string, updates: Partial<CalendarEvent>) => {
    try {
      const response = await fetch('/api/calendar/events', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates }),
      });
      if (!response.ok) throw new Error('Failed to update event');
      const updatedEvent = await response.json();
      setEvents(prev =>
        prev.map(event =>
          event.id === id ? updatedEvent : event
        )
      );
      return updatedEvent;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const response = await fetch(`/api/calendar/events?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete event');
      setEvents(prev => prev.filter(event => event.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    }
  };

  const changeView = (newView: CalendarView) => {
    setView(newView);
  };

  const getEventsByDate = (date: Date) => {
    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const currentDate = new Date(date);
      
      return currentDate >= eventStart && currentDate <= eventEnd;
    });
  };

  const getEventsByType = (type: CalendarEvent['type']) => {
    return events.filter(event => event.type === type);
  };

  const getUpcomingEvents = (days: number = 7) => {
    const now = new Date();
    const future = new Date();
    future.setDate(future.getDate() + days);

    return events.filter(event => {
      const eventStart = new Date(event.startDate);
      return eventStart >= now && eventStart <= future;
    }).sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
  };

  const getOverdueEvents = () => {
    const now = new Date();
    return events.filter(event => {
      const eventEnd = new Date(event.endDate);
      return eventEnd < now && event.status !== 'completed';
    });
  };

  useEffect(() => {
    fetchEvents();
  }, [view.date, options.projectId]);

  return {
    events,
    view,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    changeView,
    getEventsByDate,
    getEventsByType,
    getUpcomingEvents,
    getOverdueEvents,
    refetch: fetchEvents,
  };
}
