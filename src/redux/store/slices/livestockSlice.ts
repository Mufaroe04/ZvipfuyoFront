import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Animal, AnimalPayload, Herd, HerdDetail, HerdPayload } from '../../../types/types';
import { livestockService } from '../../../services/livestockService';
import { operationsService } from '../../../services/operationsService';
import { RootState } from "../store";


interface LivestockState {
  animals: Animal[];
  herds: Herd[];
  selectedAnimal:Animal| null,
  loading: boolean;
  selectedHerd: HerdDetail | null;
  selectedHerdError: string | null;
  createHerderror: string | null;
  createHerdStatus:"idle" | "loading" | "succeeded" | "failed";
  getHerdsStatus:"idle" | "loading" | "succeeded" | "failed";
  getHerdsError:string | null;
  getAnimalsStatus:"idle" | "loading" | "succeeded" | "failed";
  getAnimalsError:string | null;
  deleteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  animalActionStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error:string | null;

}
 const initialState:LivestockState = {
   animals: [],
   herds: [], 
   selectedAnimal: null,
   loading: false ,
   selectedHerd: null,
   selectedHerdError: null,
   createHerderror:null ,
   createHerdStatus:'idle',
   getHerdsStatus:"idle" ,
   getHerdsError:null,
   getAnimalsStatus:"idle",
   getAnimalsError: null,
   deleteStatus: 'idle' ,
   animalActionStatus: 'idle' ,
   error:null
  }

export const fetchAllHerds = createAsyncThunk(
  'livestock/fetchHerds',
  async (_, { rejectWithValue }) => {
    try {
      const response = await livestockService.getHerds();
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch Herds');
    }
  }
);

export const fetchAllAnimals = createAsyncThunk(
  'livestock/fetchAnimals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await livestockService.getAnimals();
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch Animals');
    }
  }
);

// Unified Thunk to get all Animal Data + Health History
export const fetchFullAnimalProfile = createAsyncThunk(
  'livestock/fetchFullProfile',
  async (animalId: number) => {
    const [profile, health] = await Promise.all([
      livestockService.getAnimalDetail(animalId),
      operationsService.getAnimalHealthHistory(animalId)
    ]);
    
    return {
      ...profile.data,
      health_records: health.data // Merge health history into the profile object
    };
  }
);

export const createHerd = createAsyncThunk<
  Herd,
  HerdPayload,
  { rejectValue: string }
