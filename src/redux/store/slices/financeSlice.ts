import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { financeService, FinanceQueryParams } from '../../../services/financeService';
import { 
  FinanceSummary, MilkSale, CattleSale, 
  CattleSalePayload, MilkSalePayload, 
  Transaction, PaginatedResponse,
  FinanceChartData
} from '../../../types/types';


interface FinanceState {
  summary: FinanceSummary;
  chartData: FinanceChartData; // Added state field for unpaginated chart values
  milkSales: PaginatedResponse<MilkSale>;
  cattleSales: PaginatedResponse<CattleSale>;
  allTransactions: PaginatedResponse<Transaction>;
  income: Transaction[]; // Retained for current page layout filtering if needed
  expenses: Transaction[]; // Retained for current page layout filtering if needed
  loading: boolean;
  error: string | null;
}

const initialPaginatedState = { results: [], next: null, previous: null, count: 0 };

const initialState: FinanceState = {
  summary: { total_income_usd: 0, total_expense_usd: 0, net_profit_usd: 0, current_zig_rate: "1.0000" },
  chartData: { revenue_timeline: [], expenses_timeline: [] },
  milkSales: initialPaginatedState,
  cattleSales: initialPaginatedState,
  allTransactions: initialPaginatedState,
  income: [],
  expenses: [],
  loading: false,
  error: null
};

export const fetchFinanceData = createAsyncThunk(
  'finance/fetchAll', 
  async (params: FinanceQueryParams = {}) => {
    const [summary, chartRes, milk, cattle, transactions] = await Promise.all([
      financeService.getSummary(),
      financeService.getChartData(), // Fetch global unpaginated data alongside initial stats
      financeService.getMilkSales(params),
      financeService.getCattleSales(params),
      financeService.getTransactions(params), 
    ]);
    return { 
      summary: summary.data, 
      chartData: chartRes.data,
      milkSales: milk.data, 
      cattleSales: cattle.data, 
      transactions: transactions.data 
    };
  }
);

export const fetchTransactions = createAsyncThunk(
  'finance/fetchTransactions', 
  async ({ page, url }: { page?: number; url?: string } = {}, { rejectWithValue }) => {
    try {
      const response = url 
        ? await financeService.getByUrl<Transaction>(url) 
        : await financeService.getTransactions({ page });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch Transactions');
    }
  }
);

// Explicit thunk if you need to reload charts outside of standard dashboard syncs
export const fetchChartData = createAsyncThunk(
  'finance/fetchChartData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await financeService.getChartData();
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch chart datasets');
    }
  }
);

export const updateExchangeRate = createAsyncThunk(
  'finance/updateExchangeRate',
  async (payload: { rate: string | number; page?: number }, { dispatch }) => {
    const response = await financeService.createExchangeRate(payload);
    dispatch(fetchFinanceData({ page: payload.page }));
    return response.data;
  }
);

export const createCattleSale = createAsyncThunk(
  'finance/createCattleSale',
  async (payload: CattleSalePayload & { page?: number }, { dispatch }) => {
    const { page, ...data } = payload;
    const response = await financeService.createCattleSale(data);
    dispatch(fetchFinanceData({ page })); 
    return response.data;
  }
);

export const createMilkSale = createAsyncThunk(
  'finance/createMilkSale',
  async (payload: MilkSalePayload & { page?: number }, { dispatch }) => {
    const { page, ...data } = payload;
    const response = await financeService.createMilkSale(data);
    dispatch(fetchFinanceData({ page }));
    return response.data;
  }
);

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(fetchFinanceData.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.summary = action.payload.summary;
      //   state.chartData = action.payload.chartData;
      //   state.milkSales = action.payload.milkSales;
      //   state.cattleSales = action.payload.cattleSales;
      //   state.allTransactions = action.payload.transactions;
        
      //   // These now represent page-specific sub-lists for local rendering logs
      //   state.expenses = action.payload.transactions?.results?.filter((t: Transaction) => !t.is_income) || [];
      //   state.income = action.payload.transactions?.results?.filter((t: Transaction) => t.is_income) || [];
      // })
      // Temporary Frontend Fix inside financeSlice extraReducers if backend can't be changed immediately:
      .addCase(fetchFinanceData.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload.summary;
        state.milkSales = action.payload.milkSales;
        state.cattleSales = action.payload.cattleSales;
        state.allTransactions = action.payload.transactions;

        // Normalization logic if chart values are misaligned across currencies
        state.chartData = action.payload.chartData; 
        
        state.expenses = action.payload.transactions?.results?.filter((t: Transaction) => !t.is_income) || [];
        state.income = action.payload.transactions?.results?.filter((t: Transaction) => t.is_income) || [];
      })
      .addCase(fetchFinanceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch data";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.allTransactions = action.payload;
        state.income = action.payload.results?.filter((t: Transaction) => t.is_income) || [];
        state.expenses = action.payload.results?.filter((t: Transaction) => !t.is_income) || [];
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.chartData = action.payload;
      })
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher((action): action is PayloadAction<string> => action.type.endsWith('/rejected'), (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An operation failed';
      })
      .addMatcher((action) => action.type.endsWith('/fulfilled'), (state) => {
        state.loading = false;
      });
  },
});

export default financeSlice.reducer;