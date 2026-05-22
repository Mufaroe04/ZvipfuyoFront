import api from './api';
import { Notification, PaginatedResponse } from '../types/types';

export const notificationService = {
  getByUrl: <T>(url: string) => api.get<PaginatedResponse<T>>(url),

  // Fetches notifications where is_read=False (per your Django queryset)
  getUnread: (params:{page?: number,pageSize?: number}) => api.get<PaginatedResponse<Notification>>('notifications/',{params}),

  // Custom action to mark a notification as read
  markAsRead: (id: number) => api.patch<Notification>(`notifications/${id}/`, { is_read: true }),

  // Optional: Mark all as read if you add a custom action to your Django ViewSet later
  markAllRead: () => api.post('notifications/mark_all_read/'),
};