import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '../../../types/types';
import { notificationService } from '../../../services/notificationService';

interface NotificationState {
  items: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: NotificationState = {
  items: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

// --- THUNKS ---

export const fetchNotifications = createAsyncThunk(
  'notifications/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationService.getUnread();
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch alerts');
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  'notifications/markRead',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await notificationService.markAsRead(id);
      return id; // Return ID to remove it from the unread list in state
    } catch (err: any) {
      return rejectWithValue('Failed to update notification');
    }
  }
);

// --- SLICE ---

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Useful if you want to clear notifications on logout
    clearNotifications: (state) => {
      state.items = [];
      state.unreadCount = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
        state.loading = false;
        state.items = action.payload;
        state.unreadCount = action.payload.length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Optimistic-style removal: When marked read, remove from the "Unread" list
      .addCase(markNotificationRead.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(n => n.id !== action.payload);
        state.unreadCount = state.items.length;
      });
  },
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;