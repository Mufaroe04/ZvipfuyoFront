import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { InventoryItem } from '../../../types/types';
import { inventoryService } from '../../../services/inventoryService';

interface InventoryState {
  items: InventoryItem[];
  lowStockItems: InventoryItem[];
  loading: boolean;
  actionLoading: boolean; // Tracking specific actions like adding/updating
  error: string | null;
}

const initialState: InventoryState = {
  items: [],
  lowStockItems: [],
  loading: false,
  actionLoading: false,
  error: null,
};

// --- THUNKS ---

export const fetchAllInventory = createAsyncThunk(
  'inventory/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await inventoryService.getInventory();
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load inventory');
    }
  }
);

export const fetchLowStockAlerts = createAsyncThunk(
  'inventory/fetchLowStock',
  async (_, { rejectWithValue }) => {
    try {
      const response = await inventoryService.getInventory(true);
      return response.data;
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
      return response.data;
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
      return response.data;
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
      .addCase(fetchAllInventory.pending, (state) => {
        state.loading = true;
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
        state.items.unshift(action.payload);
        // If the new item is low stock, add it there too
        if (action.payload.is_low_stock) {
          state.lowStockItems.unshift(action.payload);
        }
      })

      // Update Item
      .addCase(updateInventoryItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        
        // Synchronize low stock alerts list
        if (action.payload.is_low_stock) {
          const alertIndex = state.lowStockItems.findIndex(i => i.id === action.payload.id);
          if (alertIndex === -1) state.lowStockItems.push(action.payload);
          else state.lowStockItems[alertIndex] = action.payload;
        } else {
          state.lowStockItems = state.lowStockItems.filter(i => i.id !== action.payload.id);
        }
      })

      // Delete Item
      .addCase(deleteInventoryItem.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
        state.lowStockItems = state.lowStockItems.filter(i => i.id !== action.payload);
      });
  },
});

export default inventorySlice.reducer;