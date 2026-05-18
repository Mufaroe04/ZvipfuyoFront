// import api from './api';
// import { HealthRecord, Task, CountingSession, Transfer, WeightEntry, MilkYield, MilkQuality, LactationPeriod, MilkYieldPayload, MarketPrice, PaginatedResponse } from '../types/types';

// export const operationsService = {
//   // --- Health Records ---
//   getHealthRecords: () => api.get<HealthRecord[]>('health/'),
//   addHealthRecord: (data: Partial<HealthRecord>) => api.post<HealthRecord>('health/', data),
//   updateHealthRecord: (id: number, data: Partial<HealthRecord>) => api.patch<HealthRecord>(`health/${id}/`, data),
  // deleteHealthRecord: (id: number) => api.delete(`health/${id}/`),
  
//   // NEW: Fetch health records for a specific animal
//   getAnimalHealthHistory: (animalId: number) => 
//     api.get<HealthRecord[]>(`health/`, { params: { animal_id: animalId } }),

//   // --- Tasks ---
//   getTasks: (completed?: boolean) => api.get<PaginatedResponse<Task>>('tasks/', { params: { completed } }),
//   toggleTask: (id: number, status: boolean) => api.patch<Task>(`tasks/${id}/`, { is_completed: status }),
//   deleteTask: (id: number) => api.delete(`tasks/${id}/`),

//   // --- Counting (Audits) ---
//   getCountingSessions: () => api.get<CountingSession[]>('counting/'),
//   submitCount: (data: Partial<CountingSession>) => api.post<CountingSession>('counting/', data),
//   // --- Transfers (Digital Kraal) ---
// getTransfers: () => api.get<Transfer[]>('transfers/'),
// addTransfer: (data: Partial<Transfer>) => api.post<Transfer>('transfers/', data),
// // Custom action to trigger the 'dispatch' (set truck in motion)
// dispatchTransfer: (id: number) => api.post<{ status: string }>(`transfers/${id}/dispatch_transfer/`),
// // --- Weight Tracking ---
// getWeightEntries: (animalId?: number) => 
//   api.get<WeightEntry[]>('weights/', { params: { animal_id: animalId } }),

// addWeightEntry: (data: { animal: number; weight_kg: number; date: string; condition_score?: number }) => 
//     api.post<WeightEntry>('weights/', data),
// updateWeight: (id: number, data: Partial<WeightEntry>) => api.patch<WeightEntry>(`weights/${id}/`, data),

// // --- MilkYield Tracking ---
// getMilkYield:()=>api.get<MilkYield[]>('milk-yields/'),
// addMilkYield: (data: MilkYieldPayload) => api.post<MilkYield>('milk-yields/', data),
// // For updates, Partial is perfect because we might only change one field
// updateMilkYield: (id: number, data: Partial<MilkYield>) => api.patch<MilkYield>(`milk-yields/${id}/`, data),
// deleteMilkYeild:(id: number) => api.delete(`milk-yields/${id}/`),

// // --- MilkQuality Tracking ---
// getMilkQuality:()=>api.get<MilkQuality[]>('milk-quality/'),
// addMilkQuality:(data:Partial<MilkQuality>)=>api.post<MilkQuality>('milk-quality/',data),
// updateMilkQuality:(id: number,data:Partial<MilkQuality>)=>api.patch<MilkQuality>(`milk-quality/${id}`,data),
// deleteMilkQuality:(id: number) => api.delete(`milk-quality/${id}/`),

// // --- LactationPeriod Tracking ---
// getLactationPeriod:()=>api.get<LactationPeriod[]>('lactations/'),
// addLactationPeriod:(data:Partial<LactationPeriod>)=>api.post<LactationPeriod>('lactations/',data),
// updateLactationPeriod:(id: number,data:Partial<LactationPeriod>)=>api.patch<LactationPeriod>(`lactations/${id}`,data),
// updateLactationPeriodDryOff:(id: number)=>api.post<LactationPeriod>(`lactations/${id}/dry_off/`),
// deleteLactationPeriod:(id: number) => api.delete(`lactations/${id}/`),

// getMarketPrices: () => api.get<MarketPrice[]>('market-prices/'),
//   updateMarketPrice: (id: number, price: number) => 
//     api.patch<MarketPrice>(`market-prices/${id}/`, { price_per_kg: price }),
//   addMarketPrice: (data: Partial<MarketPrice>) => api.post<MarketPrice>('market-prices/', data),

//   getByUrl: (url: string) => api.get(url),
// };

// import api from './api';
// import { 
//   HealthRecord, Task, CountingSession, Transfer, WeightEntry, 
//   MilkYield, MilkQuality, LactationPeriod, MilkYieldPayload, 
//   MarketPrice, PaginatedResponse 
// } from '../types/types';

