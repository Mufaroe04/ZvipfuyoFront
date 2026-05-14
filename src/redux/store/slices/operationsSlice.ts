// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { Task, HealthRecord, CountingSession, Transfer, WeightEntry, LactationPeriod, MilkYield, MilkQuality, MilkYieldPayload, MilkQualityPayload, LactationPeriodPayload, MarketPrice } from '../../../types/types';
// import { operationsService } from '../../../services/operationsService';

// interface OpsState {
//   tasks: Task[];
//   healthRecords: HealthRecord[];
//   countingSessions: CountingSession[];
//   transfers: Transfer[];
//   weights: WeightEntry[];
//   lactations: LactationPeriod[];
//   milkQuality: MilkQuality[];
//   milkYields: MilkYield[];
//   marketPrices: MarketPrice[];
//   loading: boolean;
//   error: string | null;
// }
// const initialState: OpsState = {
//   tasks: [],
//   healthRecords: [],
//   countingSessions: [],
//   transfers: [],
//   weights: [],
//   lactations: [],
//   milkQuality: [],
//   milkYields: [],
//   marketPrices: [],
//   loading: false,
//   error: null,
// };
// export const fetchActiveTasks = createAsyncThunk('ops/fetchTasks', async () => {
//   const response = await operationsService.getTasks(false);
//   return response.data;
// });
// // --- THE THUNK ---
// export const toggleTaskOptimistic = createAsyncThunk<
//   Task, 
//   { id: number; currentStatus: boolean }, 
//   { rejectValue: string }
// >(
//   'ops/toggleTask',
//   async ({ id, currentStatus }, { rejectWithValue }) => {
//     try {
//       // We send the NEW status to the server
//       const response = await operationsService.toggleTask(id, !currentStatus);
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue('Server sync failed. Rolling back...');
//     }
//   }
// );
// export const fetchWeights = createAsyncThunk('ops/fetchWeights', async (animalId?: number) => {
//   const response = await operationsService.getWeightEntries(animalId);
//   return response.data;
// });

// export const addWeight = createAsyncThunk('ops/addWeight', async (data: { animal: number; weight_kg: number; date: string }) => {
//   const response = await operationsService.addWeightEntry(data);
//   return response.data;
// });

// export const updateWeight=createAsyncThunk<WeightEntry,{id:number,data:Partial<WeightEntry>},{ rejectValue: string }>(
//   'ops/editWeight',
//   async({ id, data }, { rejectWithValue })=>{
//     try {
//       const response = await  operationsService.updateWeight(id,data)
//       return response.data;

//     } catch (err:any) {
//       return rejectWithValue(err.response?.data?.message || 'Update failed');
//     }
//   });
// // 3. Create the Thunks
// export const fetchMarketPrices = createAsyncThunk('ops/fetchMarketPrices', async () => {
//   const response = await operationsService.getMarketPrices();
//   return response.data;
// });

// export const updateMarketPrice = createAsyncThunk(
//   'ops/updateMarketPrice', 
//   async ({ id, price }: { id: number; price: number }) => {
//     const response = await operationsService.updateMarketPrice(id, price);
//     return response.data;
//   }
// );
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



// export const fetchHealthRecords = createAsyncThunk('ops/fetchHealth', async () => {
//   const response = await operationsService.getHealthRecords();
//   return response.data;
// });

// export const addHealthRecord = createAsyncThunk('ops/addHealth', async (data: Partial<HealthRecord>) => {
//   const response = await operationsService.addHealthRecord(data);
//   return response.data;
// });

// export const updateHealthRecord=createAsyncThunk<HealthRecord,{id:number,data:Partial<HealthRecord>},{ rejectValue: string }>(
//   'ops/updateHealth',
//   async({ id, data }, { rejectWithValue })=>{
//     try {
//       const response = await  operationsService.updateHealthRecord(id,data)
//       return response.data;

//     } catch (err:any) {
//       return rejectWithValue(err.response?.data?.message || 'Update failed');
//     }
//   });

