import api from './api';
import { InventoryItem } from '../types/types';

export const inventoryService = {
  /**
   * Fetch inventory items. 
   * Pass true to get only low stock alerts (Dashboard), or false/undefined for the full list (Inventory Page).
   */
  getInventory: (lowStockOnly?: boolean) => 
    api.get<InventoryItem[]>('inventory/', { 
      params: { low_stock: lowStockOnly } 
    }),

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
};