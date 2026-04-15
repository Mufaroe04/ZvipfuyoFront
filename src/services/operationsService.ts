import api from './api';
import { HealthRecord, Task, CountingSession, Transfer, WeightEntry, MilkYield, MilkQuality, LactationPeriod, MilkYieldPayload } from '../types/types';

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
dispatchTransfer: (id: number) => api.post<{ status: string }>(`transfers/${id}/dispatch_transfer/`),
// --- Weight Tracking ---
getWeightEntries: (animalId?: number) => 
  api.get<WeightEntry[]>('weights/', { params: { animal_id: animalId } }),

addWeightEntry: (data: { animal: number; weight_kg: number; date: string }) => 
  api.post<WeightEntry>('weights/', data),

// --- MilkYield Tracking ---
getMilkYield:()=>api.get<MilkYield[]>('milk-yields/'),
addMilkYield: (data: MilkYieldPayload) => api.post<MilkYield>('milk-yields/', data),
// For updates, Partial is perfect because we might only change one field
updateMilkYield: (id: number, data: Partial<MilkYield>) => api.patch<MilkYield>(`milk-yields/${id}/`, data),
deleteMilkYeild:(id: number) => api.delete(`milk-yields/${id}/`),

// --- MilkQuality Tracking ---
getMilkQuality:()=>api.get<MilkQuality[]>('milk-quality/'),
addMilkQuality:(data:Partial<MilkQuality>)=>api.post<MilkQuality>('milk-quality/',data),
updateMilkQuality:(id: number,data:Partial<MilkQuality>)=>api.patch<MilkQuality>(`milk-quality/${id}`,data),
deleteMilkQuality:(id: number) => api.delete(`milk-quality/${id}/`),

// --- LactationPeriod Tracking ---
getLactationPeriod:()=>api.get<LactationPeriod[]>('lactations/'),
addLactationPeriod:(data:Partial<LactationPeriod>)=>api.post<LactationPeriod>('lactations/',data),
updateLactationPeriod:(id: number,data:Partial<LactationPeriod>)=>api.patch<LactationPeriod>(`lactations/${id}`,data),
updateLactationPeriodDry_off:(id: number)=>api.patch<LactationPeriod>(`lactations/${id}/dry_off/`),
deleteLactationPeriod:(id: number) => api.delete(`lactations/${id}/`),
};
