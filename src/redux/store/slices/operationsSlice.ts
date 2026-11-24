// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { 
//   Task, HealthRecord, CountingSession, Transfer, WeightEntry, 
//   LactationPeriod, MilkYield, MilkQuality, MilkYieldPayload, 
//   MilkQualityPayload, LactationPeriodPayload, MarketPrice, PaginatedResponse 
// } from '../../../types/types';
// import { operationsService } from '../../../services/operationsService';
// import { RootState } from '../../store';

// interface OpsState {
//   tasks: PaginatedResponse<Task>;
//   healthRecords: PaginatedResponse<HealthRecord>;
//   countingSessions: PaginatedResponse<CountingSession>;
//   transfers: PaginatedResponse<Transfer>;
//   weights: PaginatedResponse<WeightEntry>;
//   lactations: PaginatedResponse<LactationPeriod>;
//   milkQuality: PaginatedResponse<MilkQuality>;
//   milkYields: PaginatedResponse<MilkYield>;
//   marketPrices: PaginatedResponse<MarketPrice>;
//   loading: boolean;
//   error: string | null;
// }

// const initialPaginatedState = { results: [], next: null, previous: null, count: 0 };

// const initialState: OpsState = {
//   tasks: initialPaginatedState,
//   healthRecords: initialPaginatedState,
//   countingSessions: initialPaginatedState,
//   transfers: initialPaginatedState,
//   weights: initialPaginatedState,
//   lactations: initialPaginatedState,
//   milkQuality: initialPaginatedState,
//   milkYields: initialPaginatedState,
//   marketPrices: initialPaginatedState,
//   loading: false,
//   error: null,
// };

// // --- Standardized Paginated Thunks ---

// export const fetchActiveTasks = createAsyncThunk(
//   'ops/fetchTasks', 
//   async ({ completed, url }: { completed?: boolean, url?: string } = {}) => {
//     const response = url 
//       ? await operationsService.getByUrl<Task>(url) 
//       : await operationsService.getTasks(completed);
//     return response.data;
//   }
// );

// export const fetchWeights = createAsyncThunk(
//   'ops/fetchWeights', 
//   async ({ animalId, url }: { animalId?: number, url?: string } = {}) => {
//     const response = url 
//       ? await operationsService.getByUrl<WeightEntry>(url) 
//       : await operationsService.getWeightEntries(animalId);
//     return response.data;
//   }
// );

// export const fetchMilkYields = createAsyncThunk(
//   'ops/fetchMilkYields',
//   async ({ url }: { url?: string } = {}) => {
//     const response = url 
//       ? await operationsService.getByUrl<MilkYield>(url) 
//       : await operationsService.getMilkYield();
//     return response.data;
//   }
// );

// export const fetchMilkQuality = createAsyncThunk(
//   'ops/fetchMilkQuality',
//   async ({ url }: { url?: string } = {}) => {
//     const response = url 
//       ? await operationsService.getByUrl<MilkQuality>(url) 
//       : await operationsService.getMilkQuality();
//     return response.data;
//   }
// );

// export const fetchLactationPeriods = createAsyncThunk(
//   'ops/fetchLactationPeriods',
//   async ({ url }: { url?: string } = {}) => {
//     const response = url 
//       ? await operationsService.getByUrl<LactationPeriod>(url) 
//       : await operationsService.getLactationPeriod();
//     return response.data;
//   }
// );

// // --- Optimistic & Mutation Thunks ---

// export const toggleTaskOptimistic = createAsyncThunk<Task, { id: number; currentStatus: boolean }, { rejectValue: string }>(
//   'ops/toggleTask',
//   async ({ id, currentStatus }, { rejectWithValue }) => {
//     try {
//       const response = await operationsService.toggleTask(id, !currentStatus);
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue('Server sync failed. Rolling back...');
//     }
//   }
// );

// export const addWeight = createAsyncThunk('ops/addWeight', async (data: { animal: number; weight_kg: number; date: string }) => {
//   const response = await operationsService.addWeightEntry(data);
//   return response.data;
// });

// export const updateWeight = createAsyncThunk<WeightEntry, { id: number, data: Partial<WeightEntry> }, { rejectValue: string }>(
//   'ops/editWeight',
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const response = await operationsService.updateWeight(id, data);
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || 'Update failed');
//     }
//   }
// );

