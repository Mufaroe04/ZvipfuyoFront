import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { insightsService } from '../../../services/insightsService';
import { InsightData } from '../../../types/types';

interface InsightsState {
  insights_data: InsightData | null;
  loading_insights: boolean;
  error: string | null;
  lastFetched: number | null; // Timestamp for caching logic
}

const initialState: InsightsState = {
  insights_data: null,
  loading_insights: false,
  error: null,
  lastFetched: null,
};

// --- THUNK ---
export const fetchLiveInsights = createAsyncThunk(
  'insights/fetchLive',
  async ({ lat, lon }: { lat: number, lon: number }, { rejectWithValue }) => {
    try {
      const response = await insightsService.getLiveInsights(lat, lon);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to reach Zvipfuyo Intelligence');
    }
  }
);

// --- SLICE ---
const insightsSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    clearInsights: (state) => {
      state.insights_data = null;
      state.lastFetched = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLiveInsights.pending, (state) => {
        state.loading_insights = true;
        state.error = null;
      })
      .addCase(fetchLiveInsights.fulfilled, (state, action) => {
        state.insights_data = action.payload;
        state.loading_insights = false;
        state.lastFetched = Date.now(); // Record when we got this data
      })
      .addCase(fetchLiveInsights.rejected, (state, action) => {
        state.loading_insights = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearInsights } = insightsSlice.actions;
export default insightsSlice.reducer;