// export const fetchMilkYields = createAsyncThunk<
//       MilkYield[],             // Success return type
//       void,                    // Input arguments (none, so void)
//       { rejectValue: string }  // Error type
//     >(
//       'ops/fetchMilkYields',
//       async (_, { rejectWithValue }) => {
//         try {
//           const response = await operationsService.getMilkYield();
//           return response.data;
//         } catch (err: any) {
//           // Passes the actual backend error message to your Redux state
//           return rejectWithValue(
//             err.response?.data?.detail || 'Failed to fetch milk records'
//           );
//         }
//       }
//     );
// export const addMilkYields=createAsyncThunk<MilkYield,MilkYieldPayload, { rejectValue: string }>(
//   'ops/addMilkYields',
//   async (data, { rejectWithValue })=>{
//     try {
//         const response =await operationsService.addMilkYield(data)
//         return response.data
//     } catch (err:any) {
//       return rejectWithValue(err.response?.data?.message || 'failed to create milk yield');
//     }

// })

// export const updateMilkYield=createAsyncThunk<MilkYield,{id:number,data:Partial<MilkYieldPayload>},{ rejectValue: string }>(
//   'ops/updateMilkYields',
//   async({ id, data }, { rejectWithValue })=>{
//     try {
//       const response = await  operationsService.updateMilkYield(id,data)
//       return response.data;

//     } catch (err:any) {
//       return rejectWithValue(err.response?.data?.message || 'Update failed');

      
//     }
//   });

// export const fetchMilkQuality = createAsyncThunk<
//   MilkQuality[],             // Success return type
//   void,                    // Input arguments (none, so void)
//   { rejectValue: string }  // Error type
// >(
//   'ops/fetchMilkQuality',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await operationsService.getMilkQuality();
//       return response.data;
//     } catch (err: any) {
//       // Passes the actual backend error message to your Redux state
//       return rejectWithValue(
//         err.response?.data?.detail || 'Failed to fetch milk records'
//       );
//     }
//   }
// );
// export const addMilkQuality=createAsyncThunk<MilkQuality,MilkQualityPayload, { rejectValue: string }>(
//   'ops/addMilkQuality',
//   async (data, { rejectWithValue })=>{
//     try {
//         const response =await operationsService.addMilkQuality(data)
//         return response.data
//     } catch (err:any) {
//       return rejectWithValue(err.response?.data?.message || 'failed to create milk yield');
//     }
// })

// export const updateMilkQuality=createAsyncThunk<MilkQuality,{id:number,data:Partial<MilkQualityPayload>},{ rejectValue: string }>(
//   'ops/updateMilkQuality',
//   async({ id, data }, { rejectWithValue })=>{
//     try {
//       const response = await  operationsService.updateMilkQuality(id,data)
//       return response.data;

//     } catch (err:any) {
//       return rejectWithValue(err.response?.data?.message || 'Update failed');
//     }
//   })

//   export const fetchLactationPeriods = createAsyncThunk<
//   LactationPeriod[],             // Success return type
//   void,                    // Input arguments (none, so void)
//   { rejectValue: string }  // Error type
// >(
//   'ops/fetchLactationPeriods',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await operationsService.getLactationPeriod();
//       return response.data;
//     } catch (err: any) {
//       // Passes the actual backend error message to your Redux state
//       return rejectWithValue(
//         err.response?.data?.detail || 'Failed to fetch Lactation records'
//       );
//     }
//   }
// );
// export const addLactationPeriod=createAsyncThunk<LactationPeriod,LactationPeriodPayload, { rejectValue: string }>(
//   'ops/addLactationPeriod',
//   async (data, { rejectWithValue })=>{
//     try {
//         const response =await operationsService.addLactationPeriod(data)
//         return response.data
//     } catch (err:any) {
//       return rejectWithValue(err.response?.data?.message || 'failed to create lactation period ');
//     }
// })

// export const updateLactationPeriod=createAsyncThunk<LactationPeriod,{id:number,data:Partial<LactationPeriodPayload>},{ rejectValue: string }>(
//   'ops/updateLactationPeriod',
//   async({ id, data }, { rejectWithValue })=>{
//     try {
//       const response = await  operationsService.updateLactationPeriod(id,data)
//       return response.data;

//     } catch (err:any) {
//       return rejectWithValue(err.response?.data?.message || 'Update failed');
//     }
//   })
// export const updateLactationPeriodDryOff=createAsyncThunk<LactationPeriod,{id:number},{ rejectValue: string }>(
//   'ops/dryOffLactation',
//   async({ id }, { rejectWithValue })=>{
//     try {
//       const response = await  operationsService.updateLactationPeriodDryOff(id)
//       return response.data;

