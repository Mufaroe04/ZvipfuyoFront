// import api from './api';
// import { PaginatedResponse, Transfer } from '../types/types';

// export const logisticsService = {
//   // Get all movement records
//   getByUrl: <T>(url: string) => api.get<PaginatedResponse<T>>(url),

//   getTransfers: () => api.get<Transfer[]>('transfers/'),
  
//   // Create a new transfer (Initiates the TRF-ID and Notification in Django)
//   createTransfer: (data: Partial<Transfer>) => api.post<Transfer>('transfers/', data),

//   // Custom Dispatch Action: This triggers the 'intransit' status and quarantine logic
//   dispatchTruck: (id: number) => api.post(`transfers/${id}/dispatch/`),

//   // Update transfer details (e.g., updating truck reg or driver info)
//   updateTransfer: (id: number, data: Partial<Transfer>) => 
//     api.patch<Transfer>(`transfers/${id}/`, data),

//    // --- Transfers ---
//   getTransfers: (params: { page?: number } = {}) => 
//     api.get<PaginatedResponse<Transfer>>('transfers/', { params }),
//   addTransfer: (data: Partial<Transfer>) => api.post<Transfer>('transfers/', data),
//   dispatchTransfer: (id: number) => api.post<{ status: string }>(`transfers/${id}/dispatch_transfer/`),
//   // Delete a transfer (if cancelled before dispatch)
//   deleteTransfer: (id: number) => api.delete(`transfers/${id}/`),
// };
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