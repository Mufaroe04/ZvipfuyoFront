import api from './api';
import { AuthResponse, LoginCredentials, PaginatedResponse, User } from '../types/types';

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
  getByUrl: <T>(url: string) => api.get<PaginatedResponse<T>>(url),

  // Refined: Replace 'any' with a partial User type for better safety
  createStaff: (staffData: Partial<User & { role: string }>) => 
    api.post('register-staff/', staffData),
    
  getStaffList: (params:{page?: number,pageSize?: number}) => api.get<PaginatedResponse<User>>('staff/',{params}),
  
  updateStaff: (id: number, staffData: any) => 
    api.patch(`staff/${id}/`, staffData),
};