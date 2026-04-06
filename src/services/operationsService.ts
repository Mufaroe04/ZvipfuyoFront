import api from './api';
import { HealthRecord, Task, CountingSession, Transfer, WeightEntry } from '../types/types';

export const operationsService = {
  // --- Health Records ---
  getHealthRecords: () => api.get<HealthRecord[]>('health/'),
  addHealthRecord: (data: Partial<HealthRecord>) => api.post<HealthRecord>('health/', data),
  updateHealthRecord: (id: number, data: Partial<HealthRecord>) => api.patch<HealthRecord>(`health/${id}/`, data),
  deleteHealthRecord: (id: number) => api.delete(`health/${id}/`),
  
  // NEW: Fetch health records for a specific animal
  getAnimalHealthHistory: (animalId: number) => 
    api.get<HealthRecord[]>(`health/`, { params: { animal_id: animalId } }),

  // --- Tasks ---
  getTasks: (completed?: boolean) => api.get<Task[]>('tasks/', { params: { completed } }),
  toggleTask: (id: number, status: boolean) => api.patch<Task>(`tasks/${id}/`, { is_completed: status }),
  deleteTask: (id: number) => api.delete(`tasks/${id}/`),

  // --- Counting (Audits) ---
  getCountingSessions: () => api.get<CountingSession[]>('counting/'),
  submitCount: (data: Partial<CountingSession>) => api.post<CountingSession>('counting/', data),
  // --- Transfers (Digital Kraal) ---
getTransfers: () => api.get<Transfer[]>('transfers/'),
addTransfer: (data: Partial<Transfer>) => api.post<Transfer>('transfers/', data),
// Custom action to trigger the 'dispatch' (set truck in motion)
// services/operationsService.ts
dispatchTransfer: (id: number) => api.post<{ status: string }>(`transfers/${id}/dispatch_transfer/`),
// --- Weight Tracking ---
getWeightEntries: (animalId?: number) => 
  api.get<WeightEntry[]>('weights/', { params: { animal_id: animalId } }),

addWeightEntry: (data: { animal: number; weight_kg: number; date: string }) => 
  api.post<WeightEntry>('weights/', data),

};
