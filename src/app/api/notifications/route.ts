import { NextResponse } from 'next/server';
import type { Notification } from '@/types/notification';

const notifications: Notification[] = [];

export async function GET() {
  return NextResponse.json(notifications);
}

export async function POST(request: Request) {
  const notification = await request.json();
  
  // Ajouter l'ID et la date de création
  const newNotification: Notification = {
    ...notification,
    id: (notifications.length + 1).toString(),
    createdAt: new Date().toISOString(),
    read: false
  };
  
  notifications.push(newNotification);
  
  return NextResponse.json(newNotification);
}

export async function PUT(request: Request) {
  const { id, read } = await request.json();
  const notification = notifications.find(n => n.id === id);
  
  if (!notification) {
    return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
  }
  
  notification.read = read;
  return NextResponse.json(notification);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const index = notifications.findIndex(n => n.id === id);
  
  if (index === -1) {
    return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
  }
  
  notifications.splice(index, 1);
  return NextResponse.json({ success: true });
}
