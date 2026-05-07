import React from 'react';
import Chart from 'react-apexcharts';
import { Box, Typography, Paper, Stack, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getChartOptions } from './dashboardConfig';

interface TabContentProps {
  title: string;
  series: any[];
  options: any;
  rows: any[];
  columns: any[];
  actionLabel: string;
  onAction: () => void;
  type?: "area" | "bar";
}

export const DairyTabContent: React.FC<TabContentProps> = ({ 
  title, series, options, rows, columns, actionLabel, onAction, type = "area" 
}) => (
  <Stack spacing={3}>
    {series[0]?.data.length > 0 && (
      <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid #f0f0f0', boxShadow: 'none' }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>{title}</Typography>
        <Box sx={{ height: 300 }}>
          <Chart options={options} series={series} type={type} height="100%" />
        </Box>
      </Paper>
    )}
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">Records</Typography>
        <Button variant="contained" onClick={onAction} sx={{ textTransform: 'none', borderRadius: '8px' }}>
          {actionLabel}
        </Button>
      </Stack>
      <Paper sx={{ height: 450, borderRadius: '16px', overflow: 'hidden', border: '1px solid #ececec', boxShadow: 'none' }}>
        <DataGrid rows={rows} columns={columns} getRowId={(r) => r.id} sx={{ border: 0 }} />
      </Paper>
    </Box>
  </Stack>
);