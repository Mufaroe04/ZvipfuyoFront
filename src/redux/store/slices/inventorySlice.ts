// src/redux/store/slices/inventorySlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { InventoryItem, PaginatedResponse, Procurement } from '../../../types/types';
import { inventoryService } from '../../../services/inventoryService';
// import { prettyFormat } from '@testing-library/dom';

interface InventoryState {
  items: PaginatedResponse<InventoryItem>;
  lowStockItems: PaginatedResponse<InventoryItem>;
  procurements:PaginatedResponse<Procurement>;
  selectedOrder:Procurement |null;
  loading: boolean;
  actionLoading: boolean; 
  error: string | null;
}

const initialPaginatedState = { 
  results: [], 
  next: null, 
  previous: null, 
  count: 0 
};

const initialState: InventoryState = {
  items: initialPaginatedState,
  lowStockItems: initialPaginatedState,
  procurements:initialPaginatedState,
  selectedOrder:null,
  loading: false,
  actionLoading: false,
  error: null,
};

// --- THUNKS ---

export const fetchAllInventory = createAsyncThunk(
  'inventory/fetchAll',
  async ({ page, url, pageSize }: { page?: number, url?: string, pageSize?: number } = {}, { rejectWithValue }) => {
    try {
      const response = url 
        ? await inventoryService.getByUrl<InventoryItem>(url) 
        : await inventoryService.getInventory({ page, pageSize });
      
      // Ensure we extract a structured PaginatedResponse
      const data = response.data;
      if (Array.isArray(data)) {
        return { results: data, next: null, previous: null, count: data.length } as PaginatedResponse<InventoryItem>;
      }
      return data as PaginatedResponse<InventoryItem>;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load inventory');
    }
  }
);

export const getProcurements = createAsyncThunk(
  'procurements/fetchAll',
  async ({ page, url ,pageSize }: { page?: number, url?: string ,pageSize?:number } = {}, { rejectWithValue }) => {
    try {
    const response = url 
      ? await inventoryService.getByUrl<Procurement>(url) 
      : await inventoryService.getProcurements({ page ,pageSize });
       return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch procurements');
    }
  }
);

export const getProcurementById = createAsyncThunk(
  'procurements/getProcurementById',
  async ( id:number ,{ rejectWithValue }) => {
    try {
      const response = await inventoryService.getProcurementById(id);
    return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch Order details');
    }
  }
);

export const fetchLowStockAlerts = createAsyncThunk(
  'inventory/fetchLowStock',
  async ({ page, url, pageSize }: { page?: number, url?: string, pageSize?: number } = {}, { rejectWithValue }) => {
    try {
      const low_stock = true;
      const response = url 
        ? await inventoryService.getByUrl<InventoryItem>(url) 
        : await inventoryService.getInventory({ low_stock, page, pageSize });
      
      const data = response.data;
      if (Array.isArray(data)) {
        return { results: data, next: null, previous: null, count: data.length } as PaginatedResponse<InventoryItem>;
      }
      return data as PaginatedResponse<InventoryItem>;
    } catch (err: any) {
      return rejectWithValue('Failed to load stock alerts');
    }
  }
);

export const addInventoryItem = createAsyncThunk(
  'inventory/addItem',
  async (data: Partial<InventoryItem>, { rejectWithValue }) => {
    try {
      const response = await inventoryService.addInventoryItem(data);
      return response.data as InventoryItem;
    } catch (err: any) {
      return rejectWithValue('Failed to add inventory item');
    }
  }
);

export const updateInventoryItem = createAsyncThunk(
  'inventory/updateItem',
  async ({ id, data }: { id: number; data: Partial<InventoryItem> }, { rejectWithValue }) => {
    try {
      const response = await inventoryService.updateInventoryItem(id, data);
      return response.data as InventoryItem;
    } catch (err: any) {
      return rejectWithValue('Failed to update stock');
    }
  }
);

export const deleteInventoryItem = createAsyncThunk(
  'inventory/deleteItem',
  async (id: number, { rejectWithValue }) => {
    try {
      await inventoryService.deleteInventoryItem(id);
      return id;
    } catch (err: any) {
      return rejectWithValue('Failed to delete item');
    }
  }
); 

// --- SLICE ---

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetching all
      .addCase(getProcurements.fulfilled, (state, action) => {
        state.procurements = action.payload;
        state.loading = false;
      })
      .addCase(getProcurementById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload; 
      })
      .addCase(fetchAllInventory.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Low Stock Alerts
      .addCase(fetchLowStockAlerts.fulfilled, (state, action) => {
        state.lowStockItems = action.payload;
      })

      // Add Item
      .addCase(addInventoryItem.fulfilled, (state, action) => {
        state.items.results.unshift(action.payload);
        state.items.count += 1;
        
        if (action.payload.is_low_stock) {
          state.lowStockItems.results.unshift(action.payload);
          state.lowStockItems.count += 1;
        }
      })

      // Update Item
      .addCase(updateInventoryItem.fulfilled, (state, action) => {
        const index = state.items.results.findIndex(i => i.id === action.payload.id);
        if (index !== -1) {
          state.items.results[index] = action.payload;
        }
        
        if (action.payload.is_low_stock) {
          const alertIndex = state.lowStockItems.results.findIndex(i => i.id === action.payload.id);
          if (alertIndex === -1) {
            state.lowStockItems.results.push(action.payload);
            state.lowStockItems.count += 1;
          } else {
            state.lowStockItems.results[alertIndex] = action.payload;
          }
        } else {
          const prevLength = state.lowStockItems.results.length;
          state.lowStockItems.results = state.lowStockItems.results.filter(i => i.id !== action.payload.id);
          if (state.lowStockItems.results.length < prevLength) {
            state.lowStockItems.count -= 1;
          }
        }
      })

      // Delete Item
      .addCase(deleteInventoryItem.fulfilled, (state, action) => {
        const prevItemsLength = state.items.results.length;
        state.items.results = state.items.results.filter(i => i.id !== action.payload);
        if (state.items.results.length < prevItemsLength) {
          state.items.count -= 1;
        }

        const prevLowLength = state.lowStockItems.results.length;
        state.lowStockItems.results = state.lowStockItems.results.filter(i => i.id !== action.payload);
        if (state.lowStockItems.results.length < prevLowLength) {
          state.lowStockItems.count -= 1;
        }
      })
      
      // Matchers for Loading/Error states
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action):action is PayloadAction<string>  => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An operation failed';
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
        state.loading = false;
      })
            // Matchers for Loading/Error states
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action):action is PayloadAction<string>  => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An operation failed';
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
        state.loading = false;
      });
  },
});

export default inventorySlice.reducer;