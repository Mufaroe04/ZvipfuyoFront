import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Transfer } from '../../../types/types';
import { logisticsService } from '../../../services/logisticsService';

interface LogisticsState {
  transfers: Transfer[];
  loading: boolean;
  dispatchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LogisticsState = {
  transfers: [],
  loading: false,
  dispatchStatus: 'idle',
  error: null,
};

// --- THUNKS ---

export const fetchTransfers = createAsyncThunk('logistics/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await logisticsService.getTransfers();
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch transfers');
  }
});

export const dispatchTransfer = createAsyncThunk(
  'logistics/dispatch',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await logisticsService.dispatchTruck(id);
      return { id, status: 'intransit' }; // Django returns {'status': 'In Transit'}
    } catch (err: any) {
      return rejectWithValue('Dispatch failed. Check vehicle requirements.');
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
      .addCase(fetchTransfers.fulfilled, (state, action: PayloadAction<Transfer[]>) => {
        state.transfers = action.payload;
        state.loading = false;
      })
      .addCase(dispatchTransfer.pending, (state) => {
        state.dispatchStatus = 'loading';
      })
      .addCase(dispatchTransfer.fulfilled, (state, action) => {
        state.dispatchStatus = 'succeeded';
        // Update the local state for the specific transfer
        const index = state.transfers.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.transfers[index].status = 'intransit';
        }
      })
      .addCase(dispatchTransfer.rejected, (state, action) => {
        state.dispatchStatus = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { resetDispatchStatus } = logisticsSlice.actions;
export default logisticsSlice.reducer;