// export const operationsService = {
//   // --- Generic Fetch for Pagination ---
//   // This is used by Thunks when 'next' or 'previous' links are clicked
//   getByUrl: <T>(url: string) => api.get<PaginatedResponse<T>>(url),

//   // --- Health Records ---
//   getHealthRecords: () => api.get<PaginatedResponse<HealthRecord>>('health/'),
//   addHealthRecord: (data: Partial<HealthRecord>) => api.post<HealthRecord>('health/', data),
//   updateHealthRecord: (id: number, data: Partial<HealthRecord>) => api.patch<HealthRecord>(`health/${id}/`, data),
//   deleteHealthRecord: (id: number) => api.delete(`health/${id}/`),
  
//   getAnimalHealthHistory: (animalId: number) => 
//     api.get<PaginatedResponse<HealthRecord>>(`health/`, { params: { animal_id: animalId } }),

//   // --- Tasks ---
//   getTasks: (completed?: boolean) => api.get<PaginatedResponse<Task>>('tasks/', { params: { completed } }),
//   toggleTask: (id: number, status: boolean) => api.patch<Task>(`tasks/${id}/`, { is_completed: status }),
//   deleteTask: (id: number) => api.delete(`tasks/${id}/`),

//   // --- Counting (Audits) ---
//   getCountingSessions: () => api.get<PaginatedResponse<CountingSession>>('counting/'),
//   submitCount: (data: Partial<CountingSession>) => api.post<CountingSession>('counting/', data),

//   // --- Transfers (Digital Kraal) ---
//   getTransfers: () => api.get<PaginatedResponse<Transfer>>('transfers/'),
//   addTransfer: (data: Partial<Transfer>) => api.post<Transfer>('transfers/', data),
//   dispatchTransfer: (id: number) => api.post<{ status: string }>(`transfers/${id}/dispatch_transfer/`),

//   // --- Weight Tracking ---
// getWeightEntries: (params: { animal_id?: number; page?: number } = {}) => 
//   api.get<PaginatedResponse<WeightEntry>>('weights/', { params }),
//   addWeightEntry: (data: { animal: number; weight_kg: number; date: string; condition_score?: number }) => 
//     api.post<WeightEntry>('weights/', data),
//   updateWeight: (id: number, data: Partial<WeightEntry>) => api.patch<WeightEntry>(`weights/${id}/`, data),

//   // --- MilkYield Tracking ---
//   getMilkYield: () => api.get<PaginatedResponse<MilkYield>>('milk-yields/'),
//   addMilkYield: (data: MilkYieldPayload) => api.post<MilkYield>('milk-yields/', data),
//   updateMilkYield: (id: number, data: Partial<MilkYield>) => api.patch<MilkYield>(`milk-yields/${id}/`, data),
//   deleteMilkYield: (id: number) => api.delete(`milk-yields/${id}/`),

//   // --- MilkQuality Tracking ---
//   getMilkQuality: () => api.get<PaginatedResponse<MilkQuality>>('milk-quality/'),
//   addMilkQuality: (data: Partial<MilkQuality>) => api.post<MilkQuality>('milk-quality/', data),
//   updateMilkQuality: (id: number, data: Partial<MilkQuality>) => api.patch<MilkQuality>(`milk-quality/${id}/`, data),
//   deleteMilkQuality: (id: number) => api.delete(`milk-quality/${id}/`),

//   // --- LactationPeriod Tracking ---
//   getLactationPeriod: () => api.get<PaginatedResponse<LactationPeriod>>('lactations/'),
//   addLactationPeriod: (data: Partial<LactationPeriod>) => api.post<LactationPeriod>('lactations/', data),
//   updateLactationPeriod: (id: number, data: Partial<LactationPeriod>) => api.patch<LactationPeriod>(`lactations/${id}/`, data),
//   updateLactationPeriodDryOff: (id: number) => api.post<LactationPeriod>(`lactations/${id}/dry_off/`),
//   deleteLactationPeriod: (id: number) => api.delete(`lactations/${id}/`),

//   // --- Market Prices ---
//   getMarketPrices: () => api.get<PaginatedResponse<MarketPrice>>('market-prices/'),
//   updateMarketPrice: (id: number, price: number) => 
//     api.patch<MarketPrice>(`market-prices/${id}/`, { price_per_kg: price }),
//   addMarketPrice: (data: Partial<MarketPrice>) => api.post<MarketPrice>('market-prices/', data),
// };

