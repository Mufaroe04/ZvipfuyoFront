import api from './api';
import { Animal, Herd, DashboardData, BreedingEvent, HerdPayload, AnimalPayload, HerdDetail } from '../types/types';

export const livestockService = {
  getDashboardStats: () => api.get<DashboardData>('dashboard-stats/'),
  getHerds: () => api.get<Herd[]>('herds/'),
  // ADD THIS LINE: Fetch a specific herd with its nested animals
  getHerdDetail: (id: number) => api.get<HerdDetail>(`herds/${id}/`),
  createHerd :async( heardData :HerdPayload) :Promise<Herd>=>api.post('herds/',heardData),
  updateHerd: (id: number, data: HerdPayload) => api.patch<Herd>(`herds/${id}/`, data),
  deleteHerd: (id: number) => api.delete(`herds/${id}/`),
  getAnimals: (search?: string) => api.get<Animal[]>('animals/', { params: { search } }),
  getAnimalDetail: (id: number) => api.get<Animal>(`animals/${id}/`),
  // Animal CRUD
  // createAnimal: async (data: AnimalPayload):Promise<Animal> => api.post('animals/', data),
  createAnimal: (data: AnimalPayload) => api.post<Animal>('animals/', data),
  updateAnimal: (id: number, data: any) => api.patch<Animal>(`animals/${id}/`, data),
  deleteAnimal: (id: number) => api.delete(`animals/${id}/`),
  getReproductiveReport: () => api.get('animals/reproductive_report/'),
  getUpcomingCalvings: () => api.get<BreedingEvent[]>('reproduction/upcoming_calvings/'),
  
  // Weight logging logic
  logWeight: (animalId: number, weight: number, date: string) => 
    api.post(`/inventory/animals/${animalId}/weight_logs/`, { weight, date_recorded: date }),
    
  getWeightHistory: (animalId: number) => 
    api.get(`/inventory/animals/${animalId}/weight_history/`),
  // Inside livestockService object
  markHerdHealthy: (id: number) => api.post(`herds/${id}/mark_all_healthy/`),
  vaccinateHerd: (id: number, type: string) => api.post(`herds/${id}/vaccinate_herd/`, { vaccine_type: type }),

};