//     } catch (err:any) {
//       return rejectWithValue(err.response?.data?.message || 'Update failed');
//     }
//   })
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


// // Helper to filter and count transfers by type for the current month
// export const selectMonthlyTransferStats = (state: RootState) => {
//   const now = new Date();
//   const currentMonth = now.getMonth();
//   const currentYear = now.getFullYear();

//   const monthlyTransfers = state.operations.transfers.filter(t => {
//     const d = new Date(t.created_at);
//     return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
//   });

//   const stats = {
//     sale: 0,
//     internal: 0,
//     lobola: 0,
//     inheritance: 0,
//     feasting: 0
//   };

//   monthlyTransfers.forEach(t => {
//     if (stats.hasOwnProperty(t.transfer_type)) {
//       stats[t.transfer_type as keyof typeof stats]++;
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
//     builder.addCase(fetchActiveTasks.fulfilled, (state, action) => {
//       state.tasks = action.payload;
//     })
//     .addCase(toggleTaskOptimistic.pending, (state, action) => {
//         const task = state.tasks.find(t => t.id === action.meta.arg.id);
//         if (task) {
//           // Change it IMMEDIATELY in the UI
//           task.is_completed = !action.meta.arg.currentStatus;
//         }
//       })

//       // 2. THE SUCCESS (Fulfilled)
//       // No need to do much here unless the server returns extra data,
//       // because the UI is already updated!
//       .addCase(toggleTaskOptimistic.fulfilled, (state, action) => {
//         const index = state.tasks.findIndex(t => t.id === action.payload.id);
//         if (index !== -1) {
//           state.tasks[index] = action.payload; // Sync with final server version
//         }
//       })
//       // 3. THE ROLLBACK (Rejected)
//       .addCase(toggleTaskOptimistic.rejected, (state, action) => {
//         const task = state.tasks.find(t => t.id === action.meta.arg.id);
//         if (task) {
//           // Oops! Revert back to what it was before the click
//           task.is_completed = action.meta.arg.currentStatus;
//           alert(action.payload); // Or use a nice Toast notification
//         }
//       })
//       .addCase(fetchTransfers.fulfilled, (state, action) => {
//         state.transfers = action.payload;
//       })
//       .addCase(initiateTransfer.fulfilled, (state, action) => {
//         state.transfers.unshift(action.payload); // Add new transfer to the top of the history list
//       })
//       // Health Records
//       .addCase(fetchHealthRecords.fulfilled, (state, action) => {
//         state.healthRecords = action.payload;
//       })
//       .addCase(addHealthRecord.fulfilled, (state, action) => {
//         state.healthRecords.unshift(action.payload); // Add new treatment to top
//       })
//       .addCase(updateHealthRecord.pending,(state)=>{
//         state.loading=true;
//         state.error=null;
//       })
//       .addCase(updateHealthRecord.fulfilled,(state,action:PayloadAction<HealthRecord>)=>{
//         const index = state.healthRecords.findIndex(a => a.id === action.payload.id);
//         if (index !== -1) {
//           state.healthRecords[index] = action.payload;
//         }
//         state.loading=false;
//         state.error=null;
//       })
//       .addCase(updateHealthRecord.rejected,(state,action)=>{
//         state.loading=true;
//         state.error= action.payload as string;