// // --- Remaining Standard Thunks ---
// export const fetchMarketPrices = createAsyncThunk('ops/fetchMarketPrices', async () => {
//   const response = await operationsService.getMarketPrices();
//   return response.data;
// });
// export const addMarketPrice = createAsyncThunk(
//   'operations/addMarketPrice',
//   async (data: Partial<MarketPrice>, { rejectWithValue }) => {
//     try {
//       // Note: Ensure your operationsService has this method (defined in step 2 below)
//       const response = await operationsService.addMarketPrice(data);
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );
// export const updateMarketPrice = createAsyncThunk('ops/updateMarketPrice', async ({ id, price }: { id: number; price: number }) => {
//   const response = await operationsService.updateMarketPrice(id, price);
//   return response.data;
// });

// export const fetchHealthRecords = createAsyncThunk('ops/fetchHealth', async () => {
//   const response = await operationsService.getHealthRecords();
//   return response.data;
// });

// export const addHealthRecord = createAsyncThunk('ops/addHealth', async (data: Partial<HealthRecord>) => {
//   const response = await operationsService.addHealthRecord(data);
//   return response.data;
// });

// export const updateHealthRecord = createAsyncThunk<HealthRecord, { id: number, data: Partial<HealthRecord> }, { rejectValue: string }>(
//   'ops/updateHealth',
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const response = await operationsService.updateHealthRecord(id, data);
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response?.data?.message || 'Update failed');
//     }
//   }
// );

// export const addMilkYields = createAsyncThunk<MilkYield, MilkYieldPayload, { rejectValue: string }>(
//   'ops/addMilkYields',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await operationsService.addMilkYield(data);
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue('Failed to create milk yield');
//     }
//   }
// );

// export const updateLactationPeriodDryOff = createAsyncThunk<LactationPeriod, { id: number }, { rejectValue: string }>(
//   'ops/dryOffLactation',
//   async ({ id }, { rejectWithValue }) => {
//     try {
//       const response = await operationsService.updateLactationPeriodDryOff(id);
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue('Dry off update failed');
//     }
//   }
// );

// export const fetchCountingSessions = createAsyncThunk('ops/fetchCounting', async () => {
//   const response = await operationsService.getCountingSessions();
//   return response.data;
// });

// export const fetchTransfers = createAsyncThunk('ops/fetchTransfers', async () => {
//   const response = await operationsService.getTransfers();
//   return response.data;
// });

// export const initiateTransfer = createAsyncThunk('ops/addTransfer', async (data: Partial<Transfer>) => {
//   const response = await operationsService.addTransfer(data);
//   return response.data;
// });

// // --- SELECTORS ---
// export const selectMonthlyTransferStats = (state: RootState) => {
//   const now = new Date();
//   const currentMonth = now.getMonth();
//   const currentYear = now.getFullYear();

//   const monthlyTransfers = state.operations.transfers.results.filter(t => {
//     const d = new Date(t.created_at);
//     return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
//   });

//   const stats: Record<string, number> = { sale: 0, internal: 0, lobola: 0, inheritance: 0, feasting: 0 };

//   monthlyTransfers.forEach(t => {
//     if (stats.hasOwnProperty(t.transfer_type)) {
//       stats[t.transfer_type]++;
//     }
//   });

//   return Object.entries(stats).map(([name, value]) => ({ 
//     name: name.charAt(0).toUpperCase() + name.slice(1), 
//     value 
//   }));
// };

// const operationsSlice = createSlice({
//   name: 'operations',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       /* --- TASKS --- */
//       .addCase(fetchActiveTasks.fulfilled, (state, action) => {
//         state.tasks = action.payload;
//       })
//       .addCase(toggleTaskOptimistic.pending, (state, action) => {
//         const task = state.tasks.results.find(t => t.id === action.meta.arg.id);
//         if (task) task.is_completed = !action.meta.arg.currentStatus;
//       })
//       .addCase(toggleTaskOptimistic.fulfilled, (state, action) => {
//         const index = state.tasks.results.findIndex(t => t.id === action.payload.id);
//         if (index !== -1) state.tasks.results[index] = action.payload;
//       })
//       .addCase(toggleTaskOptimistic.rejected, (state, action) => {
//         const task = state.tasks.results.find(t => t.id === action.meta.arg.id);
//         if (task) task.is_completed = action.meta.arg.currentStatus;
//       })

