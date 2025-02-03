export type NotificationType = 'task_update' | 'comment' | 'mention' | 'deadline' | 'project_update';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
  metadata?: {
    projectId?: string;
    taskId?: string;
    commentId?: string;
    userId?: string;
  };
}
