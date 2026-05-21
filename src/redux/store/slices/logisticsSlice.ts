// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { Transfer } from '../../../types/types';
// import { logisticsService } from '../../../services/logisticsService';

// interface LogisticsState {
//   transfers: Transfer[];
//   loading: boolean;
//   dispatchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: LogisticsState = {
//   transfers: [],
//   loading: false,
//   dispatchStatus: 'idle',
//   error: null,
// };

// // --- THUNKS ---

// export const fetchTransfers = createAsyncThunk('logistics/fetchAll', async (_, { rejectWithValue }) => {
//   try {
//     const response = await logisticsService.getTransfers();
//     return response.data;
//   } catch (err: any) {
//     return rejectWithValue(err.response?.data?.message || 'Failed to fetch transfers');
//   }
// });

// export const dispatchTransfer = createAsyncThunk(
//   'logistics/dispatch',
//   async (id: number, { rejectWithValue }) => {
//     try {
//       const response = await logisticsService.dispatchTruck(id);
//       return { id, status: 'intransit' }; // Django returns {'status': 'In Transit'}
//     } catch (err: any) {
//       return rejectWithValue('Dispatch failed. Check vehicle requirements.');
//     }
//   }
// );

// // --- SLICE ---

// const logisticsSlice = createSlice({
//   name: 'logistics',
//   initialState,
//   reducers: {
//     resetDispatchStatus: (state) => {
//       state.dispatchStatus = 'idle';
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTransfers.fulfilled, (state, action: PayloadAction<Transfer[]>) => {
//         state.transfers = action.payload;
//         state.loading = false;
//       })
//       .addCase(dispatchTransfer.pending, (state) => {
//         state.dispatchStatus = 'loading';
//       })
//       .addCase(dispatchTransfer.fulfilled, (state, action) => {
//         state.dispatchStatus = 'succeeded';
//         // Update the local state for the specific transfer
//         const index = state.transfers.findIndex(t => t.id === action.payload.id);
//         if (index !== -1) {
//           state.transfers[index].status = 'intransit';
//         }
//       })
//       .addCase(dispatchTransfer.rejected, (state, action) => {
//         state.dispatchStatus = 'failed';
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { resetDispatchStatus } = logisticsSlice.actions;
// export default logisticsSlice.reducer;
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