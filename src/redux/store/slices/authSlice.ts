import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LoginCredentials, User } from '../../../types/types';
import { authService } from '../../../services/authService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
};

export const initializeAuth = createAsyncThunk<User, void, { rejectValue: string }>(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getCurrentUser();
      return response.data;
    } catch (err: any) {
      authService.logout();
      return rejectWithValue('Session expired');
    }
  }
);

export const loginUser = createAsyncThunk<
  User,               // Type of the returned value (the payload)
  LoginCredentials,   // Type of the first argument (what we pass to the thunk)
  { rejectValue: string } // Type for the rejectWithValue
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // response.data is now typed as AuthResponse because of the service
      const response = await authService.login(credentials);
      
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      // We return only the User object to the slice
      return response.data.user;
    } catch (err: any) {
      // Using a descriptive error message from the backend if available
      const errorMessage = err.response?.data?.detail || 'Invalid username or password';
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(initializeAuth.fulfilled, (state, action: PayloadAction<User>) => {
    state.user = action.payload;
    state.isAuthenticated = true;
    state.loading = false;
  })
  .addCase(initializeAuth.rejected, (state) => {
    state.user = null;
    state.isAuthenticated = false;
    state.loading = false;
  });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;