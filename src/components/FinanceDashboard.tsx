// import React from 'react';
// import { 
//   Box, Grid, Typography, Button, Card, CardContent, 
//   Tabs, Tab, Paper, Stack 
// } from '@mui/material';
// import { 
//   TrendingUp, TrendingDown, FileDownload, AddCircleOutline, ReceiptLong 
// } from '@mui/icons-material';
// import Chart from 'react-apexcharts';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import { FinanceSummary, MilkSale, CattleSale, Transaction } from '../types/types';
// import { useHistory } from 'react-router-dom';

// // Assuming your types file has a GeneralExpense or Transaction type
// interface Props {
//   summary: FinanceSummary;
//   milkSales: MilkSale[];
//   cattleSales: CattleSale[];
//   expenses: any[]; // Add expenses to your Redux state and pass them here
//   loading: boolean;
//   view: 'milk' | 'cattle' | 'expenses';
//   onViewChange: (view: 'milk' | 'cattle' | 'expenses') => void;
// }

// const FinanceDashboard: React.FC<Props> = ({ 
//   summary, milkSales, cattleSales, expenses = [], loading, view, onViewChange 
// }) => {
//     const history = useHistory();
  
// // 1. Column Definitions (Independent)
//   const milkColumns: GridColDef[] = [
//     { field: 'date', headerName: 'Date', flex: 1, renderCell: (params) => params.row.transaction_details.date },
//     { field: 'buyer', headerName: 'Buyer', flex: 1 },
//     { field: 'liters', headerName: 'Liters', flex: 1, renderCell: (params) => `${params.row.liters_sold} L` },
//     { field: 'price', headerName: 'Price/Liter', flex: 1, renderCell: (params) => `${params.row.transaction_details?.currency} ${params.row.price_per_liter}` },
//     { field: 'amount', headerName: 'Amount', flex: 1, renderCell: (params) => (
//       ` ${params.row.transaction_details?.currency} ${params.row.transaction_details?.amount}`
//     )},
//     { field: 'usd_val', headerName: 'USD Equiv.', flex: 1, renderCell: (params) => (
//          `${params.row.transaction_details?.amount_in_usd}`
//     )},
//     { field: 'exchange_rate_to_usd', headerName: 'Exchange Rate to USD .', flex: 1, renderCell: (params) => (
//        `${params.row.transaction_details?.exchange_rate_to_usd}` 
//     )},
//     { field: 'payment_method', headerName: 'Payment Method', flex: 1, renderCell: (params) => params.row.transaction_details?.payment_method },
//     { field: 'reference_number', headerName: 'Ref #', flex: 1, renderCell: (params) => params.row.transaction_details?.reference_number },
//   ];

//   const cattleColumns: GridColDef[] = [
//     { field: 'date', headerName: 'Date', flex: 1, renderCell: (params) => params.row.transaction_details.date },
//     { field: 'weight', headerName: 'Total Weight', flex: 1, renderCell: (params) => `${params.row.total_weight_kg} kg` },
//     { field: 'price_per_kg', headerName: 'Price/kg ', flex: 1, renderCell: (params) => `${params.row?.price_per_kg} kg` },
//     { field: 'buyer', headerName: 'Buyer', flex: 1, renderCell: (params) => params.row.buyer_name },
//     { field: 'amount', headerName: 'Amount', flex: 1, renderCell: (params) => (
//       ` ${params.row.transaction_details?.currency} ${params.row.transaction_details?.amount}`
//     )},
//     { field: 'usd_val', headerName: 'USD Equiv.', flex: 1, renderCell: (params) => (
//          `${params.row.transaction_details?.amount_in_usd}`
//     )},
//     { field: 'exchange_rate_to_usd', headerName: 'Exchange Rate to USD .', flex: 1, renderCell: (params) => (
//        `${params.row.transaction_details?.exchange_rate_to_usd}` 
//     )},
//     { field: 'payment_method', headerName: 'Payment Method', flex: 1, renderCell: (params) => params.row.transaction_details?.payment_method },
//     { field: 'reference_number', headerName: 'Ref #', flex: 1, renderCell: (params) => params.row.transaction_details?.reference_number }
//   ];

//   const expenseColumns: GridColDef[] = [
//     { field: 'date', headerName: 'Date', flex: 1 },
//     { field: 'category', headerName: 'Category', flex: 1, renderCell: (params) => params.row.category_name },
//     { field: 'description', headerName: 'Description', flex: 1.5 },
//     { field: 'amount', headerName: 'Amount', flex: 1, renderCell: (params) => (
//      ` ${params.row?.currency} ${params.row?.amount}`
//     )},
//       { field: 'usd_val', headerName: 'USD Equiv.', flex: 1, renderCell: (params) => (
//        `${params.row?.amount_in_usd}` 
//     )},
//       { field: 'exchange_rate_to_usd', headerName: 'Exchange Rate to USD .', flex: 1, renderCell: (params) => (
//        `${params.row?.exchange_rate_to_usd}` 
//     )},
//     { field: 'payment_method', headerName: 'Payment Method', flex: 1, renderCell: (params) => params.row?.payment_method },

