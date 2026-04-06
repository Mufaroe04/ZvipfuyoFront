import { InsightData } from '../types/types';
import api from './api';



export const insightsService = {
  /**
   * Fetch AI Insights based on current location
   */
  getLiveInsights: (lat: number, lon: number) => 
    api.get<InsightData>(`live-insights/?lat=${lat}&lon=${lon}`),
};