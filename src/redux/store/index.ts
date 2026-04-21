import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import livestockReducer from './slices/livestockSlice';
import operationsReducer from './slices/operationsSlice';
import logisticsReducer from './slices/logisticsSlice';
import notificationReducer from './slices/notificationSlice';
import reproductionReducer from './slices/reproductionSlice';
import inventoryReducer from './slices/inventorySlice';
import insightsReducer from './slices/insightsSlice';
import chatReducer from './slices/chatSlice';
import supplierReducer from './slices/supplierSlice';








export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    livestock: livestockReducer,
    operations: operationsReducer,
    logistics: logisticsReducer,
    notifications: notificationReducer,
    reproduction:reproductionReducer,
    inventory:inventoryReducer,
    insights:insightsReducer,
    chat:chatReducer,
    suppliers:supplierReducer,


  },
  // This middleware ensures you don't get "serializable" errors 
  // with Date objects if you use them in your state.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;