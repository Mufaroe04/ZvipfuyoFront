import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Transfer, PaginatedResponse } from '../../../types/types';
import { logisticsService } from '../../../services/logisticsService';


interface LogisticsState {
  transfers: PaginatedResponse<Transfer>;
  loading: boolean;
  dispatchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Ensure the initial state structure matches standard API paginated bounds
const initialPaginatedState: PaginatedResponse<Transfer> = { 
  results: [], 
  next: null, 
  previous: null, 
  count: 0 
};

const initialState: LogisticsState = {
  transfers: initialPaginatedState,
  loading: false,
  dispatchStatus: 'idle',
  error: null,
};

// --- THUNKS ---

export const fetchTransfers = createAsyncThunk<
  PaginatedResponse<Transfer>,
  { page?: number; page_size?: number } | undefined,
  { rejectValue: string }
>(
  'logistics/fetchAll', 
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await logisticsService.getTransfers(params);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch transfers');
    }
  }
);

export const dispatchTransferAction = createAsyncThunk<
  number, // Returns the ID on success
  number,
  { rejectValue: string }
>(
  'logistics/dispatch',
  async (id, { rejectWithValue }) => {
    try {
      await logisticsService.dispatchTransfer(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Dispatch verification failed.');
    }
  }
);

export const deleteTransferAction = createAsyncThunk<
  number, // Returns the ID on success
  number,
  { rejectValue: string }
>(
  'logistics/delete',
  async (id, { rejectWithValue }) => {
    try {
      await logisticsService.deleteTransfer(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete transfer.');
    }
  }
);

// --- SLICE ---

const logisticsSlice = createSlice({
  name: 'logistics',
  initialState,
  reducers: {
    resetDispatchStatus: (state) => {
      state.dispatchStatus = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch History
      .addCase(fetchTransfers.fulfilled, (state, action) => {
        state.transfers = action.payload;
      })
      
      // Dispatch Pipeline Orchestration
      .addCase(dispatchTransferAction.pending, (state) => {
        state.dispatchStatus = 'loading';
      })
      .addCase(dispatchTransferAction.fulfilled, (state, action: PayloadAction<number>) => {
        state.dispatchStatus = 'succeeded';
        const index = state.transfers.results.findIndex(t => t.id === action.payload);
        if (index !== -1) {
          state.transfers.results[index].status = 'intransit';
        }
      })
      .addCase(dispatchTransferAction.rejected, (state, action) => {
        state.dispatchStatus = 'failed';
        state.error = action.payload as string;
      })
      
      // Delete Manifest Record
      .addCase(deleteTransferAction.fulfilled, (state, action: PayloadAction<number>) => {
        state.transfers.results = state.transfers.results.filter(t => t.id !== action.payload);
        state.transfers.count -= 1;
      })

      // Global Architectural Profile Matchers (Unified loading/error processing states)
      .addMatcher((action) => action.type.endsWith('/pending'), (state, action) => {
        // Prevent listing loader from overriding specialized dispatch statuses
        if (!action.type.includes('dispatch')) {
          state.loading = true;
        }
        state.error = null;
      })
      .addMatcher((action): action is PayloadAction<string> => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        // Intercept slice actions and map clean messaging structures
        if (!action.type.includes('dispatch')) {
          state.error = action.payload || 'An operational sequence error has occurred.';
        }
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
        state.loading = false;
      });
  },
});

export const { resetDispatchStatus } = logisticsSlice.actions;
export default logisticsSlice.reducer;