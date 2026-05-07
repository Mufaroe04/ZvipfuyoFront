import React from 'react';
import { Box, Paper, Typography, Stack, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DairyChart from './DairyChart';

interface Props {
  title: string;
  series: any[];
  type?: "area" | "bar";
  colors: string[];
  yLabel: string;
  rows: any[];
  columns: any[];
  actionLabel: string;
  onAction: () => void;
}

const DairyTabContent: React.FC<Props> = ({ 
  title, series, type = "area", colors, yLabel, rows, columns, actionLabel, onAction 
}) => (
  <Stack spacing={3}>
    <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid #f0f0f0' }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>{title}</Typography>
      <DairyChart series={series} type={type} colors={colors} yLabel={yLabel} />
    </Paper>
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">Historical Records</Typography>
        <Button variant="contained" size="small" onClick={onAction} sx={{ textTransform: 'none' }}>
          {actionLabel}
        </Button>
      </Stack>
      <Paper sx={{ height: 450, borderRadius: '16px', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
        <DataGrid rows={rows} columns={columns} getRowId={(r) => r.id} sx={{ border: 0 }} />
      </Paper>
    </Box>
  </Stack>
);

export default DairyTabContent;