//       /* --- TRANSFERS --- */
//       .addCase(fetchTransfers.fulfilled, (state, action) => {
//         state.transfers = action.payload;
//       })
//       .addCase(initiateTransfer.fulfilled, (state, action) => {
//         state.transfers.results.unshift(action.payload);
//       })

//       /* --- HEALTH --- */
//       .addCase(fetchHealthRecords.fulfilled, (state, action) => {
//         state.healthRecords = action.payload;
//       })
//       .addCase(addHealthRecord.fulfilled, (state, action) => {
//         state.healthRecords.results.unshift(action.payload);
//       })
//       .addCase(updateHealthRecord.fulfilled, (state, action) => {
//         const index = state.healthRecords.results.findIndex(a => a.id === action.payload.id);
//         if (index !== -1) state.healthRecords.results[index] = action.payload;
//         state.loading = false;
//       })

//       /* --- MILK YIELDS --- */
//       .addCase(fetchMilkYields.fulfilled, (state, action) => {
//         state.milkYields = action.payload;
//         state.loading = false;
//       })
//       .addCase(addMilkYields.fulfilled, (state, action) => {
//         state.milkYields.results.unshift(action.payload);
//         state.loading = false;
//       })

//       /* --- LACTATION --- */
//       .addCase(fetchLactationPeriods.fulfilled, (state, action) => {
//         state.lactations = action.payload;
//         state.loading = false;
//       })
//       .addCase(updateLactationPeriodDryOff.fulfilled, (state, action) => {
//         const index = state.lactations.results.findIndex(a => a.id === action.payload.id);
//         if (index !== -1) state.lactations.results[index] = action.payload;
//         state.loading = false;
//       })

//       /* --- WEIGHTS --- */
//       .addCase(fetchWeights.fulfilled, (state, action) => {
//         state.weights = action.payload;
//         state.loading = false;
//       })
//       .addCase(addWeight.fulfilled, (state, action) => {
//         state.weights.results.unshift(action.payload);
//         state.loading = false;
//       })
//       .addCase(updateWeight.fulfilled, (state, action) => {
//         const index = state.weights.results.findIndex(a => a.id === action.payload.id);
//         if (index !== -1) state.weights.results[index] = action.payload;
//         state.loading = false;
//       })

//       /* --- MARKET --- */
//       .addCase(fetchMarketPrices.fulfilled, (state, action) => {
//         state.marketPrices = action.payload;
//       })
//       .addCase(addMarketPrice.fulfilled, (state, action) => {
//           state.marketPrices.results.push(action.payload);
//           })
//       .addCase(updateMarketPrice.fulfilled, (state, action) => {
//         const index = state.marketPrices.results.findIndex(p => p.id === action.payload.id);
//         if (index !== -1) state.marketPrices.results[index] = action.payload;
//       })
//           /* --- LOADING/ERRORS --- */
//       .addMatcher(
//         (action): action is PayloadAction<string> => action.type.endsWith('/pending'),
//         (state) => {
//           state.loading = true;
//           state.error = null;
//         }
//       )
//       .addMatcher(
//         (action): action is PayloadAction<string> => action.type.endsWith('/rejected'),
//         (state, action) => {
//           state.loading = false;
//           // Now TypeScript knows 'action' has a 'payload' property
//           state.error = action.payload || 'An operation failed';
//         }
//       )
//       .addMatcher(
//         (action): action is PayloadAction<any> => action.type.endsWith('/fulfilled'),
//         (state) => {
//           state.loading = false;
//           state.error = null;
//         }
//       );
//   }
// });

// export default operationsSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  Task, HealthRecord, CountingSession, Transfer, WeightEntry, 
  LactationPeriod, MilkYield, MilkQuality, MilkYieldPayload, 
  MarketPrice, PaginatedResponse, 
  MilkQualityPayload,
  LactationPeriodPayload
} from '../../../types/types';
import { operationsService } from '../../../services/operationsService';
import { RootState } from '../../store';

interface OpsState {
  tasks: PaginatedResponse<Task>;
  healthRecords: PaginatedResponse<HealthRecord>;
  countingSessions: PaginatedResponse<CountingSession>;
  transfers: PaginatedResponse<Transfer>;
  weights: PaginatedResponse<WeightEntry>;
  lactations: PaginatedResponse<LactationPeriod>;
  milkQuality: PaginatedResponse<MilkQuality>;
  milkYields: PaginatedResponse<MilkYield>;
  marketPrices: PaginatedResponse<MarketPrice>;
  loading: boolean;
  error: string | null;
}

