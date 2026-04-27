import React from 'react';
import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Chart from 'react-apexcharts';
import { WeightEntry } from '../types/types';

interface Props {
  weights: WeightEntry[];
}

const BeefDashboardComponent: React.FC<Props> = ({ weights }) => {
  const theme = useTheme();

  // Prepare Chart Data: ADG over time
  const chartOptions: ApexCharts.ApexOptions = {
    chart: { id: 'adg-trend', toolbar: { show: false }, zoom: { enabled: false } },
    stroke: { curve: 'smooth', width: 3 },
    colors: [theme.palette.primary.main],
    xaxis: {
      categories: [...weights].reverse().map(w => new Date(w.date).toLocaleDateString()),
      title: { text: 'Date of Weighing' }
    },
    yaxis: { title: { text: 'ADG (kg/day)' } },
    dataLabels: { enabled: false },
    markers: { size: 4 }
  };

  const chartSeries = [{
    name: 'Avg Daily Gain',
    data: [...weights].reverse().map(w => w.adg || 0)
  }];

  const columns: GridColDef[] = [
    { field: 'animal_tag', headerName: 'Tag #', flex: 1, minWidth: 100 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'weight_kg', headerName: 'Weight (kg)', type: 'number', width: 130 },
    { 
      field: 'adg', 
      headerName: 'ADG (kg/d)', 
      width: 120,
      renderCell: (params) => (
        <Typography color={params.value > 0.8 ? 'success.main' : 'warning.main'} fontWeight={700}>
          {params.value}
        </Typography>
      )
    },
    { field: 'condition_score', headerName: 'BCS (1-9)', width: 120 },
    { 
        field: 'change_kg', 
        headerName: 'Change', 
        width: 100,
        valueGetter: (params) => `${params.value > 0 ? '+' : ''}${params.value}kg`
    }
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* Growth Analytics Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <Typography variant="h6" fontWeight={700} mb={2}>Herd Growth Velocity (ADG)</Typography>
            <Chart options={chartOptions} series={chartSeries} type="line" height={300} />
          </Paper>
        </Grid>

        {/* Weight Log DataGrid */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight={700} mb={2} sx={{ ml: 1 }}>Animal Weight Logs</Typography>
          <Paper sx={{ height: 500, width: '100%', borderRadius: 4, overflow: 'hidden' }}>
            <DataGrid 
              rows={weights} 
              columns={columns} 
              pageSizeOptions={[10, 25]}
              initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
              sx={{ border: 'none' }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BeefDashboardComponent;