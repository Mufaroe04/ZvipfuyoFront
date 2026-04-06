import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BreedingEvent } from '../../../types/types';
import { reproductionService } from '../../../services/reproductionService';

interface ReproductionState {
  events: BreedingEvent[];
  upcomingCalvings: BreedingEvent[];
  loading: boolean;
  error: string | null;
}

const initialState: ReproductionState = {
  events: [],
  upcomingCalvings: [],
  loading: false,
  error: null,
};

// --- THUNKS ---

export const fetchBreedingHistory = createAsyncThunk(
  'reproduction/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await reproductionService.getBreedingHistory();
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load breeding records');
    }
  }
);

export const fetchUpcomingCalvings = createAsyncThunk(
  'reproduction/fetchUpcoming',
  async (_, { rejectWithValue }) => {
    try {
      const response = await reproductionService.getUpcomingCalvings();
      return response.data;
    } catch (err: any) {
      return rejectWithValue('Failed to load calving schedule');
    }
  }
);

export const logBreedingEvent = createAsyncThunk(
  'reproduction/add',
  async (data: Partial<BreedingEvent>, { rejectWithValue }) => {
    try {
      const response = await reproductionService.addBreedingEvent(data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue('Failed to log breeding attempt');
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
      // All History
      .addCase(fetchBreedingHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBreedingHistory.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })
      
      // Upcoming Calvings (Dashboard)
      .addCase(fetchUpcomingCalvings.fulfilled, (state, action) => {
        state.upcomingCalvings = action.payload;
      })

      // Add New Event
      .addCase(logBreedingEvent.fulfilled, (state, action) => {
        state.events.unshift(action.payload);
        // Note: If the status is 'confirmed', usually we'd re-fetch upcoming
        // but for now, we'll keep it simple.
      })

      .addCase(fetchBreedingHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default reproductionSlice.reducer;