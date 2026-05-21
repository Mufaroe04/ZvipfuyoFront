import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PaginatedResponse, Supplier } from '../../../types/types';
import { supplierService } from '../../../services/supplierService';

interface SupplierState {
  suppliers: PaginatedResponse<Supplier>;
  loading: boolean;
  error: string | null; 
}

const initialPaginatedState = { 
  results: [], 
  next: null, 
  previous: null, 
  count: 0 
};
const initialState: SupplierState = {
  suppliers: initialPaginatedState,
  loading: false,
  error: null,
};

// export const fetchSuppliers = createAsyncThunk(
//   'suppliers/fetchAll',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await supplierService.getSuppliers();
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue('Failed to load suppliers');
//     }
//   }
// );

export const fetchSuppliers = createAsyncThunk(
  'suppliers/fetchAll',
  async ({ page, url, pageSize }: { page?: number, url?: string, pageSize?: number } = {}, { rejectWithValue }) => {
    try {
      const response = url 
        ? await supplierService.getByUrl<Supplier>(url) 
        : await supplierService.getSuppliers({ page, pageSize });
      
      // Ensure we extract a structured PaginatedResponse
      const data = response.data;
      if (Array.isArray(data)) {
        return { results: data, next: null, previous: null, count: data.length } as PaginatedResponse<InventoryItem>;
      }
      return data as PaginatedResponse<Supplier>;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load inventory');
    }
  }
);
export const addSupplier = createAsyncThunk(
  'suppliers/add',
  async (data: Partial<Supplier>, { rejectWithValue }) => {
    try {
      const response = await supplierService.addSupplier(data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue('Failed to add supplier');
    }
  }
);

const supplierSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.suppliers = action.payload;
        state.loading = false;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.suppliers.results.unshift(action.payload);
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

export default supplierSlice.reducer;