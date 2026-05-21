// import { PaginatedResponse } from '../types/types';
// import api from './api';

// export const financeService = {
//   getByUrl: <T>(url: string) => api.get<PaginatedResponse<T>>(url),
//   getSummary: () => api.get('transactions/summary/'),
//   getTransactions: (params: { page?: number ,pageSize?:number } = {}) => api.get('transactions/', { params }),
//   getMilkSales: (params: { page?: number ,pageSize?:number } = {}) => api.get('milk-sales/', { params }),
//   getCattleSales: (params: { page?: number ,pageSize?:number } = {}) => api.get('cattle-sales/', { params }),
//   getExchangeRates: (params: { page?: number ,pageSize?:number } = {}) => api.get('exchange-rates/', { params }),
  
//   createCattleSale: (data: any) => api.post('cattle-sales/', data),
//   createMilkSale: (data: any) => api.post('milk-sales/',data),
//   createExchangeRate: (data: { rate: string | number }) => api.post('exchange-rates/', data)
// };

// src/services/financeService.ts
import { PaginatedResponse } from '../types/types';
import api from './api';

export interface FinanceQueryParams {
  page?: number;
  pageSize?: number;
}

export const financeService = {
  getByUrl: <T>(url: string) => api.get<PaginatedResponse<T>>(url),
  getSummary: () => api.get('transactions/summary/'),
  getTransactions: (params: FinanceQueryParams = {}) => api.get('transactions/', { params }),
  getMilkSales: (params: FinanceQueryParams = {}) => api.get('milk-sales/', { params }),
  getCattleSales: (params: FinanceQueryParams = {}) => api.get('cattle-sales/', { params }),
  getExchangeRates: (params: FinanceQueryParams = {}) => api.get('exchange-rates/', { params }),
  getChartData:() => api.get('transactions/charts/'),
  createCattleSale: (data: any) => api.post('cattle-sales/', data),
  createMilkSale: (data: any) => api.post('milk-sales/', data),
  createExchangeRate: (data: { rate: string | number }) => api.post('exchange-rates/', data)
};