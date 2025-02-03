import { NextResponse } from 'next/server';
import type { ChatRoom, Message } from '@/types/chat';

const chatRooms: ChatRoom[] = [];
const messages: Message[] = [];

// GET /api/chat/rooms - Liste des salons
export async function GET(request: Request) {
  const { pathname, searchParams } = new URL(request.url);
  
  // Route pour les messages
  if (pathname.includes('/api/chat/messages')) {
    const roomId = searchParams.get('roomId');
    
    if (!roomId) {
      return NextResponse.json({ error: 'Room ID is required' }, { status: 400 });
    }
    
    return NextResponse.json(messages.filter(message => message.projectId === roomId));
  }
  
  // Route pour les salons
  const projectId = searchParams.get('projectId');
  if (projectId) {
    return NextResponse.json(chatRooms.filter(room => room.projectId === projectId));
  }
  
  return NextResponse.json(chatRooms);
}

// POST /api/chat - Gestion des posts
export async function POST(request: Request) {
  const { pathname } = new URL(request.url);
  
  // Route pour les messages
  if (pathname.includes('/api/chat/messages')) {
    const message = await request.json();
    
    const newMessage: Message = {
      ...message,
      id: (messages.length + 1).toString(),
      timestamp: new Date().toISOString()
    };
    
    messages.push(newMessage);

    // Mettre à jour le dernier message et le compteur non lu du salon
    const room = chatRooms.find(r => r.projectId === message.projectId);
    if (room) {
      room.lastMessage = newMessage;
      room.updatedAt = new Date().toISOString();
      room.unreadCount += 1;
    }

    return NextResponse.json(newMessage);
  }
  
  // Route pour les salons (par défaut)
  const room = await request.json();
  
  const newRoom: ChatRoom = {
    ...room,
    id: (chatRooms.length + 1).toString(),
    unreadCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  chatRooms.push(newRoom);
  return NextResponse.json(newRoom);
}

// PUT /api/chat/messages/read - Marquer les messages comme lus
export async function PUT(request: Request) {
  const { roomId, userId } = await request.json();
  
  messages
    .filter(m => m.projectId === roomId && !m.readBy.includes(userId))
    .forEach(m => m.readBy.push(userId));

  const room = chatRooms.find(r => r.projectId === roomId);
  if (room) {
    room.unreadCount = 0;
  }

  return NextResponse.json({ success: true });
}
