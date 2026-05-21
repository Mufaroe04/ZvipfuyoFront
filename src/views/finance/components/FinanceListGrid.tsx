// src/views/finance/components/FinanceListGrid.tsx
import React from 'react';
import { Box, TextField, InputAdornment, Tabs, Tab, Paper } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { GridColDef } from '@mui/x-data-grid';
import { CustomDataGrid } from '../../../components/datagrid/CustomDataGrid';

interface FinanceListGridProps {
  view: 'milk' | 'cattle' | 'expenses';
  onViewChange: (view: 'milk' | 'cattle' | 'expenses') => void;
  rows: any[];
  rowCount: number;
  columns: GridColDef[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  paginationModel: { page: number; pageSize: number };
  onPaginationModelChange: (model: any) => void;
  paginationMode?: 'client' | 'server';
}

export const FinanceListGrid: React.FC<FinanceListGridProps> = ({
  view,
  onViewChange,
  rows,
  rowCount,
  columns,
  loading,
  searchQuery,
  setSearchQuery,
  paginationModel,
  onPaginationModelChange,
  paginationMode = 'server'
}) => {
  return (
    <Box>
      <Paper elevation={0} sx={{ borderRadius: '4px', mb: 1, overflow: 'hidden' }}>
      <Tabs value={view} onChange={(_, v) => onViewChange(v)} sx={{ mb: 2 }}>
        <Tab label="Milk Sales" value="milk" />
        <Tab label="Cattle Sales" value="cattle" />
        <Tab label="Operating Expenses" value="expenses" />
      </Tabs>
      </Paper>

      <TextField
        fullWidth
        placeholder="Search by Buyer or Reference Number..."
        value={searchQuery || ''}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2, bgcolor: 'white', borderRadius: '4px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IonIcon icon={searchOutline} style={{ color: '#666' }} />
            </InputAdornment>
          ),
        }}
      />

        <CustomDataGrid
          rows={rows}
          columns={columns}
          rowCount={rowCount}
          loading={loading}
          paginationMode={paginationMode}
          paginationModel={paginationModel}
          onPaginationModelChange={onPaginationModelChange}
          getRowId={(row) => row.id || Math.random()}
          height={500}
        />
    </Box>
  );
};