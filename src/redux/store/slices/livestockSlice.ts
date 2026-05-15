import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Animal, AnimalPayload, Herd, HerdDetail, HerdPayload, PaginatedResponse } from '../../../types/types';
import { livestockService } from '../../../services/livestockService';
import { operationsService } from '../../../services/operationsService';


interface LivestockState {
  animals: PaginatedResponse<Animal>;
  herds: PaginatedResponse<Herd>;
  selectedAnimal:Animal| null,
  selectedHerd: HerdDetail | null;
  loading: boolean;
  error:string | null;

}
const initialPaginatedState = { results: [], next: null, previous: null, count: 0 };

 const initialState:LivestockState = {
   animals: initialPaginatedState,
   herds: initialPaginatedState, 
   selectedAnimal: null,
   loading: false ,
   selectedHerd: null,
   error:null
  }

export const fetchAllHerds = createAsyncThunk(
  'livestock/fetchHerds',
  async ({ page, url }: { page?: number, url?: string } = {}, { rejectWithValue }) => {
    try {
    const response = url 
      ? await livestockService.getByUrl<Herd>(url) 
      : await livestockService.getHerds({ page });
    return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch Herds');
    }
  }
);

export const fetchAllAnimals = createAsyncThunk(
  'livestock/fetchAnimals',
  async ({ page, url }: { page?: number, url?: string } = {}, { rejectWithValue }) => {
    try {
      const response = url 
      ? await livestockService.getByUrl<Animal>(url) 
      : await livestockService.getAnimals({ page });
    return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch Animals');
    }
  }
);

export const fetchFullAnimalProfile = createAsyncThunk(
  'livestock/fetchFullProfile',
  async ({ page, url, animalId }: { page?: number; url?: string; animalId?: number } = {}, { rejectWithValue }) => {
    try {
      const [profileRes, healthRes] = await Promise.all([
        livestockService.getAnimals({ animal_id: animalId, page }),
        operationsService.getHealthRecords({ animal_id: animalId, page })
      ]);

      // 1. Extract the specific animal from the paginated results
      const animal = profileRes.data.results[0];

      if (!animal) {
        return rejectWithValue("Animal not found");
      }

      // 2. Return a unified object where health_records is a property of the animal
      return {
        ...animal,
        health_history: healthRes.data.results, // Use the array directly for easier mapping
        health_pagination: {
          count: healthRes.data.count,
          next: healthRes.data.next
        }
      };
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to fetch profile");
    }
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
export const fetchHerdById = createAsyncThunk(
  'livestock/fetchHerdById',
  async ( herdId:number ,{ rejectWithValue }) => {
    try {
      const response = await livestockService.getHerdDetail( herdId);
    return response.data;
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
  reducers: {},
  extraReducers: (builder) => {
  builder
      .addCase(fetchAllHerds.fulfilled, (state, action) => {
        state.herds = action.payload;
      })
      .addCase(fetchHerdById.fulfilled, (state, action) => {
        // Since getHerdDetail returns PaginatedResponse<HerdDetail>, 
        // and selectedHerd is HerdDetail | null, take the first result
        state.selectedHerd = action.payload; 
      })
      .addCase(createHerd.fulfilled, (state, action) => {
        state.herds.results.unshift(action.payload);
        state.herds.count += 1;
      })
      .addCase(fetchAllAnimals.fulfilled, (state, action) => {
        state.animals = action.payload;
      })
      .addCase(deleteHerd.fulfilled, (state, action) => {
        // FIXED: Filter the results array, not the state object
        state.herds.results = state.herds.results.filter(h => h.id !== action.payload);
        state.herds.count -= 1;
      })
      .addCase(updateHerd.fulfilled, (state, action) => {
        const index = state.herds.results.findIndex(h => h.id === action.payload.id);
        if (index !== -1) state.herds.results[index] = action.payload;
      })
      .addCase(createAnimal.fulfilled, (state, action) => {
        state.animals.results.unshift(action.payload);
        state.animals.count += 1;
      })
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        // FIXED: Filter the results array
        state.animals.results = state.animals.results.filter(a => a.id !== action.payload);
        state.animals.count -= 1;
      })
      .addCase(updateAnimal.fulfilled, (state, action) => {
        const index = state.animals.results.findIndex(a => a.id === action.payload.id);
        if (index !== -1) state.animals.results[index] = action.payload;
      })
      .addCase(fetchFullAnimalProfile.fulfilled, (state, action) => {
        state.selectedAnimal = action.payload; 
      })
      // Matchers for Loading/Error states
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action):action is PayloadAction<string>  => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'An operation failed';
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
        state.loading = false;
      });
  }
});

export default livestockSlice.reducer;