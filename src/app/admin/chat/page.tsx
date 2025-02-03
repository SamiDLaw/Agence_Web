'use client';

import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { ChatRoom, Message } from '@/types/chat';

export default function ChatPage() {
  const [rooms, setRooms] = useState<ChatRoom[]>([
    {
      id: '1',
      projectId: '1',
      participants: [
        { id: '1', name: 'Sami', role: 'admin' },
        { id: '2', name: 'Client A', role: 'client' }
      ],
      unreadCount: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);

  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedRoom) {
      // Charger les messages de la room sélectionnée
      const mockMessages: Message[] = [
        {
          id: '1',
          content: 'Bonjour, comment puis-je vous aider ?',
          sender: { id: '1', name: 'Sami', role: 'admin' },
          projectId: selectedRoom.projectId,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          readBy: ['1', '2']
        },
        {
          id: '2',
          content: 'J\'aimerais avoir un point sur l\'avancement du projet',
          sender: { id: '2', name: 'Client A', role: 'client' },
          projectId: selectedRoom.projectId,
          createdAt: new Date(Date.now() - 1800000).toISOString(),
          readBy: ['1']
        }
      ];
      setMessages(mockMessages);
      scrollToBottom();
    }
  }, [selectedRoom]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedRoom) return;

    const message: Message = {
      id: (messages.length + 1).toString(),
      content: newMessage,
      sender: { id: '1', name: 'Sami', role: 'admin' },
      projectId: selectedRoom.projectId,
      createdAt: new Date().toISOString(),
      readBy: ['1']
    };

    setMessages([...messages, message]);
    setNewMessage('');
    scrollToBottom();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedRoom) return;

    setIsUploading(true);
    try {
      // TODO: Implémenter l'upload de fichier
      const message: Message = {
        id: (messages.length + 1).toString(),
        content: `Fichier envoyé : ${file.name}`,
        sender: { id: '1', name: 'Sami', role: 'admin' },
        projectId: selectedRoom.projectId,
        createdAt: new Date().toISOString(),
        readBy: ['1'],
        attachments: [{
          id: '1',
          name: file.name,
          url: URL.createObjectURL(file),
          type: file.type,
          size: file.size
        }]
      };

      setMessages([...messages, message]);
      scrollToBottom();
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-lg min-h-[600px] flex">
          {/* Liste des conversations */}
          <div className="w-1/3 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Conversations</h2>
            </div>
            <div className="overflow-y-auto h-[calc(600px-4rem)]">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    selectedRoom?.id === room.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white font-medium">
                          {room.participants.find(p => p.role === 'client')?.name[0]}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {room.participants.find(p => p.role === 'client')?.name}
                      </p>
                      {room.lastMessage && (
                        <p className="text-sm text-gray-500 truncate">
                          {room.lastMessage.content}
                        </p>
                      )}
                    </div>
                    {room.unreadCount > 0 && (
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-xs">
                          {room.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zone de chat */}
          {selectedRoom ? (
            <div className="flex-1 flex flex-col">
              {/* En-tête */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {selectedRoom.participants.find(p => p.role === 'client')?.name[0]}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      {selectedRoom.participants.find(p => p.role === 'client')?.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Projet: {selectedRoom.projectId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender.role === 'admin' ? 'justify-end' : 'justify-start'
                    } mb-4`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        message.sender.role === 'admin'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      } rounded-lg px-4 py-2`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">
                          {message.sender.name}
                        </span>
                        <span className="text-xs opacity-75">
                          {format(new Date(message.createdAt), 'HH:mm', { locale: fr })}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2">
                          {message.attachments.map((attachment) => (
                            <a
                              key={attachment.id}
                              href={attachment.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center space-x-2 px-3 py-1 rounded ${
                                message.sender.role === 'admin'
                                  ? 'bg-blue-700 hover:bg-blue-800'
                                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                              }`}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                              </svg>
                              <span className="text-sm">{attachment.name}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Zone de saisie */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                    <svg
                      className="h-6 w-6 text-gray-400 hover:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </label>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Écrivez votre message..."
                    className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500">
                Sélectionnez une conversation pour commencer
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
