// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { BreedingEvent, PaginatedResponse } from '../../../types/types';
// import { reproductionService } from '../../../services/reproductionService';

// interface ReproductionState {
//   events: PaginatedResponse<BreedingEvent>;
//   upcomingCalvings: PaginatedResponse<BreedingEvent>;
//   loading: boolean;
//   error: string | null;
// }

// const initialPaginatedState = { results: [], next: null, previous: null, count: 0 };


// const initialState: ReproductionState = {
//   events: initialPaginatedState,
//   upcomingCalvings: initialPaginatedState,
//   loading: false,
//   error: null,
// };

// // --- THUNKS ---

// export const fetchBreedingHistory = createAsyncThunk(
//   'reproduction/fetchAll',
//   async ({ page, url, pageSize }: { page?: number; url?: string; pageSize?: number } = {}, { rejectWithValue }) => {
//     try {
//       const response = url 
//         ? await reproductionService.getByUrl<BreedingEvent>(url) 
//         : await reproductionService.getBreedingHistory({ page, pageSize });
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || 'Failed to load breeding records');
//     }
//   }
// );

// export const fetchUpcomingCalvings = createAsyncThunk(
//   'reproduction/fetchUpcoming',
//   async ({ page, url }: { page?: number; url?: string } = {}, { rejectWithValue }) => {
//     try {
//       const response = url
//         ? await reproductionService.getByUrl<BreedingEvent>(url)
//         : await reproductionService.getUpcomingCalvings({ page });
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || 'Failed to load calving schedule');
//     }
//   }
// );

// export const logBreedingEvent = createAsyncThunk<BreedingEvent, Partial<BreedingEvent>, { rejectValue: string }>(
//   'reproduction/add',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await reproductionService.addBreedingEvent(data);
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || 'Failed to log breeding attempt');
//     }
//   }
// );

// export const updateBreedingEvent = createAsyncThunk<BreedingEvent, { id: number; data: Partial<BreedingEvent> }, { rejectValue: string }>(
//   'reproduction/update',
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const response = await reproductionService.updateBreedingEvent(id, data);
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || 'Update failed');
//     }
//   }
// );

// export const deleteBreedingEventThunk = createAsyncThunk<number, number, { rejectValue: string }>(
//   'reproduction/delete',
//   async (id, { rejectWithValue }) => {
//     try {
//       await reproductionService.deleteBreedingEvent(id);
//       return id;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || 'Deletion failed');
//     }
//   }
// );

// // --- SLICE ---

// const reproductionSlice = createSlice({
//   name: 'reproduction',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch History
//       .addCase(fetchBreedingHistory.fulfilled, (state, action) => {
//         state.events = action.payload;
//       })
//       // Upcoming Calvings
//       .addCase(fetchUpcomingCalvings.fulfilled, (state, action) => {
//         state.upcomingCalvings = action.payload;
//       })
//       // Add Event
//       .addCase(logBreedingEvent.fulfilled, (state, action) => {
//         state.events.results.unshift(action.payload);
//         state.events.count += 1;
//       })
//       // Update Event
//       .addCase(updateBreedingEvent.fulfilled, (state, action) => {
//         const index = state.events.results.findIndex(e => e.id === action.payload.id);
//         if (index !== -1) {
//           state.events.results[index] = action.payload;
//         }
//       })
//       // Delete Event
//       .addCase(deleteBreedingEventThunk.fulfilled, (state, action) => {
//         state.events.results = state.events.results.filter(e => e.id !== action.payload);
//         state.events.count -= 1;
//       })

//       // Global Architectural Profile Matchers (Unified loading/error processing states)
//       .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addMatcher((action): action is PayloadAction<string> => action.type.endsWith('/rejected'), (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'An operational sequence error has occurred.';
//       })
//       .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
//         state.loading = false;
//       });
//   },
// });

// export default reproductionSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BreedingEvent, PaginatedResponse } from '../../../types/types';
import { reproductionService } from '../../../services/reproductionService';

// 1. Defined extension explicitly for custom backend aggregation fields
interface PaginatedReproductionResponse extends PaginatedResponse<BreedingEvent> {
  confirmed_pregnancies_count: number;
}

