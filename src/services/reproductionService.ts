// import api from './api';
// import { BreedingEvent } from '../types/types';

// export const reproductionService = {
//   /**
//    * Fetch all breeding records (Historical and Active)
//    */
//   getBreedingHistory: () => api.get<BreedingEvent[]>('reproduction/'),

//   /**
//    * Dashboard specific: Fetch confirmed pregnancies due in the next 30 days
//    */
//   getUpcomingCalvings: () => api.get<BreedingEvent[]>('reproduction/upcoming_calvings/'),

//   /**
//    * Log a new breeding event (AI or Natural)
//    */
//   addBreedingEvent: (data: Partial<BreedingEvent>) => 
//     api.post<BreedingEvent>('reproduction/', data),

//   /**
//    * Update a breeding event (e.g., changing status from 'pending' to 'confirmed')
//    */
//   updateBreedingEvent: (id: number, data: Partial<BreedingEvent>) => 
//     api.patch<BreedingEvent>(`reproduction/${id}/`, data),

//   /**
//    * Delete a record
//    */
//   deleteBreedingEvent: (id: number) => api.delete(`reproduction/${id}/`),
// };
import api from './api';
import { BreedingEvent, PaginatedResponse } from '../types/types';

export const reproductionService = {
  /**
   * Fetch paginated data safely using either a raw pagination URL or explicit parameter objects
   */
  getByUrl: <T>(url: string) => api.get<PaginatedResponse<T>>(url),

  /**
   * Fetch all breeding records with standardized pagination parameters
   */
  getBreedingHistory: (params: { page?: number; pageSize?: number; search?: string } = {}) => 
    api.get<PaginatedResponse<BreedingEvent>>('reproduction/', { params }),

  /**
   * Fetch paginated upcoming calving schedules
   */
  getUpcomingCalvings: (params: { page?: number } = {}) => 
    api.get<PaginatedResponse<BreedingEvent>>('reproduction/upcoming_calvings/', { params }),

  /**
   * Log a new breeding event (AI or Natural)
   */
  addBreedingEvent: (data: Partial<BreedingEvent>) => 
    api.post<BreedingEvent>('reproduction/', data),

  /**
   * Update a breeding event
   */
  updateBreedingEvent: (id: number, data: Partial<BreedingEvent>) => 
    api.patch<BreedingEvent>(`reproduction/${id}/`, data),

  /**
   * Delete a record
   */
  deleteBreedingEvent: (id: number) => api.delete(`reproduction/${id}/`),
};