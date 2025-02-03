'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Task, Comment, Attachment } from '@/types/project';

export default function TaskDetails({ params }: { params: { id: string; taskId: string } }) {
  const [task] = useState<Task>({
    id: params.taskId,
    title: 'Maquette page d\'accueil',
    description: 'Créer la maquette Figma de la page d\'accueil',
    status: 'in_progress',
    assignedTo: '1',
    dueDate: '2024-02-15',
    createdAt: '2024-01-28',
    updatedAt: '2024-01-28',
    timeSpent: 120,
    comments: [
      {
        id: '1',
        content: 'La première version est prête pour révision',
        author: {
          id: '1',
          name: 'Sami',
          email: 'sami@lawgency.com',
          role: 'admin',
          skills: ['development']
        },
        createdAt: '2024-01-28',
        attachments: []
      }
    ],
    attachments: [
      {
        id: '1',
        name: 'maquette-v1.fig',
        type: 'application/figma',
        size: 2048576,
        url: '/files/maquette-v1.fig',
        uploadedBy: '1',
        createdAt: '2024-01-28'
      }
    ]
  });

  const [newComment, setNewComment] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: (task.comments.length + 1).toString(),
      content: newComment,
      author: {
        id: '1',
        name: 'Sami',
        email: 'sami@lawgency.com',
        role: 'admin',
        skills: ['development']
      },
      createdAt: new Date().toISOString(),
      attachments: []
    };

    task.comments.push(comment);
    setNewComment('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    // TODO: Implémenter l'upload de fichier
    console.log('Upload du fichier:', file.name);
    
    const attachment: Attachment = {
      id: (task.attachments.length + 1).toString(),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      uploadedBy: '1',
      createdAt: new Date().toISOString()
    };

    task.attachments.push(attachment);
    setUploading(false);
  };

  const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{task.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Commentaires */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Commentaires</h2>
              
              {/* Liste des commentaires */}
              <div className="space-y-4 mb-4">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white font-medium">{comment.author.name[0]}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{comment.author.name}</p>
                          <p className="text-xs text-gray-500">
                            {format(new Date(comment.createdAt), 'dd MMM yyyy à HH:mm', { locale: fr })}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{comment.content}</p>
                    {comment.attachments && comment.attachments.length > 0 && (
                      <div className="mt-2">
                        {comment.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                          >
                            {attachment.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Formulaire nouveau commentaire */}
              <div className="mt-4">
                <label htmlFor="comment" className="sr-only">
                  Ajouter un commentaire
                </label>
                <textarea
                  id="comment"
                  rows={3}
                  className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Ajouter un commentaire..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="mt-3 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleAddComment}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Commenter
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pièces jointes */}
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Pièces jointes</h2>
              
              {/* Liste des pièces jointes */}
              <ul role="list" className="divide-y divide-gray-200">
                {task.attachments.map((attachment) => (
                  <li key={attachment.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                        <p className="text-sm text-gray-500">{formatFileSize(attachment.size)}</p>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href={attachment.url}
                        download
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Télécharger
                      </a>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Upload de fichier */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Ajouter un fichier</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Téléverser un fichier</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileUpload}
                          disabled={uploading}
                        />
                      </label>
                      <p className="pl-1">ou glisser-déposer</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF jusqu'à 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
