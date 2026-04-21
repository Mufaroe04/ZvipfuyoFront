import api from './api';
import { Supplier } from '../types/types';

export const supplierService = {
  getSuppliers: () => api.get<Supplier[]>('suppliers/'),
  
  getSupplierDetail: (id: number) => api.get<Supplier>(`suppliers/${id}/`),
  
  addSupplier: (data: Partial<Supplier>) => 
    api.post<Supplier>('suppliers/', data),
    
  updateSupplier: (id: number, data: Partial<Supplier>) => 
    api.patch<Supplier>(`suppliers/${id}/`, data),
    
  deleteSupplier: (id: number) => 
    api.delete(`suppliers/${id}/`),
};