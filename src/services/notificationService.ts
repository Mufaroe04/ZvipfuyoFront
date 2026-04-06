import api from './api';
import { Notification } from '../types/types';

export const notificationService = {
  // Fetches notifications where is_read=False (per your Django queryset)
  getUnread: () => api.get<Notification[]>('notifications/'),

  // Custom action to mark a notification as read
  markAsRead: (id: number) => api.patch<Notification>(`notifications/${id}/`, { is_read: true }),

  // Optional: Mark all as read if you add a custom action to your Django ViewSet later
  markAllRead: () => api.post('notifications/mark_all_read/'),
};