const initialPaginatedState = { results: [], next: null, previous: null, count: 0,total_spend:0 };

const initialState: OpsState = {
  tasks: initialPaginatedState,
  healthRecords: initialPaginatedState,
  countingSessions: initialPaginatedState,
  transfers: initialPaginatedState,
  weights: initialPaginatedState,
  lactations: initialPaginatedState,
  milkQuality: initialPaginatedState,
  milkYields: initialPaginatedState,
  marketPrices: initialPaginatedState,
  loading: false,
  error: null,
};

// --- Standardized Paginated Thunks ---

export const fetchActiveTasks = createAsyncThunk(
  'ops/fetchTasks', 
  async ({ completed, page, url }: { completed?: boolean, page?: number, url?: string } = {}) => {
    const response = url 
      ? await operationsService.getByUrl<Task>(url) 
      : await operationsService.getTasks({ completed, page });
    return response.data;
  }
);

export const fetchWeights = createAsyncThunk(
  'ops/fetchWeights', 
  async ({ animalId, page, url }: { animalId?: string, page?: number, url?: string } = {}) => {
    const response = url 
      ? await operationsService.getByUrl<WeightEntry>(url) 
      : await operationsService.getWeightEntries({ animal_id: animalId, page });
    return response.data;
  }
);

export const fetchMilkYields = createAsyncThunk(
  'ops/fetchMilkYields',
  async ({ page, url }: { page?: number, url?: string } = {}) => {
    const response = url 
      ? await operationsService.getByUrl<MilkYield>(url) 
      : await operationsService.getMilkYield({ page });
    return response.data;
  }
);

export const fetchMilkQuality = createAsyncThunk(
  'ops/fetchMilkQuality',
  async ({ page, url }: { page?: number, url?: string } = {}) => {
    const response = url 
      ? await operationsService.getByUrl<MilkQuality>(url) 
      : await operationsService.getMilkQuality({ page });
    return response.data;
  }
);

export const addMilkQuality=createAsyncThunk<MilkQuality,MilkQualityPayload, { rejectValue: string }>(
  'ops/addMilkQuality',
  async (data, { rejectWithValue })=>{
    try {
        const response =await operationsService.addMilkQuality(data)
        return response.data
    } catch (err:any) {
      return rejectWithValue(err.response?.data?.message || 'failed to create milk yield');
    }
})

export const updateMilkQuality=createAsyncThunk<MilkQuality,{id:string,data:Partial<MilkQualityPayload>},{ rejectValue: string }>(
  'ops/updateMilkQuality',
  async({ id, data }, { rejectWithValue })=>{
    try {
      const response = await  operationsService.updateMilkQuality(id,data)
      return response.data;

    } catch (err:any) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  })
export const fetchLactationPeriods = createAsyncThunk(
  'ops/fetchLactationPeriods',
  async ({ page, url }: { page?: number, url?: string } = {}) => {
    const response = url 
      ? await operationsService.getByUrl<LactationPeriod>(url) 
      : await operationsService.getLactationPeriod({ page });
    return response.data;
  }
);
export const addLactationPeriod=createAsyncThunk<LactationPeriod,LactationPeriodPayload, { rejectValue: string }>(
  'ops/addLactationPeriod',
  async (data, { rejectWithValue })=>{
    try {
        const response =await operationsService.addLactationPeriod(data)
        return response.data
    } catch (err:any) {
      return rejectWithValue(err.response?.data?.message || 'failed to create lactation period ');
    }
})
export const updateLactationPeriod=createAsyncThunk<LactationPeriod,{id:string,data:Partial<LactationPeriodPayload>},{ rejectValue: string }>(
  'ops/updateLactationPeriod',
  async({ id, data }, { rejectWithValue })=>{
    try {
      const response = await  operationsService.updateLactationPeriod(id,data)
      return response.data;

    } catch (err:any) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  })

export const fetchHealthRecords = createAsyncThunk(
  'ops/fetchHealth', 
  async ({ animalId, page }: { animalId?: string, page?: number } = {}) => {
    const response = await operationsService.getHealthRecords({ animal_id: animalId, page });
    return response.data;
  }
);

export const fetchTransfers = createAsyncThunk(
  'ops/fetchTransfers', 
  async ({ page }: { page?: number } = {}) => {
    const response = await operationsService.getTransfers({ page });
    return response.data;
  }
);

// --- Mutation Thunks ---