interface ReproductionState {
  events: PaginatedReproductionResponse; // Updated from PaginatedResponse to custom type
  upcomingCalvings: PaginatedResponse<BreedingEvent>;
  loading: boolean;
  error: string | null;
}

// Ensure the initial state structure includes the default value for the new aggregate count
const initialPaginatedState = { results: [], next: null, previous: null, count: 0 };
const initialReproductionState = { ...initialPaginatedState, confirmed_pregnancies_count: 0 };

const initialState: ReproductionState = {
  events: initialReproductionState,
  upcomingCalvings: initialPaginatedState,
  loading: false,
  error: null,
};

// --- THUNKS ---

export const fetchBreedingHistory = createAsyncThunk<
  PaginatedReproductionResponse, // Explicitly typed return value for the full payload
  { page?: number; url?: string; pageSize?: number } | undefined,
  { rejectValue: string }
>(
  'reproduction/fetchAll',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = params.url 
        ? await reproductionService.getByUrl<BreedingEvent>(params.url) 
        : await reproductionService.getBreedingHistory(params);
      return response.data as PaginatedReproductionResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load breeding records');
    }
  }
);

export const fetchUpcomingCalvings = createAsyncThunk<
  PaginatedResponse<BreedingEvent>,
  { page?: number; url?: string } | undefined,
  { rejectValue: string }
>(
  'reproduction/fetchUpcoming',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = params.url
        ? await reproductionService.getByUrl<BreedingEvent>(params.url)
        : await reproductionService.getUpcomingCalvings(params);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load calving schedule');
    }
  }
);

export const logBreedingEvent = createAsyncThunk<BreedingEvent, Partial<BreedingEvent>, { rejectValue: string }>(
  'reproduction/add',
  async (data, { rejectWithValue }) => {
    try {
      const response = await reproductionService.addBreedingEvent(data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to log breeding attempt');
    }
  }
);

export const updateBreedingEvent = createAsyncThunk<BreedingEvent, { id: number; data: Partial<BreedingEvent> }, { rejectValue: string }>(
  'reproduction/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await reproductionService.updateBreedingEvent(id, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

export const deleteBreedingEventThunk = createAsyncThunk<number, number, { rejectValue: string }>(
  'reproduction/delete',
  async (id, { rejectWithValue }) => {
    try {
      await reproductionService.deleteBreedingEvent(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Deletion failed');
    }
  }
);

// --- SLICE ---

const reproductionSlice = createSlice({
  name: 'reproduction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch History
      .addCase(fetchBreedingHistory.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      // Upcoming Calvings
      .addCase(fetchUpcomingCalvings.fulfilled, (state, action) => {
        state.upcomingCalvings = action.payload;
      })
      // Add Event
      .addCase(logBreedingEvent.fulfilled, (state, action) => {
        state.events.results.unshift(action.payload);
        state.events.count += 1;
        // Dynamically increment if the newly added live event is confirmed
        if (action.payload.status === 'confirmed') {
          state.events.confirmed_pregnancies_count += 1;
        }
      })
      // Update Event
      .addCase(updateBreedingEvent.fulfilled, (state, action) => {
        const index = state.events.results.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          const oldStatus = state.events.results[index].status;
          const newStatus = action.payload.status;

          // Adjust state counts contextually based on status updates
          if (oldStatus !== 'confirmed' && newStatus === 'confirmed') {
            state.events.confirmed_pregnancies_count += 1;
          } else if (oldStatus === 'confirmed' && newStatus !== 'confirmed') {
            state.events.confirmed_pregnancies_count -= 1;
          }

          state.events.results[index] = action.payload;
        }
      })
      // Delete Event
      .addCase(deleteBreedingEventThunk.fulfilled, (state, action) => {
        const targetEvent = state.events.results.find(e => e.id === action.payload);
        if (targetEvent && targetEvent.status === 'confirmed') {
          state.events.confirmed_pregnancies_count -= 1;
        }
        
        state.events.results = state.events.results.filter(e => e.id !== action.payload);
        state.events.count -= 1;
      })

      // Global Architectural Profile Matchers (Unified loading/error processing states)
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action): action is PayloadAction<string> => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An operational sequence error has occurred.';
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
        state.loading = false;
      });
  },
});

export default reproductionSlice.reducer;