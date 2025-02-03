import { NextResponse } from 'next/server';
import type { CalendarEvent } from '@/types/calendar';

const events: CalendarEvent[] = [];

// GET /api/calendar/events - Liste des événements
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const type = searchParams.get('type');
  const projectId = searchParams.get('projectId');

  let filteredEvents = [...events];

  if (startDate && endDate) {
    filteredEvents = filteredEvents.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      const filterStart = new Date(startDate);
      const filterEnd = new Date(endDate);
      
      return eventStart >= filterStart && eventEnd <= filterEnd;
    });
  }

  if (type) {
    filteredEvents = filteredEvents.filter(event => event.type === type);
  }

  if (projectId) {
    filteredEvents = filteredEvents.filter(event => event.projectId === projectId);
  }

  return NextResponse.json(filteredEvents);
}

// POST /api/calendar/events - Créer un événement
export async function POST(request: Request) {
  const event = await request.json();
  
  const newEvent: CalendarEvent = {
    ...event,
    id: (events.length + 1).toString(),
    status: event.status || 'pending',
    reminders: event.reminders || []
  };
  
  events.push(newEvent);
  return NextResponse.json(newEvent);
}

// PUT /api/calendar/events/:id - Mettre à jour un événement
export async function PUT(request: Request) {
  const { id, ...updates } = await request.json();
  const eventIndex = events.findIndex(e => e.id === id);
  
  if (eventIndex === -1) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }
  
  events[eventIndex] = { ...events[eventIndex], ...updates };
  return NextResponse.json(events[eventIndex]);
}

// DELETE /api/calendar/events/:id - Supprimer un événement
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
  }

  const eventIndex = events.findIndex(e => e.id === id);
  
  if (eventIndex === -1) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }
  
  events.splice(eventIndex, 1);
  return NextResponse.json({ success: true });
}
