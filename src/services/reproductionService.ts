import api from './api';
import { BreedingEvent } from '../types/types';

export const reproductionService = {
  /**
   * Fetch all breeding records (Historical and Active)
   */
  getBreedingHistory: () => api.get<BreedingEvent[]>('reproduction/'),

  /**
   * Dashboard specific: Fetch confirmed pregnancies due in the next 30 days
   */
  getUpcomingCalvings: () => api.get<BreedingEvent[]>('reproduction/upcoming_calvings/'),

  /**
   * Log a new breeding event (AI or Natural)
   */
  addBreedingEvent: (data: Partial<BreedingEvent>) => 
    api.post<BreedingEvent>('reproduction/', data),

  /**
   * Update a breeding event (e.g., changing status from 'pending' to 'confirmed')
   */
  updateBreedingEvent: (id: number, data: Partial<BreedingEvent>) => 
    api.patch<BreedingEvent>(`reproduction/${id}/`, data),

  /**
   * Delete a record
   */
  deleteBreedingEvent: (id: number) => api.delete(`reproduction/${id}/`),
};