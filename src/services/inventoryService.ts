import api from './api';
import { InventoryItem, PaginatedResponse, Procurement } from '../types/types';

export const inventoryService = {
  getByUrl: <T>(url: string) => api.get<PaginatedResponse<T>>(url),

  /**
   * Fetch inventory items. 
   * Pass true to get only low stock alerts (Dashboard), or false/undefined for the full list (Inventory Page).
   */
  getInventory: (params:{low_stock?: boolean,page?: number,pageSize?: number}={}) => 
    api.get<InventoryItem[]>('inventory/', { params}),

  /**
   * Get a single item's details
   */
  getItemDetail: (id: number) => api.get<InventoryItem>(`inventory/${id}/`),

  /**
   * Add new stock (e.g., buying 50 bags of feed)
   */
  addInventoryItem: (data: Partial<InventoryItem>) => 
    api.post<InventoryItem>('inventory/', data),

  /**
   * Update stock levels or reorder points. 
   * This covers both general updates and specific stock-level increments.
   */
  updateInventoryItem: (id: number, data: Partial<InventoryItem>) => 
    api.patch<InventoryItem>(`inventory/${id}/`, data),

  /**
   * Delete an inventory record
   */
  deleteInventoryItem: (id: number) => 
    api.delete(`inventory/${id}/`),

  getProcurements: (params:{page?: number,pageSize?: number}={}) => 
    api.get<PaginatedResponse<Procurement>>('procurement/', { params}),
  getProcurementById: (id: number) => 
    api.get<Procurement>(`procurement/${id}/`, ),
};