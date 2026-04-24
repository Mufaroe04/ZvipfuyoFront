import api from './api';
import { AuthResponse, LoginCredentials, User } from '../types/types';

export const authService = {
  login: (credentials: LoginCredentials) => 
    api.post<AuthResponse>('token/', credentials),
    
  // Refined: Use this to hydrate the app on refresh
  getCurrentUser: () => 
    api.get<User>('token/user/'), 

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  }
};

export const staffService = {
  // Refined: Replace 'any' with a partial User type for better safety
  createStaff: (staffData: Partial<User & { role: string }>) => 
    api.post('register-staff/', staffData),
    
  getStaffList: () => api.get<User[]>('staff/'),
};