import { useState, useEffect } from 'react';
import type { ChatRoom, Message } from '@/types/chat';

export function useChat(projectId?: string) {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRooms = async () => {
    try {
      const url = projectId
        ? `/api/chat/rooms?projectId=${projectId}`
        : '/api/chat/rooms';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch chat rooms');
      const data = await response.json();
      setRooms(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (roomId: string) => {
    try {
      const response = await fetch(`/api/chat/messages?roomId=${roomId}`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    }
  };

  const createRoom = async (participants: ChatRoom['participants']) => {
    try {
      const response = await fetch('/api/chat/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: projectId,
          participants
        }),
      });
      if (!response.ok) throw new Error('Failed to create chat room');
      const newRoom = await response.json();
      setRooms(prev => [...prev, newRoom]);
      return newRoom;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    }
  };

  const sendMessage = async (content: string, roomId: string, sender: Message['sender']) => {
    try {
      const response = await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          projectId: roomId,
          sender
        }),
      });
      if (!response.ok) throw new Error('Failed to send message');
      const newMessage = await response.json();
      setMessages(prev => [...prev, newMessage]);
      return newMessage;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    }
  };

  const markMessagesAsRead = async (roomId: string, userId: string) => {
    try {
      const response = await fetch('/api/chat/messages/read', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, userId }),
      });
      if (!response.ok) throw new Error('Failed to mark messages as read');
      
      // Mettre à jour le compteur non lu localement
      setRooms(prev =>
        prev.map(room =>
          room.projectId === roomId
            ? { ...room, unreadCount: 0 }
            : room
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [projectId]);

  useEffect(() => {
    if (selectedRoom) {
      fetchMessages(selectedRoom.projectId);
    }
  }, [selectedRoom]);

  return {
    rooms,
    messages,
    selectedRoom,
    loading,
    error,
    setSelectedRoom,
    createRoom,
    sendMessage,
    markMessagesAsRead,
    refetchRooms: fetchRooms,
    refetchMessages: () => selectedRoom && fetchMessages(selectedRoom.projectId),
  };
}
