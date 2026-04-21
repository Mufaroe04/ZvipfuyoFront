import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Supplier } from '../../../types/types';
import { supplierService } from '../../../services/supplierService';

interface SupplierState {
  suppliers: Supplier[];
  loading: boolean;
  error: string | null;
}

const initialState: SupplierState = {
  suppliers: [],
  loading: false,
  error: null,
};

export const fetchSuppliers = createAsyncThunk(
  'suppliers/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await supplierService.getSuppliers();
      return response.data;
    } catch (err: any) {
      return rejectWithValue('Failed to load suppliers');
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
      .addCase(fetchSuppliers.pending, (state) => { state.loading = true; })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.suppliers = action.payload;
        state.loading = false;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.suppliers.unshift(action.payload);
      });
  },
});

export default supplierSlice.reducer;