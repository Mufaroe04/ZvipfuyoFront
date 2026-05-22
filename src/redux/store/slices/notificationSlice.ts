import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Notification, PaginatedResponse } from '../../../types/types';
import { notificationService } from '../../../services/notificationService';

interface NotificationState {
  items: PaginatedResponse<Notification>;
  unreadCount?: number;
  loading: boolean;
  error: string | null;
}

const initialPaginatedState = { results: [], next: null, previous: null, count: 0, unread_count: 0 };
const initialState: NotificationState = {
  items: initialPaginatedState,
  unreadCount: 0,
  loading: false,
  error: null,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetch',
  // Make sure page is consistently typed and accessible in meta properties
  async ({ page = 1, url, pageSize }: { page?: number, url?: string, pageSize?: number } = {}, { rejectWithValue }) => {
    try {
      const response = url 
        ? await notificationService.getByUrl<Notification>(url) 
        : await notificationService.getUnread({ page, pageSize });
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
      await notificationService.markAsRead(id);
      return id;
    } catch (err: any) {
      return rejectWithValue('Failed to update notification');
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.items = initialPaginatedState;
      state.unreadCount = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        
        const isAppendMode = (action.meta.arg?.page ?? 1) > 1;

        if (isAppendMode) {
          // Keep prior results intact and append incoming page array
          state.items = {
            ...action.payload,
            results: [...state.items.results, ...action.payload.results]
          };
        } else {
          // Re-initialize or clear state on fresh root load / refresh
          state.items = action.payload;
        }
        
        state.unreadCount = action.payload.unread_count;
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        state.items.results = state.items.results.filter(n => n.id !== action.payload);
        state.unreadCount = state.items.results.length;
      })
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.loading = true;
        
        state.error = null;
      })
      .addMatcher((action): action is PayloadAction<string> => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An operation failed';
      });
  },
});

export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;