//       })
//       .addCase(fetchMilkYields.pending,(state)=>{
//         state.loading=true;
//         state.error=null;
//       })
//       //MilkYields
//       .addCase(fetchMilkYields.fulfilled,(state,action)=>{
//         state.loading=false;
//         state.milkYields=action.payload
//         state.error=null;
//       })
//       .addCase(fetchMilkYields.rejected,(state,action)=>{
//         state.loading=true;
//         state.error= action.payload as string;
//       })
//       .addCase(addMilkYields.pending,(state)=>{
//         state.loading=true;
//         state.error=null;
//       })
//       .addCase(addMilkYields.fulfilled,(state,action: PayloadAction<MilkYield>)=>{
//         // Now TypeScript knows action.payload is exactly a MilkYield object
//         state.milkYields.unshift(action.payload);
//         state.loading=false;
//         state.error=null;
//       })
//       .addCase(addMilkYields.rejected,(state)=>{
//         state.loading=false;
//         state.error=null;
//       })
//       .addCase(updateMilkYield.pending,(state)=>{
//         state.loading=true;
//         state.error=null;
//       })
//       .addCase(updateMilkYield.fulfilled,(state,action:PayloadAction<MilkYield>)=>{
//         const index = state.milkYields.findIndex(a => a.id === action.payload.id);
//         if (index !== -1) {
//           state.milkYields[index] = action.payload;
//         }
//         state.loading=false;
//         state.error=null;
//       })
//       .addCase(updateMilkYield.rejected,(state,action)=>{
//         state.loading=true;
//         state.error= action.payload as string;

//       })
//       //MilkQuality
//       .addCase(fetchMilkQuality.fulfilled,(state,action)=>{
//         state.loading=false;
//         state.milkQuality=action.payload
//         state.error=null;
//       })
//       .addCase(fetchMilkQuality.rejected,(state,action)=>{
//         state.loading=true;
//         state.error= action.payload as string;
//       })
//       .addCase(addMilkQuality.pending,(state)=>{
//         state.loading=true;
//         state.error=null;
//       })
//       .addCase(addMilkQuality.fulfilled,(state,action: PayloadAction<MilkQuality>)=>{
//         // Now TypeScript knows action.payload is exactly a MilkYield object
//         state.milkQuality.unshift(action.payload);
//         state.loading=false;
//         state.error=null;
//       })
//       .addCase(addMilkQuality.rejected,(state)=>{
//         state.loading=false;
//         state.error=null;
//       })
//       .addCase(updateMilkQuality.pending,(state)=>{
//         state.loading=true;
//         state.error=null;
//       })
//       .addCase(updateMilkQuality.fulfilled,(state,action:PayloadAction<MilkQuality>)=>{
//         const index = state.milkQuality.findIndex(a => a.id === action.payload.id);
//         if (index !== -1) {
//           state.milkQuality[index] = action.payload;
//         }
//         state.loading=false;
//         state.error=null;
//       })
//       .addCase(updateMilkQuality.rejected,(state,action)=>{
//         state.loading=true;
//         state.error= action.payload as string;
//       })
//       //LactationPeriod
//       .addCase(fetchLactationPeriods.fulfilled,(state,action)=>{
//         state.loading=false;
//         state.lactations=action.payload
//         state.error=null;
//       })
//       .addCase(fetchLactationPeriods.rejected,(state,action)=>{
//         state.loading=true;
//         state.error= action.payload as string;
//       })
//       .addCase(addLactationPeriod.pending,(state)=>{
//         state.loading=true;
//         state.error=null;
//       })
//       .addCase(addLactationPeriod.fulfilled,(state,action: PayloadAction<LactationPeriod>)=>{
//         // Now TypeScript knows action.payload is exactly a LactationPeriod object
//         state.lactations.unshift(action.payload);
//         state.loading=false;
//         state.error=null;
//       })
//       .addCase(addLactationPeriod.rejected,(state)=>{
//         state.loading=false;
//         state.error=null;
//       })
//       .addCase(updateLactationPeriod.pending,(state)=>{
//         state.loading=true;
//         state.error=null;
//       })
//       .addCase(updateLactationPeriod.fulfilled,(state,action:PayloadAction<LactationPeriod>)=>{
//         const index = state.lactations.findIndex(a => a.id === action.payload.id);
//         if (index !== -1) {
//           state.lactations[index] = action.payload;
//         }
//         state.loading=false;
//         state.error=null;
//       })
//       .addCase(updateLactationPeriod.rejected,(state,action)=>{
//         state.loading=true;
//         state.error= action.payload as string;
//       })

