// src/views/finance/components/FinanceDashboard.tsx
import React from 'react';
import { 
  Box, Typography, Button, Card, CardContent, 
  Paper, Stack, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField, CircularProgress 
} from '@mui/material';
import { TrendingUp, TrendingDown, AddCircleOutline, Edit } from '@mui/icons-material';
import Chart from 'react-apexcharts';
import { useHistory } from 'react-router-dom';
import { useFinanceList } from './hooks/useFinanceList';
import { FinanceListGrid } from './components/FinanceListGrid';

const FinanceDashboard: React.FC = () => {
  const history = useHistory();
  const {
    summary, loading, view, onViewChange, columns, filteredRows, rowCount,
    searchQuery, setSearchQuery, paginationModel, onPaginationModelChange,
    openRateModal, newRate, setNewRate, submittingRate, handleOpenRateModal,
    handleCloseRateModal, handleSaveRate
  } = useFinanceList('server');

// 1. Map the standardized USD amounts safely using your backend base conversion properties
const chartSeries = [{
  name: view === 'expenses' ? 'Expenses' : 'Revenue',
  data: filteredRows.map(item => {
    // If transaction_details exists, extract from the nested Transaction object
    if ('transaction_details' in item && item.transaction_details) {
      return Number(item.transaction_details.amount_in_usd) || 0;
    }
    // Otherwise, pull directly from the root Transaction record
    return 'amount_in_usd' in item ? Number(item.amount_in_usd) || 0 : 0;
  })
}];

// 2. Map the structural dates and improve the tooltip context
const chartOptions: ApexCharts.ApexOptions = {
  chart: { 
    id: 'finance-trend', 
    toolbar: { show: false }, 
    fontFamily: 'Inter, sans-serif' 
  },
  colors: [view === 'expenses' ? '#d32f2f' : '#2e7d32'],
  xaxis: { 
    categories: filteredRows.map(item => {
      if ('transaction_details' in item && item.transaction_details) {
        return item.transaction_details.date;
      }
      return item.date;
    }),
    type: 'datetime',
    labels: { style: { fontSize: '10px', fontWeight: 600 } }
  },
  yaxis: { 
    title: { text: 'Normalized Amount (USD)', style: { fontWeight: 600 } },
    labels: { formatter: (val) => `$${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` }
  },
  tooltip: { 
    x: { format: 'dd MMM yyyy' },
    y: { formatter: (val) => `$${val.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD` }
  },
  stroke: { curve: 'smooth', width: 3 }
};
  return (
    <Box sx={{ flexGrow: 1, p: { xs: 0, md: 1 } }}>
      <Paper elevation={0} sx={{ p: 1, borderRadius: 1, mb: 1,  background: '#fafafa', width: '100%' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ p: 1.5, bgcolor: '#e8f5e9', borderRadius: '4px' }}><TrendingUp color="success" /></Box>
            <Box>
              <Typography color="text.secondary" variant="caption" fontWeight="bold">TOTAL INCOME</Typography>
              <Typography variant="body1" fontWeight="800" color="success.main">${summary.total_income_usd?.toLocaleString()}</Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ p: 1.5, bgcolor: '#ffebee', borderRadius: '12px' }}><TrendingDown color="error" /></Box>
            <Box>
              <Typography color="text.secondary" variant="caption" fontWeight="bold">TOTAL EXPENSES</Typography>
              <Typography variant="body1" fontWeight="800" color="error.main">${summary.total_expense_usd?.toLocaleString()}</Typography>
            </Box>
          </Stack>
          <Button 
            variant="contained" 
            size="large" 
            startIcon={<AddCircleOutline />}
            sx={{ borderRadius: 1, textTransform: 'none', px: 4 ,fontWeight:'bold' }}
            onClick={() => history.push("/sales-new-entry")}
          >
            New Entry
          </Button>
        </Stack>
      </Paper>

      <Card variant="outlined" sx={{ borderRadius: 1, mb: 3, border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="body1" fontWeight="bold">Financial Performance</Typography>
            <Box 
              sx={{ 
                px: 2, py: 0.8, bgcolor: 'primary.main', borderRadius: 1, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 1, '&:hover': { bgcolor: 'primary.dark' } 
              }}
              onClick={handleOpenRateModal}
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

      {/* Structured Domain Grid Implementation */}
      <FinanceListGrid
        view={view}
        onViewChange={onViewChange}
        rows={filteredRows}
        rowCount={rowCount}
        columns={columns}
        loading={loading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        paginationMode="server"
      />

      {/* Exchange Rate Dialog */}
      <Dialog open={openRateModal} onClose={handleCloseRateModal} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 'bold' }}>Update Exchange Rate</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter the updated base conversion rate from United States Dollars (USD) to Zimbabwean Gold (ZiG).
          </Typography>
          <TextField
            autoFocus margin="dense" label="Rate: 1 USD to ZiG" type="number" fullWidth variant="outlined"
            value={newRate} onChange={(e) => setNewRate(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseRateModal} color="inherit">Cancel</Button>
          <Button onClick={handleSaveRate} variant="contained" disabled={submittingRate} sx={{ px: 3 }}>
            {submittingRate ? <CircularProgress size={24} /> : 'Save Rate'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FinanceDashboard;