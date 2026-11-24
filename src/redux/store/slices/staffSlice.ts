import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { PaginatedResponse, User } from '../../../types/types';
import { staffService } from '../../../services/authService';

interface StaffState {
  members: PaginatedResponse<User>;
  loading: boolean;
  error: string | null;
  createStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialPaginatedState = { 
  results: [], 
  next: null, 
  previous: null, 
  count: 0 
};
const initialState: StaffState = {
  members: initialPaginatedState,
  loading: false,
  error: null,
  createStatus: 'idle',
};

export const fetchStaff = createAsyncThunk('staff/fetchAll',
   async ({ page, url, pageSize }: { page?: number, url?: string, pageSize?: number } = {}, { rejectWithValue }) => {
  try {
          const response = url 
            ? await staffService.getByUrl<User>(url) 
            : await staffService.getStaffList({ page, pageSize });
    // Normalizes response format variances (raw array vs data wrapper envelope)
    // return Array.isArray(response.data) ? response.data : (response.data as any).data || [];
      return response.data;

  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch staff');
  }
});

export const addStaffMember = createAsyncThunk('staff/add', async (data: any, { rejectWithValue }) => {
  try {
    const response = await staffService.createStaff(data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.error || 'Failed to create staff');
  }
});

export const updateStaffMember = createAsyncThunk(
  'staff/update',
  async ({ id, data }: { id: number; data: any }, { rejectWithValue }) => {
    try {
      const response = await staffService.updateStaff(id, data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update staff');
    }
  }
);

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    resetCreateStatus: (state) => { state.createStatus = 'idle'; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.members = action.payload ;
      })
      .addCase(addStaffMember.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        if (action.payload) {
          state.members.results.push(action.payload);
        }
      })
      .addCase(updateStaffMember.fulfilled, (state, action) => {
        const index = state.members.results.findIndex(m => m.id === action.payload?.id);
        if (index !== -1 && action.payload) {
          state.members.results[index] = action.payload;
        }
      })
      .addCase(addStaffMember.pending, (state) => {
        state.createStatus = 'loading';
      })
      .addCase(addStaffMember.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.error = action.payload as string;
      })
      // Unified lifecycle state matchers
      .addMatcher(
        (action) => isAnyOf(fetchStaff.pending, updateStaffMember.pending)(action),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => isAnyOf(
          fetchStaff.fulfilled, fetchStaff.rejected, 
          updateStaffMember.fulfilled, updateStaffMember.rejected
        )(action),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => isAnyOf(fetchStaff.rejected, updateStaffMember.rejected)(action),
        (state, action) => {
          state.error = action.payload as string || 'An error occurred';
        }
      );
  }
});

export const { resetCreateStatus } = staffSlice.actions;
export default staffSlice.reducer;