//       .addCase(updateLactationPeriodDryOff.pending,(state)=>{
//         state.loading=true;
//         state.error=null;
//       })
//       .addCase(updateLactationPeriodDryOff.fulfilled,(state,action:PayloadAction<LactationPeriod>)=>{
//         const index = state.lactations.findIndex(a => a.id === action.payload.id);
//         if (index !== -1) {
//           state.lactations[index] = action.payload;
//         }
//         state.loading=false;
//         state.error=null;
//       })
//       .addCase(updateLactationPeriodDryOff.rejected,(state,action)=>{
//         state.loading=true;
//         state.error= action.payload as string;
//       })
//       .addCase(fetchMarketPrices.fulfilled, (state, action) => {
//         state.marketPrices = action.payload;
//       })
//       .addCase(addMarketPrice.fulfilled, (state, action) => {
//       state.marketPrices.push(action.payload);
//     })
//     .addCase(updateMarketPrice.fulfilled, (state, action) => {
//       const index = state.marketPrices.findIndex(p => p.id === action.payload.id);
//       if (index !== -1) {
//         state.marketPrices[index] = action.payload;
//       }
//     })
//       .addCase(fetchWeights.pending,(state)=>{
//         state.loading=true;
//         state.error=null;
//       })
//       .addCase(fetchWeights.fulfilled,(state,action)=>{
//         state.weights = action.payload;
//         state.loading=false;
//         state.error=null;
//       })
//       .addCase(fetchWeights.rejected,(state,action)=>{
//         state.loading=true;
//         state.error= action.payload as string;
//       })
//       .addCase(addWeight.pending,(state)=>{
//         state.loading=true;
//         state.error=null;
//       })
//       .addCase(addWeight.fulfilled,(state,action)=>{
//         state.weights.unshift(action.payload); // Add new weight to the top
//         state.loading=false;
//         state.error=null;
//       })
//       .addCase(addWeight.rejected,(state,action)=>{
//         state.loading=true;
//         state.error= action.payload as string;
//       })
//       .addCase(updateWeight.pending,(state)=>{
//         state.loading=true;
//         state.error=null;
//       })
//       .addCase(updateWeight.fulfilled,(state,action:PayloadAction<WeightEntry>)=>{
//         const index = state.weights.findIndex(a => a.id === action.payload.id);
//         if (index !== -1) {
//           state.weights[index] = action.payload;
//         }
//         state.loading=false;
//         state.error=null;
//       })
//       .addCase(updateWeight.rejected,(state,action)=>{
//         state.loading=true;
//         state.error= action.payload as string;
//       })
//             // Counting Sessions
//       .addCase(fetchCountingSessions.fulfilled, (state, action) => {
//         state.countingSessions = action.payload;
//       })
//   }
// });

// export default operationsSlice.reducer;

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

const initialPaginatedState = { results: [], next: null, previous: null, count: 0 };

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
  async ({ animalId, page, url }: { animalId?: number, page?: number, url?: string } = {}) => {
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

export const updateMilkQuality=createAsyncThunk<MilkQuality,{id:number,data:Partial<MilkQualityPayload>},{ rejectValue: string }>(
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
export const updateLactationPeriod=createAsyncThunk<LactationPeriod,{id:number,data:Partial<LactationPeriodPayload>},{ rejectValue: string }>(
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
  async ({ animalId, page }: { animalId?: number, page?: number } = {}) => {
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

export const toggleTaskOptimistic = createAsyncThunk<Task, { id: number; currentStatus: boolean }, { rejectValue: string }>(
  'ops/toggleTask',
  async ({ id, currentStatus }, { rejectWithValue }) => {
    try {
      const response = await operationsService.toggleTask(id, !currentStatus);
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

export const updateWeight = createAsyncThunk<WeightEntry, { id: number, data: Partial<WeightEntry> }, { rejectValue: string }>(
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

export const updateMarketPrice = createAsyncThunk('ops/updateMarketPrice', async ({ id, price }: { id: number; price: number }) => {
  const response = await operationsService.updateMarketPrice(id, price);
  return response.data;
});

export const addHealthRecord = createAsyncThunk('ops/addHealth', async (data: Partial<HealthRecord>) => {
  const response = await operationsService.addHealthRecord(data);
  return response.data;
});

export const updateHealthRecord = createAsyncThunk<HealthRecord, { id: number, data: Partial<HealthRecord> }, { rejectValue: string }>(
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

export const updateLactationPeriodDryOff = createAsyncThunk<LactationPeriod, { id: number }, { rejectValue: string }>(
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
      .addCase(fetchActiveTasks.fulfilled, (state, action) => { state.tasks = action.payload; })
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