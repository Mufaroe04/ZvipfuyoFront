import React from 'react';
import { Box, Paper, Typography, Stack, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DairyChart from './DairyChart';
import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';
import { IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';

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
    <Paper sx={{ p: 1, borderRadius: '4px', }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>{title}</Typography>
      <DairyChart series={series} type={type} colors={colors} yLabel={yLabel} />
    </Paper>
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="bold">Historical Records</Typography>
        <Button
         variant="contained"
         size="small"
         startIcon={<IonIcon icon={addOutline} />}
         onClick={onAction} sx={{ textTransform: 'none' }}>
          {actionLabel}
        </Button>
      </Stack>
        <CustomDataGrid rows={rows} columns={columns} getRowId={(r) => r.id} autoHeight/>
    </Box>
  </Stack>
);

export default DairyTabContent;