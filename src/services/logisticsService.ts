import api from './api';
import { Transfer } from '../types/types';

export const logisticsService = {
  // Get all movement records
  getTransfers: () => api.get<Transfer[]>('transfers/'),
  
  // Create a new transfer (Initiates the TRF-ID and Notification in Django)
  createTransfer: (data: Partial<Transfer>) => api.post<Transfer>('transfers/', data),

  // Custom Dispatch Action: This triggers the 'intransit' status and quarantine logic
  dispatchTruck: (id: number) => api.post(`transfers/${id}/dispatch/`),

  // Update transfer details (e.g., updating truck reg or driver info)
  updateTransfer: (id: number, data: Partial<Transfer>) => 
    api.patch<Transfer>(`transfers/${id}/`, data),

  // Delete a transfer (if cancelled before dispatch)
  deleteTransfer: (id: number) => api.delete(`transfers/${id}/`),
};