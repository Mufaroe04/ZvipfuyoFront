import api from './api';
import { PaginatedResponse, Supplier } from '../types/types';

export const supplierService = {
  getByUrl: <T>(url: string) => api.get<PaginatedResponse<T>>(url),

  getSuppliers: (params:{page?: number,pageSize?: number}={}) => api.get<Supplier[]>('suppliers/',{params}),
  
  getSupplierDetail: (id: number) => api.get<Supplier>(`suppliers/${id}/`),
  
  addSupplier: (data: Partial<Supplier>) => 
    api.post<Supplier>('suppliers/', data),
    
  updateSupplier: (id: number, data: Partial<Supplier>) => 
    api.patch<Supplier>(`suppliers/${id}/`, data),
     
  deleteSupplier: (id: number) => 
    api.delete(`suppliers/${id}/`),
};