// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { financeService } from '../../../services/financeService';
// import { 
//   FinanceSummary, MilkSale, CattleSale, 
//   CattleSalePayload, MilkSalePayload, 
//   Transaction
// } from '../../../types/types';

// interface FinanceState {
//   summary: FinanceSummary;
//   milkSales: MilkSale[];
//   cattleSales: CattleSale[];
//   allTransactions: Transaction[]; // Source of Truth
//   income: Transaction[];
//   expenses: Transaction[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: FinanceState = {
//   summary: { total_income_usd: 0, total_expense_usd: 0, net_profit_usd: 0, current_zig_rate: "1.0" },
//   milkSales: [],
//   cattleSales: [],
//   allTransactions: [],
//   income: [],
//   expenses: [],
//   loading: false,
//   error: null
// };

// // FETCH ALL DATA
// export const fetchFinanceData = createAsyncThunk('finance/fetchAll', async () => {
//   const [summary, milk, cattle,transactions] = await Promise.all([
//     financeService.getSummary(),
//     financeService.getMilkSales(),
//     financeService.getCattleSales(),
//     financeService.getTransactions(), 
//   ]);
//   return { summary: summary.data, milkSales: milk.data, cattleSales: cattle.data ,transactions: transactions.data};
// });

// // THUNK FOR TRANSACTIONS ONLY (useful for partial refreshes)
// export const fetchTransactions = createAsyncThunk('finance/fetchTransactions', async () => {
//   const response = await financeService.getTransactions();
//   return response.data;
// });
// // CREATE CATTLE SALE
// export const createCattleSale = createAsyncThunk(
//   'finance/createCattleSale',
//   async (payload: CattleSalePayload, { dispatch }) => {
//     const response = await financeService.createCattleSale(payload);
//     // Refresh summary after successful sale to update KPI banner
//     dispatch(fetchFinanceData()); 
//     return response.data;
//   }
// );

// // CREATE MILK SALE
// export const createMilkSale = createAsyncThunk(
//   'finance/createMilkSale',
//   async (payload: MilkSalePayload, { dispatch }) => {
//     const response = await financeService.createMilkSale(payload);
//     dispatch(fetchFinanceData());
//     return response.data;
//   }
// );

// const financeSlice = createSlice({
//   name: 'finance',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       /* --- Fetch Data --- */
//       .addCase(fetchFinanceData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.summary = action.payload.summary;
        
//         // These are your "Rich" data sources for specific tabs
//         state.milkSales = action.payload.milkSales;
//         state.cattleSales = action.payload.cattleSales;
        
//         // Source of Truth for the "Expenses" tab (anything not income)
//         state.expenses = action.payload.transactions.filter((t: Transaction) => !t.is_income);
        
//         // Optional: All transactions for a "General Ledger" view
//         state.allTransactions = action.payload.transactions;
//       })
//       .addCase(fetchFinanceData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to fetch data";
//       })
      
//       // Update local state if only transactions are re-fetched
//       .addCase(fetchTransactions.fulfilled, (state, action) => {
//         state.allTransactions = action.payload;
//         state.income = action.payload.filter((t: Transaction) => t.is_income);
//         state.expenses = action.payload.filter((t: Transaction) => !t.is_income);
//       })

//       /* --- Create Cattle Sale --- */
//       .addCase(createCattleSale.fulfilled, (state, action) => {
//         state.cattleSales.unshift(action.payload); // Add new sale to top of list
//       })

//       /* --- Create Milk Sale --- */
//       .addCase(createMilkSale.fulfilled, (state, action) => {
//         state.milkSales.unshift(action.payload);
//       });
//   },
// });

// export default financeSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { financeService } from '../../../services/financeService';
import { 
  FinanceSummary, MilkSale, CattleSale, 
  CattleSalePayload, MilkSalePayload, 
  Transaction
} from '../../../types/types';

interface FinanceState {
  summary: FinanceSummary;
  milkSales: MilkSale[];
  cattleSales: CattleSale[];
  allTransactions: Transaction[];
  income: Transaction[];
  expenses: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: FinanceState = {
  summary: { total_income_usd: 0, total_expense_usd: 0, net_profit_usd: 0, current_zig_rate: "1.0000" },
  milkSales: [],
  cattleSales: [],
  allTransactions: [],
  income: [],
  expenses: [],
  loading: false,
  error: null
};

export const fetchFinanceData = createAsyncThunk('finance/fetchAll', async () => {
  const [summary, milk, cattle, transactions] = await Promise.all([
    financeService.getSummary(),
    financeService.getMilkSales(),
    financeService.getCattleSales(),
    financeService.getTransactions(), 
  ]);
  return { summary: summary.data, milkSales: milk.data, cattleSales: cattle.data, transactions: transactions.data };
});

export const fetchTransactions = createAsyncThunk('finance/fetchTransactions', async () => {
  const response = await financeService.getTransactions();
  return response.data;
});

// Update the conversion rate on the backend and refresh all ledger calculations
export const updateExchangeRate = createAsyncThunk(
  'finance/updateExchangeRate',
  async (payload: { rate: string | number }, { dispatch }) => {
    const response = await financeService.createExchangeRate(payload);
    // Refresh fully to recalculate current P&L against the new rate
    dispatch(fetchFinanceData());
    return response.data;
  }
);

export const createCattleSale = createAsyncThunk(
  'finance/createCattleSale',
  async (payload: CattleSalePayload, { dispatch }) => {
    const response = await financeService.createCattleSale(payload);
    dispatch(fetchFinanceData()); 
    return response.data;
  }
);

export const createMilkSale = createAsyncThunk(
  'finance/createMilkSale',
  async (payload: MilkSalePayload, { dispatch }) => {
    const response = await financeService.createMilkSale(payload);
    dispatch(fetchFinanceData());
    return response.data;
  }
);

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinanceData.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.summary;
        state.milkSales = action.payload.milkSales;
        state.cattleSales = action.payload.cattleSales;
        state.expenses = action.payload.transactions?.filter((t: Transaction) => !t.is_income);
        state.allTransactions = action.payload.transactions;
      })
      .addCase(fetchFinanceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.allTransactions = action.payload;
        state.income = action.payload.filter((t: Transaction) => t.is_income);
        state.expenses = action.payload.filter((t: Transaction) => !t.is_income);
      })
      .addCase(createCattleSale.fulfilled, (state, action) => {
        state.cattleSales.unshift(action.payload);
      })
      .addCase(createMilkSale.fulfilled, (state, action) => {
        state.milkSales.unshift(action.payload);
      });
  },
});

export default financeSlice.reducer;