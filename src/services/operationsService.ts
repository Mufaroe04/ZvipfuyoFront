import api from './api';
import { 
  HealthRecord, Task, CountingSession, Transfer, WeightEntry, 
  MilkYield, MilkQuality, LactationPeriod, MilkYieldPayload, 
  MarketPrice, PaginatedResponse 
} from '../types/types';

export const operationsService = {
  getByUrl: <T>(url: string) => api.get<PaginatedResponse<T>>(url),

  // --- Health Records ---
  getHealthRecords: (params: { animal_id?: string; page?: number } = {}) => 
    api.get<PaginatedResponse<HealthRecord>>('health/', { params }),
  addHealthRecord: (data: Partial<HealthRecord>) => api.post<HealthRecord>('health/', data),
  updateHealthRecord: (id: string, data: Partial<HealthRecord>) => api.patch<HealthRecord>(`health/${id}/`, data),
  deleteHealthRecord: (id: string) => api.delete(`health/${id}/`),
  getAnimalHealthHistory: (animalId: string) => 
    api.get<HealthRecord[]>(`health/`, { params: { animal_id: animalId } }),

  // --- Tasks ---
  getTasks: (params: { completed?: boolean; page?: number } = {}) => 
    api.get<PaginatedResponse<Task>>('tasks/', { params }),
  toggleTask: (id: string, status: boolean) => api.patch<Task>(`tasks/${id}/`, { is_completed: status }),
  deleteTask: (id: string) => api.delete(`tasks/${id}/`),

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
  getWeightEntries: (params: { animal_id?: string; page?: number } = {}) => 
    api.get<PaginatedResponse<WeightEntry>>('weights/', { params }),
  addWeightEntry: (data: { animal: number; weight_kg: number; date: string; condition_score?: number }) => 
    api.post<WeightEntry>('weights/', data),
  updateWeight: (id: string, data: Partial<WeightEntry>) => api.patch<WeightEntry>(`weights/${id}/`, data),

  // --- MilkYield Tracking ---
  getMilkYield: (params: { page?: number } = {}) => 
    api.get<PaginatedResponse<MilkYield>>('milk-yields/', { params }),
  addMilkYield: (data: MilkYieldPayload) => api.post<MilkYield>('milk-yields/', data),
  updateMilkYield: (id: string, data: Partial<MilkYield>) => api.patch<MilkYield>(`milk-yields/${id}/`, data),
  deleteMilkYield: (id: string) => api.delete(`milk-yields/${id}/`),

  // --- MilkQuality Tracking ---
  getMilkQuality: (params: { page?: number } = {}) => 
    api.get<PaginatedResponse<MilkQuality>>('milk-quality/', { params }),
  addMilkQuality: (data: Partial<MilkQuality>) => api.post<MilkQuality>('milk-quality/', data),
  updateMilkQuality: (id: string, data: Partial<MilkQuality>) => api.patch<MilkQuality>(`milk-quality/${id}/`, data),
  deleteMilkQuality: (id: string) => api.delete(`milk-quality/${id}/`),

  // --- LactationPeriod Tracking ---
  getLactationPeriod: (params: { page?: number } = {}) => 
    api.get<PaginatedResponse<LactationPeriod>>('lactations/', { params }),
  addLactationPeriod: (data: Partial<LactationPeriod>) => api.post<LactationPeriod>('lactations/', data),
  updateLactationPeriod: (id: string, data: Partial<LactationPeriod>) => api.patch<LactationPeriod>(`lactations/${id}/`, data),
  updateLactationPeriodDryOff: (id: string) => api.post<LactationPeriod>(`lactations/${id}/dry_off/`),
  deleteLactationPeriod: (id: string) => api.delete(`lactations/${id}/`),

  // --- Market Prices ---
  getMarketPrices: (params: { page?: number } = {}) => 
    api.get<PaginatedResponse<MarketPrice>>('market-prices/', { params }),
  updateMarketPrice: (id: string, price: number) => 
    api.patch<MarketPrice>(`market-prices/${id}/`, { price_per_kg: price }),
  addMarketPrice: (data: Partial<MarketPrice>) => api.post<MarketPrice>('market-prices/', data),
};