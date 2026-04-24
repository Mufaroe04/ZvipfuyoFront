import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../../types/types';
import { staffService } from '../../../services/authService';

interface StaffState {
  members: User[];
  loading: boolean;
  error: string | null;
  createStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: StaffState = {
  members: [],
  loading: false,
  error: null,
  createStatus: 'idle',
};

export const fetchStaff = createAsyncThunk('staff/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await staffService.getStaffList();
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
      .addCase(fetchStaff.pending, (state) => { state.loading = true; })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(addStaffMember.pending, (state) => { state.createStatus = 'loading'; })
      .addCase(addStaffMember.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.members.push(action.payload);
      })
      .addCase(addStaffMember.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateStaffMember.fulfilled, (state, action) => {
            const index = state.members.findIndex(m => m.id === action.payload.id);
            if (index !== -1) {
            state.members[index] = action.payload; // Update the member in the list
            }
            state.loading = false;
        })
       .addCase(updateStaffMember.pending, (state) => { state.loading = true; });
  }
});

export const { resetCreateStatus } = staffSlice.actions;
export default staffSlice.reducer;