//     { field: 'reference_number', headerName: 'Ref #', flex: 1, renderCell: (params) => params.row?.reference_number }
//   ];


//   // 2. Dynamic Selection
//   const getActiveConfig = () => {
//     switch(view) {
//       case 'milk': return { data: milkSales, columns: milkColumns, color: '#2e7d32' };
//       case 'cattle': return { data: cattleSales, columns: cattleColumns, color: '#1976d2' };
//       case 'expenses': return { data: expenses, columns: expenseColumns, color: '#d32f2f' };
//     }
//   };

//   const { data, columns, color } = getActiveConfig();

//   // 3. Chart Series Adjustment
//   const chartSeries = [{
//     name: view === 'expenses' ? 'Expenses' : 'Revenue',
//     data: data.map(item => {
//       // Handle nested vs flat structure
//       return item.transaction_details ? item.transaction_details.amount_in_usd : item.amount_in_usd;
//     })
//   }];

// const chartOptions: ApexCharts.ApexOptions = {
//     chart: { id: 'finance-trend', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
//     // chart: { type: 'area', toolbar: { show: false }, zoom: { enabled: false } },
//     colors: [view === 'expenses' ? '#d32f2f' : '#2e7d32'],
//     xaxis: { 
//         categories: data.map(item => item.transaction_details?.date || item.date),
//         type: 'datetime', labels: { style: { fontSize: '10px', fontWeight: 600 } } 
//     },
//     yaxis: { labels: { formatter: (val) => `$${val.toFixed(2)}` } },
//     dataLabels: { enabled: false },
//     stroke: { curve: 'smooth', width: 3 },
//     fill: {
//       type: 'gradient',
//       gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05 }
//     },
//     tooltip: { x: { format: 'dd MMM yyyy' } },
//     markers: { size: 4, strokeWidth: 2 }

//   };






//   return (
//     <Box sx={{ flexGrow: 1, p: { xs: 1, md: 3 } }}>
//       {/* KPI BANNER */}
//       <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//       <Paper elevation={0} sx={{ p: 4, borderRadius: 4, mb: 3, border: '1px solid #e0e0e0', background: '#fafafa' }}>
//         <Stack   direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 3 }}>
//             <Stack direction="row" spacing={2} alignItems="center">
//               <Box sx={{ p: 1.5, bgcolor: '#e8f5e9', borderRadius: '12px' }}><TrendingUp color="success" /></Box>
//               <Box>
//                 <Typography color="text.secondary" variant="caption" fontWeight="bold">TOTAL INCOME</Typography>
//                 <Typography variant="h4" fontWeight="800" color="success.main">${summary.total_income_usd?.toLocaleString()}</Typography>
//               </Box>
//             </Stack>
//             <Stack direction="row" spacing={2} alignItems="center">
//               <Box sx={{ p: 1.5, bgcolor: '#ffebee', borderRadius: '12px' }}><TrendingDown color="error" /></Box>
//               <Box>
//                 <Typography color="text.secondary" variant="caption" fontWeight="bold">TOTAL EXPENSES</Typography>
//                 <Typography variant="h4" fontWeight="800" color="error.main">${summary.total_expense_usd?.toLocaleString()}</Typography>
//               </Box>
//             </Stack>

//         </Stack>
//       </Paper>
//         <Button variant="contained" size="large" startIcon={<AddCircleOutline />}
//          sx={{ borderRadius: 3, textTransform: 'none', px: 4 }}
//          onClick={() => history.push("/sales-new-entry")}
//          >
//           New Entry
//         </Button>
//       </Box>


//       {/* TABS */}
//        <Tabs value={view} onChange={(_, v) => onViewChange(v)}>
//         <Tab label="Milk Sales" value="milk" />
//         <Tab label="Cattle Sales" value="cattle" />
//         <Tab label="Operating Expenses" value="expenses" />
//       </Tabs>
//       {/* FULL WIDTH ANALYTICS */}
//       <Card variant="outlined" sx={{ borderRadius: 4, mb: 3, border: '1px solid #e0e0e0' }}>
//         <CardContent>
//           <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
//             <Typography variant="h6" fontWeight="bold">Financial Performance</Typography>
//             <Box sx={{ px: 2, py: 0.5, bgcolor: 'primary.main', borderRadius: 2 }}>
//                 <Typography variant="caption" color="white">Rate: 1 USD = {summary.current_zig_rate} ZiG</Typography>
//             </Box>
//           </Stack>
//          <Chart options={chartOptions} series={chartSeries} type="area" height={350} />
//         </CardContent>
//       </Card>