>("livestock/create", async (herdData, { rejectWithValue }) => {
  try {
    const response = await livestockService.createHerd(herdData);
    return response;
  } catch (error: any) {
    console.error("Error creating Herd:", error);
    return rejectWithValue(error.message || "Failed to create Herd.");
  }
});
export const fetchHerdById = createAsyncThunk<HerdDetail, number, { rejectValue: string }>(
  'livestock/fetchHerdById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await livestockService.getHerdDetail(id);
      return response.data; // This must return the full HerdDetail object
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch herd details');
    }
  }
);
export const updateHerd = createAsyncThunk<Herd, { id: number; data: HerdPayload }, { rejectValue: string }>(
  'livestock/updateHerd',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await livestockService.updateHerd(id, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

export const deleteHerd = createAsyncThunk<number, number, { rejectValue: string }>(
  'livestock/deleteHerd',
  async (id, { rejectWithValue }) => {
    try {
      await livestockService.deleteHerd(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete failed');
    }
  } 
);

export const createAnimal = createAsyncThunk< Animal,AnimalPayload, { rejectValue: string }>(
  'livestock/createAnimal',
  async (data, { rejectWithValue }) => {
    try {
      const response = await livestockService.createAnimal(data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Creation failed');
    }
  }
);
export const updateAnimal = createAsyncThunk<Animal, { id: number; data: Partial<AnimalPayload> }, { rejectValue: string }>(
  'livestock/updateAnimal',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await livestockService.updateAnimal(id, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

export const deleteAnimal = createAsyncThunk<number, number, { rejectValue: string }>(
  'livestock/deleteAnimal',
  async (id, { rejectWithValue }) => {
    try {
      await livestockService.deleteAnimal(id);
      return id; // Return the ID so we can filter it out of the state
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete failed');
    }
  }
);

const livestockSlice = createSlice({
  name: 'livestock',
  initialState,
  reducers: { resetHerds: (state) => {
      state.herds = [];
      // state.herdListPaginationMeta = null;
      state.createHerdStatus = "idle";
      state.createHerderror = null;
    },
    clearSelectedHerd: (state) => {
      state.selectedHerd = null;
    },
      resetCreateHerdStatus: (state) => {
      state.createHerdStatus = "idle";
      state.createHerderror = null;
    },
      resetGetHerdsStatus: (state) => {
      state.getHerdsStatus = "idle";
      state.getHerdsError = null;
    },
      resetGetAnimalsStatus: (state) => {
      state.getAnimalsStatus = "idle";
      state.getAnimalsError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllHerds.fulfilled, (state, action) => {
      state.herds = action.payload;
    })
    .addCase(fetchAllHerds.pending, (state) => {
      state.getHerdsStatus = "loading";
      state.getHerdsError = null;
    })
    .addCase(fetchAllHerds.rejected, (state,action) => {
      state.getHerdsStatus = "failed";
      state.getHerdsError = action.payload as string;
    })
// fetchHerdById
    .addCase(fetchHerdById.pending, (state) => {
        state.loading = true;
        state.selectedHerdError = null;
    })
    .addCase(fetchHerdById.fulfilled, (state, action) => {
        state.loading = false;
        // action.payload is now correctly typed as HerdDetail
        state.selectedHerd = action.payload; 
    })
    .addCase(fetchHerdById.rejected, (state, action) => {
        state.loading = false;
        state.selectedHerdError = action.payload as string;
    })
   .addCase(createHerd.pending, (state) => {
        state.createHerdStatus = "loading";
        state.createHerderror = null;
      })
    .addCase(
        createHerd.fulfilled,
        (state) => {
          state.createHerdStatus = "succeeded";
          state.createHerderror = null;
        }
      )
    .addCase(createHerd.rejected, (state,action) => {
        state.createHerdStatus = "failed";
        state.createHerderror = action.payload as string;
      })
    .addCase(fetchAllAnimals.pending, (state) => {
        state.getAnimalsStatus = "loading";
        state.getAnimalsError = null;
      })
    .addCase(
        fetchAllAnimals.fulfilled,(state,action) => {
          state.getAnimalsStatus = "succeeded";
          state.animals=action.payload
          state.getAnimalsError = null;
        }
      )
    .addCase(fetchAllAnimals.rejected, (state,action) => {
        state.getAnimalsStatus = "failed";
        state.getAnimalsError = action.payload as string;
      })
    // Delete Herd logic
  .addCase(deleteHerd.fulfilled, (state, action) => {
    state.herds = state.herds.filter(h => h.id !== action.payload);
  })
  // Update Herd logic
    .addCase(updateHerd.fulfilled, (state, action) => {
      const index = state.herds.findIndex(h => h.id === action.payload.id);
      if (index !== -1) state.herds[index] = action.payload;
    })
    // Create Animal logic
    .addCase(createAnimal.fulfilled, (state, action) => {
      state.animals.unshift(action.payload); // Add new animal to the top of the list
      state.getAnimalsStatus = 'succeeded';
    })
    // Delete Animal logic (Add a deleteAnimal thunk similar to deleteHerd)
    .addCase(deleteAnimal.fulfilled, (state, action: PayloadAction<number>) => {
    state.animals = state.animals.filter(a => a.id !== action.payload);
    state.getAnimalsStatus = 'succeeded';
  })
  .addCase(deleteAnimal.rejected, (state, action) => {
    state.getAnimalsError = action.payload as string;
  })

  // 2. Update Animal Logic
  .addCase(updateAnimal.fulfilled, (state, action: PayloadAction<Animal>) => {
    const index = state.animals.findIndex(a => a.id === action.payload.id);
    if (index !== -1) {
      state.animals[index] = action.payload;
    }
    state.getAnimalsStatus = 'succeeded';
  })
  .addCase(updateAnimal.pending, (state) => {
    state.getAnimalsStatus = 'loading';
  })
  .addCase(fetchFullAnimalProfile.pending, (state) => {
        state.loading = true;
      })
  .addCase(fetchFullAnimalProfile.fulfilled, (state, action) => {
    state.loading = false;
    state.selectedAnimal = action.payload;
  })
  .addCase(fetchFullAnimalProfile.rejected, (state, action) => {
    state.loading = false;
    state.error =action.payload as string;
  });
  }
});
export const {
  resetCreateHerdStatus,
  resetGetHerdsStatus,
  resetGetAnimalsStatus,
  clearSelectedHerd
  
} = livestockSlice.actions;
export const selectCreateHerdError = (state: RootState) =>
  state.livestock.createHerderror;
export const selectGetHerdsError = (state: RootState) =>
  state.livestock.getHerdsError;
export default livestockSlice.reducer;