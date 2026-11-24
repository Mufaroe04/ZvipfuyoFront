import api from './api';
import { PaginatedResponse, Transfer } from '../types/types';

export const logisticsService = {
  // Get paginated transfers matching system-wide query patterns
  getTransfers: (params: { page?: number; page_size?: number } = {}) => 
    api.get<PaginatedResponse<Transfer>>('transfers/', { params }),

  // Create a new transfer record
  createTransfer: (data: Partial<Transfer>) => 
    api.post<Transfer>('transfers/', data),

  // Update specific transfer payload via HTTP PATCH
  updateTransfer: (id: string, data: Partial<Transfer>) => 
    api.patch<Transfer>(`transfers/${id}/`, data),

  // Custom Dispatch Action: triggers intransit workflow and quarantine updates
  dispatchTransfer: (id: number) => 
    api.post<{ status: string }>(`transfers/${id}/dispatch_transfer/`),

  // Delete a transfer record before dispatch execution
  deleteTransfer: (id: number) => 
    api.delete(`transfers/${id}/`),
};