//       {/* DATA GRID */}
//       <Paper variant="outlined" sx={{ borderRadius: 4, overflow: 'hidden' }}>
//         {/* <DataGrid 
//           rows={currentData} 
//           columns={columns} 
//           loading={loading}
//           autoHeight
//           pageSizeOptions={[10, 25]}
//           initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
//           sx={{ border: 'none', '& .MuiDataGrid-columnHeaders': { bgcolor: '#f5f5f5' } }}
//         /> */}
//         <DataGrid 
//           rows={data} 
//           columns={columns} 
//           autoHeight 
//           loading={loading}
//         />
//       </Paper>
//     </Box>
//   );
// };

// export default FinanceDashboard;
import React, { useState } from 'react';
import { 
  Box, Grid, Typography, Button, Card, CardContent, 
  Tabs, Tab, Paper, Stack, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, CircularProgress 
} from '@mui/material';
import { 
  TrendingUp, TrendingDown, AddCircleOutline, Edit 
} from '@mui/icons-material';
import Chart from 'react-apexcharts';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateExchangeRate } from '../redux/store/slices/financeSlice';
import { FinanceSummary, MilkSale, CattleSale } from '../types/types';

interface Props {
  summary: FinanceSummary;
  milkSales: MilkSale[];
  cattleSales: CattleSale[];
  expenses: any[];
  loading: boolean;
  view: 'milk' | 'cattle' | 'expenses';
  onViewChange: (view: 'milk' | 'cattle' | 'expenses') => void;
}