// export const toggleTaskOptimistic = createAsyncThunk<Task, { id: string; currentStatus: boolean }, { rejectValue: string }>(
//   'ops/toggleTask',
//   async ({ id, currentStatus }, { rejectWithValue }) => {
//     try {
//       const response = await operationsService.toggleTask(id, !currentStatus);
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue('Server sync failed. Rolling back...');
//     }
//   }
// );

export const toggleTaskOptimistic = createAsyncThunk<
  Task, 
  { id: number; uuid: string; currentStatus: boolean }, // Pass both identifiers
  { rejectValue: string }
>(
  'ops/toggleTask',
  async ({ uuid, currentStatus }, { rejectWithValue }) => {
    try {
      // Execute the network request using the safe UUID string string
      const response = await operationsService.toggleTask(uuid, !currentStatus);
      return response.data;
    } catch (err: any) {
      return rejectWithValue('Server sync failed. Rolling back...');
    }
  }
);

export const addWeight = createAsyncThunk('ops/addWeight', async (data: { animal: number; weight_kg: number; date: string }) => {
  const response = await operationsService.addWeightEntry(data);
  return response.data;
});



export const deleteHealthRecord = createAsyncThunk<string, string, { rejectValue: string }>(
  'ops/deleteHealthRecord',
  async (id, { rejectWithValue }) => {
    try {
      await operationsService.deleteHealthRecord(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete failed');
    }
  } 
);
export const updateWeight = createAsyncThunk<WeightEntry, { id: string, data: Partial<WeightEntry> }, { rejectValue: string }>(
  'ops/editWeight',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await operationsService.updateWeight(id, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

export const fetchMarketPrices = createAsyncThunk('ops/fetchMarketPrices', async ({ page }: { page?: number } = {}) => {
  const response = await operationsService.getMarketPrices({ page });
  return response.data;
});

export const addMarketPrice = createAsyncThunk(
  'operations/addMarketPrice',
  async (data: Partial<MarketPrice>, { rejectWithValue }) => {
    try {
      const response = await operationsService.addMarketPrice(data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateMarketPrice = createAsyncThunk('ops/updateMarketPrice', async ({ id, price }: { id: string; price: number }) => {
  const response = await operationsService.updateMarketPrice(id, price);
  return response.data;
});

export const addHealthRecord = createAsyncThunk('ops/addHealth', async (data: Partial<HealthRecord>) => {
  const response = await operationsService.addHealthRecord(data);
  return response.data;
});

export const updateHealthRecord = createAsyncThunk<HealthRecord, { id: string, data: Partial<HealthRecord> }, { rejectValue: string }>(
  'ops/updateHealth',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await operationsService.updateHealthRecord(id, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

export const addMilkYields = createAsyncThunk<MilkYield, MilkYieldPayload, { rejectValue: string }>(
  'ops/addMilkYields',
  async (data, { rejectWithValue }) => {
    try {
      const response = await operationsService.addMilkYield(data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue('Failed to create milk yield');
    }
  }
);

export const updateLactationPeriodDryOff = createAsyncThunk<LactationPeriod, { id: string }, { rejectValue: string }>(
  'ops/dryOffLactation',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await operationsService.updateLactationPeriodDryOff(id);
      return response.data;
    } catch (err: any) {
      return rejectWithValue('Dry off update failed');
    }
  }
);

export const initiateTransfer = createAsyncThunk('ops/addTransfer', async (data: Partial<Transfer>) => {
  const response = await operationsService.addTransfer(data);
  return response.data;
});

// --- SELECTORS ---
export const selectMonthlyTransferStats = (state: RootState) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyTransfers = state.operations.transfers.results.filter(t => {
    const d = new Date(t.created_at);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const stats: Record<string, number> = { sale: 0, internal: 0, lobola: 0, inheritance: 0, feasting: 0 };
  monthlyTransfers.forEach(t => {
    if (stats.hasOwnProperty(t.transfer_type)) stats[t.transfer_type]++;
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
    builder
      // .addCase(fetchActiveTasks.fulfilled, (state, action) => { state.tasks = action.payload; })
      // Inside your operationsSlice.ts extraReducers:
      .addCase(fetchActiveTasks.fulfilled, (state, action) => {
        // If no meta arguments were passed, or page/url specifies the initial load/reset
        const isFirstPage = !action.meta.arg || action.meta.arg.page === 1 || !action.meta.arg.url;
        
        if (isFirstPage) {
          state.tasks = action.payload;
        } else {
          state.tasks = {
            ...action.payload,
            // Append new results to existing cache array
            results: [...state.tasks.results, ...action.payload.results]
          };
        }
      })
      .addCase(toggleTaskOptimistic.pending, (state, action) => {
        const task = state.tasks.results.find(t => t.id === action.meta.arg.id);
        if (task) task.is_completed = !action.meta.arg.currentStatus;
      })
      .addCase(toggleTaskOptimistic.fulfilled, (state, action) => {
        const index = state.tasks.results.findIndex(t => t.id === action.payload.id);
        if (index !== -1) state.tasks.results[index] = action.payload;
      })
      .addCase(toggleTaskOptimistic.rejected, (state, action) => {
        const task = state.tasks.results.find(t => t.id === action.meta.arg.id);
        if (task) task.is_completed = action.meta.arg.currentStatus;
      })
      .addCase(fetchTransfers.fulfilled, (state, action) => { state.transfers = action.payload; })
      .addCase(initiateTransfer.fulfilled, (state, action) => { state.transfers.results.unshift(action.payload); })
      .addCase(fetchHealthRecords.fulfilled, (state, action) => { state.healthRecords = action.payload; })
      .addCase(addHealthRecord.fulfilled, (state, action) => { state.healthRecords.results.unshift(action.payload); })
      .addCase(updateHealthRecord.fulfilled, (state, action) => {
        const index = state.healthRecords.results.findIndex(a => a.id === action.payload.id);
        if (index !== -1) state.healthRecords.results[index] = action.payload;
      }).addCase(deleteHealthRecord.fulfilled, (state, action) => {
              // FIXED: Filter the results array, not the state object
              state.healthRecords.results = state.healthRecords.results.filter(h => h.uuid !== action.payload);
              state.healthRecords.count -= 1;
            })
      .addCase(fetchMilkYields.fulfilled, (state, action) => { state.milkYields = action.payload; })
      .addCase(addMilkYields.fulfilled, (state, action) => { state.milkYields.results.unshift(action.payload); })
      .addCase(fetchMilkQuality.fulfilled, (state, action) => { state.milkQuality = action.payload; })
      .addCase(addMilkQuality.fulfilled, (state, action) => { state.milkQuality.results.unshift(action.payload); })
      .addCase(updateMilkQuality.fulfilled, (state, action) => {
        const index = state.milkQuality.results.findIndex(a => a.id === action.payload.id);
        if (index !== -1) state.milkQuality.results[index] = action.payload;
      })
      .addCase(fetchLactationPeriods.fulfilled, (state, action) => { state.lactations = action.payload; })
      .addCase(updateLactationPeriodDryOff.fulfilled, (state, action) => {
        const index = state.lactations.results.findIndex(a => a.id === action.payload.id);
        if (index !== -1) state.lactations.results[index] = action.payload;
      })
      .addCase(addLactationPeriod.fulfilled, (state, action) => { state.lactations.results.unshift(action.payload); })
      .addCase(updateLactationPeriod.fulfilled, (state, action) => {
        const index = state.lactations.results.findIndex(a => a.id === action.payload.id);
        if (index !== -1) state.lactations.results[index] = action.payload;
      })
      .addCase(fetchWeights.fulfilled, (state, action) => { state.weights = action.payload; })
      .addCase(addWeight.fulfilled, (state, action) => { state.weights.results.unshift(action.payload); })
      .addCase(updateWeight.fulfilled, (state, action) => {
        const index = state.weights.results.findIndex(a => a.id === action.payload.id);
        if (index !== -1) state.weights.results[index] = action.payload;
      })
      .addCase(fetchMarketPrices.fulfilled, (state, action) => { state.marketPrices = action.payload; })
      .addCase(addMarketPrice.fulfilled, (state, action) => { state.marketPrices.results.push(action.payload); })
      .addCase(updateMarketPrice.fulfilled, (state, action) => {
        const index = state.marketPrices.results.findIndex(p => p.id === action.payload.id);
        if (index !== -1) state.marketPrices.results[index] = action.payload;
      })
      .addMatcher((action): action is PayloadAction<string> => action.type.endsWith('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action): action is PayloadAction<string> => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An operation failed';
      })
      .addMatcher((action): action is PayloadAction<any> => action.type.endsWith('/fulfilled'), (state) => {
        state.loading = false;
        state.error = null;
      });
  }
});

export default operationsSlice.reducer;