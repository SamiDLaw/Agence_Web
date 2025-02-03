export interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    role: 'admin' | 'client' | 'team';
    avatar?: string;
  };
  projectId: string;
  createdAt: string;
  readBy: string[];
  attachments?: {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
}

export interface ChatRoom {
  id: string;
  projectId: string;
  participants: {
    id: string;
    name: string;
    role: 'admin' | 'client' | 'team';
    avatar?: string;
  }[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}