const FinanceDashboard: React.FC<Props> = ({ 
  summary, milkSales, cattleSales, expenses = [], loading, view, onViewChange 
}) => {
  const history = useHistory();
  const dispatch = useDispatch<any>();

  // State Management for updating conversion rates
  const [openRateModal, setOpenRateModal] = useState(false);
  const [newRate, setNewRate] = useState<string>(summary.current_zig_rate || "1.0000");
  const [submittingRate, setSubmittingRate] = useState(false);

  const handleOpenModal = () => {
    setNewRate(summary.current_zig_rate);
    setOpenRateModal(true);
  };

  const handleCloseModal = () => {
    setOpenRateModal(false);
  };

  const handleSaveRate = async () => {
    if (!newRate || parseFloat(newRate) <= 0) return;
    setSubmittingRate(true);
    try {
      await dispatch(updateExchangeRate({ rate: newRate })).unwrap();
      handleCloseModal();
    } catch (err) {
      console.error("Error updating rate:", err);
    } finally {
      setSubmittingRate(false);
    }
  };

  // --- Grid Column Configs ---
  const milkColumns: GridColDef[] = [
    { field: 'date', headerName: 'Date', flex: 1, renderCell: (params) => params.row.transaction_details?.date },
    { field: 'buyer', headerName: 'Buyer', flex: 1 },
    { field: 'liters', headerName: 'Liters', flex: 1, renderCell: (params) => `${params.row.liters_sold} L` },
    { field: 'price', headerName: 'Price/Liter', flex: 1, renderCell: (params) => `${params.row.transaction_details?.currency} ${params.row.price_per_liter}` },
    { field: 'amount', headerName: 'Amount', flex: 1, renderCell: (params) => `${params.row.transaction_details?.currency} ${params.row.transaction_details?.amount}` },
    { field: 'reference_number', headerName: 'Ref #', flex: 1, renderCell: (params) => params.row.transaction_details?.reference_number },
  ];

  const cattleColumns: GridColDef[] = [
    { field: 'date', headerName: 'Date', flex: 1, renderCell: (params) => params.row.transaction_details?.date },
    { field: 'weight', headerName: 'Total Weight', flex: 1, renderCell: (params) => `${params.row.total_weight_kg} kg` },
    { field: 'price_per_kg', headerName: 'Price/kg', flex: 1, renderCell: (params) => `${params.row.price_per_kg}` },
    { field: 'buyer', headerName: 'Buyer', flex: 1, renderCell: (params) => params.row.buyer_name },
    { field: 'amount', headerName: 'Amount', flex: 1, renderCell: (params) => `${params.row.transaction_details?.currency} ${params.row.transaction_details?.amount}` },
    { field: 'reference_number', headerName: 'Ref #', flex: 1, renderCell: (params) => params.row.transaction_details?.reference_number }
  ];

  const expenseColumns: GridColDef[] = [
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1, renderCell: (params) => params.row.category_name },
    { field: 'description', headerName: 'Description', flex: 1.5 },
    { field: 'amount', headerName: 'Amount', flex: 1, renderCell: (params) => `${params.row?.currency} ${params.row?.amount}` },
    { field: 'payment_method', headerName: 'Payment Method', flex: 1 },
    { field: 'reference_number', headerName: 'Ref #', flex: 1 }
  ];

  const getActiveConfig = () => {
    switch (view) {
      case 'milk': return { data: milkSales, columns: milkColumns };
      case 'cattle': return { data: cattleSales, columns: cattleColumns };
      case 'expenses': return { data: expenses, columns: expenseColumns };
    }
  };

  const { data, columns } = getActiveConfig();

  const chartSeries = [{
    name: view === 'expenses' ? 'Expenses' : 'Revenue',
    data: data.map(item => (item.transaction_details ? item.transaction_details.amount : item.amount) || 0)
  }];

  const chartOptions: ApexCharts.ApexOptions = {
    chart: { id: 'finance-trend', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
    colors: [view === 'expenses' ? '#d32f2f' : '#2e7d32'],
    xaxis: { 
      categories: data.map(item => item.transaction_details?.date || item.date),
      type: 'datetime' 
    },
    stroke: { curve: 'smooth', width: 3 }
  };

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 1, md: 3 } }}>
      {/* KPI BANNER */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4, mb: 3, border: '1px solid #e0e0e0', background: '#fafafa', width: '100%' }}>
          <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ p: 1.5, bgcolor: '#e8f5e9', borderRadius: '12px' }}><TrendingUp color="success" /></Box>
              <Box>
                <Typography color="text.secondary" variant="caption" fontWeight="bold">TOTAL INCOME</Typography>
                <Typography variant="h4" fontWeight="800" color="success.main">${summary.total_income_usd?.toLocaleString()}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ p: 1.5, bgcolor: '#ffebee', borderRadius: '12px' }}><TrendingDown color="error" /></Box>
              <Box>
                <Typography color="text.secondary" variant="caption" fontWeight="bold">TOTAL EXPENSES</Typography>
                <Typography variant="h4" fontWeight="800" color="error.main">${summary.total_expense_usd?.toLocaleString()}</Typography>
              </Box>
            </Stack>
            <Button 
              variant="contained" 
              size="large" 
              startIcon={<AddCircleOutline />}
              sx={{ borderRadius: 3, textTransform: 'none', px: 4, mt: { xs: 2, md: 0 } }}
              onClick={() => history.push("/sales-new-entry")}
            >
              New Entry
            </Button>
          </Stack>
        </Paper>
      </Box>

      {/* TABS */}
      <Tabs value={view} onChange={(_, v) => onViewChange(v)} sx={{ mb: 2 }}>
        <Tab label="Milk Sales" value="milk" />
        <Tab label="Cattle Sales" value="cattle" />
        <Tab label="Operating Expenses" value="expenses" />
      </Tabs>

      {/* FULL WIDTH ANALYTICS & EXCHANGE RATE */}
      <Card variant="outlined" sx={{ borderRadius: 4, mb: 3, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight="bold">Financial Performance</Typography>
            
            {/* Clickable Rate Badge to update the values */}
            <Box 
              sx={{ 
                px: 2, py: 0.8, bgcolor: 'primary.main', borderRadius: 2, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 1, '&:hover': { bgcolor: 'primary.dark' } 
              }}
              onClick={handleOpenModal}
            >
              <Typography variant="caption" color="white" fontWeight="bold">
                Rate: 1 USD = {summary.current_zig_rate} ZiG
              </Typography>
              <Edit sx={{ fontSize: 14, color: 'white' }} />
            </Box>
          </Stack>
          <Chart options={chartOptions} series={chartSeries} type="area" height={350} />
        </CardContent>
      </Card>

      {/* DATA GRID */}
      <Paper variant="outlined" sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <DataGrid 
          rows={data} 
          columns={columns} 
          autoHeight 
          loading={loading}
        />
      </Paper>

      {/* RATE SETTING MODAL DIALOG */}
      <Dialog open={openRateModal} onClose={handleCloseModal} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 'bold' }}>Update Exchange Rate</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter the updated base conversion rate from United States Dollars (USD) to Zimbabwean Gold (ZiG).
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Rate: 1 USD to ZiG"
            type="number"
            fullWidth
            variant="outlined"
            value={newRate}
            onChange={(e) => setNewRate(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseModal} color="inherit" sx={{ textTransform: 'none' }}>Cancel</Button>
          <Button 
            onClick={handleSaveRate} 
            variant="contained" 
            disabled={submittingRate}
            sx={{ textTransform: 'none', px: 3 }}
          >
            {submittingRate ? <CircularProgress size={24} /> : 'Save Rate'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FinanceDashboard;