import api from './api';
import { 
  HealthRecord, Task, CountingSession, Transfer, WeightEntry, 
  MilkYield, MilkQuality, LactationPeriod, MilkYieldPayload, 
  MarketPrice, PaginatedResponse 
} from '../types/types';

export const operationsService = {
  getByUrl: <T>(url: string) => api.get<PaginatedResponse<T>>(url),

  // --- Health Records ---
  getHealthRecords: (params: { animal_id?: number; page?: number } = {}) => 
    api.get<PaginatedResponse<HealthRecord>>('health/', { params }),
  addHealthRecord: (data: Partial<HealthRecord>) => api.post<HealthRecord>('health/', data),
  updateHealthRecord: (id: number, data: Partial<HealthRecord>) => api.patch<HealthRecord>(`health/${id}/`, data),
  deleteHealthRecord: (id: number) => api.delete(`health/${id}/`),
  getAnimalHealthHistory: (animalId: number) => 
    api.get<HealthRecord[]>(`health/`, { params: { animal_id: animalId } }),

  // --- Tasks ---
  getTasks: (params: { completed?: boolean; page?: number } = {}) => 
    api.get<PaginatedResponse<Task>>('tasks/', { params }),
  toggleTask: (id: number, status: boolean) => api.patch<Task>(`tasks/${id}/`, { is_completed: status }),
  deleteTask: (id: number) => api.delete(`tasks/${id}/`),

  // --- Counting ---
  getCountingSessions: (params: { page?: number } = {}) => 
    api.get<PaginatedResponse<CountingSession>>('counting/', { params }),
  submitCount: (data: Partial<CountingSession>) => api.post<CountingSession>('counting/', data),

  // --- Transfers ---
  getTransfers: (params: { page?: number } = {}) => 
    api.get<PaginatedResponse<Transfer>>('transfers/', { params }),
  addTransfer: (data: Partial<Transfer>) => api.post<Transfer>('transfers/', data),
  dispatchTransfer: (id: number) => api.post<{ status: string }>(`transfers/${id}/dispatch_transfer/`),

  // --- Weight Tracking ---
  getWeightEntries: (params: { animal_id?: number; page?: number } = {}) => 
    api.get<PaginatedResponse<WeightEntry>>('weights/', { params }),
  addWeightEntry: (data: { animal: number; weight_kg: number; date: string; condition_score?: number }) => 
    api.post<WeightEntry>('weights/', data),
  updateWeight: (id: number, data: Partial<WeightEntry>) => api.patch<WeightEntry>(`weights/${id}/`, data),

  // --- MilkYield Tracking ---
  getMilkYield: (params: { page?: number } = {}) => 
    api.get<PaginatedResponse<MilkYield>>('milk-yields/', { params }),
  addMilkYield: (data: MilkYieldPayload) => api.post<MilkYield>('milk-yields/', data),
  updateMilkYield: (id: number, data: Partial<MilkYield>) => api.patch<MilkYield>(`milk-yields/${id}/`, data),
  deleteMilkYield: (id: number) => api.delete(`milk-yields/${id}/`),

  // --- MilkQuality Tracking ---
  getMilkQuality: (params: { page?: number } = {}) => 
    api.get<PaginatedResponse<MilkQuality>>('milk-quality/', { params }),
  addMilkQuality: (data: Partial<MilkQuality>) => api.post<MilkQuality>('milk-quality/', data),
  updateMilkQuality: (id: number, data: Partial<MilkQuality>) => api.patch<MilkQuality>(`milk-quality/${id}/`, data),
  deleteMilkQuality: (id: number) => api.delete(`milk-quality/${id}/`),

  // --- LactationPeriod Tracking ---
  getLactationPeriod: (params: { page?: number } = {}) => 
    api.get<PaginatedResponse<LactationPeriod>>('lactations/', { params }),
  addLactationPeriod: (data: Partial<LactationPeriod>) => api.post<LactationPeriod>('lactations/', data),
  updateLactationPeriod: (id: number, data: Partial<LactationPeriod>) => api.patch<LactationPeriod>(`lactations/${id}/`, data),
  updateLactationPeriodDryOff: (id: number) => api.post<LactationPeriod>(`lactations/${id}/dry_off/`),
  deleteLactationPeriod: (id: number) => api.delete(`lactations/${id}/`),

  // --- Market Prices ---
  getMarketPrices: (params: { page?: number } = {}) => 
    api.get<PaginatedResponse<MarketPrice>>('market-prices/', { params }),
  updateMarketPrice: (id: number, price: number) => 
    api.patch<MarketPrice>(`market-prices/${id}/`, { price_per_kg: price }),
  addMarketPrice: (data: Partial<MarketPrice>) => api.post<MarketPrice>('market-prices/', data),
};