import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Task, HealthRecord, CountingSession, Transfer, WeightEntry } from '../../../types/types';
import { operationsService } from '../../../services/operationsService';

interface OpsState {
  tasks: Task[];
  healthRecords: HealthRecord[];
  countingSessions: CountingSession[];
  transfers: Transfer[];
  weights: WeightEntry[];
  loading: boolean;
  error: string | null;
}
const initialState: OpsState = {
  tasks: [],
  healthRecords: [],
  countingSessions: [],
  transfers: [],
  weights: [],
  loading: false,
  error: null,
};
export const fetchActiveTasks = createAsyncThunk('ops/fetchTasks', async () => {
  const response = await operationsService.getTasks(false);
  return response.data;
});
// --- THE THUNK ---
export const toggleTaskOptimistic = createAsyncThunk<
  Task, 
  { id: number; currentStatus: boolean }, 
  { rejectValue: string }
>(
  'ops/toggleTask',
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      // We send the NEW status to the server
      const response = await operationsService.toggleTask(id, !currentStatus);
      return response.data;
    } catch (err: any) {
      return rejectWithValue('Server sync failed. Rolling back...');
    }
  }
);
export const fetchWeights = createAsyncThunk('ops/fetchWeights', async (animalId?: number) => {
  const response = await operationsService.getWeightEntries(animalId);
  return response.data;
});

export const addWeight = createAsyncThunk('ops/addWeight', async (data: { animal: number; weight_kg: number; date: string }) => {
  const response = await operationsService.addWeightEntry(data);
  return response.data;
});
export const fetchHealthRecords = createAsyncThunk('ops/fetchHealth', async () => {
  const response = await operationsService.getHealthRecords();
  return response.data;
});

export const addHealthRecord = createAsyncThunk('ops/addHealth', async (data: Partial<HealthRecord>) => {
  const response = await operationsService.addHealthRecord(data);
  return response.data;
});

export const fetchCountingSessions = createAsyncThunk('ops/fetchCounting', async () => {
  const response = await operationsService.getCountingSessions();
  return response.data;
});
export const fetchTransfers = createAsyncThunk('ops/fetchTransfers', async () => {
  const response = await operationsService.getTransfers();
  return response.data;
});

export const initiateTransfer = createAsyncThunk('ops/addTransfer', async (data: Partial<Transfer>) => {
  const response = await operationsService.addTransfer(data);
  return response.data;
});

// Helper to filter and count transfers by type for the current month
export const selectMonthlyTransferStats = (state: RootState) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyTransfers = state.operations.transfers.filter(t => {
    const d = new Date(t.created_at);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const stats = {
    sale: 0,
    internal: 0,
    lobola: 0,
    inheritance: 0,
    feasting: 0
  };

  monthlyTransfers.forEach(t => {
    if (stats.hasOwnProperty(t.transfer_type)) {
      stats[t.transfer_type as keyof typeof stats]++;
    }
  });

  return Object.entries(stats).map(([name, value]) => ({ 
    name: name.charAt(0).toUpperCase() + name.slice(1), 
    value 
  }));
};
const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActiveTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    })
    .addCase(toggleTaskOptimistic.pending, (state, action) => {
        const task = state.tasks.find(t => t.id === action.meta.arg.id);
        if (task) {
          // Change it IMMEDIATELY in the UI
          task.is_completed = !action.meta.arg.currentStatus;
        }
      })

      // 2. THE SUCCESS (Fulfilled)
      // No need to do much here unless the server returns extra data,
      // because the UI is already updated!
      .addCase(toggleTaskOptimistic.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload; // Sync with final server version
        }
      })
      // 3. THE ROLLBACK (Rejected)
      .addCase(toggleTaskOptimistic.rejected, (state, action) => {
        const task = state.tasks.find(t => t.id === action.meta.arg.id);
        if (task) {
          // Oops! Revert back to what it was before the click
          task.is_completed = action.meta.arg.currentStatus;
          alert(action.payload); // Or use a nice Toast notification
        }
      })
      .addCase(fetchTransfers.fulfilled, (state, action) => {
        state.transfers = action.payload;
      })
      .addCase(initiateTransfer.fulfilled, (state, action) => {
        state.transfers.unshift(action.payload); // Add new transfer to the top of the history list
      })
      // Health Records
      .addCase(fetchHealthRecords.fulfilled, (state, action) => {
        state.healthRecords = action.payload;
      })
      .addCase(addHealthRecord.fulfilled, (state, action) => {
        state.healthRecords.unshift(action.payload); // Add new treatment to top
      })
      
      // Counting Sessions
      .addCase(fetchCountingSessions.fulfilled, (state, action) => {
        state.countingSessions = action.payload;
      })
      builder.addCase(fetchWeights.fulfilled, (state, action) => {
        state.weights = action.payload;
      })
      .addCase(addWeight.fulfilled, (state, action) => {
        state.weights.unshift(action.payload); // Add new weight to the top
      });
  }
});

export default operationsSlice.reducer;