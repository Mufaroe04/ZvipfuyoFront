import api from './api';

export const financeService = {
  getSummary: () => api.get('transactions/summary/'),
  getTransactions: (params = {}) => api.get('transactions/', { params }),
  getMilkSales: () => api.get('milk-sales/'),
  getCattleSales: () => api.get('cattle-sales/'),
  getExchangeRates: () => api.get('exchange-rates/'),
  
  createCattleSale: (data: any) => api.post('cattle-sales/', data),
  createMilkSale: (data: any) => api.post('milk-sales/'),
  createExchangeRate: (data: { rate: string | number }) => api.post('exchange-rates/', data)
};